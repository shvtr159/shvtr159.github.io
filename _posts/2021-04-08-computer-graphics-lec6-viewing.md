---
title: "[Computer Graphics #5-2] Viewing - Orthogonal Projection"
use_math: true
categories:
- Graphics
---

## Normalization
통일성을 주기 위해 각각 다른 projection 종류에 맞는 projection matrix를 system에서 모두 수행하기보다 projection은 항상 orthogonal projection을 하도록 만든다. 이 orthogonal projection을 했을 때 원하는 projection의 모습을 나타낼 수 있도록 data의 형태를 바꿔준다. 
### Pipeline View
1. modelview transformation
2. projection transformation
3. perspective division
4. clipping
5. projection

이 5단계 중 앞의 1~3단계에서 각각의 projection 종류에 맞는 view가 될 수 있도록  data를 바꿔서 나타내고 5단계에서 항상 orthogonal projection을 수행하도록 한다.

### Orthogonal Normalization
이를 위해 4D homogeneous coordinate를 사용해야 한다. 우리는 Normalization을 통해 clip 영역은 항상 단순한 육면체 형태로만 나타내면 된다. OpenGL의 함수 glOrtho(left,right,bottom,top,near,far) 와 같이 정해진 영역을 모두 clipping 하지 않고 이를 가로, 세로, 높이 1의 정육면체에 맞게 scaling하여 이 작은 정육면체의 공간만 projection 한다.

이 scaling을 수행하기 위해 다음 두단계를 수행한다.
1. 입력된 영역의 중점을 원점으로 이동한다.  
$$T(-\frac{left+right}{2}, -\frac{bottom+top}{2}, -\frac{near+far}{2})$$
2. 2의 길이를 가지도록 scaling 한다.  
$$S(\frac{2}{left+right}, -\frac{2}{bottom+top}, -\frac{2}{near+far})$$

이 2 단계는 다음과 같은 matrix로 표현된다.
$$P=ST=\begin{bmatrix}
\frac{2}{right-left} & 0 & 0 & -\frac{right+left}{right-left}\\ 
0 & \frac{2}{top-bottom} & 0 & -\frac{top+bottom}{top-bottom}\\ 
0 & 0 & \frac{2}{near-far} & -\frac{far+near}{far-near}\\ 
0 & 0 & 0 & 1
\end{bmatrix}$$

camera의 center가 z=0에 있다는 가정하에 $$M_{orth}=\begin{bmatrix}
1 & 0 & 0 & 0\\ 
0 & 1 & 0 & 0\\ 
0 & 0 & 0 & 0\\ 
0 & 0 & 0 & 1
\end{bmatrix}$$인 orthogonal projection matrix를 이용하여 최종 projection matrix는 $P=M_{orth}ST$ 의 matrix로  표현된다. 이 matrix를 수행하면 orthogonal matrix이므로 한 평면 위에 점들이 존재하게 된다.

### Oblique Projection
![image](https://user-images.githubusercontent.com/79836443/114040814-f36ac100-98be-11eb-8178-526dad4a8858.png){: .align-center}{: .image-caption}

위와 같은 형태로 cube를 보기 위해 Oblique Projection을 수행하기 위해서는 Shear + Orthogonal projection을 수행해야 한다. 일반적인 cube는 위의 모양처럼 projection 될 수 없어서 위와 같은 모양을 나타내기 위해서는 x방향과 y방향으로 shearing을 수행한다. 이 shearing matrix를 $H(\Theta ,\Phi )$라 한다면 Projection matrix는 $P=M_{orth}H(\Theta ,\Phi )$로 나타나고 General case, 즉 shearing 한 후 orthogonal normalize projection까지 수행하는 matrix는 $$P=M_{orth}STH(\Theta ,\Phi )$$로 나타낼 수 있다.

## Perspective
### clipping
원하는 perspective의 영역만을 보기 위해 clipping을 수행한다. 그러나 clipping을 하기 전에 orthogonal projection을 위한 translation, scaling 등을 한다면 원하는 모양을 맞추기 어려워진다. 즉 실제로는 transformation을 수행한 뒤 clipping을 수행하는 것이 더 일반적이다.
### Simple Perspective
![simple perspective](https://user-images.githubusercontent.com/79836443/114056780-f8367180-98cc-11eb-926b-0609c82c53a9.png){: .align-center}{: width="60%" height="60%"}
위와 같이 perspective를 하려는 영역의 frustum이 있을 때, 가까이 있는 물체의 크기는 크고 멀리 있는 물체의 크기는 작게 보인다. 이를 orthogonal projection에 맞게 하기 위해서는 실제 물체의 크기를 변형해야만 한다. 또, frustum은 정육면체 모양으로 평행한 모양이 아니기 때문에 이 영역 또한 정육면체 모양으로 변형시켜야 한다. 그 결과 위에서 봤을 때 실제로 정사각형이었던 object는 사다리꼴의 모양으로 변형되게 된다. 
## Hidden-Surface Removal
rendering을 하는 과정에서 보이지 않는 부분의 정보는 필요하지 않다. 또, 만약 이 보이지 않는 부분의 data가 보이는 부분의 data보다 먼저 rendering 된다면 보이지 않아야 할 부분의 data가 덮어씌워 지게 되면서 처음 원했던 형태와 다른 형태로 rendering 될 수 있다. 이를 위해 depth test를 해서 가까운 부분에 있는 data만을 rendering 하기도 한다. 그러나 이 방법을 사용하지 않고 만약 data 안에서 보이지 않는 부분의 data를 없애준다면 계산량을 크게 줄일 수 있다. 이 이점을 얻기 위해 hidden-surface removal을 수행한다. 카메라의 시점이 결정되는 순간 가려질 것으로 예상되는 data를 잘라내고 보이는 부분의 data만을 redering  하는 것이다.

그러나 normalization을 하는 과정에서 이를 조심해야 하는 부분이 있다. normalization을 거치면서 hidden surface가 더 이상 hidden surface가 아니게 되는 경우도 있기 때문이다. 그렇기 때문에 상황에 따라서는 transform을 수행한 이후에 hidden-surface removal을 수행해야 한다.

## OpenGL
이전에 있던 gluPerspective같은 경우는 x, y, z의 field of view를 주기 때문에 symmetric하다. 하지만 glFrustum은 min, max값을 설정하기 때문에 unsymmetric할 수 있다. 이 unsymmetric한 경우는 normalize 하면서 왜곡이 된 상태로 orthogonal projection이 된다.

그러므로 gluPerspective, glFrustum 큰 차이가 없어 보이지만 위와 같이 왜곡이 필요한 경우에는 glFrustum을 사용해야만 한다.
