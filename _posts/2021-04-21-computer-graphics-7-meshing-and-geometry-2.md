---
title: "[Computer Graphics #7] Meshing and Geometry 2"
use_math: true
---

Meshing and Geometry 1 에서는 기본적인 geometry를 위한 triangle을 만드는 것에 대해서 배워보았다. 이번 geometry2 에서는 post-processing을 해서라도 좀 더 다양한 shape를 만드는 방법에 대한 geometry를 알아본다.

## Points to Curve
![image](https://user-images.githubusercontent.com/79836443/115556206-61fe4480-a2eb-11eb-8fa8-245eaaddc283.png "https://slidetodoc.com/chapter-14-polynomial-interpolation-interpolation-extrapolation-interpolation-data/"){:.align-center}
<center><span style="color:rgb(150, 150, 150)">regression & interpolation</span></center><br>

우리가 vertex 위에 면을 붙이는 과정을**regression** 또는 **interpolation**에 해당하는 과정과 비교해서 이해할 수 있다. 

일반적으로 regression의 경우 한정된 관측값을 이용해서 noise가 포함됐을 것을 가정하고 그 data들이 나타내는 모양이 어떤 모양에 가까울 것인지를 추론한다. 이 모양과 실제 관측값의 차이는 약간의 error로 간주할 수 있다. 

interpolation은 주어진 점에 해당하는 값들이 정확하다고 가정하고 그 사이의 값들을 추정하여 data의 모양을 나타낸다. meshing을 할 때, vertex가 존재하고 그 vertex들 사이를 triangle로 채웠다. 이 채웠다는 말은 존재하지 않는 부분에 대해 면으로 메꾸도록 interpolation을 수행했다고 볼 수 있다.

그렇지만 model을 나타내기 위한 vertex는 수없이 많기 때문에 이 vertex들을 모두 만족시킬 수 있는 하나의 고차함수로 regression/interpolation하는 일은 거의 불가능에 가깝다. 그래서 우리는 적절한 형태를 나타낼 수 있도록 local 영역들을 따로따로 수행하며 적절한 face들을 만들어 낸다. 이를 **Spline**한다고 한다.

### Spline
위에서 설명했듯이 spline은  lower-order 다항식을 일부 data만을 이용하여 생성하고 붙여나가는 piecewise한 방법으로 수행된다. spline의 장점은 (1) 진동을 최소화하고, (2) low-order 특성으로 인한 반올림 오차를 줄이고 (3) 더 나은 근사치를 제공한다. spline을 수행할 때는 data가 noisy한 경우 그 부분을 다 반영하다 보면 문제가 생기므로 이를 위한 적절한 local 영역을 찾아내는 것이 중요하다. 이 영역들을 찾아 따로따로 수행하고 연결한다.

#### B-spline (Basis-spline)
spline 방법 중 하나로 control point를 사용하여 모양을 변화시킨다. B-spline에서 vertex들을 연결하는 선의 모양은 basis function에 의해 결정된다. 
> j차 i번째 B-spline basis function은 다음과 같이 재귀적으로 정의된다.
> 
> $$N_{i,0}(u)=\left\{\begin{matrix}
1 \quad(if\; u_{i}\leq u< u_{i+1})\\ 
0 \quad(otherwise)
\end{matrix}\right.$$
>
> $$N_{i,j}(u)=\frac{u-u_{i}}{u_{i+j}-u_{i}}N_{i,j-1}(u)+\frac{u_{i+j+1}-u}{u_{i+j+1}-u_{i+1}}N_{i+1,j-1}(u)$$

![image](https://user-images.githubusercontent.com/79836443/115740145-803a7200-a3c9-11eb-900f-0e1c6b5c761e.png){:.align-center}

이때, 0차를 convolution하여 1차를 만들고, 1차를 convolution하여 2차를 만드는 방식으로 차수가 높아질수록 더 smooth한 curve가 된다. 보통 2차나 3차를 이용하여 만든다.
그러면 B-spline function은 다음과 같이 정의된다.
>$$C(u) = \sum_{i=0}^{n}N_{i,p}(u)P_{i}$$
>P는 2D/3D 상에서의 control point
>$n+1 = m - p$ 은 간격 m의 수와 차수 p에 기반해 얼마나 많은 control point가 필요한지 결정해 준다.

이제 위의 function을 이용해 curve를 만든다. B-spline에는 line 지나야 하는 vertex인 **knot**와 지나지 않고 curve의 모양을 결정해주는 **control point**가 있다. knot들을 n차 basis function을 이용하여 연결해 주는데 C0, C1 등을 고려하며 자연스럽게 연결할 수 있다. 그러나 그림과 같이 function은 symmetric하기 때문에 단순히 연결만 하게 된다면 부자연스러울 수 있다. 이때 control point를 이용하게 되는데 control point에 의해 knot 사이의 값들의 가중치가 달라지며 curve의 모양이 변하게 된다. 

#### NURBS (Non-Uniform Rational B-Spline)
B-spline에 weight가 추가되어 curve의 모양을 결정한다. NURBS curve는 다음과 같은 식으로 정의된다.

> $$C(u) = \frac{\sum_{i=0}^{n}N_{i,p}(u)w_{i}P_{i}}{ \sum_{i=0}^{n}N_{i,p}(u)w_{i}}$$  
> - N은 B-spline의 basis function, P는 control point, w는 P의 weight를 의미한다.  
> - w, 즉 control point의 가중치가 커지면 curve가 이 control point에 더 가까워지고, 작아지면 더 멀어진다.

![image](https://user-images.githubusercontent.com/79836443/115749596-3609be80-a3d2-11eb-9a82-1c32cd8a2032.png){:.align-center}

이 idea는 surface로 확장될 수 있고, 이 방식을 이용해 복잡한 천의 움직임 등을 vertex를 추가하거나 수정하지 않아도 자연스럽게 나타낼 수 있다.

## Implicit Surfaces
지금까지 surface에  triangle을 만들어 값을 채우는 것처럼 explicit하게 Surface를 정의했다. **Implicit Surfaces는 모든 공간에 값이 존재하고, 값이 0인 부분을 surface, 안쪽은 음의 값, 바깥쪽은 양의 값으로 설정한다.** 이 방법은 object의 내부를 확인하기 쉽고, 액체처럼 object의 변화가 많은 object를 표현하기에 좋다. 

### Constructive Solid Geometry (CSG)
복잡한 모양을 표현할 때 모양이 규칙성을 가지고, 일정한 모양의 object들의 합, 차로 만들 수 있다면 기본 component를 이용해서 만들어 낸다. 복잡한 객체의 모양을 기본 component의 mesh의 합, 차, 교집합을 이용해 만들기 때문에 복잡한 객체의 triangle 등을 모두 가질 필요가 없다. 주로 자연의 객체가 아니라 사람이 만든 객체들을 표현하기에 좋다.
![image](https://user-images.githubusercontent.com/79836443/115751485-32773700-a3d4-11eb-8a9c-5fb529b5db76.png){:.align-center}

위와 같이 Union, Difference, Intersection의 연산으로 생성되며 CSG object는 binary tree에 의해 표현되며 implicit surface에 쉽게 적용된다.

### Marching Cubes
Implicit Surface나 CSG로 생성된 model들은 최종적으로 explicit하게 나타내야 눈에 보이게 완성할 수 있다. 이때 사용하는 대표적인 방법이 Marching cube이다.

이 방법은 Cube가 이동하면서 값들을 scan하게 된다. 매 volume마다 값을 확인하는데 만약 **cube 내에 +값과 -값이 공존할 경우 triangle을 생성한다.** 이때의 값은 cube의 꼭짓점에서의 값을 확인하게 되는데 한 꼭짓점에 연결된 다른 꼭짓점의 값의 부호가 다르다면 그 사이에 surface가 존재하는 것이므로  그 사이에 vertex를 찍고 연결하여 표면을 만든다. 이때 surface는 아래의 table과 같이 점의 위치에 따라 정해진 생성 방법에 따라 만들어진다.
![image](https://user-images.githubusercontent.com/79836443/115752845-7880ca80-a3d5-11eb-8392-084ca01b80aa.png){:.align-center}
<center><span style="color:rgb(150, 150, 150)">Look up table</span></center><br>

이 방법은 다음 영상을 보면 쉽게 이해할 수 있다.
<https://www.youtube.com/watch?v=kIfVICKtA1g>

## 3D Scanning
복잡한 model을 만들기 위해서 하나하나 모두 만들어 내는 것은 어려운 일이다. 때문에 3D 객체를 scanning해서 model을 얻어내고, refine하여 생성하기도 한다. 다음과 같은 방법들로 좀 더 쉽게 복잡한 3D model들을 얻어낼 수 있다.
- Multiview Stereo
- Shape from silhouette
- Photometric stereo
- Kinect
