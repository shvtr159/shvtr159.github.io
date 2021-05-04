---
title: "[Computer Graphics #5-1] Viewing"
categories:
- Graphics
---

vertex, line 등을 이용해서 model을 만들고 나면 그 model을 어떻게 바라보는지 알아야 그 시점에 맞게 rendering 할 수 있다.

## Fundamental Types of Viewing
- **Perspective view** : COP(Center Of Projection)이 유한하고, 이 점으로 모든것을 projection 한다. 사람이 보는것과 유사하기 때문에 realistic한 정도가 커진다.
- **Parrallel view** : DOP(Direction of Projection), 즉 특정 방향으로 projection 한다. realistic한 정도는 떨어지지만 실제 정보를 얻기에 좋다.

![image](https://user-images.githubusercontent.com/79836443/116818776-03b54980-aba8-11eb-84b4-f73f74fb001e.png){:.align-center}{: width="90%" height="90%"}

## Projection의 종류 - Parallel view
### Orthographic Projection
모든 projection을 parallel하게 수행한다. 길이와 각도 등의 정보를 유지하기 때문에 정확한 크기, 모양을 파악하기가 쉽다. 이 projection은 물체의 성질이 유지되기때문에 설계도, 도면 등에 사용하기 좋다. 

![image](https://user-images.githubusercontent.com/79836443/116819020-2dbb3b80-aba9-11eb-968b-1e6b836fec92.png){:.align-center}{: width="90%" height="90%"}

### Axonometric Projection
모든 projection을 parallel하게 수행한다. 그러나 이 projection은 길이는 유지되지만 각도는 유지되지 않는다. Orthographic Projection보다 현실감이 더 좋지만 각도가 유지되지 않는다는 점에서 정확한 정보를 필요로 할때는 알맞지 않다. 여기서 정확도를 잃지만 현실성에는 trade-off 관계가 있다는 것을 알 수 있다. 

이 projection은 어디로 projection 하느냐에 따라 그 이름이 달라진다. 
- Dimetric : axonometric projection을 수행한 결과에서 볼수 있는 면이 2곳일 때.
- Trimetric : 일반적인 case로 3개의 면이 보일 때.
- Isometric : 3 면이 모두 보이면서 보이는 면의 각이 모두 똑같을 때 (Trimetric의 special case).

![image](https://user-images.githubusercontent.com/79836443/116819250-3d874f80-abaa-11eb-8747-672064acc0b0.png){:.align-center}

### Oblique Projection
이 projection 또한 parallel하게 수행되지만 약간의 distortion이 추가된다. 사실은 존재하지 않는 projection으로 shearing을 수행해서 보일수 없는 뒤쪽 면이 보이게 되기도 한다. 그러나 여전히 정면과 측면은 parallel이 유지된다.

![image](https://user-images.githubusercontent.com/79836443/116819422-05ccd780-abab-11eb-911f-a4be6dbe8da6.png){:.align-center}


## Projection의 종류 - Perspective view
### Perspective Projection
사람의 눈과 같이 한 점으로 들어오도록 projection을 수행해서 사람이 보는것과 유사하게 나타낸다. 이 projection은 vanishing point(소실점)의 갯수에 따라 3가지 종류가 있다.
1. one-point perspective
2. two-point perspective
3. three-point perspective

![image](https://user-images.githubusercontent.com/79836443/116819717-2fd2c980-abac-11eb-8c96-cf477efdc141.png){:.align-center}

이때, 3차원이기 때문에 3개까지 있을 수 있지만 1개나 2개밖에 없는 경우는 나머지 point들을 만드는 방향이 parallel해서 무한하기 때문에 확인할 수 없다. 이 차이는 물체의 특징이 아닌 내가 보는 위치에 따라 달라지는 특징으로  내 시점에 따라 물체의 모양이 결정된다.
