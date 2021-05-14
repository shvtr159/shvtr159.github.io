---
title: "[Computer Graphics #8-2] Optics & Lighting - Shaders"
categories:
- Graphics
use_math: true
---

Shading 1에서 shading을 위해 알아야 할 성질과 그 성질을 표현하는 함수 중 BRDF의 Phong model에 대해서 알아보았다. 이번에는 이어서 BRDF에서 사용하는 term에 대해 알아본다.

BRDF에서 사용하는 모든 parameter는 다음과 같이 표현된다.
<center>$$\mathrm{BRDF}(\lambda, \omega_{i},\omega_{o}, u, v)$$</center>
- $\lambda$ : 빛의 파장
- $ \omega_{i} = (\theta_{i}, \phi_{i})$ : 2D 입사광의 방향
- $ \omega_{o} = (\theta_{o}, \phi_{o})$ : 2D 반사광의 방향
- $(u,v)$ : 표면에서의 위치

그러나 파장은 R, G, B에 맞는 각각의 BRDF를 사용할 것이기 때문에 생략할 수 있다. 또, 같은 물질의 표면이 전부 완전히 같은 분자 배열을 나타내 같은 모습을 보이지 않지만, 사람들에게는 그 차이가 잘 보이지 않기 때문에 이는 하나로 생략할 수 있다. 그 결과 우리는 다음과 같이 단순화하게 된다.
<center>$$\mathrm{BRDF}(\omega_{i},\omega_{o})$$</center>

이제 $\omega_{i}$와 $\omega_{o}$를 잘 나타내기 위해서 이와 관련된 것에 대해 알아본다.

## Incoming Light
만약 자동차의 3D model이 있다면, 가장 처음에 할 일은 이 차를 만들기 위해 vertex를 만들고 연결하여 triangle을 만드는 것이다. 이후에 model에 알맞은 색을 얹는다. 그 뒤에 빛이 반사되는 결과들을 표현하기 위해 light source를 추가한다. 그러나 여기까지 만으로는 현실의 차와 같을 수 없다. 자동차의 표면은 그 주위의 모습까지 반사되어 우리 눈에 들어오기 때문이다. 실제로도 현실에 하얀 물체가 있을 때 light source가 없는 부분에서도 그 주위에서 반사된 빛에 의해 다른 색을 띤다.

그러나 이처럼 다른 물체에서 반사되온 빛을 우리가 보기 위해서는 light source에서 온 빛의 반사 등 모든 것을 계산해야 하는데 이는 매우 힘들다. 그래서 대신 ambient light와 비슷한 방법을 사용한다. 현실 같은 모습을 보이기 위해서 이 차에 들어오는 빛이 어떤 light source, 즉 어떤 물체가 light source 역할을 하여 차량 model에 왔는지를 얻어내고자 하는 것이다. 즉, **실제 light source는 생략하고 차량의 모습을 나타내기 위해 필요한 빛이 어떻게 들어오는지 Incoming light 만을 생각한다.**

이 Incoming Light를 얻는 여러 방법이 있지만, 일반적으로 Incoming Light를 저장하는 방법을 사용한다. 그 대표적인 방법은  light probe로 크기 등을 아는 완벽한 구 모양의 거울 재질 물체를 놓고 사진을 찍는 것이다.

