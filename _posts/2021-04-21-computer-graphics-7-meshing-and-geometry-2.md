---
title: "[Computer Graphics #7] Meshing and Geometry 2"
---

Meshing and Geometry 1 에서는 기본적인 geometry를 위한 triangle을 만드는 것에 대해서 배워보았다. 이번 geometry2 에서는 post-processing을 해서라도 좀 더 다양한 shape를 만드는 방법에 대한 geometry를 알아본다.

## Points to Curve
![image](https://user-images.githubusercontent.com/79836443/115556206-61fe4480-a2eb-11eb-8fa8-245eaaddc283.png "https://slidetodoc.com/chapter-14-polynomial-interpolation-interpolation-extrapolation-interpolation-data/"){:.align-center}
<center><span style="color:rgb(150, 150, 150)">regression & interpolation</span></center><br>

우리가 vertex 위에 면을 붙이는 과정을**regression** 또는 **interpolation**에 해당하는 과정과 비교해서 이해할 수 있다. 

일반적으로 regression의 경우 한정된 관측값을 이용해서 noise가 포함됐을것을 가정하고 그 data들이 나타내는 모양이 어떤 모양에 가까울 것인지를 추론한다. 이 모양과 실제 관측값과의 차이는 약간의 error로 간주할 수 있다. 

interpolation은 주어진 점에 해당하는 값들이 정확하다고 가정하고 그 사이의 값들을 추정하여 data의 모양을 나타낸다. 
meshing을 할 때, vertex가 존재하고, 그 점들 사이를 triangle로 채웠다. 이 채웠다는 말은 존재하지 않는 부분에 대해 면으로 메꾸도록 interpolation을 수행했다고 볼 수 있다.
