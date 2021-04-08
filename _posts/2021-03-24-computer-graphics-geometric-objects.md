---
title: "[Computer Graphics] Lec1 빛과 색"
use_math: true
categories:
- Graphics
---

그래픽을 만들어내기 위해서는 빛에 대한 내용을 알고 있어야 합니다.

## Light
태양과 형광등과 같은 일반적인 광원은 가시광선의 거의 모든 영역을 포함하고있기 때문에 모든 색을 표현할 수 있습니다. 그러나 광원에서 나오는 빛의 색이 한정되어있는 경우도 있기때문에 광원에서 나온 빛이 물체에 반사되어 카메라로 들어올 때의 모습을 표현하기 위해 빛의 특징 또한 알고있어야 합니다.

#### 전자기파
빛은 전자기파로 이루어져있는데 그중 우리가 볼 수 있는 400nm ~ 700nm 의 파장을 가지는 전자기파를 **가시광선(Visible spectrum)**이라고 부릅니다. 이 외에도 400nm보다 파장이 짧은 쪽에 자외선(Ultra Violet), 700nm보다 파장이 긴쪽에 적외선(Infra Red)이 있습니다. 그래픽스에는 주로 눈에 보이는 부분을 다루기 때문에 가시광선 부분을 주로 사용합니다. 
![SL_EMspectrum](https://user-images.githubusercontent.com/79836443/113173311-35bf4d00-9284-11eb-9498-480fd7f31e41.jpg){: .align-center}{: width="70%" height="70%"}

빛의 3원색은 **Red, Green, Blue**로 빛은 합쳐질수록 흰색에 가까워지기에 태양과 형광등과 같이 가시광선의 모든 영역을 포함하고 있는 빛은 흰색으로 나타나게 됩니다. 만약 이 흰색의 태양빛이 물체에 닿으면 물체의 특성에 따라 일부 색은 흡수되고 일부 색은 반사됩니다.

우리가 물체를 볼 때, 물체의 색은 흡수된 색이 아닌 반사된 색이 눈에 들어와 물체의 색을 보게 됩니다. 그렇기때문에 모든 빛을 반사하는 물체는 흰색으로 보이고 모든 빛을 흡수한 물체는 검은색으로 보이게 됩니다.
이 반사되는 빛은 빛과 반사율에 의해 결정됩니다. 아래의 그림과 같이 빛의 세기가 더 세더라도 반사율에 따라 실제로 반사되는 빛의 세기가 달라지게 됩니다.

반사된 빛은 $R(\lambda)=r(\lambda)E(\lambda)=(1-a(\lambda))E(\lambda)$ 식과 같이 물체의 Reflectance X 빛의 세기의 형태로 반사되어 우리 눈에 들어오게 됩니다.

![Ref Abs](https://user-images.githubusercontent.com/79836443/113188907-9440f700-9295-11eb-8a0a-fbe5275c0e98.jpg){: .align-center}{: width="80%" height="80%"}
#### Sensor
이 반사된 빛을 저장하기 위해서 카메라는 sensor를 이용합니다. 카메라에 들어온 빛은 센서의 Photodiode에 도착하고 **광전자 효과(Photoelectric Effect)**에 의해 전기신호로 변환됩니다. 이 센서도 역시 R, G, B를 따로따로 받아들입니다. 초당 빛의 에너지를 저장합니다. 따로 받아들이기 때문에 실제로 그 위치가 서로 다른데 이 문제는 해상도를 높여 해결합니다. 

이 때 R, G, B 센서의 배열을 보면 2x2 사각형 안에 R 센서 1개, B 센서 1개, G 센서 2개로 센서가 구성되게 되는데, 이는 Green값이 밝기값에 더 민감한 정보이기때문에 2개를 사용하여 구성합니다. 이처럼 사람의 시각과 같이 R, G, B 3가지 색상을 기본으로 설정하기로 한 이론을 **Trichromatic Theory**라고 하며, 이미지나 프린터 등에서 이 3가지의 색을 이용해 여러가지 색을 나타내게 됩니다.

#### Brightness (Luminace)
사람의 눈은 color정보보다 밝기정보에 더 민감합니다. 그러나 real world는 높은 Dynamic Range를 가지는데 반해 카메라는 Dynamic Range가 크지 않아 아래와 같이 밝기를 조절하는데 어려움이 있습니다. 

![camera range](https://user-images.githubusercontent.com/79836443/113318829-d0cf2a00-934b-11eb-810c-d208828ace17.jpg)

이 문제를 해결하기 위해 **tone mapping**을 사용합니다.  tone mapping은 여러 Dynamic Range를 가진 사진을 합쳐 하나의 사진으로 만들어 높은 Dynamic range를 가질 수 있게 합니다. 그 예시로 아래 사진은 같은 장면을 여러 Dynamic Range를 가진 이미지로 나타낸 것으로 이 이미지들을 tone mapping 하여 새로운 이미지를 만들어 냅니다. 

![Dynamic range](https://user-images.githubusercontent.com/79836443/113319529-7c787a00-934c-11eb-966c-51a83ab229aa.jpg)
![tone mapping](https://user-images.githubusercontent.com/79836443/113319775-c4979c80-934c-11eb-9583-fdb418f750c3.jpg){: .align-center}{: width="50%" height="50%"}

#### 색 공간 (Color space)
1.**YUV** : Luminance와 chrominance를 분리해서 표현이 가능합니다. 밝기를 나타내는 유일한 채널 Y와 2가지 색 채널  U, V로 구성됩니다. RGB와의 관계는 다음과 같습니다.

$$\begin{bmatrix} Y\\ U\\ V \end{bmatrix} = \begin{bmatrix} .299 & .587 & .114\\ -.14713 & -.28886 & .436\\ .615 & -.51499 & -.10001 \end{bmatrix}\begin{bmatrix} R\\ G\\ B \end{bmatrix}$$

![YUV](https://user-images.githubusercontent.com/79836443/113321317-708db780-934e-11eb-8283-d483481d38ac.jpg){: .align-center}{: width="80%" height="80%"}

2. **RGB** : 가장 편하게 사용하는 좌표계입니다.
3. **HSV** : 사람이 이해하기 가장 쉬운 색 좌표계입니다. H는 Hue로 색의 종류, S는 Saturation로 채도를 나타냅니다. V는 Value로 밝기를 나타내게됩니다.
![HSV](https://user-images.githubusercontent.com/79836443/113321763-e09c3d80-934e-11eb-9df9-92899dde28cf.jpg){: .align-center}{: width="50%" height="50%"}
