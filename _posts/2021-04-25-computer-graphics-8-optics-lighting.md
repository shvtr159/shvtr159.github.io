---
title: "[Computer Graphics #8] Optics & Lighting -Shading"
categories:
- Graphics
use_math: true
---

지금까지는 물체의 vertex, mesh 등을 만들어 물체의 특징과 형상을 나타내는 것에 대해 배웠다. 그러나 실체 물체를 볼 때 물체가 같은 색과 형상을 가지고 있더라도 광원의 위치에 따라 다른 색으로 보이게 된다. 

또, 빛이 물체의 표면에 닿게 되면 반사되기도 하고 흡수되기도 한다. 같은 물체라도 광원의 위치에 따라 색이 달라지고 흰 광원에서 나온 빛에 의해서도 물체는 다른 색으로 보일 수 있다. 이렇게 물체에 따라 흡수량과 반사량 등등이 달라지고 이로 인해 물체의 모습이 달라진다. 

이러한 것들 때문에 물체의 실제 형상에 맞도록 물체의 밝기 값을 변화시키는 일이 필요한데 이를 **shading**이라고 한다. shading이 추가되면 물체의 색을 보고 광원의 위치, 물체의 재질을 추측하는 등 다양한 정보를 드러낼 수 있다. 

shading을 하기 위해 필요한 고려사항으로는
- Light sources
- Material properties
- Location of viewer
- Surface orientation

