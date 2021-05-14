---
title: "[Computer Graphics #9] Shaders 2"
categories:
- Graphics
---

vertex를 연결해서 polygon을 만들고 그 polygon 위에 색을 줄 때 물체의 표면이 가지는 특징을 BRDF로 표현할 수 있었다. 색이라는 것은 사실 표면과 light source와의 상호작용에 의해 결정되기 때문에 정의 가능한 light source 또한 알아보았다. 최종적으로 특정 위치에서 볼 때 실제적으로 rendering을 하기 위해 사용되는 shader를 알아본다.

## Polygonal Shading
실제 우리 눈에 보이는 모델은 vertex 사이를 채운  polygon의 집합으로 볼 수 있다. 때문에 이 polygon을 어떤 색으로 채우는지가 실질적으로 해야 할 일이다. 그래서 polygonal shading은 polygon에 어떤 색을 할당하는지에 대한 기법이라고 할 수 있다. polygonal shading의 대표적인 3가지 방법을 알아본다.

### 1. Flat shading
하나의 polygon 내에서 face가 완벽히 flat하고 빛이 들어오는 방향과 보는 방향 모두 동일하다고 가장한다. 한 방향으로 들어온 빛을 한 방향으로 나가는 빛으로 BRDF를 계산한다. 결국 polygon 하나에 shading 계산은 한 번만 수행하면 된다.

![image](https://user-images.githubusercontent.com/79836443/118248546-5d3e4200-b4df-11eb-8112-63cb8ea71499.png){:.align-center}

Flat shading 결과는 이미지 첫 번째와 같이 나타난다. 계산이 간단한 만큼 결과가 간단하고 이에 따른 2가지 문제를 확인할 수 있다.
1. Lateral inhibition : 가운데 그림처럼 색의 값이 극단적으로 반대가 될 때, 그림에서 보이듯이 사이사이에 약간의 회색이 보이게 된다. 사람의 눈 안에서 검은색과 흰색의 밝기 값을 보았을 때 sensing에 서로 영향을 미치기 때문에 나타나는 문제이다.
2. Mach band : 밝기 값이 달라질 때, 그 밝기값이  달라지는 부분에서 다른 부분과의 대비로 인해 원래의 색보다 더 밝은색으로 보이게 된다.

좀 더 현실적으로 만들기 위해서는 normal을 다양하게 해야만 한다. 이를 위해 vertex간의 normal을 interpolation하여 polygon 위에 다양한 normal을 사용하고자 한다. 그러나 실제로 vertex 자체는 normal을 가질 수 없으므로 주위 polygon을 이용해 vertex의 normal을 결정한다.

### 2. Gouraud Shading
이렇게 주위의 face normal을 이용하는 방법을 gouraud shading이라고 한다. 해당 vertex를 포함하는 face들의 normal을 평균하여 vertex의 normal을 계산한다. 

![image](https://user-images.githubusercontent.com/79836443/118255339-1d7b5880-b4e7-11eb-8206-92f6af7add9a.png){:.align-center}

이렇게 하면 각 vertex마다 normal을 가지게 되는데 이제 face의 각 vertex의 normal에 가중치를 주고 interpolation하여  polygon 안에 다양한 새로운 normal들을 만든다. 즉 vertex normal로 계산된 color 값을 interpolation 하며 smooth하게 채워 넣는다. 이렇게 하면 주위에 vertex normal 수만큼 계산을 수행해야 하므로 flat shading보다 계산량이 늘어나게 된다.

### 3. Phong Shading
Gouraud shading과 같이 vertex의 normal을 구한다. 그러나 Phong Shading은 이 verex의 normal을 이용해 face에 normal 자체를 interpolation으로 채워 넣어 그 normal을 이용해 color값을 계산하여 채워 넣는다. 이는 하나의 face를 가상의 여러 face로 나눈 과를 낸다.

![image](https://user-images.githubusercontent.com/79836443/118257471-a1cedb00-b4e9-11eb-8066-9f177d56bf49.png){:.align-center}

계산량은 새롭게 채워 넣은 normal 개수만큼 수행하게 되므로 훨씬 늘어난다.

## Global Rendering
필요한 것들을 정의해줬으므로 이제 rendering할 준비가 됐다. 그러나  local lighting, global lighting을 또 고려해줘야 한다. global lighting은 물체에서의 반사 등을 모두 고려해주는 것으로 대부분 global lighting을 사용하고 local rendering은 거의 사용하지 않는다. global rendering을 할 때, 물체가 이동하거나 시점이 변화하기 때문에 어떤 부분에 어떤 빛의 interaction이 일어나는지를 찾아야 한다. 이런 일을 하기 위해서는 다음 effect들을 모두 판단해야만 한다.
- shadow : 이 surface를 계산할 때, 어떤 light source는 보이고, 어떤 light source는 보이지 않는지를 판단해야 한다.
- refractions : 굴절. 물체가 투명도가 있을 수도 있으므로 고려해야 한다.
- Inter-object reflections

이를 위해 우리는 **Ray tracing**, 즉 빛을 쫒아가는 작업을 수행해야 한다.

![image](https://user-images.githubusercontent.com/79836443/118259038-97154580-b4eb-11eb-8870-ed047cf71ca7.png){:.align-center}

그림과 같이 우리가 보았을 때 어떤 픽셀에 어떤 값이 들어오는가를 알아야 이미지를 만들 수 있다. 이 픽셀을 채우기 위해 픽셀 방향의 어떤 물체가 어떤 빛과 interaction 하는지를 알아내고자 한다. 알아내기 위해 우리는 그 방향으로 빛을 쏘는 **Ray casting**을 수행한다. 이 빛으로 어떤 light source에서 반사된 빛이 오고, 어떤 light source는 가려져서 필요하지 않는지 등을 알 수 있다.

이러한  가려지고, 가려지지 않는 부분을 계산하기 위해 $S_{L}$이라는 shadow term이 추가되어 다음과 같이 나타난다.  $S_{i}$는 빛이 가려지면 0, 이외의 경우는 1의 값을 가진다.
<center>$$I=I_{E}+K_{A}I_{A}+\sum_{L}(K_{D}(N\cdot L)+K_{S}(V\cdot R)^{n})S_{L}I_{L}$$</center>

그러나 우리는 더 실제적으로 만들기 위해 이 뿐만 아니라 multiple reflection과 투명도로 인해 생기는 부분도 계산해줘야 한다. 이를 위한 다른 데서 reflection되 온 빛, 투명하기 때문에 투과되어 온 빛을 계산하는 term들을 추가해준다.
<center>$$I=I_{E}+K_{A}I_{A}+\sum_{L}(K_{D}(N\cdot L)+K_{S}(V\cdot R)^{n})S_{L}I_{L}+K_{S}I_{R}+K_{T}I_{T}$$</center>

- $K_{S}I_{R}$ : Radiance for mirror reflection ray. 반사되어온 빛을 위한 term
- $K_{T}I_{T}$ : Radiance for refraction ray. 어느 정도의 투명도를 거쳐 굴절되어 오는 빛을 위한 term.

$K$는 coefficient. $K_{T}$는 transparency coefficient로 $K_{T}$가 1이면 완전 투명, 0이면 전혀 투명하지 않은 것으로 0~1값으로 투명도를 나타낸다.

이 ray tracing을 계산하기 위해 어떤 물체의 transmission, reflection term을 다음과 같은 형태로 저장한다.

![image](https://user-images.githubusercontent.com/79836443/118261195-30ddf200-b4ee-11eb-933d-c29952a7f73c.png){:.align-center}
