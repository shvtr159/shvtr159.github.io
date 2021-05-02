---
title: "[Computer Graphics #3] Geometric Objects"
categories:
- Graphics
use_math: true
---

다양한 model을 만들기 위해서는 그 model을 구성하는 다양한 object에 대해 알아야 한다. 이러한 object들과 그 정의를 알아본다.

## Scalar, Points, and Vectors
- **Scalar**
	-  real number로 value 하나를 가진다.
	-  ex) point간 거리(distance)나 길이 등
-  **Points**
	-  공간상에서의 절대적인 위치, 지점을 나타낸다. 그래픽스에서는 주로 vertex로 나타난다.
- **Vectors**
	- 방향(direction)과 크기(magnitude)를 가지는 quantity.
	- directed line segment. 즉 시작과 끝이 있다. Point와 착각하기 쉽지만 구별해야만 한다.

### space
- **Vector space**
	- 구성 : Vector, Scalar
	- operation : vector와 vector의 합, vector와 scalar의 곱
- **Affine space**
	- 구성 : Vector, Scalar 그리고 Point
	- operation : vector와 vector의 합, vector와 scalar의 곱 + vector와 point의 합, point와 point의 차 (point-point 합도 가능하지만 물리적 의미를 갖지 않는다)
- **Euclidean space**
	- 우리가 알고있는 2,3차원의 일반적인 space. 2차원인 경우 x와 y의 값을 이용해 크기와 거리를 나타낼 수 있다.

### Operations
- magnitude
	- vector의 크기 : real number. $\left | v \right |$
	- vector와 scalar의 곱 $\left | \alpha v \right | = \left | \alpha \right |\left | v \right |$
	- zero magnitude : 0 vector

