---
title: |-
  PointNet++: Deep Hierarchical Feature Learning on
  Point Sets in a Metric Space
use_math: true
categories:
- 논문
toc: true
---

PointNet++은 PointNet이 point가 존재하는 metric space에 의해 유도된 local structure를 활용하지 못해서 fine-grained<sup>[1](#footnote_1)</sup> 패턴들을 잘 인식하지 못하고 복잡한 scene들을 일반화하는 능력이 떨어지는 문제를 해결하기 위해 제안되었다. PointNet++은 입력 point set의 nested partitioning에 PointNet을 recursive하게 적용하는 hierarchical 신경망이다. 이 네트워크는 metric space distance를 활용하여 contextual scale이 증가하는 local feature를 학습할 수 있다.

## 1. Introduction
기존 PointNet의 아이디어는 각 point의 공간 encoding을 학습하고, 모든 개별 point feature들을 global 포인트 클라우드 signature와 aggregate하는 것이었다. 그러나 이런 구조는 metric에 의해 유도된 local structure를 활용하지 않는다. 그러나 convolutional architecture의 성공에 local structure를 활용하는 것이 중요한 요소라는 것이 증명되어왔다. CNN은 multi-resolution hierarchy를 따라 점점 더 큰 scale의 feature를 찾아낼 수 있다. CNN 구조 특성상 낮은 level의 layer에서는 작은 receptive field를 가지고 높은 layer에서는 큰 receptive field를 가지기 때문이다. 이러한 hierarchy를 따라 local pattern들을 추상화하는 기능은 일반화에 더욱더 유용하다.

해서, PointNet++이라는 hierarchical 신경망을 소개한다. 먼저, point set을 distance metric에 따라 겹치는 local 영역으로 분할한다. 이를 통해 위에서 이야기한 CNN과 마찬가지로 작은 neighborhood에서 작은 geometric structure를 고려하는 local feature를 추출한다. 이 local feature는 더 큰 unit으로 그룹화되고, 더 높은 level의 feature가 생성되도록 한다. 이 작업을 전체 point set의 feature를 얻을 때까지 반복한다.

PointNet++은 다음 두 가지 문제를 해결할 수 있어야 한다.
1. point set의 분할을 생성하는 방법
2. local feature learner를 통해 point set이나 local featrue를 추상화하는 방법

이 두 문제는 서로 연관되어있는데 그 이유는 pointset의 분할은 여러 partition들에 걸쳐 공통적인 구조를 만들어 내야 하기 때문이다. 따라서, convolution 설정에서와 같이 local feature learner들은 weight를 공유할 수 있다. 이 local feature learner로 PointNet을 사용한다. PointNet은 basic building block으로서, local points나 features를 더 높은 level의 표현으로 추상화한다. 이러한 관점에서, PontNet++은 input set의 nested partitioning에 PointNet을 recursive하게 적용한다고 할 수 있다.

point set의 overlapping partitioning 방법도 주된 문제이다. 일단, 각 partition은 Euclidean space에서 중심 위치와 scale을 parameter로 가지는 neighborhood ball로 정의한다. 또, 모든 set을 균일하게 다루기 위해 farthest point smapling (FPS)<sup>[2](#footnote_2)</sup> 알고리즘을 이용해 중심점을 선택한다. 

PointNet++의 주된 contribution은 다음과 같다.
- 여러 scale에서 neighborhoods를 활용해 robustnessd와 detail capture를 달성하였다.
- 학습시키는 동안 random input dropout을 이용해 network가 찾아진 pattern들에 대해 adaptive하게 weight를 적용하고, input data에 따라 multi-scale feature들을 결합하는 방법을 학습하도록 하였다.

## 2. Problem Statement
$\mathcal{X}=(M,d)$ 가 Euclidean space $\mathbb R^n$에서 상속된 discrete metric space라고 가정한다. 이때, $M\subseteq \mathbb R^n$ 은 point set이고, $d$는 distance metric이다. 또, Euclidean space $M$는 밀도가 균일하지 않은 부분도 있다. 이러한 $\mathcal{X}$를 입력으로 받고 $\mathcal{X}$에 대한 semantic interest의 정보를 생성하는 set function $f$를 생성하도록 학습시킨다. 이 $f$는 $\mathcal{X}$에 label을 할당하는 classification 함수나 $M$의 각 멤버에 point 별 label을 할당하는 segmentation 함수가 될 수 있다.

## 3. Method

![image](https://user-images.githubusercontent.com/79836443/135207876-43abf960-6fd9-4205-9eb1-e45c67ad0028.png){:.align-center}
<center><span style="color:rgb(150, 150, 150)">hierarchical feature learning 구조</span></center>

### 3.2 Hierarchical Point Set Feature Learning
PointNet++의 hierarchical 구조는 여러 개의 *set abstraction* level로 구성된다. 각 level에서는 points set이 처리되고 추상화되어 더 적은 수의 element를 가지는 새로운 set이 생성된다. set abstraction level은 다음 3가지 key layer로 구성되며, 자세한 설명은 뒤에 다시 한다.
- *Sampling layer* : local region의 centroid를 찾는다.
-  *Grouping layer* : centroid 주위의 "neighboring" point들을 찾아 local region sets를 구성한다.
-  *PoinNet layer* : mini-PointNet을 사용해서 local region pattern들을 feature vector로 encoding 한다.

set abstraction level은  input으로 $N\times (d+C)$ ($N$ : point 개수, $d$ : coordinates dimension, $C$ : point feature dimension) matrix를 받고  output으로 $N'\times (d+C')$ ($N'$ : subsampling된 point 개수, $C'$ : local context를 요약한 feature vector dimensioin)  matrix를 출력한다. 

#### Sampling layer
input points $\lbrace x_{1}, x_{2}, ..., x_{n} \rbrace$가 주어질 때, iterative farthest poin sampling (FPS)을 사용하여 input의 부분집합 $\lbrace x_{i_{1}}, x_{i_{2}}, ..., x_{i_{m}} \rbrace$를 생성한다. FPS는 이전까지 sampling된 point들에서 가장 먼 point를 선택하는 방법으로 $x_{i_{j}}$는 $\lbrace x_{i_{1}}, x_{i_{2}}, ..., x_{i_{j-1}} \rbrace$의 point들, 즉 이전까지 sampling된 point들에서 가장 먼 point이다. 이 방법은 random sampling과 비교했을 때 더 우수한 결과를 얻을 수 있었다. 데이터 분포가 균일하지 않기 때문에 이러한 방식으로 데이터에 의존하여 receptive field를 생성한다.  

#### Grouping layer
Grouping layer는 $N\times (d+C)$ 크기의 point set과 $N'\times d$ 크기의 centriods set를 input으로 받아 grouping을 수행한다. output은 $N'\times K\times (d+C)$ 의 point set 그룹들이다. 이 각 그룹은 local region이고, $K$는 centriod points의 neighborhood point 개수(local region에 속하는 point 개수)이다. 여기서는 ball query를 이용해 $K$가 그룹에 따라 다르지만, 다음의 PointNet layer가 point의 수를 flexible하게 고정된 길이의 local region feature vector로 변환해준다.

ball query는 query point에서 radius 내에 있는 모든 point를 찾는다. 이 방법은 고정된 개수의 주위 point를 찾는 $K$ nearest neighbor (kNN)과 비교했을 때, 영역의 크기가 고정되어있기 때문에 공간 전반에 걸쳐 local region feature가 더 일반화될 수 있다.

#### PointNet layer
input은Grouping layer에서 나온 $N'\times K\times (d+C)$의 크기를 가지는 $N'$개의 local region이다. output의 각 local region은 그 영역의 centriod와 centroid의 주변을 encoding 하는 local feature에 의해 추상화된다. 그 크기는 $N'\times (d+C')$이다.

local 영역에서 point의 좌표는 $x_i^{(j)} = x_i^{(j)} - \hat{x}^{(j)}$ ($i=1, ..., K, j=1, ..., d, \hat{x}$ : centroid의 좌표)을 이용해  centriod과의 상대적인 좌표로 바꿔 사용한다. 이 상대적인 좌표를 이용해 local 영역에 있는 point간의 위치적 관계를 담을 수 있다.

### 3.3 Robust Feature Learning under Non-Uniform Sampling Density
Point set은 대부분 일정하지 않은 밀도로 분포되어 있다. density한 밀도 분포를 가진 point cloud로 학습된 네트워크는 sparse한 point cloud로 generalize 하기 어렵고 그 반대도 마찬가지이다. 때문에 dense하게 얻어진 영역에서 확대하며 작은 디테일을 확인하고 싶지만, sparse한 영역에서 이를 수행하면 제대로 된 local pattern을 얻을 수 없다. 이러한 경우 더 큰 scale에서 pattern을 확인해야 하는데 이를 위해 input sampling density가 달라질 때, 서로 다른 scale의 영역에서 얻어진 featture를 결합하는 방법을 학습하는 density adaptive PointNet layer를 제안하였다. 이 PointNet layer를 이용한 hierarchical network를 PointNet++이라고 이름 지었다. 

3.2절에서 각각의 abstraction level은 하나의 scale에서 feature extraction과 grouping을 수행하였다. PointNet++은 각 abstraction level은 다양한 scale의 local pattern을 추출하고 이를 local point 밀도에 따라 지능적으로 결합한다. local 영역을 그룹화하고 서로 다른 scale에서 얻어진 feature를 결합하기 위해 다음 2가지의 density adaptive layer를 제안하였다.

![image](https://user-images.githubusercontent.com/79836443/135259615-d7e6b0f9-8f02-4970-8752-735d3149a691.png){:.align-center}{: width="70%" height="70%"}

#### Multi-scale grouping (MSG)
그림에서 보이는 것처럼 가장 간단하면서도 효과적으로 다양한 scale의 pattern을 찾아내는 방법은 다른 scale의 grouping layer를 적용한 뒤 PointNet을 이용해 각각 다른 scale에서 feature를 추출하는 것이다. 이 다른 scale에서 추출한 feature들을 concatenate하여 multi-scale feature를 생성한다. 

저자는 network를 훈련시키기 위해 *random input dropout*을 수행했다. *random input dropout*이란 각 instance를 랜덤한 확률로 input point들 중 일부를 랜덤하게 dropping out 하는 것으로 random하게 downsampling을 수행한다고 생각할 수 있다. 이 방법을 이용해 다양한 sparsity와 uniformity를 가지는 training set으로 네트워크를 훈련시킬 수 있다.

#### Multi-resolution grouping (MRG)
위에서 설명한 MSG는 모든 centroid point에 대해 넓은 scale neighborhoods에서 local PointNet을 실행하기 때문에 계산 비용이 많이 든다. 특히 가장 낮은 level에서는 centroid point의 수가 매우 많기 때문에 time cost가 매우 중요하다. 

이러한 이유로 MRG라는 새로운 대안을 제시한다. MRG 이미지에서 level $L_i$의 영역에서의 두 vector를 concatenation하여 feature vector를 만든다. 한 vector(왼쪽 vector)는 한 단계 낮은 level $L_{i-1}$에서 set abstraction level을 이용하여 각 subregion의 feature를 요약해서 얻는다. 다른 한 vector(오른쪽)는 local 영역의 모든 raw point들을 단일 PointNet을 사용하여 직접 처리하여 얻은 feature이다.

만약 local 영역의 density가 낮다면, 첫 번째 vector를 계산하는 subregion은 더 spaerse한 point들을 포함하고 sampling 부족 문제를 더 많이 겪기 때문에 첫 번째 vector의 신뢰도가 두 번째 vector에 비해 더 떨어진다. 반대로 local 영역의 density가 높다면, 첫 번째 vector가  더 낮은 level에서 높은 해상도로 recursive하게 검사할 수 있는 능력이 있기 때문에 더 작고 디테일한 정보를 제공해줄 수 있다. 

MSG와 비교했을 때, 이 방법이 더 효율적이다.

### 3.4 Point Feature Propagation for Set Segmentation
set abstraction layer에서 기존의 point set은 subsampling 된다. 그러나 semantic point labeling과 같은 segmentation task에서 기존에 있던 모든 point에 대한 point feature를 얻어야 한다. 

이를 위해 거리 기반 interpolation과 level을 통과하는 skip link를 사용하는 계층적 전파(hierarchical propagation) 전략을 사용한다. *feature propagation* level에서, $N_l \times (d+C)$ point에서 $N_{l-1}$로 point feature를 propagation 한다($N_l, N_{i-1}$은 set abstraction level $l$에서의 input과 output point set 크기이며 $N_l\leq N_{i-1}$이다). 

interpolation : $N_{l-1}$ 개의 point의 좌표에서 $N_l$ point들의 feature value $f$를 interpolation하여 feature propagation을 수행한다. interpolation 방법으로는 $k$ nearest neighbors 방법 기반의 inverse distance weighted average를 사용한다(문단 이후 수식). $N_{l-1}$ point들에서 얻어진 interpolated feature들은 set abstraction level에서 온 skip linked point feature들과 concatenate된다. 이후 concatenate된 feature들은 "unit pointnet"을 통과하는데, 이는 CNN에서 $1 \times 1$ 컨볼루션과 유사하다. 이 과정은 기존 point set에 feature를 전파할 때까지 반복된다.

$$f^{(j)}(x)=\frac{\sum_{i=1}^{k}w_{i}(x)f_{i}^{(j)}}{\sum_{i=1}^{k}w_{i}(x)}\quad \textup{where}\quad w_{i}(x)=\frac{1}{d(x,x_{i})^p},\;j=1, ...,C$$





<br>
<br>

__ __ __ __ __ __ __

<a name="footnote_1">1</a>: 세분화된 것을 의미하는 말로 여기서는 작은 패턴들을 의미한다. 반대말로 coarse-grained가 있다.<br>
<a name="footnote_2">2</a>: 서로 간의 거리가 가장 먼 점들을 선택하는 과정
