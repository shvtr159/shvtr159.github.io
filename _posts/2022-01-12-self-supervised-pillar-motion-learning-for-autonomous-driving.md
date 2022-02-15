---
title: "[논문 리뷰] Self-Supervised Pillar Motion Learning for Autonomous Driving"
categories:
- 논문
use_math: true
toc: true
---

본 논문은 CVPR 2021에 게재된 논문으로  CVPR 2019에 게재된 PointPillars라는 논문의 아이디어를 기반으로 Self-Supervised learning을 수행하였다. BEV로 표현하는 방법의 장점을 이용하기 위해 raw point cloud를 pillar로 organize한다. 이후 각각의 pillar 속도인 pillar motion을 예측한다. 이때, LiDAR의 sparse scan 특성 상 data가 조밀하지 않아 camera image로부터 얻어진 optical flow를 함께 사용한다.  이 구조는 다음과 같은 상호작용을 하며 학습한다.
1. Point cloud는 optical flow에서 ego-motion을 제외하는데 도움을 준다.
2. Image motion은 pillar motion을 학습하는데 auxiliary(보조) regularization를 제공한다.
3. back-project된 optical flow에 의해 생성된 probabilistic motion masking은 point cloud에서 구조적 일관성을 유지하도록 한다.

자세한 내용은 이 논문에서 설정한 Loss들을 확인해보면 알수 있다. 