![image](https://user-images.githubusercontent.com/79836443/116809731-81626080-ab7a-11eb-9c04-e858a643b916.png){:.align-center}

- 2 point의 차(point-point subtraction) = vector
	- 두 point를 시작점과 종점으로 가지는 vector를 구할 수 있다.
	- $v=P-Q$
- point에 vector를 더하기
	- 해당 point에서 vector만큼 이동하면 나오는 point가 된다.
	- %P = v + Q%
- vector-vector 합
	- 두 vector의 합으로 새로운 vector가 정의

## Line
 line은 무한히 많은 점들의 집합으로 정의할 수 있다. 이 정의를 Point와 vector를 이용하여 나타낼 수 있다.
 $P(\alpha)=P_{0}+\alpha d$
 ![image](https://user-images.githubusercontent.com/79836443/116809854-53c9e700-ab7b-11eb-9da6-12c4db1c3fd8.png){:.align-center}
 즉 알파라는 점들의 집합으로 만들어지는 line은 시작점 $P_{0}$로부터 d라는 vector에 서로 다른 알파값을 곱해서 나타낼 수 있다.
 
 그렇다면 **Affine Sums**에 대하서 알아보자. Affine sum은 Affine space에서 addition을 수행하는것을 의미한다. 위에서 보았듯이 affine space에서 vector-vector 합, vector-scalar 곱, vector-point 합 의 3가지 operation은 잘 정의되어있다. 그러나 두 point의 합, point-scalar 곱은 정의되어있지 않다. 그러나 특수한 경우에서는 point의 합이 정의되는 경우가 있는데 이 경우는 다음과 같다.
 
![image](https://user-images.githubusercontent.com/79836443/116810013-3ea18800-ab7c-11eb-8448-ef1420c0bb81.png){:.align-center}{: width="70%" height="70%"}

line의 정의와 vector의 operation을 이용하면 벡터 d 는 point R과 Q의 차로 나타낼 수 있다. 이때 알파의 값이 0~1 사이의 값일 경우 식은 다음과 같이 변경된다.

<center>$$P(\alpha)=Q+\alpha (R-Q) = \alpha R + (1-\alpha) Q$$ </center>
<center>$$P = \alpha_{1}R + \alpha_{2}Q$$</center>

즉 위와 같은 상황에서 직선 위에 점 2개가 있다면 point와 point의 합으로 내분점, 외분점을 표시할 수 있다.

### convexity
어떠한 면, 물체가 공과 같이 볼록하게 생긴 정도를 convexity라고 한다. 이 convexity는 나중에 rendering을 할 때 convexity가 유지되느냐 안되느냐에 따라서 occlusion을 판별하는 등 여러 상황에 중요하게 쓰인다. 정의를 보면 convex는 두 점을 연결하는 선분 위에 있는 모든 점 또한 객체 내부에 있을 때를 의미한다. 이를 Affine sum을 이용해서 나타내면 위에서 본 $$P = \alpha_{1}R + \alpha_{2}Q$$ 식과 같이 나타낼 수 있다.

** 이를 2차원으로 확장시키면 어떤 물체 내부의 모든 점 P를 모서리의 점들로 나타낼 수 있다면  convex하다고 할 수 있다.** 이 식도 Affine sum으로 나타내면 다음과 같다.
![image](https://user-images.githubusercontent.com/79836443/116810639-db195980-ab7f-11eb-816a-489bebd3106e.png){:.align-center}

이는 3차원으로 확장시켜서도 동일하게 사용할 수 있다.

### Vector Product
#### Dot Product (Inner product, 내적)
<center>$u\cdot v$</center>
- 두 vector가 수직할 때 : $u\cdot v=0$
- vector의 크기 : $\left | u \right |^{2} = u\cdot u$
- 두 vector가 이루는 각 : $\cos\theta = \frac{u\cdot v}{\left | u \right |\left | v \right |}$
- 정사영(orthogonal projection) : $\left | v \right |\cos\theta = \frac{u\cdot v}{\left | u \right |}$

#### Cross Product (Outer product, 외적)
<center>$u\times v = n$</center>
![image](https://user-images.githubusercontent.com/79836443/116811745-dbb4ee80-ab85-11eb-90de-a57d0207ee19.png){:.align-center}

두 vector에 모두 수직한 vector를 만들어 낸다.
- vector의 크기 : \left | \sin\theta \right | = \frac{\left | u\times v\right | }{\left | u \right |\left | v \right |}

이 모두 right-handed coordinates system에서 표현한다. 이는 오른손의 엄지손가락을 z의 방향으로 표시한다.
![image](https://user-images.githubusercontent.com/79836443/116811854-672e7f80-ab86-11eb-937f-59377d7d578d.png){:.align-center}

## Plane
이제 점, 선을 알아보았으니 면에 대해서 알아본다. 면 또한 위에서 사용한것을 이용하여 나타낼 수 있다. 그림을 보고 이해해 보자.

![image](https://user-images.githubusercontent.com/79836443/116814066-d2ca1a00-ab91-11eb-8463-90632a5efe05.png){:.align-center}

- 일단, P와 Q의 line 위에 점 S 는 $S(\alpha) = \alpha P + (1-\alpha) Q$로 나타낼 수 있다.
- 이 S와 R 을 잇는 line위의 점 T는 $T(\beta) = \beta S + (1-\beta) R$로 나타낼 수 있다.
- S는 첫번째 식에 의해 P와 Q에 대한 식으로 다시 나타낼 수 있고, 이 식은 다음과 같이 정리된다.
- $$T(\alpha, \beta) = P + \beta (1-\alpha)(Q-P) + (1-\beta)(R-P)$$

즉, $\alpha, \beta$값의 변화에 따라 점 S, T가 움직이며 삼각형 내부의 모든 점을 표현할 수 있다. 식을 한번 더 정리하면, Q-P와 R-P는 서로 다른 vector u, v로 나타낼 수 있으므로 다음과 같이 표현된다.
T(\alpha, \beta) = P_{0} + \alpha u+ \beta v \quad(0\leq \alpha, \beta \leq 1)

평면은 기준점에서부터 나가는 2개의 vector를 이용해 저 점들이 정의되고, 이 점들이 정의되면 평면을 나타낼 수 있게 되는 것이다. 이렇게 만들어지는 triangle들은 나중에 다 모아져 3D model을 구성하게 된다.

정의는 여기까지로 volume까지는 정의하지 않는다. 그 이유는 나중에 만들게 될 3D model은 volume을 차지하는것이 아니라 surface의 값만을 확인하기 때문이다. 즉 우리가 그래픽스에서 말하는 3D model은 2차원 surface들의 연속체이지 내부 volume이 꽉 찬 물체가 아니다.

## 3D
### Primitives
우리는 그동안 배운것을 이용해 3차원 model을 표현해야만 한다. 이를 위해 curve, surface를 이용하며 필요에 따라 volume을 차지하는 volumetric object를 사용하기도 한다.

우리는 계산량을 줄이고, 효과적으로 표현하기 위해 다음과 같은 조건을 가지고 3D model을 생성한다.
- 주로 Surfcae를 이용해서 3D model을 표현한다. 
- 기본적으로 2차원 model들도 점들을 기준으로 정의하기 시작한다. 즉 vertex를 정의하고 그 이후에 필요한것을 정의한다.
- convex한 model을 나타내기 위해 우리는 flat한 평면들을 이용한다.

이 예외로는 CSG(Constructive Solid Geometric)가 있는데 이는 object가 가진 volume들을 서로 합치거나, 빼거나 해서 새로운 volume을 표현한다. 이 때 특수한 volume들은 여러개의 기본 volume들의 구성으로 나타낸다.

### Coordinate System
지금까지 이야기 한 요소들을 이용해 우리는 3차원 coordinate system에 나타내야 한다. 우리는 지금까지 주로 3D vector space에서 나타내왔다. 이 space에서 의 표현은 $v=\alpha_{1}v_{1}+\alpha_{2}v_{2}+\alpha_{3}v_{3}$ 로 주로 v는 x, y, z를 이용해서 나타내왔다. 그리고 그 표현은 x, y, z 일때 (1,2,3)과 같이 나타냈던것처럼 $$a=\begin{bmatrix}
\alpha_{1}\\ 
\alpha_{2}\\ 
\alpha_{3}
\end{bmatrix}$$로 나타낸다.

그러나 단순히 vector만을 이용해서는 space를 정의하는데 한계가 있다. 때문에 여기서 Point를 사용한다. 이제 우리는 vector와 point의 큰 차이점을 확인할 수 있다.

![image](https://user-images.githubusercontent.com/79836443/116815201-74a03580-ab97-11eb-81ca-d294c71d0940.png){: width="70%" height="70%"}

Point는 원점이 존재해야만 한다. 지금까지 우리가 3차원의 점 (a,b,c)을 정의할때는 항상 원점 (0,0,0)을 정의 한 상태로 이야기 해왔다. vector는 방향과 크기만 존재하기 때문에 시작점에 상관없이 적용할 수 있었던 것이다. **즉 우리가 Point를 정의하기 위해서는 원점과 vector 모두 필요한것이다.**

### Homogeneous Coordinate
우리는 이 Vector와 Point를 구분하기 위해서 **Homogeneous Coordinate**를 사용한다. 이전까지 주로 사용하던 표현법은 vector나 point 모두 (1,2,1)과 같은 형태로 나타냈다. 그러나 Vector와 Point를 구분하기 위해서 이제 한 element를 더 사용한다.

![image](https://user-images.githubusercontent.com/79836443/116815557-0b212680-ab99-11eb-93a4-72ad66018a29.png){:.align-center}

그림에서 보이듯이 Point는 원점 $P_{0}$를 나타낼 수 있도록 끝에 1을 추가한다. 반면에 Vector는 원점을 표현할 필요가 없으므로 0을 추가하여 원점에 대한 정보를 무시한다. 즉 Point는 원점 $P_{0}$에서 x, y, z 만큼 이동한 곳의 Point라는 정보로 해석할 수 있는것이다.

### Coordinate System의 변경
world coordinate에서 camera coordinte로 변경되거나 서로 다른 model들을 하나에 통합할때 등 다양한 상황에서 coordinate system이 변경되는 일이 일어날 수 있다. 만약 ${v_{1}, v_{2}, v_{3}}$ 에서 ${u_{1}, u_{2}, u_{3}}$ 로 변경시키려 한다면, 우리는 그 관계를 나타내는 vector를 구하고 Matrix로 표현할 수 있다. 

$u_{1} = \gamma_{11}\nu_{1} +\gamma_{12}\nu_{2}+\gamma_{13}\nu_{3}$  
$u_{2} = \gamma_{21}\nu_{1} +\gamma_{22}\nu_{2}+\gamma_{23}\nu_{3}$        $\rightarrow$        $$M=\begin{bmatrix}
\gamma_{11} & \gamma_{12} & \gamma_{13}\\ 
\gamma_{21} & \gamma_{22} & \gamma_{23}\\ 
\gamma_{13} & \gamma_{23} & \gamma_{33}
\end{bmatrix}$$  
$u_{3} = \gamma_{31}\nu_{1} +\gamma_{32}\nu_{2}+\gamma_{33}\nu_{3}$

→ $u=Mv$

이 Matrix M을 이용하면 ${v_{1}, v_{2}, v_{3}}$ 에서의 vector a가 ${u_{1}, u_{2}, u_{3}}$로 바뀌었을때 어떤 vector b로 표현될지 찾을 수 있다.
- $$w = b^{T}\begin{bmatrix} u_{1}\\ u_{2}\\ u_{3}
\end{bmatrix} = b^{T}M\begin{bmatrix} v_{1}\\ v_{2}\\ v_{3}
\end{bmatrix} = a^{T}\begin{bmatrix} v_{1}\\ v_{2}\\ v_{3}
\end{bmatrix}$$
- $a = M^{T}b$
- $b = (M^{T})^{-1}a$

Basis가 변하는 경우는 다음과 같이 2가지 경우로 나눌 수 있다.
1. Origin이 변하지 않는 경우
	- ex) rotaion이나 scaling 같은 경우
2. Origin이 변하는 경우
	- ex) 원점도 같이 translation이 되는 경우
만약 translation이 일어나 Origin이 변하더라도 vector라면 그 방향과 크기가 바뀌지 않기때문에 문제가 없다. 지금까지 본 경우가 vector의 변환이기 때문에 Homogeneous coordinate를 사용하지 않아도 문제가 없었다. 그러나 Point를 표현하기 위해서는 Homogeneous coordinate를 사용해야만 한다.  이번에는 Origin까지 $P_{0}$에서 $Q_{0}$로 변경할 때를 확인해보자.

![image](https://user-images.githubusercontent.com/79836443/116816751-2e020980-ab9e-11eb-97f1-d69afc3248c7.png){:.align-center}

변경된 원점 $Q_{0}$에 대한 식이 추가되었고 이 부분이 Matrix M 4행에 반영되었다. 만약 원점이 변하지 않는다면 $Q_{0}=P_{0}$이므로 4행의 감마값들이 모두 0이 될것이다. 이렇게 원점이 변경되는 경우를 Homogeneous coordinate를 사용하면 나타낼 수 있다.
