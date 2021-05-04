---
title: "[Computer Graphics #6-1] Meshing and Geometry - OpenGL"
categories:
- Graphics
---

0차원(점), 1차원(선), 2차원(면)을 이용해 가상의 3차원(공간)에 물체를 표현할 때, **가상의 물체의 면을 Mesh**라고 하고, 이 표현으로 생성된 물체를 Geometry라 한다.이번 챕터에서는 3차원의 물체를 표현하기 위해 mesh를 생성하는 방법과 mesh와 vertex를 이용해 어떻게 geometry를 나타낼 것인지를 알아본다. 이번 글에서는 OpenGL을 이용한 Vertex, Line, Mesh 생성 방법을 먼저 알아본다. 

## Point, Line
### Point
```
glBegin(GL_POINTS);
	glVertex2fv(p0);
	glVertex2fv(p1);
	glVertex2fv(p2);
	glVertex2fv(p3);
	glVertex2fv(p4);
	glVertex2fv(p5);
	glVertex2fv(p6);
	glVertex2fv(p7);
glEnd();
```
![image](https://user-images.githubusercontent.com/79836443/114263733-41e4a080-9a22-11eb-8034-26327c99b934.png){:.align-center}{: width="30%" height="30%"}
가상의 크기를 가지는 point를 생성한다.

### Line Segments

```
glBegin(GL_LINES);
	glVertex2fv(p0);
	glVertex2fv(p1);
	glVertex2fv(p2);
	glVertex2fv(p3);
	glVertex2fv(p4);
	glVertex2fv(p5);
	glVertex2fv(p6);
	glVertex2fv(p7);
glEnd();
```
![image](https://user-images.githubusercontent.com/79836443/114263578-67bd7580-9a21-11eb-8598-962bdd3adf1d.png){:.align-center}{: width="30%" height="30%"}

두 point씩 짝을 지어 line을 생성한다.

### Polylines - Line  Strip
```
glBegin(GL_LINE_STRIP);
	glVertex2fv(p0);
	glVertex2fv(p1);
	glVertex2fv(p2);
	glVertex2fv(p3);
	glVertex2fv(p4);
	glVertex2fv(p5);
	glVertex2fv(p6);
	glVertex2fv(p7);
glEnd();
```
![image](https://user-images.githubusercontent.com/79836443/114263748-5032bc80-9a22-11eb-9d85-6655068cd794.png){:.align-center}{: width="30%" height="30%"}

point들을 모두 순서대로 연결해서 끈 형태의 line을 생성한다.
### Polylines - Line  Loop
```
glBegin(GL_LINE_LOOP);
	glVertex2fv(p0);
	glVertex2fv(p1);
	glVertex2fv(p2);
	glVertex2fv(p3);
	glVertex2fv(p4);
	glVertex2fv(p5);
	glVertex2fv(p6);
	glVertex2fv(p7);
glEnd();
```
![image](https://user-images.githubusercontent.com/79836443/114263755-5c1e7e80-9a22-11eb-96f4-adec75cea4a8.png){:.align-center}{: width="30%" height="30%"}
point들을 모두 순서대로 연결한 뒤 처음 point와 끝 point도 연결해 닫힌 Loop를 생성한다. point의 순서가 바뀌면 바뀐 순서대로 연결된다.

## Polygons
- Polygon : close된 loop로 만들어지면서 그 내부가 채워져 있는 개체

polygon은 polygon을 이루는 edge가 다른 polygon과 겹쳐짐의 유무에 따라 겹쳐지지 않는 simple polygon과 겹쳐지는 nonsimple polygon으로 나누어진다
 
 어떤 polygon을 사용하는 것이 더 좋을 것인지 고민한 결과 polygon의 quality를 나누는 기준을 정하게 되었다. 그 기준은 **convexity**로 polygon 내부의 임의의 두 점을 선택해 두 점을 연결하는 선을 그렸을 때, 그 선 위에 있는 모든 점이 polygon 내부에 존재할 때 그 polygon은 convex하다고 말할 수 있다.
 
 ### Polygon
 ```
glBegin(GL_POLYGON);
	glVertex2fv(p0);
	glVertex2fv(p1);
	glVertex2fv(p2);
	glVertex2fv(p3);
	glVertex2fv(p4);
	glVertex2fv(p5);
	glVertex2fv(p6);
	glVertex2fv(p7);
glEnd();
```
![image](https://user-images.githubusercontent.com/79836443/114264175-53c74300-9a24-11eb-8c49-7eda77b93dad.png){:.align-center}{: width="30%" height="30%"}
LINE_LOOP와 같이 point들을 모두 연결하여 closed loop를 만든 뒤 polygon이 될 수 있도록 내부를 point가 가지는 vertex color값으로 채운다. color가 달라질 경우 interpolation한 색으로 결정된다.

### Quadrilaterals
 ```
glBegin(GL_QUADS);
	glVertex2fv(p0);
	glVertex2fv(p1);
	glVertex2fv(p2);
	glVertex2fv(p3);
	glVertex2fv(p4);
	glVertex2fv(p5);
	glVertex2fv(p6);
	glVertex2fv(p7);
glEnd();
```
![image](https://user-images.githubusercontent.com/79836443/114264541-79554c00-9a26-11eb-8cb4-90a116a9d477.png){:.align-center}{: width="30%" height="30%"}
4개의 점을 가지는 면, 즉 point 4개를 이용해 사각형을 생성한다.

### Quadstrip
 ```
glBegin(GL_QUAD_STRIP);
	glVertex2fv(p1);
	glVertex2fv(p2);
	glVertex2fv(p3);
	glVertex2fv(p0);
	glVertex2fv(p7);
	glVertex2fv(p4);
	glVertex2fv(p5);
	glVertex2fv(p6);
glEnd();
```
![image](https://user-images.githubusercontent.com/79836443/114264544-7e1a0000-9a26-11eb-9714-abc55d310ed7.png){:.align-center}{: width="30%" height="30%"}
Quadrilaterals와 같이 4개의 point를 이용해 사각형을 생성하지만, 빈 부분 없이 polygon을 생성하기 위해 마지막 2개의 point로 생성되는 line을 공유하도록 한다. 위 코드를 예시로 1, 2, 3, 0과 3, 0, 4, 5 사각형은 3, 0 piont로 생성되는 line을 공유하도록 생성된다. 

### Triangles
 ```
glBegin(GL_TRIANGLES);
	glVertex2fv(p0);
	glVertex2fv(p1);
	glVertex2fv(p2);
	glVertex2fv(p3);
	glVertex2fv(p4);
	glVertex2fv(p5);
	glVertex2fv(p6);
	glVertex2fv(p7);
glEnd();
```
![image](https://user-images.githubusercontent.com/79836443/114264533-6c385d00-9a26-11eb-99a9-5ad8423c61a7.png){:.align-center}{: width="30%" height="30%"}
일반적으로 삼각형을 사용하는 것이 모델을 만들 때 더 detail한 shape를 표현할 수 있는 등 장점이 많기 때문에 삼각형을 기본적인 단위로 사용한다. 위의 방법으로 삼각형을 생성하는데 순서대로 삼각형을 생성하고, 3개의 점이 결정되지 않는 경우 생성하지 않는다. 위의 코드에서는 p6과 p7이 point 2개로 끝이 나기 때문에 두 point는 사용하지 않고 2개의 삼각형이 생성됐다.

### Triangle Strip
 ```
glBegin(GL_TRIANGLE_STRIP);
	glVertex2fv(p0); 
	glVertex2fv(p7); 
	glVertex2fv(p1); 
	glVertex2fv(p6); 
	glVertex2fv(p2); 
	glVertex2fv(p5); 
	glVertex2fv(p3);
	glVertex2fv(p4);
glEnd();
```
![image](https://user-images.githubusercontent.com/79836443/114264519-617dc800-9a26-11eb-841b-2407fe695428.png){:.align-center}{: width="30%" height="30%"}
Quardstrip과 마찬가지로 point 내부를 모두 polygon으로 생성하기 위해 같은 방법을 사용한다. 마지막 2개의 point로 생성되는 line을 공유하도록 삼각형을 연속해서 생성한다.

### Triangle Fan
 ```
glBegin(GL_TRIANGLES);
	glVertex2fv(p0);
	glVertex2fv(p1);
	glVertex2fv(p2);
	glVertex2fv(p3);
	glVertex2fv(p4);
	glVertex2fv(p5);
	glVertex2fv(p6);
	glVertex2fv(p7);
glEnd();
```
![image](https://user-images.githubusercontent.com/79836443/114264451-051aa880-9a26-11eb-9a37-0f822cd07da3.png){:.align-center}{: width="30%" height="30%"}
첫 번째 point를 항상 포함하는 삼각형들을 생성한다. Strip의 경우 접히거나 곡면의 상황을 표현하기에 적합하지 않지만 Fan을 사용할 경우 더 자연스러운 결과를 얻을 수 있다. 이처럼 같은 삼각형들을 생성하더라도 그 topology에 따라 모델과 상황에 따른 적합한 삼각형의 구성이 달라진다.


## Polygon을 생성하면서 나타날 수 있는 문제
정사면체를 rendering할 때 오른쪽의 그림이 제대로 rendering 된 정사면체이고, 왼쪽의 그림이 잘못 rendering된 정사면체이다. 왼쪽의 정사면체는 뒤쪽에 있어야 할 면이 rendering 과정에서 앞쪽의 면들을 덮어버렸다. 이는 앞에서부터 순서대로 polygon을 만들기 때문에 나타나는 문제로 앞쪽이 먼저 만들어진 뒤 뒤쪽이 만들어진다면 이미 rendering된 앞쪽을 뒤쪽 면이 덮게 된다.
![image](https://user-images.githubusercontent.com/79836443/114264746-a9e9b580-9a27-11eb-981b-924d4206d8d0.png){:.align-center}{: width="50%" height="50%"}

문제는 올바른 point의 순서(polygon이 생성되는 순서)는 시점에 따라 매번 변하기 때문에 시점이 변할 때마다 depth를 계산하여 처리하거나 하는 일이 필요하다. 이 기능 중 하나가 이전 글에서 이야기한 Hidden-Surface Removal 방식이다.

그러나 Hidden-Surface Removal이 매번 잘 동작한다는 보장이 없기 때문에 이러한 기능을 구현하기위해 rendering할때 **z(depth)-buffer**를 이용한 depth test를 수행한다. 
### OpenGL
```
glutInitDisplayMode (GLUT_SINGLE | GLUT_RGB | GLUT_DEPTH)

glEnable(GL_DEPTH_TEST)

glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT)
```
