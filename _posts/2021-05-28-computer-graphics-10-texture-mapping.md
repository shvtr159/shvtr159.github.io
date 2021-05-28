---
title: "[Computer Graphics #10] Texture Mapping"
categories:
- Graphics
use_math: true
---

실제로 모델을 만들 때는 vertex의 색으로 칠하는 것으로는 완벽하지 않다. 때문에 이에 맞는 texture를 모델에 입히는 과정이 필요하다. 각  geometry의 surface에 일치하는 real object의 부분의 polygon을 입혀준다. 

## Mapping
이때 다음과 같은 u, v의 Texture Coordinates를 사용한다. 
![image](https://user-images.githubusercontent.com/79836443/119942715-2121db80-bfcd-11eb-8167-b3d306bc2f19.png){:.align-center}{: width="80%" height="80%"} 

weight를 이용해 model에서 vertex 위치를  interpolation 하면 model의 좌표에서 이미지의 좌표값이 나오므로 해당 이미지 좌표의 color값을 사용하면 된다. 이 interpolation을 수행하기 위해  위와 같이 내부의 값을 사용한다. 각 꼭짓점의 weight를 가지는데 이 weight는 반대편의 삼각형의 넓이에 의해 결정된다.

![image](https://user-images.githubusercontent.com/79836443/119943119-9097cb00-bfcd-11eb-9751-1d9ea40e622d.png){: width="45%" height="45%"} ![image](https://user-images.githubusercontent.com/79836443/119943181-a5745e80-bfcd-11eb-812e-b644afe0f334.png){: width="45%" height="45%"}

그러나 이미지 자체도 continuois하지 않기 때문에 u,v의 값이 보통 픽셀 사이로  떨어진다. 그럼 다시 이미지값에서도 interpolation을 수행하여 그 값을 계산한다. 이때는 **pixel의 RGB color을 bilinear interpolation**하여 값을 알아낸다.

## Screen Space vs. World Space
그러나 실제로 우리는 3D space 상에 존재하는 triangle이 2D인 screen에 projection된 모습을 보게 된다. 때문에 우리가 원하는 아래와 같이 실제 보고 싶은 모습과 달라진다.

![image](https://user-images.githubusercontent.com/79836443/119944686-8971bc80-bfcf-11eb-92f0-b972bf24e5a5.png){:.align-center}{: width="75%" height="75%"}

그 이유는 아래 triangle's edge 부분이 3D상에서 실제 triangle의 상태인데, projection된 상태에서 interpolation하고 texture mapping을 수행했기 때문에 실제 triangle과는 달라지기 때문이다. 아래 사진을 보면 triangle's Edge 부분의 선들(vertex간의 거리)은 모두 같은 길이를 가지고 있다. 그러나 projectino된 결과를 보면 그 관계가 유지되지 않는다. 그러면 Triangle에서 직접 수행하면 될 것 같지만 이는 3차원 공간에서 해야 하므로 쉽지 않다. 

![image](https://user-images.githubusercontent.com/79836443/119945406-5f6cca00-bfd0-11eb-9659-a3ec4d60bd9e.png){:.align-center}{: width="75%" height="75%"}

이는 어떻게 projection이 되는지 관계를 알면 back projection을 수행하여 더 좋게 만들 수 있다.

### Solution
#### 1. Mesh Refinement
그렇다면 triangle을 나눠서 수를 늘리고, 개수를 늘리면 더 좋아지지 않을까. 하는 생각으로 늘려보았다.

![image](https://user-images.githubusercontent.com/79836443/119946977-2c2b3a80-bfd2-11eb-96e8-f73eded537f3.png){:.align-center}{: width="75%" height="75%"}

그 결과 처음보다는 좀 더 나아진 것 같지만 여전히 문제가 발생하고 있다. 또한, plat한 평면에 대해서는 triangle의 수를 늘리는 것은 더 좋지 않다.
#### 2. Screen Space Barycentric Interpolation
그래서 결국 힘들더라도 back projection을 수행한다. 
- world coordinate의 각 끝 point(위 projection 이미지에서 v1, v2)의 x, y, z에서 일단 x, z축을 다음과 같이 본다.

$$p^{w}_{1}=\begin{pmatrix}
x_{1}\\ z_{1}
\end{pmatrix}\qquad
p^{w}_{2}=\begin{pmatrix}
x_{2}\\ z_{2}
\end{pmatrix}$$

- 이 point를 screen으로 projection한다. 이 projection으로 $V_{1},V_{2}$가 $p_{1},p_{2}$로 projection 된다. 

$$p_{1}=\frac{hx_{1}}{z_{1}}\qquad
p_{2}=\frac{hx_{2}}{z_{2}}\qquad(1)$$

- world coordiante에서의 point는 다음과 같이 나타난다.

$$p^{w}=(1-s)\begin{pmatrix}
x_{1}\\ z_{1}
\end{pmatrix}+s\begin{pmatrix}
x_{2}\\ z_{2}
\end{pmatrix}\qquad$$

-  이 $p^{w}(s)$를 screen space로 projection한 것의 위치는 다음과 같이나타난다.

<center>$$SCREE\_\,SPACE(p^{w}(s))) =h\frac{(1-s)x_{1}+sx_{2}}{(1-s)z_{1}+sz_{2}}\qquad(2)$$</center>

- 이제 식 (1)과 (2)의 관계를 나타내면 다음과 같이 나타나는데 h는 고정된 값이므로 t와 s의 관계를 알아내면 된다.

$$ (1-t)\frac{hx_{1}}{z_{1}}+t\frac{hx_{2}}{z_{2}}=h\frac{(1-s)x_{1}+sx_{2}}{(1-s)z_{1}+sz_{2}}$$

- 이를 정리하여 s와 t가 다음과 같은 관계를 가지는것을 찾을 수 있다. 즉 실제 world s에서 이런 coordinate를 알고 싶다면 screen에서 이 t를 사용하면 된다. 이 t는 $z_{1}$과 $z_{2}$에 의해 결정된다. 이 식에 $z_{1}$ $z_{2}$을 넣고 s를 계산해 낸다. 이것이 world와 screen에서 사용할 weight값을 계산한 것이다.

$$s=\frac{tz_{1}}{z_{2}+t(z_{1}-z_{2})}$$

- 이것은 point에서 수행한 것이므로 이제 triangle에서 수행할 때는 다음과 같이 weight가 2개로 나타난다.

![image](https://user-images.githubusercontent.com/79836443/119958859-66023e00-bfde-11eb-980c-7e0f39b5602c.png){:.align-center}{: width="75%" height="75%"}

### Proxy  Objects
그러나 model이 복잡해지면 해당 위치에 어떤 이미지를 넣어야 하는지 하나하나 직접 할 수가 없다. 때문에 이렇게 복잡하게 하지 않아도 되는(예를 들면 반복되는 패턴)이라면 적절히 approximation하여 할당할 수 있다. 

#### Step 1.
이를 위해 coordinate를 적당히 simplify한다. 예를 들면 각 면마다 모두 matrix를 계산하기에는 복잡하므로 원통, 직육면체 등 간단한 모습으로 생각하고 어떻게 projection하는지 나타내고 씌운다.

![image](https://user-images.githubusercontent.com/79836443/119965589-64884400-bfe5-11eb-8560-a41517ead7aa.png){:.align-center}{: width="75%" height="75%"}

#### Step 2.
그러나 실제로는 원통이 아니므로 실제 model의 surface에 mapping을 해야한다. 이 때는 model이 간단하다면 (a)와 같이, 좀 더 복잡하면 model의 surface normal 방향의 값을(b), overlab이 없다면 (c)와 같은 방법으로 수행할 수 있다

![image](https://user-images.githubusercontent.com/79836443/119965893-b7fa9200-bfe5-11eb-841d-44f550299819.png){:.align-center}{: width="75%" height="75%"}

## Aliasing
texture를 할당하고 난 후 나타날수 있는 가장 큰 문제점중 하나로, 내 texture가 가진 복잡도와 실제 vertex의 복잡도가 부합하지 않을 때 나타난다. 예를들어 이미지는 매우 복잡한데 vertex가 그에 미치지 못하면 원하지 않는 패턴이 생기게 된다.

![image](https://user-images.githubusercontent.com/79836443/119966169-00b24b00-bfe6-11eb-96eb-2f7d1064418d.png){:.align-center}{: width="75%" height="75%"}

예를 들어 체스판 무늬에 경우로 보면 vertex가 많지 않다면 검정색 vertex 이후 vertex의 위치가  흰색에 위치하지 못하고 다음검정색 이미지 좌표에 위치해 다시 검정이 나오는 것처럼 듬성듬성 잘못된 값을 가져오게 된다. 

이를 해결하기 위해 vertex 복잡도에 맞게 작은 vertex에서도 사용할만 한 작은 size의 이미지를  각각 만들어준 뒤 그 이미지를 사용한다. 이 때, 한 방향으로만 작아지는 것은 MIP map, x, y 모든 방향으로 작아지는 것을 가지고 있는것을 RIP map 이라고 한다.

![image](https://user-images.githubusercontent.com/79836443/119966937-c7c6a600-bfe6-11eb-8bf3-3dceb22dfa69.png){:.align-center}{: width="75%" height="75%"}
