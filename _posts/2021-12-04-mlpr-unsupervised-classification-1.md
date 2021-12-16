---
title: "[MLPR #] Unsupervised Classification 1 (fisher)"
categories:
- MLPR
use_math: true
toc: true
---

Supervised 에서는 data에 label도 있고 전체 class의 갯수를 알 수 있기때문에 data로부터 그 분포를 추정할 수 있었다. unsupervised classification은 이러한 정보가 없을 때 data를 구분하는 방법이다. 
Unknown targets를 분류하는 방법에는 다양한 방법이 있는데 다음과 같은 방법이 있다.
1. Criterion function 방법 : Sum of squared error, Min. variance, Scatter matrices, Optimization problem
2. Heuristic 방법 : Chain, Hierarchical, Min. spanning tree
3. Unmixing 방법 : Gaussian mixture, PCA, ICA

앞으로 다음 순서로 진행하며 unsupervised classification 방법에 대해 알아본다.
- **Similarity and Similarity Measures**
- **Chain Method of Clustering**
- **Clustering Criterion Functions**
- Iterative Optimization
- Clustering procedure – basic min. squared error
- K-means Clustering
- Hierarchical Clustering

여기까지는 Non-statistical한 방법이고, 이후 두 주제는 statistical한 방법이다.
- Mixture Densities: Gaussian Mixtures
- Component Analysis: PCA, ICA