![image](https://user-images.githubusercontent.com/79836443/117568353-c5191500-b0fa-11eb-945f-9528fc702c7c.png){:.align-center}

이 방법을 사용하였을 때 특정 방향에서 반사되어 카메라에 보이는 빛은 구를 뚫고 들어가 구 가운데 point에 도달하게 될 빛이다. 즉 구의 위치에 따라 해당 위치로 들어오는 빛을 확인할 수 있다. 예를 들어 위의 구를 찍고 있는 모습은 해당 위치에서 구를 향해 빛이 들어간 뒤 그 빛이 반사되어 카메라로 들어와 보이게 되는 것이다. **즉 지금 보이는 모습들은 모두 구의 입장에서 light source라는 것이다.** 예를 들어 만약 차에서 이를 나타낼 때는 차의 표면에 하늘의 위치에서 들어온 빛이면 그 하늘색의 light source에서 나온 빛을 차에 보내는 것이다. 최종적으로는 이런 방식으로 온 모든 빛이 Incoming Light가 된다.

![image](https://user-images.githubusercontent.com/79836443/117568542-c991fd80-b0fb-11eb-9fa2-823e44302fe9.png){:.align-center}
<center><span style="color:rgb(150, 150, 150)">Incoming Light를 model에 적용한 모습</span></center><br>

이렇게 얻은 Incoming Light를 model에 적용하기 위해 light probe를 model을 감싸는 반구의 형태로 나타내면, model에 들어온 많은 빛들 중 model의 표면에 반사되어 camera에 오는 빛이 어떤 것이 되는지 계산 할 수 있다.

## The Lighting Equation
Rendering을 한다는 것은 보고 있는 pixel에서 camera로 들어오는 Light에 영향을 미치는 Light source를 모두 찾아내서 그 reflection 결과를 얻어내고 합치는 일이다. 때문에 나가는 빛은 들어오는 모든 빛들의 합이므로 $L_{o} = \sum_{i\in in}^{}L_{o\;\mathrm{due\;to}\;i}(\omega_{i}, \omega_{o})$로 표현되고, BRDF가 우리에게 $L_{o\;\mathrm{due\;to}\;i}(\omega_{i}, \omega_{o})$를 알려준다.

이 개념에서 좀 더 realistic하게 만들기 위한 방법으로, **내가 보고 있는 것은 point보다는 surface의 작은 면적에서 반사되는 빛들의 합이라고 생각할 수 있다.** 면적으로 생각하지 않으면 빛의 밝기에 따른 interaction을 고려하기가 힘들기 때문이다. 들어오는 빛의 양이 많고 적음으로 밝기 같은것이 결정되는데 point는 물리적이지 못해서 이런 것을 결정할 수 없다. 때문에 우리가 보는 것은 다음 식과 같이 바뀌어 그 면적에 들어오는 빛들의 합이라고 할 수 있다.
![image](https://user-images.githubusercontent.com/79836443/117569080-d2380300-b0fe-11eb-9912-ef3443dcd656.png){:.align-center}

### Solid Angle
이제 빛을 3차원에서 계산해야 하기 때문에 3차원에서의 단위면적을 결정해야만 한다. radian을 3차원으로 확장해서 넓이가 $r^{2}$이 되는 원뿔의 range를 steradian이라고 한다. 3차원 원점을 중심으로 모든 방향으로 균일한 면적대비 빛을 계산할 수 있다.

- **Solid Angle** : $\omega = \frac{A_{\mathrm{\,on\;spehere}}}{r^{2}}$, (구는 4$\pi$ steradian을 가진다) $A=4\pir^{2}$
![image](https://user-images.githubusercontent.com/79836443/117569423-8ede9400-b100-11eb-8979-4a06da09ca17.png){:.align-center}

### 빛의 Radiant Intensity
- **anisotropic** : light source를 둘러싸는 선을 그리면 빛은 무조건 선을 통과해서 나가야 한다. 그러면 이 빛들을 모두 합치면 light source의 크기와 같다. 때문에 특정 방향으로 나가는 빛만을 고려하고 싶으면 해당 영역에서만 integration을 수행하면 된다.
<center>$$I(\omega)=\frac{d\Phi}{d\omega}$$</center>
- **isotropic** : 빛이 모든 방향으로 균일하게 퍼져나가는 상태로, 이 빛은 전체 광량 중에서 면적을 차지하는 만큼의 비율을 통해 계산할 수 있다.
<center>$$\Phi=\int_{\mathrm{sphere}}^{}Id\omega = 4\pi I$$</center>
이때, $\Phi$는 빛의 total power이다.

### 표면에서의 Irradiance
![image](https://user-images.githubusercontent.com/79836443/117569756-33ada100-b102-11eb-9c15-7dac1ea3e547.png){:.align-center}

왼쪽 그림과 같이 빛이 A라는 면적에 들어온다면 바닥 면은 7개의 빛과 상호작용 하지만, 수직하지 않고 각을 가진다면 들어오는 빛의 양이 줄어들게 된다. 이를 고려해야 특정 영역에 떨어지는 빛의 양을 계산할 수 있기 때문에 오른쪽 그림과 같이 고려해야 한다. 

### Solid Angle (Radiant Intensity) vs Area (Irradiance)
![image](https://user-images.githubusercontent.com/79836443/117569883-b2a2d980-b102-11eb-97a5-f2b38e469ccb.png){:.align-center}

어딘가 light source가 있을 때, cos값을 곱해줘서 들어오는 빛의 양을 조절해줘야 하고, light source와의 거리에 따라 빛의 세기가 점점 줄어들기 때문에 이를 고려해주기 위해 거리의 제곱에 비례해서 줄어들도록 나눠준다. 그러나 r 하나만으로 계산하게 되면 밝기의 변화 차이가 너무 크게 바뀌거나 하므로 $r^{2}$ 대신 $a+bd+cd^{2}$의 3개의 term을 가진 변수를 이용하기도 한다.
<center>$$d\omega = \frac{dA\cos\theta}{r^{2}}$$</center>

이때 둘 중 light source에서 나가는 빛의 angle을 고려하여 생각하는 것은 source의 성격을 좀 더 중요시하게 된다. 그러나 실제로 표현하고 approximation을 하기 위해서는 area에 들어오는 빛을 계산하는 것이 더 좋기 때문에 Area를 주로 고려하는 방법을 사용한다.

이제 Light Equation은 $L_{o\;\mathrm{due\;to}\;i}(\omega_{i}, \omega_{o}) = BRDF(\omega_{i}, \omega_{o})dE_{i}$ 에서 $dE = Ld\omega\cos\theta$에 의해
$L_{o\;\mathrm{due\;to}\;i}(\omega_{i}, \omega_{o}) = BRDF(\omega_{i}, \omega_{o})L_{i}d\omega_{i}\cos\theta_{i}$로 표현할 수 있고, 최종적으로 모든 방향에서 들어오는 빛을 고려하여 다음과 같이 정리할 수 있다.
<center>$$L_{o} = \int_{i\in in}BRDF(\omega_{i}, \omega_{o})L_{i}d\omega_{i}\cos\theta_{i}$$</center>
### Point lights
지금 light equation은 기본적으로 point light를 사용하고 있다. 때문에 여러 개의 point light를 사용하면 그 sum으로 빛의 양을 계산한다. 그러나 **원래 point light가 아니었던 것을 point light로 근사하면서 몇 가지 문제가 생긴다.** 일단 면적으로 표현하는 것보다는 광량이 줄어들고, point light 하나이다 보니 그림자가 완전히 검게 나타난다. 이런 상황에서는 ambient light가 정의되더라도 그림자와 그림자가 아닌 부분의 차이가 매우 크게 나타난다. 실제로는 그 경계가 모호하다. 때문에 point light를 쓰더라도 여러 개를 정의해서 사용해야 한다.

## Surface
BRDF는 물체의 반사 특성을 나타내는 만큼 Surface의 특징에 관한 term 또한 가지고 있다.
### Diffuse Materials
이전에 보았듯이 Diffuse Material은 입사한 빛을 모든 방향으로 같은 양을 반사시킨다. 때문에 diffuse materials는 빛이 들어오는 각도만 중요하다. 그 이유는 들어오는 각도에 따라 광량이 달라지기 때문이고, diffuse materials는 빛이 항상 모든 방향으로 일정하게 나가기 때문이다. 이러한 이유로 diffuse materials일 경우 BRDF가 중요하지 않아 상수로 대체된다. 그래서 실제로 완벽한 diffuse materials는 없지만, 벽과 같은 비슷한 surface들은 다음과 같이 근사할 수 있다.
<center>$$BRDF(\omega_{i}, \omega_{o}) = k_{d}</center>
<center>L_{o} = BRDF(\omega_{i}, \omega_{o})\hat{I}_{i}\cos\theta_{i} = k_{d}\hat{I}_{i}\cos\theta_{i}\qquad(=k_{d}\hat{I}_{i}\max(0,-\omega_{i}\cdot \hat{N})$$</center>

diffuse material이라도 광원의 위치에 따라 specular 처럼 보일 수 있다. 그러나 이는 그림자가 져서 그런 것으로 들어온 빛의 위치 때문이지 물체의 특성이 아니다.

### Ambient Lighting
BRDF에도 들어오고 diffuse되고 한 결과에 ambient light에 의해 반사되는 빛을 표현해주기 위한 term이 있다. 이는 사용될 빛에다 상수를 곱해서 표현된다. 이는 간단하게 $L_{o}=k_{a} \hat{I}_{i}$로 표현되며 k는 각  object에 대한 ambient reflectivity이다.

또한, R,G,B에 따라 다른 incoming ambient light를 사용하고 그에 따른 각각의 k도 존재하므로 다음과 같이 정리된다.
<center>$$(L_{o,R},\,L_{o,G},\,L_{o,B})=(k_{a,R}\hat{I}_{i,R}, \,k_{a,G}\hat{I}_{i,G}, \,k_{a,B}\hat{I}_{i,B})$$</center>

ambient light에 대해 이야기 했으므로 일반적인 Light Type을 다시 한번 정리해보자.
- **Ambient light** : 방향성이 없고 전체 균일하게 나타난다.
- **Directional light** : daylight처럼 parallel하게 들어오는 light. 때문에 daylight는 point light만으로는 표현하기 힘들 수 있다.
- **Point light**
- **Spoit light**
- **Area light** : point가 아닌 면적에서 나오는 빛으로 point를 모아서 표현하거나 한다.

## Reflection model
![image](https://user-images.githubusercontent.com/79836443/117576610-8480c200-b121-11eb-82ff-3af21149f3e3.png){:.align-center}

위에서 본 것처럼 중요한 term은 diffuse  term, 이와 반대되는 specular term, 그리고 ambient term이 있을 수 있다. 지금까지 설명한 것으로 볼 때, diffuse RGB, specular RGB, ambient RGB 이 9개의 종류의 빛이 camera로 들어오는 빛을 결정하는 요소가 된다. 이를 이용하면 좀 더 쉽게 BRDF를 결정할 수 있다.

이 요소들을 모아 **Phong model**은 다음과 같이 쓸 수 있다. 
<center>$$I=k_{d}I_{d}\,\mathbf{l\cdot n}+k_{s}I_{s}\,(\mathbf{v\cdot r})^{\alpha}+k_{a}I_{a}$$</center>
![image](https://user-images.githubusercontent.com/79836443/116072889-a6faf000-a6ca-11eb-9896-1332243a5284.png){:.align-center}

결과적으로 나가는 빛은 각 term에 해당하는 coefficient를 곱하고 모두 더해주는 형태로 나타난다. 

**diffuse term**은 들어오는 빛(I)에만 영향을 받기 때문에 I, 그리고 들어오는 빛과의 각도를 알아야 하기 때문에 normal 방향(n)이 영향을 주고, 

**specular term**은 어디로 나가는지(r) 중요하고, 이 주로 나가는 r에서 어떻게 떨어진 곳에서 보는지(v)에 따라 결정해줘야 하기 때문에 이 둘이 중요하고, 

**ambient**는 전체적인 빛의 크기를 생각해주면 된다.

![image](https://user-images.githubusercontent.com/79836443/117576999-e261d980-b122-11eb-93f0-93d896521817.png){:.align-center}

그래서 phong model은 이렇게 3가지 term을 모든 Light source에 대해서 더해주면 특정 시점에서의 빛을 계산해 줄 수 있다. 결국 BRDF는 이렇게 결정된다고 알 수 있다. 그 term들의 합으로 위의 그림과 같이 표현될 수 있다.
