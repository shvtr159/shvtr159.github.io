---
title: "[Computer Graphics #2] Camera model"
categories:
- Graphics
use_math: true
---

## Transformation
transform 작업은 이 변환들이 같은 **수학적 group**이라는 것을 알게 되면 여러 작업을 한 번에 수행할 수 있다는 큰 장점을 얻을 수 있다.
group이 되기 위한 조건으로는
1. 이 집합은 어떤 operator에 대해 닫혀있어야 한다.
$$A \in G\,and\,B \in G \rightarrow A*B \in G$$
2. 다음을 만족하는 identity element I가 존재해야 한다.  
$$A*I=I*A=A$$
3. element A는 다음을 만족하는 inverse A가 존재해야 한다.
$$A^{-1}*A = A*A^{-1}=I$$

translation은 matrix로 나타나고 matrix의 곱셈은 닫혀있다. 2번과 3번 조건 또한 I 행렬과 역행렬을 이용해 증명할 수 있다. 이렇게 이 수학적 group인 것을 이용하면 다음과 같은 장점을 얻을 수 있다.

어떤 점들을 회전시킨 뒤 d만큼 이동시켰다. 다시 이 점들을 원래 상태로 되돌리기 위해서는 -d만큼 이동한 뒤 다시 반대로 회전시켜야만 한다. 그러나 회전을 $T_{1}$ , 이동을 $T_{2}$ 라고 했을 때 이 group을 이용하면, 다시 원상태로 돌아가기 위해 $T_{1}^{-1} * T_{2}^{-1}$ 를 한 번만 수행해주면 된다.

## 2D planar Transtormation의 종류
3차원에서 카메라의 위치에 따라 시점이 달라지거나 물체의 위치가 변하는 경우 다양한 변환을 수행해주어야 한다. 3차원 변환에 앞서 간단하게 2차원 변환으로 다양한 변환을 어떻게 표현하는지 알아본다.
![image](https://user-images.githubusercontent.com/79836443/114275830-01574800-9a5f-11eb-95c5-822f00bd6633.png)
<center><span style="color:rgb(150, 150, 150)">Basic set of 2D planar transformations (from R.Szeliski)</span></center><br>
	
## Translation
물체의 회전, 크기, 형태를 변형하지 않고 이동시킨다.

- equation :
$$\quad x' = x + t_{x}\qquad\qquad y' = y+t_{y}$$
- matrix form :


$$\begin{bmatrix}
x'\\ 
y'\\ 
1
\end{bmatrix}=\begin{bmatrix}
1 & 0 & t_{x}\\ 
0 & 1 & t_{y}\\ 
0 & 0 & 1
\end{bmatrix}\begin{bmatrix}
x\\ 
y\\ 
1
\end{bmatrix}$$

## Scale
물체의 크기를 변경시킨다.

- equation : 
$$\quad x' = sx\qquad\qquad y' = sy$$
- matrix form :


$$\begin{bmatrix}
x'\\ 
y'\\ 
1
\end{bmatrix}=\begin{bmatrix}
s & 0 & 0\\ 
0 & s & 0\\ 
0 & 0 & 1
\end{bmatrix}\begin{bmatrix}
x\\ 
y\\ 
1
\end{bmatrix}$$

## Rotation
$\theta$ 만큼 회전한다.

- equation : 
$$\quad x' = x\cos\theta-y\sin\theta\qquad\qquad y' = x\sin\theta+y\cos\theta$$
- matrix form :


$$\begin{bmatrix}
x'\\ 
y'\\ 
1
\end{bmatrix}=\begin{bmatrix}
\cos\theta & -\sin\theta & 0\\ 
\sin\theta & \cos\theta & 0\\ 
0 & 0 & 1
\end{bmatrix}\begin{bmatrix}
x\\ 
y\\ 
1
\end{bmatrix}$$

## Euclidean (Rigid)
Rotation과 translation을 모두 수행한다. 모양의 변화 없이 위치 변화만 나타난다.

- equation : 
$$\quad x' = x\cos\theta-y\sin\theta+t_{x}\qquad\qquad y' = x\sin\theta+y\cos\theta+t_{y}$$
- matrix form :


$$\begin{bmatrix}
x'\\ 
y'\\ 
1
\end{bmatrix}=\begin{bmatrix}
\cos\theta & -\sin\theta & t_{x}\\ 
\sin\theta & \cos\theta & t_{y}\\ 
0 & 0 & 1
\end{bmatrix}\begin{bmatrix}
x\\ 
y\\ 
1
\end{bmatrix}$$


>이 이후부터는 아래와 같이 $3\times3$ matrix중 일부를 matrix로 치환하여 간단히 나타내도록 한다.
![image](https://user-images.githubusercontent.com/79836443/114277029-5ea1c800-9a64-11eb-9f97-64a70b7096ac.png){:.align-center}{: height="60%" width="60%"}



## Similarity (scaled Eudlidean)
Euclidean transform에 scaling 도 수행한다.

- equation : 
$$\quad p' = sRp+t$$
- matrix form :


$$\begin{bmatrix}
p'\\ 
1 \end{bmatrix}=\begin{bmatrix}
sR & t\\ 
0 & 1
\end{bmatrix}\begin{bmatrix}
p\\ 
1
\end{bmatrix}$$

## Affine
Similarity에 물체가 기울어지는것과 같은 변형이 생긴다.

- equation : 
$$\quad p' = Ap+b$$
- matrix form :


$$\begin{bmatrix}
p'\\ 
1 \end{bmatrix}=\begin{bmatrix}
A & b\\ 
0 & 1
\end{bmatrix}\begin{bmatrix}
p\\ 
1
\end{bmatrix}$$

*A와 b는 Similarity와 달리 matrix의 변수가 다양할 수 있다.*
## Projective
$c^{T}$의 값에 따라 특정 방향으로 projection 되는 모양으로 변형된다.

- equation : 
$$\quad p' = \frac{Ap+b}{c^{T}p+1}$$
- matrix form :


$$\begin{bmatrix}
p'\\ 
1 \end{bmatrix}\sim\begin{bmatrix}
A & b\\ 
c^{T} & 1
\end{bmatrix}\begin{bmatrix}
p\\ 
1
\end{bmatrix}$$
