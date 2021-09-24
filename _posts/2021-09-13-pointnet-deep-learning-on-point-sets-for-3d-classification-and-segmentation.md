---
title: 'PointNet: Deep Learning on Point Sets for 3D Classification and Segmentation'
use_math: true
categories:
- 논문
---

## Abstract
기존에는 point cloud의 irregular한 형식때문에  regular한 3D voxel grid 또는 collection of images로 바꿔 사용하곤 했지만 이것은 불필요하게 많은 data가 렌더링 되는 문제가 있다. 그래서 여기서는 point cloud를 바로 사용하며 input point들의 permutation invariance<sup>[1](#footnote_1)</sup>를 잘 고려하는 neural network를 설계하였다. PointNet은 object detection, part segmentation, scene semantic parsing에 이르는 application들을 위한 통일된 구조를 제공한다. 또한, 이론적으로, network가 무엇을 학습했는지와 network가 왜 perturbation(noise와 유사)과 corruption에 robust한지 이해하기 위한 분석을 제공한다.

## 1. Introduction
기존에는 point cloud의 irregular한 형식 때문에 대부분이 deep net architecture에 넣기 전  regular한 3D voxel grid 또는 collection of images (e.g, views)로 변형하곤 했다. 그러나 이것은 불필요하게 많은 data가 렌더링 되는 문제가 있다. 그래서 point cloud를 직접 사용하도록 하였다. 이를 위해서는 permutation invariance 한 성질로 인해 net computation에서 특정 대칭화가 필요하고, rigid motion<sup>[2](#footnote_2)</sup>에 invariance하다는 사실을 고려해야 한다.

## 2. Related work
**Point Cloud Fetures** 기존 point cloud feature는  대부분 특정 task를 위해 handcrafted 되었다. 이는 일반적으로 intrinsic 또는 extrinsic하게 분류되는 특정 transformation에 대해 invariant하게 설계된다.

**Deep Learning on 3D Data** 
- *Volumetric CNNs* : voxelized shape에 적용되는 network이지만 data sparsity과 계산 비용때문에 resolution이  제한된다. 
- *Multiview CNNs* : 3D point cloud나 shape를 2D 이미지로 렌더링한 다음 2D conv net를 이용해 분류. 그러나 scene understanding이나 3D task(point classification, shape completion 등)로 확장하는 것이 어렵다.
- *Spectral CNNs* : mesh에 적용하는 방법. 그러나 유기물과 같은 manifold mesh에 제약을 받고 가구와 같은 non-isometric 모양으로 어떻게 확장하는지 명확하지 않다.
- *Feature-based DNNs* : traditional shape features를 추출하여 3D data를 vector로 변환한 뒤 FC net를 이용해 shape를 분류한다.

**Deep Learning on Unorderes Sets** 데이터 구조 관점에서, point cloud는 순서 없는 vector의 집합이다. 딥러닝에서 대부분의 작업은 sequence(음성 및 언어 처리), images와 volume(video 또는 3D data)와 같은 regular한  input에 초점을 맞추고 있지만, point set에 대해서는 잘 이루어지지 않았다.

## 3. Problem Statement
point cloud는 각 point $P_{i}$가 $(x, y, z)$좌표에 color, normal과 같은 추가적인 feature channels를 가지고, 이 point들이 모인 set을 $\{P_i \mid i=1,...,n\}$로 표현한다. 여기서는 point의 channel로 $(x,y,z)$ 좌표만을 사용한다. 

Object classification task에서, input point cloud는 shape에서 직접 sampling되거나, 장면 point cloud에서 사전에 segmentation된다. PointNet에서는 모든 $k$ 후보 classes에 대해 $k$개의 scores를 출력한다.

Semantic segmentation에서는 input은 부분 region segmentation을 위한 단일 object이거나 object region segmentation 3D scene의 sub-volume일 수 있다. PointNet에서는 각 $n$개의 point 및 $m$개의 semantic subcategory에 대해 $n\times m$개의 score를 출력한다.

## 4. Deep Learning on Point Sets
### 4.1. Properties of Point Sets in $\mathbb R^n$
Network의 input은 Euclidean space 상 point의 subset이다. 이는 다음 3가지 특징을 가지고 있다.
- **Unordered.** 이미지의 pixel 배열이나 voxel 배열과 달리 point cloud는 특정한 순서가 없다. 다시 말해 네트워크가 N개의 3D point를 사용한다면 이 N개 point의 순서에 따라 결과가 달라지지 않아야 한다.
- **Interaction among points.** point들은 distance metric<sup>[3](#footnote_3)</sup>이 존재하는 공간에 있다. 즉, 이는 point들이 고립되어있지 않고 주변 point들과 의미 있는 subset을 형상한다는 것을 의미한다. 따라서, model은 주변 point에서 local 구조 및 local 구조 간의 combinatorial interaction을 확인할 수 있어야 한다. 간단히 이야기 하면 point들간의 거리 정보만을 통해 의미를 찾아야 한다.
-  **Invariance under transformations.**  geometric object로서 point cloud의 학습된 표현은 특정 transformation을 수행해도 불변해야 한다. 예를 들어 모든 포인트들을 회전하거나 이동시켜도 그 특성을 변하지 않아야 한다는 것이다.

### 4.2. PointNet Architecture
![image](https://user-images.githubusercontent.com/79836443/133418360-97952ac2-feeb-4b00-8ead-d466066648ea.png)<center><span style="color:rgb(150, 150, 150)">Figure 2. PointNet의 구조</span></center>

 classification network는 $n$개의 point를 input으로 받으며, 여기서는 $(x, y, z)$ 좌표만을 고려하여 $n\times 3$의 vector를 input으로 받는다. 사진의 구조는 classification network이지만 classification network와 segmentation network는 서로 구조의 많은 부분을 공유한다. PointNet은 다음 3가지 key module을 가진다. 이 input을 transformation 한 뒤  다시 feature tranformation 한 다음 max pooling을 통해 point feature를 aggregate한다. 최종 output은 $k$개의 class에 대한 각 classification score이다. 사진의 구조는 classification network이지만 classification network와 segmentation network는 서로 구조의 많은 부분을 공유한다. Batchnorm은 ReLU와 함께 모든 layer에 적용하고, dropout은 classification net의 마지막 mlp에만 적용한다.
 
 자세한 내용으로 PointNet은 다음 3가지 key module을 가진다.
#### Symmetry Function for Unordered Input
input permutation(순열)에 invariant한 model을 만들기 위해 다음 3가지 전략을 사용한다.
1. 입력 순서를 canonical order로 정렬한다.(여기서 canonical order는 표준 형식을 따르는 정렬으로 특정 알고리즘을 지칭하지는 않는다) 
2. input을 RNN을 training하기 위한 sequence로 취급하지만, 모든 종류의 순열을 이용해 training data를 augmentation 한다.
3. 각 point에서의 정보를 aggregate<sup>[4](#footnote_4)</sup>하기 위해 간단한 symmetric function을 사용한다.

symmetric function은 입력 순서에 관계 없이 동일한 output을 내는 함수로 여기서는 n개의 vector를 입력으로 받는다. symmetric function의 예로는 +와 $\times$연산이 있다. 

그러나 일반적으로 고차원 공간에서는 stable한 순서가 존재하지 않는다. 때문에 sorting으로는 ordering 문제가 완전히 해결되지 않고, 이 문제가 지속되기 때문에 network가 input에서 output으로 일관된 mapping을 학습하기 어렵다.

![image](https://user-images.githubusercontent.com/79836443/134469465-907b04b3-8421-43d5-bc75-785aa1552912.png){:.align-center}{: width="70%" height="70%"}<center><span style="color:rgb(150, 150, 150)">순서 invariance를 달성하기 위한 3가지 접근 방법</span></center>

위 이미지에서 볼 수 있듯이 point를 정렬하지 않고 바로 처리하는 것보다 정렬한 뒤 MLP에 직접 적용하는 것이 좀 더 낫지만 여전히 성능은 좋지 않다. 또, RNN을 이용한 방법 또한 제안한 방법만큼 좋은 성능을 보여주지 못했다.

그래서 PointNet은 다음과 같이 집합의 transform된 element들에 대해 symmetric function을 적용하여 생성된 point set에 정의된 general 함수를 근사화하는 것이다.

$$f(\{x_1,...,x_n\})\approx g(h(x_1),...,h(x_n))$$

<center>$f\;:2^{\mathbb R^N}\rightarrow \mathbb R,\;h\;:{\mathbb R^N}\rightarrow {\mathbb R^K},\;g$ (symmetric 함수) $:\underbrace{ {\mathbb R^K} \times \cdots \times {\mathbb R^K}}_ n \rightarrow {\mathbb R^N}$ </center>

Basic 모듈은 매우 간단하다. $h$를 다층 퍼셉트론 network를 이용해서, $g$는 single 변수 함수와 max pooling 함수의 구성으로 approximate한다. $h$의 collection을 통해 우리는 집합의 다른 property들을 알기위해 많은 $f$를 학습할 수 있다.

이 모듈의 output은 input set의 global signature인 $\[f_1,\,...\,,f_K\]$ 벡터이다.

#### Local and Global Information Aggregation
classification을 위한 shape global feature에 대해 SVM이나 다층 퍼셉트론 classifier는 쉽게 훈련시킬 수 있지만, point segmentation은 local과 global을 모두 필요로 하기 때문에 어려움이 있다. 이를 해결하기 위한 solution이 Fig 2에서 볼 수 있는 segmentation Network이다. 

이 network는 global point cloud의 feature 벡터를 계산하고 이를 각 point feature에 concatenate 한 뒤 각 point 별 feature에 다시 제공한다. 그 다음 combine 된 point feature를 기반으로 새로운 각 point 별 feature를 추출한다. 이번에는 각 point 별 feature가 local 및 global 정보를 모두 인식한다.

#### Joint Alignment Network
point cloud가 rigid transformation 같은 특정한 geometric transformation 이 수행되는 경우 point cloud의 semantic labeling은 변하지 않아야 한다. 때문에 point set에 의해 학습된 것이 이러한 변환에 불변하기를 기대한다.

자연스러운 해결 방법은 feature extraction 이전에 모든 input set을 canonical한 space에 정렬하는 것이다. PointNet에서의 input은 이러한 방법을 Jaderberg et al.<sup>[5](#footnote_5)</sup>에 비해 더 간단하게 이 목표를 달성하였다. 저자는 mini-network(Fig 2 T-net)에 의한 affine 변환 matrix를 예측하고 이를 input points의 coordiates에 바로 적용하였다. mini-network 자체는 큰 network와 비슷하고, point independent feature extraction과 maxpooling, FC layer의 기본 모듈로 구성된다.

그러나 featrue space의 transformation matrix는 spatial transform matrix보다 더 높은 차원으로 이루어져서 optimization의 난이도가 급격히 상승한다. 이를 위해 regularization term을 softmax training loss로 추가한다. 또, feature transformation matrix가 다음과 같은 직교 행렬에 가깝도록 제한한다.

$$L_{reg} = \left \| I-AA^T \right \|^2_F$$

$A$는 mini-network에 의해 예측된 feature alignment matrix이다. 직교 변환은 input의 정보를 잃지 않기 때문에 필요하다.

### 4.3. Theoretical Analysis
#### Universal approximation<sup>[6](#footnote_6)</sup>

<br>
<br>

__ __ __ __ __ __ __

<a name="footnote_1">1</a>: 입력 벡터 요소의 순서와 상관 없이 같은 출력을 생성하는 것. MLP가 이에 해당하며 CNN, RNN은 이에 해당하지 않는다.<br>
<a name="footnote_2">2</a>: rigid motion은 transformation을 하더라도 point들간의 distance와 방향은 그대로 유지되는 변환을 말한다. 여기에는 translation, rotation, reflection, glide reflection이 해당된다.<br>
<a name="footnote_3">3</a>: distance를 정의하는 방법. 가장 간단한 예시로 Euclidean distance를 들 수 있다.<br>
<a name="footnote_4">4</a>: ????<br>
<a name="footnote_5">5</a>:  M. Jaderberg, K. Simonyan, A. Zisserman, et al. Spatial transformer networks. In NIPS 2015<br>
<a name="footnote_6">6</a>: 1개의 히든 레이어를 가진 Neural Network를 이용해 어떠한 함수든 근사시킬 수 있다는 이론. 당연히 활성화 함수는 비선형 함수여야 한다