등이 있다. shading을 실제와 같이 잘 나타내기 위해서는 어떻게 빛들이 동작하고 객체의 어떤 성질 때문에 어떤 형상이 나타나는지를 알아야 한다.
## Scattering
![image](https://user-images.githubusercontent.com/79836443/116068145-df97cb00-a6c4-11eb-9c08-a79405ce488a.png){:.align-center}

광원에서 나온 빛이 만약 A에 닿고 반사되면 그 빛이 B로 가서 다시 반사될 수 있다. 즉 빛은 어떤 물체에 부딪혔을때  때문에 어떤 물체에서 반사되어 눈으로 들어온 빛은 광원에서 바로 반사돼온 빛이 아니라 여기저기 반사된 뒤 온 빛일 수도 있다. **즉, 우리가 보고 있는 것은 수많은 Light path의 조합이다.** 그렇기 때문에 광원에서 반사되는 빛만을 확인한다면 실제 같지가 않다. 

이렇게 빛이 쏘여졌을 때, 주변과 어떤 상호작용을 하고 카메라 쪽으로 모여지는지를 계산하기 위해서 **Rendering Equation**을 사용한다. 그러나 실제와 같이 표현하기 위해서는 각 픽셀마다의 값들을 계산해야 하는데 이는 너무 많은 변수가 있어 계산 자체가 힘들다. 때문에 이런 모든 상황들이 반영되는 것은 불가능하므로 어떤 component를 넣었을 때 어떤 효과가 나는지 알고 있어야 좀 더 realistic하기 위해서는 어떤 것을 추가해야 하는지 알 수 있다.
### Global Effects
그 종류를 몇 가지 보자면, 어떤 scene을 보고 있을 때, 어떤 빛은 광원으로부터 직접 눈으로 들어오고, 또 어떤 빛은 물체에 반사되어 들어온다. 또 어떤 물체에 일부 빛은 흡수되거나 투명한 물체에 일부는 투과되고 일부의 빛만 반사되어 올 수 있다. 이러한 상황에서 광원이 쏘여지지 않은 부분은 그림자가 생긴다. 그런데 이때 **그림자는 완벽한 black이 아니다.** 그 이유는 광원으로부터 직접 오는 빛은 없지만 **다른 물체에 반사된 빛이 shadow부분에 닿고 거기서 또다시 반사된 빛이 눈에 들어오기 때문이다.** 이는 하나의 큰 광원만 존재하는 것이 아니라 **밝기가 다른 다양한 광원으로부터 나온 빛이 눈에 들어오는 것**이라고 생각할 수 있다. 이 관점에서 보면 내 주변의 모든 물체들은 모두 광원이라고 볼 수 있다.

그러나 Rendering을 할 때, 이렇게 모든 상황을 다 표현하는 것이 realistic 하게 하는 데 가장 좋지만, 어렵기 때문에 적절히 approximate하는 것이 필요하다. 이런 것을 얼마만큼 해야 하는지가 중요하다.

## Light Sources
Light를 이해하기 위해 이에 대해 알아본다. 광원은 물체를 볼 수 있도록 하는 가장 기본적인 원천이다. 일반적으로 가장 많이 사용하는 광원은 daylight이다. 그리고 우리는 이러한 빛들을 묘사해야 한다. 그러면 광원을 표현하기 위해 어떻게 해야 하는가?

실제 Light는 volume을 차지하는데 이렇게 되면 volume을 차지하는 각 부분에서 모두 빛이 나오게 된다. 그러다 보면 너무 많은 곳에서 빛이 오는 것처럼 되니 계산하기에 매우 어려워진다.

때문에 광원을 실제와는 다르게 이상적인 광원을 설정한다. 이러한 Simple Light Source는 다음과 같다.
- **Point source** : 광원이 volume을 차지하는 것이 아닌 하나의 point로 설정한다. Light가 오는 위치를 하나로 근사할 수 있어 물체로 오는 빛을 그 점에서 오는 하나의 직선으로 표현할 수 있다.
- **Spotlight** : 한 점에서 퍼져나가서 특정 영역만 비추는 light source. point source는 모든 방향으로 빛이 퍼져나가지만, 이는 특정 범위 내로만 빛이 나간다.
- **Ambient light** : 같은 양의 빛이 어디에나 존재하는 light source로 공간의 모든 부분에 light source가 존재한다. 전체적으로 어둡거나 밝은 분위기를 가져다주는 요건이다. multiple reflection을 모두 수행할 수 없기 때문에 reflection의 정도에 따른 변화를 표현해 줄 수 있도록 이를 전반적인 밝기로 근사시켰다. 실제로는 물론 존재하지 않는 가상의 light source이다.

## How Light Works
![image](https://user-images.githubusercontent.com/79836443/116069697-a6605a80-a6c6-11eb-935e-d3b813ec4d73.png){:.align-center}

빛이 물체에 닿게 되면 대표적으로 다음 3가지가 일어난다
- **Reflection (반사)**
- **Absorption (흡수)**
- **Transmission (투과)**

물체에서 일어나는 투과, 반사와 같은 일들은 물체의 매우 중요한 특징이다. 그래서 이 정보들을 모델에 담기 위해서 **distribution function**을 이용하여 그 관계를 표현한다. 이는 빛이 반사되거나 투과되는 분포가 어떤지를 마치 function처럼 표현한 것이다. 이 function을 이용해 어떤 function의 어떤 parameter인지를 설정하면 각 object의 특징들을 나타낼 수 있다. 

### distribution function

- **BRDF** (Bidirectional Reflectance Distribution Function) : 모델의 반사에 대한 정보를 표현하는 function
- **BTDF** (Bidirectional Transmittance Distribution Function) : 모델의 투과에 대한 정보를 표현하는 function
- **BSSRDF** (Bidirectional Surface Scattering Reflectance Distribution Function) : 모델의 반사와 투과 모두를 표현하는 함수

![image](https://user-images.githubusercontent.com/79836443/116071009-423e9600-a6c8-11eb-9bf1-be314aed5a9d.png){:.align-center}{: width="70%", height="70%"}
<center><span style="color:rgb(150, 150, 150)">BRDF vs BSSRDF</span></center><br>

이처럼 같은 모양과 색을 가진 물체더라도 빛의 특성에 따라 전혀 다른 물체가 될 수 있다.

## Surface Types
이렇게 물체의 표면에 닿았을 때 일어나는 빛의 특성과 그 성격에 따라 realistic한 정도가 달라지기 때문에 surface에서는 어떤 일이 일어나는지에 대해 알아본다.

물체의 표면은 크게 Smooth한 표면과 rough한 표면이 있다. Smooth는 표면이 fine하고 flat하다. 그 예로는 종이, 모니터 등이 있다. Rough한 표면은 표면이 꺼끌꺼끌하고 모양이 복잡하다. 그 예로는 돌, 사포 등이 있다.

![image](https://user-images.githubusercontent.com/79836443/116072319-e07f2b80-a6c9-11eb-9638-ff6b8549a433.png){:.align-center}

물체는 smooth한 surface일수록 들어온 빛이 한 방향으로 반사되고자 하는 경향이 강하고, rough한 surface일수록 모든 방향으로 반사되고자 하는 경향이 크다.

### Phong Model
이런 것들을 표현해주는 BRDF중에서 하나의 예가 Phong Model이다.  빛이 들어와서 퍼져나가는 성격을 설명해주는 가장 간단한 BRDF 모델로 다음 3개의 term을 가지고 있다. 
- Diffuse : 얼마나 퍼트려주는지 (like rough) 
- Specular : 얼마나 한쪽으로 모아서 반사되는지의 정도 (like smooth)
- Ambient : 위에 이야기했던 ambient와 비슷하게 전체적으로 밝고 어두운 정도를 조절

또, 이를 표현하기 위해 다음 4개의 vector를 이용한다.
- To source : 빛이 어디에서 오는지 (I)
- To viewer : 반사각을 기준으로 어디에서 보는지 (v)
- Normal : 빛이 어느 방향으로 나갈지를 결정하기 위한 normal 방향 (n)과 반사각 (r)
- Perfect reflector

![image](https://user-images.githubusercontent.com/79836443/116072889-a6faf000-a6ca-11eb-9896-1332243a5284.png){:.align-center}

만약 물체가 이상적인 반사를 하는 물체라면 이를 Ideal Reflector라고 하고 이 물체로 들어온 빛의 입사각과 반사각은 같다.

### Lambertian Surface
거울과 같이 들어오는 빛을 한 방향으로 모두 반사시키는 이상적인 smooth surface와 반대로 이상적인 rough surface의 형태를 뜻한다. 완벽하게 빛이 퍼져나가기 때문에 어디서 빛이 들어오든 간에 모든 방향으로 같은 양을 반사한다. 때문에 이 물체는 아무리 돌리더라도 물체의 부분 간에 밝기 차이가 없이 동일하게 보인다.

### Specular Surface
대부분의 표면은 이상적일 수 없다. 때문에 모두는 아니어도 한쪽 방향으로 많은 빛을 반사시키고자 하는 smooth surface의 경우 specular highlight를 가지게 되는데 이는 광원으로부터 들어온 빛들이 가장 많이 반사되는 방향에 camera가 위치하게 되면서 나타난다.

![image](https://user-images.githubusercontent.com/79836443/116073743-ca726a80-a6cb-11eb-89dd-834638265d54.png){:.align-center}

이러한 Specular Reflection을 모델링 하기 위해서 Phong model은 다음과 같은 term을 사용한다.

$$I_{r}\sim k_{s}Icos^{\alpha}\phi $$

- $I_{r}$ : reflected intensity
- $k_{s}$ : absorption coefficient. 반사될 빛의 총량을 결정
- $I$ : incoming intensty : 들어온 빛의 세기
- $cos{\alpha}\phi$ : shininess coefficient. specular term 내부.

이때,  shininess coefficient인 $cos^{\alpha}\phi$은 $\alpha$값이 커질수록 cos함수가 뾰족해지면서 specularity가 점점 심해진다. specularity가 점점 심해지면 빛이 한쪽 방향으로만 반사시키는 특성이 강해지게  된다.

![image](https://user-images.githubusercontent.com/79836443/116074937-55a03000-a6cd-11eb-95e5-26fb35b0597a.png){:.align-center}

때문에 $\alpha$값이 100~200일 경우 보통 metal과 같은 표면이 되고,  $\alpha$값이 5~10일 경우 보통 플라스틱과 같은 표면을 나타내게 된다.