## Similarity and Similarity Measures
![image](https://user-images.githubusercontent.com/79836443/146315768-90f03044-8073-4775-8140-9664492d7648.png){: width="40%" height="40%"}{:.align-center}

위 이미지는 2차 statistical(평균과 공분산)이 모두 같지만 smaple의 분포는 모두 다르다. 이를 분포의 혼합으로 만들어진다고 가정하면 근사화할 수 있겠지만 쉬운 작업은 아니다. 이러한 이유로 clustering을 사용하곤 한다. 그러나 clustering된 sample간의 유사성이나 분류를 평가하기 위해서는 측정 방법이 필요하다.

클러스터링 결과를 Euclidean distance를 이용하여 측정하게 된다면 feature space에서의 translationis이나 rotation과 같은 변환에는 결과에 차이가 없지만, 일반적으로 scaling과 같은 선형 변환에 따라 결과가 변형되기 때문에 조심해야한다.

다른 similarity  측정 방법
- **Angular Similarity**<br>
nonmetric similarity function으로 $S(x_i,x_j)=x_i^Tx_j/\left \|x_i  \right \|\left \|x_j \right \|$ (normalized 내적, $x_i$와 $x_j$사이 각의 코사인 값). 두 vector 사이의 각이 의미가 있을때 유용하다.
- **Binary Similarity**<br>
$S(x_i,x_j)=x_i^Tx_i+x_j^Tx_j-x_i^Tx_j$로 계산된다. $x_i^Tx_j$는 공통으로 나타나는 feature의 개수로 결국 $S$는공통으로 나타내는 feature의 비율이다.

## Chain Method of Clustering
1.  첫번째 sample을 cluster #1 ($S_1$)으로 할당한다.
2.  다음 sample과 지금 sample간의 거리 $d$를 계산하고  $d_0$(미리 정해둔 threshold)와 비교한다. 만약 $d<d_0$이면 sample을 같은 cluster로 분류하고, 반대의 경우 새로운 cluster를 생성한다.
3.  다음 sample도 존재하는 모든 cluster와의 거리 $d$를 계산하고 최소값을 찾는다. 만약 $d_{min}<d_{0}$이면 해당 cluster로 분류하고 반대의 경우 이전과 같이 새로운 cluster를 생성한다.

이때, $d$는 해당 cluster의 첫번째 sample과의 거리로 계산하거나 cluster의 sample mean과의 거리로 계산한다. 그러나 이 방법은 $d_0$와 sample의 차수에 sensitive하다는 문제점이 있다.

## Clustering Criterion Functions
Clustering을 수행하고 나면 clustering이 잘 되었는지 확인해야 한다. 그래서 criterion fucntion을 사용해 이 function을 최소화하거나 최대화하는 값을 찾아 좋은 clustering을 선택한다. 앞으로 사용할 표기를 먼저 정의한다.

$J$개의 sample $x_1, ..., x_j$의 집합 $z$를 $K$개의 subset $z_1, z_2, ..., z_k$로 나눈다. 이 $K$개의 집합들의 $J$개의 sample들의 cluster quality를 평가한다.
### 1. Sum of Squared Error Criterion
가장 간단하면서도 널리 쓰이는 방법으로 cluster의 평균과 그 sample들간의 거리의 차의 제곱을 모두 합한다. 

$$J_e=\sum^K_{i=1}{\sum_{x_j\in z_i}\left \| x_j-m_i \right \|^2}$$

$m_i$는 $z_i$의 sample들의 평균. Sum square error는 $J_e$값이 최소가 될때 최소의 variance를 가지므로 이때 cloud가 compact하고 각각 잘 분리된 좋은 cluster라고 이야기 할 수 있다.

![image](https://user-images.githubusercontent.com/79836443/146320721-d69de763-7cc4-4a4f-97d9-7949a3bf2128.png){: width="40%" height="40%"}{:.align-center}

그러나 위 이미지와 같이 분포가 다른 경우 잘못된 clustering을 수행할 수도 있다.

### 2. Minimum-Variance Criteria
이 방법은 cluster의 모든 sample들간의 평균 제곱 거리를 이용한다.

$$J_e=\frac{1}{2}\sum^K_{i=1}J_i\bar{s}_ i$$

$$\bar{s}_ i=\frac{1}{J_i^2}\sum_{x_j\in z_i}{\sum_{x_l\in z_i}\left \| x_j-x_l \right \|^2}$$

$\bar{s}_ i$의 다른 방법으로는  $\left \| x_j-x_l \right \|^2$ 대신 $s(x_j,x_l)$($s$는 similarity function)을 사용하거나 전체 합 대신 최소값을 사용하여 $\bar{s}_ i=\min_{x_j,x_l\in z_i}\[s(x_j,x_l)\]$을 사용하는 방법도 있다.

### 3. Scattering Criteria
Scatter matrix로부터 sample의 scattering을 측정한다. 여기에 사용되는 mean vector와 scatter matrix에는 다음이 있다.

![image](https://user-images.githubusercontent.com/79836443/146324824-0ddcbd07-8698-4076-9c66-836647f71f62.png){: width="90%" height="90%"}{:.align-center}

전체 scatter matrix$S_T$는 within-cluster(클러스터 내) scatter matrix$S_W$와 Between-cluster(클러스터 간) scatter matrix$S_B$의 합으로 이루어진다. Scatter의 양에 관해 더 정확하게 하기위해 scatter matrix의 크기의 Scalar 측정을 필요로 한다. 이 측정에는 3가지 기준이 있다.

- **Trace 기준**<br>
대략적으로 trace는 좌표 방향들에서 분산들의 합의 비례하기 대문에 scattering 반경의 제곱을 측정한다.

$$Tr\{S_W\}=\sum^K_{i=1}{Tr\{S_i\}}=\sum^K_{i=1}\sum_{x_j\in z_i}{\left \| x_j-m_i \right \|^2}$$

$$Tr\{S_B\}=\sum^K_{i=1}J_i{\left \| m_i-m \right \|^2}$$

- **Determinant 기준**<br>
Determinant는 main axis들의 방향에서 분산들의 곱에 비례하므로, scattering volume의 제곱을 측정한다.

$$J_d=\left |S_W\right |=\sum^K_{i=1}{\left |S_i\right |}$$

- **Invariant 기준 (불변적 기준)**<br>
$\lambda_n$는 $S_W^{-1}S_B$의 n번째 eigenvalue이고 이는 lineartransformation에 불변하다.

$$J_f=Tr\{S_W^{-1}S_B\}=\sum^N_{n=1}{\lambda_n}$$

## Fisher's Linear Discriminent
