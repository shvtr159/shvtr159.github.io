---
title: "[Computer Graphics #5-1] Viewing"
categories:
- Graphics
use_math: true
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

## Camera view - OpenGL
### Positioning of the camera
카메라 위치의 위치를 평행이동 합니다. 
```cpp
glTranslatef(0.0, 0.0, -d);
```
![image](https://user-images.githubusercontent.com/79836443/117022489-40617c00-ad33-11eb-8dd0-05ac9922cc2a.png){:.align-center}

카메라를 회전 시켜 이동합니다. 아래 코드에서는 평행이동 후 y축을 기준으로 90도 회전합니다.
```cpp
glMatrixMode(GL_MODELVIEW); 
glLoadIdentity(); 
glTranslatef(0.0, 0.0, -d);
glRotatef(-90.0, 0.0, 1.0, 0.0);
```

### Look-At Function
카메라의 위치(eye), 어느 방향으로 볼 것인지(at), 어디가 위쪽 방향인지(up) 설정해서 모델을 볼 수 있도록 합니다.
'''cpp
gluLookAt(eyex, eyey, eyez, atx, aty, atz, upx, upy, upz);
'''
![image](https://user-images.githubusercontent.com/79836443/117023047-b534b600-ad33-11eb-96bb-282c301b3c4e.png){:.align-center}

이 외에도 다른 보는 방식으로
- **Roll, pitch, yaw**
![image](https://user-images.githubusercontent.com/79836443/117023983-8ec34a80-ad34-11eb-8fe0-f00d2af5d04d.png){:.align-center}

- **Elevation and azimuth** : 얼마나 돌리고 얼마나 올리는지. ex) 하늘의 별의 위치

등이 있다.

### Projection
- Simple Perspective Projection : Perspective projection으로 x, y와 z와의 관계가 나타난다. 
- Simple Orthogonal Projection : z값을 parallel하게 내려 그냥 0으로 만든다.

OpenGL에는 조건을 주는 2가지 방식이 있다.

- **Angle of view** : 카메라에서 주어진 angle에 들어온 대상을 보인다
```cpp
glMatrixMode(GL_PROJECTION); 
glLoadIdentity();
gluPerspective(fovy, aspect, near, far);
```
![image](https://user-images.githubusercontent.com/79836443/117026299-a0a5ed00-ad36-11eb-9e22-7eaca4ca0832.png){:.align-center}

  - fovy : 위(y)방향의 angle을 결정한다.
  - aspect ratio : 종횡비. 높이와 넓이의 비율
  - near, far : 앞뒤로 표시할 범위를 설정
<br><br>

- **View volume** : volume을 정해 그 volume 내의 대상을 보인다.

**Specification of a frustum**
```cpp
glMatrixMode(GL_PROJECTION); 
glLoadIdentity();
glFrustum(xmin, xmax, ymin, ymax, near, far);
```
![image](https://user-images.githubusercontent.com/79836443/117025681-152c5c00-ad36-11eb-8c31-21f5a0711542.png){:.align-center}

-far과 -near를 $z_{max}, z_{min}$으로 설정하여 해당 범위 내를 보여준다.

**Orthographic viewing**  
z는 평행하게 들어와 직육면체 모양의 view volume을 설정한다.
```cpp
glMatrixMode(GL_PROJECTION); 
glLoadIdentity();
glOrtho(xmin, xmax, ymin, ymax, near, far);
```
![image](https://user-images.githubusercontent.com/79836443/117025942-4dcc3580-ad36-11eb-8699-712dadb6a2e0.png){:.align-center}