![image](https://user-images.githubusercontent.com/79836443/149094364-1b9ab86b-f4f0-4043-aa93-62bdae0e09bf.png){:.align-center}
<center><span style="color:rgb(150, 150, 150)">pillar motion estimation을 위해 제안된 self-supervised learning framework의 schematic overview</span></center>
## Method
### Problem Formulation
시간 $t$에서의 point cloud와 paired camera images를 $\mathcal{P}_ t = {\lbrace P_ i^t \rbrace}^{N_t}_ {i=1}$, $\mathcal{I}_ t = {\lbrace P_ i^t \rbrace}^{N_c}_ {i=1}$로 나타낸다($P_ i^t$ : point, $N_t$ : received point의 수, $I_ i^t$ : image, $N_c$ : 차에 장착된 camera의 수).

다시 $\mathcal{P}_ t$는 겹치지 않는 pillar ${\lbrace \rho_ i^t \rbrace}^{N_p}_ {i=1}$로 이산화(discretized)된다($\rho_ i^t$ : pillar index, $N_p$ : pillar의 수). Pillar motion field는 $\mathcal{M}_ t = {\lbrace M_ i^t \rbrace}^{N_p}_ {i=1}$로 나타내면 다음 time에서의 각 pillar 위치는 다음과 같이 표현할 수 있다 : $\rho_ i^{
\sim t+1}=M_ i^t(\rho_i^t),\;M_ i^t\in\mathbb{R}^2$.

### LiDAR  based Structural Consistency
위에서 정의한 pillar motion $\mathcal{M}_ t$에 따라 각 pillar $\rho_i^t$의 motion vector $M_i^t$를 pillar 내 모든 point에 할당하여 point 별 motion을 얻을 수 있고, 수직 방향의 motion은 0으로 설정한다. 이렇게 point 별 motion을 얻으면 origin point cloud $\mathcal{P}_ t$로부터 다음 timestamp의 예상 point cloud인 $\widetilde{\mathcal{P}}_ {t+1}$를 얻을 수 있다. 

이 transformed point cloud $\widetilde{\mathcal{P}}_ {t+1}$와 실제 point cloud $\mathcal{P}_ {t+1}$간의 structural consistency를 pillar motion learning을 위한 free supervision으로 사용한다. 이를 나타내는 Loss는 다음과 같이 표현된다.

![image](https://user-images.githubusercontent.com/79836443/149133556-f71835ac-7fe7-4757-8f62-dad0b7bc3ed5.png){:.align-center}{: width="70%" height="70%"}

간단히 이야기하면, tramsform된 point들과 실제 point들 간에 한 point에서 가장 가까운 point와의 거리를 Loss로 사용한다고 할 수 있다. 그러나 LiDAR로 얻는 point cloud의 특성 상 $t$에서 얻은 point가 정확히 이동하여 $t+1$에 똑같이 존재할 수 없다. 때문에 이것만 사용하면 noise의 영향이 매우 크다.

### Cross-Sensor Motion Regularization
LiDAR의 data가 sparse한것에 비해 카메라 image는 point cloud보다 dense하고 구분하기 쉬운 외관을 얻을 수 있다. 이 장점을 활용하기 위해 image도 같이 사용한다. 그 방법은 pillar motion을 projection하여 얻은 scene flow와 image로부터 얻은 optical flow를 비교하는 것이다.

그러나 optical flow는 ego-motion, 즉 자기 자신이 움직이는것 때문에 관측하려는 물체의 실제 motion이 달라지게 된다. 때문에$I^t$와 $I^{t+1}$로 계산되는 $F^t$의 $(u,v)$픽셀에서의 optical flow는 다음과 같이 나타난다.

![image](https://user-images.githubusercontent.com/79836443/149141628-e5ce6a96-162d-4d41-bdfc-d4e66b7d103f.png){:.align-center}{: width="60%" height="60%"}

여기서, $I^t$와 관련된 point cloud $\mathcal{P}_ t$의 point $P^t_i$를 projection 했을 때 camera image에서의 위치는 다음과 같이 나타낼 수 있다.

![image](https://user-images.githubusercontent.com/79836443/149275347-bb378ace-973a-4922-91ea-3264c15c9e40.png){:.align-center}{: width="45%" height="45%"}

$K$는 camera intrinsic parameter이고, $T_{L\to C}$는 LiDAR와 camera간의 상대적 pose이다. 이를 이용하면 ego-motion에 의해 유도된 optical flow를 다음과 같이 계산할 수 있다.

![image](https://user-images.githubusercontent.com/79836443/149141290-141ad651-3805-4ca8-98b1-59b7103c91a7.png){:.align-center}{: width="75%" height="75%"}

이때 $T_{t \to t+1}$은 ego-vehicle의 pose 변화로, ego-vehicle의 움직이 포함된 optical flow에서 이를 고려하지 않은 optical flow를 빼줌으로써 순수하게 ego-vehicle의 motion만 계산하는 것이다. (2)번 식과 (4)번식을 합치면 순수한 $F_{obj}^t$만을 얻을 수 있다. 유의해야할 것은 정확한 $F_{ego}^t$를 계산하기 위해 projected point와 대응되는 pixel에서만 $F_{obj}^t$를 계산한다.

이제 pillar 별 motion vector $M^t_i$를 3번 식을 이용해 대응되는 image로 projection하면 projected optical flow인 $\widetilde{\mathcal{P}}^t(u_i,v_i)$를 얻을 수 있다. 이렇게 얻어진 2가지 optical flow의 차이를 다음과 같은 식으로 표현하고, Loss로 사용한다.

![image](https://user-images.githubusercontent.com/79836443/149146801-fc942fd6-fbbb-4e5b-8487-d47da4288e82.png){:.align-center}{: width="70%" height="70%"}

이 loss는 이전의 structural consistency를 보조하고, sparse한 point cloud의 ambiguity를 완화한다. optical flow estimation과 관련하여, 전체 framework를 통합하여 self-supervised learning을 수행할 수 있도록 unsupervised 방법<sup>[1](#footnote_1)</sup>을 사용해 model을 training 할 수 있다.

### Probabilistic Motion Masking
ego-motion을 제외하고 남은 object motion에서 멈춰있는 물체가 noise로 인해 움직이는것으로 인식되어 똑같이 weight를 가지게 되면 제대로 된 motion을 예측하기 어렵다. 때문에 여기서는 다음 식과 같은 확률적 motion masking을 이용해 해당 object가 static할 확률을 계산하여 weight를 조절할 수 있도록 하였다.

![image](https://user-images.githubusercontent.com/79836443/149274288-d8078642-1a3d-4b3e-9a3c-1e197ca4ec90.png){:.align-center}{: width="65%" height="65%"}

### Optimization
optical flow 추정을 위한 spatical smoothness constraint와 유사하게 pillar motion learning에서도 유사한 local smoothness loss를 사용한다. spatical smoothness constraint란 인접한 pixel은 일반적으로 기준 pixel과 유사한 움직임을 가질것이라는 것에서 비롯된 제한이다.

![image](https://user-images.githubusercontent.com/79836443/149275784-111c8736-9b13-442f-9d72-c909cf1fdb38.png){:.align-center}{: width="75%" height="75%"}

$\mathcal{M}^x_t$와 $\mathcal{M}^y_t$는 예측한 pillar motion field $\mathcal{M}_ t$의 $x, y$ 성분이고, $\bigtriangledown_x, \bigtriangledown_y$는 $x, y$방향의 기울기이다. 이 Loss는 동일한 물체에 속한 pillar가 유사한 움직임을 가지도록 하는데 도움을 준다.

### Total Loss
total loss는 위에서 나온 3개의 loss term의 weighted sum으로 계산한다. $\lambda$는 balancing coefficient이다.

![image](https://user-images.githubusercontent.com/79836443/149296453-b4ff3f48-0adc-4d7a-b451-c8e4c2f5f41d.png){:.align-center}{: width="75%" height="75%"}


<br><br>

__ __ __ __ __ __ __
<a name="footnote_1">1</a>: Yang Wang, Yi Yang, Zhenheng Yang, Liang Zhao, Peng Wang, and Wei Xu. Occlusion aware unsupervised learning of optical flow. In CVPR, 2018.
