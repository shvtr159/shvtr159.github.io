---
title: point cloud feature 논문에서 나오는 용어
---

## feature detector vs feature descriptor
**featrue detector** : interest point (key point, salient point) detector는 어떤 criterion에 따라 point를 선택하는 알고리즘이다. 일반적으로 interest point는 "cornerness" metric과 같이 어떤 함수의 local maximum을 의미한다.

**feature descriptor** : descriptor는 interest point의 주변 image patch를 설명하는 value의 vector이다. 이는 raw pixel value처럼 단순하거나, gradient orientation의 히스토그램처럼 복잡할 수 있다.

일반적으로 interest point와 해당 descriptor를 합쳐서 **local feature**라고 한다. local feature는 registration, 3D reconstruction, object detection/recognition 등에 사용된다.

즉, Harris, Min Eigen, FAST 등은 interest point detector, 자세히는 corner detector라고 할 수 있다. SIFT는 detector와 descriptor 둘 다 포함하는데, detector는 DoG를 base로 blob-like 구조의 중심을 detect하고,  gradient orientation의 히스토그램을 base로 descriptor의 역할을 수행한다.
