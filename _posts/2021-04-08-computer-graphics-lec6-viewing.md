---
title: "[Computer Graphics] Lec6 viewing"
use_math: true
categories:
- Graphics
---

## Normalization
통일성을 주기 위해 각각 다른 projection 종류에 맞는 projection matrix를 system에서 모두 수행하기 보다 projection은 항상 orthogonal projection을 하도록 만든다. 이 orthogonal projection을 했을 때 원하는 projection의 모습을 나타낼 수 있도록 data의 형태를 바꿔준다. 
#### Pipeline View
1. modelview transformation
2. projection transformation
3. perspective division
4. clipping
5. projection

이 5단계 중 앞의 1~3단계에서 각각의 projection 종류에 맞는 view가 될 수 있도록  data를 바꿔서 나타내고 5단계에서 항상 orthogonal projection을 수행하도록 한다.

#### Orthogonal Normalization
이를 위해 4D homogeneous coordinate를 사용해야 한다. 우리는 Normalization을 통해 clip 영역은 항상 단순한 육면체 형태로만 나타내면 된다. glOrtho(left,right,bottom,top,near,far) 와 같이 정해진 영역을 모두 clipping 하지 않고 이를 가로, 세로, 높이 1의 정육면체에 맞게 scaling하여 이 작은 정육면체의 공간만 projection 한다.

이 scaling을 수행하기 위해 다음 2단계를 수행한다.
1. 입력된 영역의 중점을 원점으로 이동한다. 
$$T(-\frac{left+right}{2}, -\frac{bottom+top}{2}, -\frac{near+far}{2})$$
2. 2의 길이를 가지도록 scaling 한다.  
$S(\frac{2}{left+right}, -\frac{2}{bottom+top}, -\frac{2}{near+far})$$

이 2 단계는 다음과 같은 matrix로 표현된다.
$$P=ST=\begin{bmatrix}
\frac{2}{right-left} & 0 & 0 & -\frac{right+left}{right-left}\\ 
0 & \frac{2}{top-bottom} & 0 & -\frac{top+bottom}{top-bottom}\\ 
0 & 0 & \frac{2}{near-far} & -\frac{far+near}{far-near}\\ 
0 & 0 & 0 & 1
\end{bmatrix}$$

camera의 center가 z=0에 있다는 가정 하에 $$M_{orth}=\begin{bmatrix}
1 & 0 & 0 & 0\\ 
0 & 1 & 0 & 0\\ 
0 & 0 & 0 & 0\\ 
0 & 0 & 0 & 1
\end{bmatrix}$$인 orthogonal projection matrix를 이용하여 최종 projection matrix는 $P=M_{orth}ST$의 matrix로  표현된다. 이 matrix를 수행하면 orthogonal matrix이므로 한 평면 위에 점들이 존재하게 된다.

#### Oblique Projection
![image](https://user-images.githubusercontent.com/79836443/114040814-f36ac100-98be-11eb-8178-526dad4a8858.png)

위와 같은 형태로 cube를 보기 위해 Oblique Projection을 수행하기 위해서는 Shear + Orthogonal projection을 수행해야 한다. 일반적인 cube는 위의 모양처럼 projection 될 수 없기 때문에 위와 같은 모양을 나타내기 위해서는 x방향과 y방향으로 shearing을 수행한다.
