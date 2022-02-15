---
title: CNN 기타 정리
categories:
- ML
---

## CNN 연산
3차원의 합성곱 연산에서 3차원 데이터의 모양은 (채널, 높이, 너비) 또는 (높이, 너비, 채널)과 같은 순서로 쓴다.  필터도 마찬가지로 하여 합성곱의 출력은 다음과 같다.

![image](https://user-images.githubusercontent.com/79836443/133269875-502f2f87-f493-4330-8d20-6b21beb26478.png)

위 이미지에서는 출력 데이터의 채널이 1인데 다수의 채널을 내보내기 위해서는 다음과 같이 여러개의 필터를 사용하면 **필터 갯수만큼의 채널이 생성**된다.

![image](https://user-images.githubusercontent.com/79836443/133270157-b3de61c8-f1fb-4b53-b282-0300cbaaaa14.png)

bias는 다음과 같이 대응 채널의 원소에 모두 더해지므로 차원에는 변화가 없다.

![image](https://user-images.githubusercontent.com/79836443/133270362-c61205c2-c459-44fe-927d-8147ed63041c.png)

### 배치 처리
배치 처리를 지원하기 위해 데이터의 차원을 하나 늘려 4차원 데이터로 저장한다. 

![image](https://user-images.githubusercontent.com/79836443/133270577-6679a8ce-ffe9-4819-832d-76f87c564e01.png)

이렇게 되면 신경망에 4차원 데이터가 하나 흐를 때마다 데이터 N개에 대한 합성곱 연산이 이루어진다. 즉 N회 분의 처리를 한번에 수행한다.

### 차원 계산 공식
$W_1\times H_1\times D_1$이 input으로 들어올 때 차원을 결정하는데 4개의 하이퍼 parameter가 관여한다.
1. $K$ : filter의 개수
2. $F$ : filter의 크기
3. $S$ : stride
4. $P$ : zero padding의 크기

Conv layer을 거쳐 나온 $W_2\times H_2\times D_2$는 다음과 같이 계산된다.
- $W_2= $(W_1-F+2P)/S+1$ 
- $H_2= $(H_1-F+2P)/S+1$(width와 height는 똑같이 계산된다)
- $D_2= $K$(filter의 수와 동일)
## feature detector vs feature descriptor
**featrue detector** : interest point (key point, salient point) detector는 어떤 criterion에 따라 point를 선택하는 알고리즘이다. 일반적으로 interest point는 "cornerness" metric과 같이 어떤 함수의 local maximum을 의미한다.

**feature descriptor** : descriptor는 interest point의 주변 image patch를 설명하는 value의 vector이다. 이는 raw pixel value처럼 단순하거나, gradient orientation의 히스토그램처럼 복잡할 수 있다.

일반적으로 interest point와 해당 descriptor를 합쳐서 **local feature**라고 한다. local feature는 registration, 3D reconstruction, object detection/recognition 등에 사용된다.

즉, Harris, Min Eigen, FAST 등은 interest point detector, 자세히는 corner detector라고 할 수 있다. SIFT는 detector와 descriptor 둘 다 포함하는데, detector는 DoG를 base로 blob-like 구조의 중심을 detect하고,  gradient orientation의 히스토그램을 base로 descriptor의 역할을 수행한다.
