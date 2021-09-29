---
title: |-
  PointNet++: Deep Hierarchical Feature Learning on
  Point Sets in a Metric Space
use_math: true
categories:
- 논문
---

PointNet++은 PointNet이 point가 존재하는 metric space에 의해 유도된 local structure를 활용하지 못해서 fine-grained<sup>[1](#footnote_1)</sup> 패턴들을 잘 인식하지 못하고 복잡한 scene들을 일반화하는 능력이 떨어지는 문제를 해결하기 위해 제안되었다. PointNet++은 입력 point set의 nested partitioning에 PointNet을 recursive하게 적용하는 hierarchical 신경망이다. 이 네트워크는 metric space distance를 활용하여 contextual scale이 증가하는 local feature를 학습할 수 있다.

## 1. Introduction
기존 PointNet의 아이디어는 각 point의 공간 encoding을 학습하고, 모든 개별 point feature들을 global 포인트 클라우드 signature와 aggregate하는 것이었다. 그러나 이런 구조는 metric에 의해 유도된 local structure를 활용하지 않는다. 그러나 convolutional architecture의 성공에 local structure를 활용하는 것이 중요한 요소라는 것이 증명되어왔다. CNN은 multi-resolution hierarchy를 따라 점점 더 큰 scale의 feature를 찾아낼 수 있다. CNN 구조 특성 상 낮은 level의 layer에서는 작은 receptive field를 가지고 높은 layer에서는 큰 receptive field를 가지기 때문이다. 이러한 hierarchy를 따라 local pattern들을 추상화하는 기능은 일반화에 더욱 유용하다.

해서, PointNet++이라는 hierarchical 신경망을 소개한다. 먼저, point set을 distance metric에 따라 겹지는 local 영역으로 분할한다. 이를 통해 위에서 이야기한 CNN과 마찬가지로 작은 neighborhood에서 작은 geometric structure를 고려하는 local feature를 추출한다. 이 local feature는 더 큰 unit으로 그룹화되고, 더 높은 level의 feature가 생성되도록 한다. 이 작업을 전체 point set의 feature를 얻을때까지 반복한다.

PointNet++은 다음 두 가지 문제를 해결할 수 있어야 한다.
1. point set의 분할을 생성하는 방법
2. local feature learner를 통해 point set이나 local featrue를 추상화 하는 방법

이 두 문제는 서로 연관되어있는데 그 이유는 pointset의 분할은 여러 partition들에 걸쳐 공통적인 구조를 만들어 내야하기 때문이다. 따라서, convolution 설정에서와 같이 local feature learner들은 weight를 공유할 수 있다. 이 local feature learner로 PointNet을 사용한다. PointNet은 basic building block으로서, local points나 features를 더 높은 level의 표현으로 추상화 한다. 이러한 관점에서, PontNet++은 input set의 nested partitioning에 PointNet을 recursive하게 적용한다고 할 수 있다.

point set의 overlapping partitioning 방법도 주된 문제이다. 일단, 각 partition은 Euclidean space에서 중심 위치와 scale을 parameter로 가지는 neighborhood ball으로 정의한다. 또, 모든 set을 균일하게 다루기 위해 farthest point smapling (FPS)<sup>[2](#footnote_2)</sup> 알고리즘을 이용해 중심점을 선택한다. 

PointNet++의 주된 contribution은 다음과 같다.
- 여러 scale 에서 neighborhoods를 활용해 robustnessd와 detail capture를 달성하였다.
- 학습시키는 동안 random input dropout을 이용해 network가 찾아진 pattern들에 대해 adaptive하게 weight를 적용하고, input data에 따라 multi-scale feature들을 결합하는 방법을 학습하도록 하였다.

## 2. Problem Statement
$\mathcal{X}=(M,d)$ 가 Euclidean space $\mathbb R^n$에서 상속된 discrete metric space라고 가정한다. 이때, $M\subseteq \mathbb R^n$ 은 point set이고, $d$는 distance metric이다. 또, Euclidean space $M$는 밀도가 균일하지 않은 부분도 있다. 이러한 $\mathcal{X}$를 입력으로 받고 $\mathcal{X}$에 대한 semantic interest의 정보를 생성하는 set function $f$를 생성하도록 학습시킨다. 이 $f$는 $\mathcal{X}$에 label을 할당하는 classification 함수나 $M$의 각 멤버에 point 별 label을 할당하는 segmentation 함수가 될 수 있다.

## 3. Method

![image](https://user-images.githubusercontent.com/79836443/135207876-43abf960-6fd9-4205-9eb1-e45c67ad0028.png){:.align-center}
<center><span style="color:rgb(150, 150, 150)">hierarchical feature learning 구조</span></center>

### 3.2 Hierarchical Point Set Feature Learning
PointNet++의 hierarchical 구조는 여러개의 *set abstraction* level로 구성된다. 각 level에서는 points set이 처리되고 추상화되어 더 적은 수의 element를 가지는 새로운 set이 생성된다. set abstraction level은 다음 3가지 key layer로 구성되며, 자세한 설명은 뒤에 다시 한다.
- *Sampling layer* : local region의 centroid를찾는다.
-  *Grouping layer* : centroid 주위의 "neighboring" point들을 찾아 local region sets를 구성한다.
-  *PoinNet layer* : mini-PointNet을 사용해서 local region pattern들을 feature vector로 encoding 한다.

set abstraction level은  input으로 $N\times (d+C)$ ($N$ : point 개수, $d$ : coordinates dimension, $C$ : point feature dimension) matrix를 받고  output으로 $N'\times (d+C')$ ($N'$ : subsampling된 point 개수, $C'$ : local context를 요약한 feature vector dimensioin)  matrix를 출력한다. 

#### Sampling layer
input points $\lbrace x_{1}, x_{2}, ..., x_{n} \rbrace$가 주어질 때, iterative farthest poin sampling (FPS)을 사용하여 input의 부분집합 $\lbrace x_{i_{1}}, x_{i_{2}}, ..., x_{i_{m}} \rbrace$를 생성한다. FPS는 이전까지 sampling된 point들에서 가장 먼 point를 선택하는 방법이므로 $x_{i_{j}}$는 $\lbrace x_{i_{1}}, x_{i_{2}}, ..., x_{i_{j-1}} \rbrace$의 point들, 즉 이전까지 sampling된 point들에서 가장 먼 point이다. 이 방법은 random sampling과 비교했을때 더 우수한 결과를 얻을 수 있었다. 데이터 분포가 균일하지 않기 때문에 이러한 방식으로 데이터에 의존하여 receptive field를 생성한다.  

#### Grouping layer
이 layer는 input으로 $N\times (d+C)$ size의 point set와 $N'\times d$ size의 centriods set coordinates를 받는다. output은 $N'\times K\times (d+C)$ size의 point sets의 그룹들이다. 이 각 그룹은 local region에 대응되고 $K$는 centriod points의 neighborhood에 있는 point 개수이다. 여기서 $K$는 그룹에 따라 다르지만 다음의 PointNet layer가 point의 수를 flexible하게 고정된 길이의 local region feature vector로 변환해준다.

ball query는 query point에서 radius 내에 있는 모든 point를 찾는다. 이 방법은 고정된 개수의 주위 point를 찾는 $K$ nearest neighbor (kNN)과 비교했을때, 영역의 크기가 고정되어있기 때문에 공간 전반에 걸쳐 local region feature가 더 generalize될 수 있다.

#### PointNet layer
input은$N'\times K\times (d+C)$의 크기를 가지는 $N'$개의 local region이다. output의 각 local region은 그 영역의 centriod 및 centroid의 주변을 encoding하는 local feature에 의해 추상화 된다. 그 크기는 $N'\times (d+C')$이다.

local 영역에서 point의 좌표는 $x_i^{(j)} = x_i^{(j)} - \hat{x}^{(j)}$ ($i=1, ..., K, j=1, ..., d, \hat{x}$ : centroid의 좌표)에 의해  centriod과의 상대적인 좌표로 바꿔 사용한다. 이 상대적인 좌표를 이용해 local 영역에 있는 point간의 위치적 관계를 담을 수 있다.






<br>
<br>

__ __ __ __ __ __ __

<a name="footnote_1">1</a>: 세분화된 것을 의미하는 말로 여기서는 작은 패턴들을 의미한다. 반대말로 coarse-grained가 있다.<br>
<a name="footnote_2">2</a>: 서로 간의 거리가 가장 먼 점들을 선택하는 과정
