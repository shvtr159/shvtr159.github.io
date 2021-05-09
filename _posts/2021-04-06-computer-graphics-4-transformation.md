---
title: "[Computer Graphics #4] Transformation in 3D"
categories:
- Graphics
use_math: true
---

#2에서 2차원에서의 Transformation을 알아보았다. 이번에는 이를 확장하여 3D에서의 변환을 알아본다.

## Affine Transformation (아핀 변환)
Transformation은 point(or vector)를 다른 point(or vector)로 매핑하는 것을 의미한다. 그중 Affine 변환은 선형변환이라는 특징을 가진다. 이는 선이 변환됐을 때 곡선과 같이 변하는 것이 아니라 선형성을 유지하는 변환이다. Computer Graphic에서 대부분의 변환은 affine 변환으로 translation, rotation, scaling, 그리고 shear이 있다. 

이제 3차원으로 확장시켜 **Homogeneous Coordinate**에서 나타낸 Transformation을  알아보자. 이는 다음과 같이 나타낼 수 있다.
<center> $$Q=P+\alpha\nu \quad\rightarrow \quad \mathbf{q}=\mathbf{p} + \alpha\mathbf{v}=\begin{bmatrix}
\alpha_{1}\\ \alpha_{2}\\ \alpha_{3}\\ 1\end{bmatrix}+\alpha\begin{bmatrix}
\beta_{1}\\ \beta_{2}\\ \beta_{3}\\ 0\end{bmatrix}$$ </center>
## Translation
- equation : <center>	$$x'=x+\alpha_{x}$$
	$$y'=y+\alpha_{y}$$
	$$z'=z+\alpha_{z}$$ </center>
- matrix form :
<center>	$$\begin{bmatrix}
1 & 0 & 0 & \alpha_{x}\\ 
0 & 1 & 0 & \alpha_{y}\\ 
0 & 0 & 1 & \alpha_{z}\\ 
0 & 0 & 0 & 1
\end{bmatrix}$$ </center>
	
다시 원래 상태로 돌아가는 역변환은 각 이동에 $-$를 붙인다. 
	
## Rotation
3차원상에서 Rotation을 수행할 때는 rotation angle과 rotation axis가 필요하다. 일단 z축을 기준으로 회전하는 변환을 대표로 보자.
- equation : <center>	$$x'=x\cos\theta+y\sin\theta$$
	$$y'=y\sin\theta+y\cos\theta$$
	$$z'=z$$ </center>
- matrix form :
<center>	$$\begin{bmatrix}
\cos\theta & -\sin\theta & 0 & 0\\ 
\sin\theta & \cos\theta & 0 & 0\\ 
0 & 0 & 1 & 0\\ 
0 & 0 & 0 & 1
\end{bmatrix}$$ </center>
	
역변환은 각 $\theta$를 $-\theta$로 $-$를 붙인다. 이때, $\cos-\theta = \cos\theta$, $\sin-\theta = -\sin\theta$ 이므로 이에 맞게 변경하면 간단하게 정리된다.

그러나 z축 뿐만 아니라 x, y축에 대해서도 rotation을 수행할 수 있기 때문에 General Rotation은 각각의 축으로 회전하는 matrix의 곱인 다음과 같은 형태로 나타난다. 이때, y축 rotation matrix의 sin의 부호가 반대인 이유는 right hand coordinate이기 때문이다.
<center> $$\mathbf{R}=R_{x}R_{y}R_{z}$$ </center>
<center>	$$\begin{bmatrix}
1 & 0 & 0 & 0\\ 
0 & \cos\gamma & -\sin\gamma & 0\\ 
0 & \sin\gamma & \cos\gamma & 0\\ 
0 & 0 & 0 & 1
\end{bmatrix}\begin{bmatrix}
\cos\beta & 0 & \sin\beta & 0\\ 
0 & 1 & 0 & 0\\ 
-\sin\beta & 0 & \cos\beta & 0\\ 
0 & 0 & 0 & 1
\end{bmatrix}\begin{bmatrix}
\cos\alpha & -\sin\alpha & 0 & 0\\ 
\sin\alpha & \cos\alpha & 0 & 0\\ 
0 & 0 & 1 & 0\\ 
0 & 0 & 0 & 1
\end{bmatrix}$$ </center>

그렇다면 만약 원점에 있지 않은 물체가 회전할 때는 어떻게 해야 할까. 위에서 본 rotation matrix로는 그 물체의 위치에서 원하는 회전이 일어나지 않을 것이다. 이때는 object를 원점으로 이동시키고, 원하는 대로 회전한 뒤 다시 원래 자리로 이동시키면 원하는 효과를 얻을 수 있다. 식으로만 간단히 나타내면 $\mathbf{M} = T(p_{f})R_{z}(\theta)T(-p_{f})$이다. matrix는 생략한다.

## Scaling
scaling은 Affine transformation이지만 rigid body 변환은 아니다.  **Rigid-Body Transformation은 물체의 형태와 크기가 변하지 않는 변환**으로 scaling은 그 크기가 변하기 때문에 Rigid-Body Transformation이 아니다. Scaling도 어디를 기준으로 Scaling 하느냐에 따라 차지하는 공간이 달라지기 때문에 **기준점이 필요하고, scale할 방향, scale factor(얼마나 변화할 것인지)가 필요**하다. 
- equation : <center>	$$x'=\alpha_{x}x$$
	$$y'=\alpha_{y}y$$
	$$z'=\alpha_{z}z$$ </center>
- matrix form :
<center>	$$\begin{bmatrix}
\alpha_{x} & 0 & 0 & 0\\ 
0 & \alpha_{y} & 0 & 0\\ 
0 & 0 & \alpha_{z} & 0\\ 
0 & 0 & 0 & 1
\end{bmatrix}$$ </center>

$\alpha$를 곱해줘 Scaling을 수행하였으므로 역변환은 같은 값으로 나누는 $\frac{1}{\alpha}$을 수행한다. 여기서의 $\alpha$값이 scale factor로 1보다 크면 원본보다 커지고, 0~1 사이이면 작아지고, 음수일 때는 Reflection으로 뒤집히는 모습을 보인다.

## Shear
shearing은 특정 방향으로만 translation이 일어나는 것으로 다음과 같은 변환을 볼 수 있다. shear 변환도 linearity가 유지되는 것을 볼 수 있다. 다음 사진의 변환을 예로 보자.

![image](https://user-images.githubusercontent.com/79836443/117400405-838f3b00-af3d-11eb-8fe8-e8de30d492fe.png){:.align-center}

- equation : <center>	$$x'=x+y\cot\theta$$
	$$y'=y$$
	$$z'=z$$ </center>
- matrix form :
<center>	$$\begin{bmatrix}
1 & \cot\theta & 0 & 0\\ 
0 & 1 & 0 & 0\\ 
0 & 0 & 1 & 0\\ 
0 & 0 & 0 & 1
\end{bmatrix}$$ </center>

<br>
2차원에서 본 Transformation들을 3차원으로 확장시켜 보았다. 실제 변환은 여러 가지가 일어나기 때문에 Rotation에서 설명한 것과 같이 다양한 변환을 조합하여 원하는 변환을 수행할 수 있다.
