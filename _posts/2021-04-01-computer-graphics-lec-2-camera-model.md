---
title: "[Computer Graphics #2] Camera model"
categories:
- Graphics
use_math: true
---

## Transformation
transform 작업은 이 변환들이 같은 **수학적 group**이라는 것을 알게되면 여러 작업을 한번에 수행하는데 큰 장점을 얻을 수 있습니다.
group이 되기 위한 조건으로는
1. 이 집합은 어떤 operator에 대해 닫혀있어야 합니다.
$$A \in G\,and\,B \in G \rightarrow A*B \in G$$
2. 다음을 만족하는 identity element I가 존재해야합니다.  
$$A*I=I*A=A$$
3. element $A$는 다음을 만족하는 inverse $A^{-1}$이 존재해야합니다.
$$A^{-1}*A = A*A^{-1}=I$$

translation은 matrix로 나타나고 matrix의 곱셈은 닫혀있습니다. 2번과 3번조건 또한 I 행렬과 역행렬을 이용해 증명할 수 있습니다. 이렇게 이 수학적 group인것을 이용하면 다음과 같은 장점을 얻을 수 있습니다.

어떤 점들을 회전시킨 뒤 d만큼 이동시켰습니다. 다시 이 점들을 원래상태로 되돌리기 위해서는 -d만큼 이동한 뒤 다시 반대로 회전시켜야만 합니다. 그러나 이 group을 이용하면 회전을 $T_{1}$, 이동을 $T_{2}$라고 했을 때, 다시 원상태로 돌아가기 위해 $T_{1}^{-1} * T_{2}^{-1}$ 를 한번만 수행해주면 됩니다.

## 2D planar Transtormation의 종류
#### Translation
물체들 이동시킵니다.
