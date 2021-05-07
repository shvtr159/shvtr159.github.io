---
title: "[Computer Graphics #3-2] Geometric Objects - Building Models"
categories:
- Graphics
---

우리가 만들어야 할 3D model의 기본은 vertex에서 시작한다. 모든 것을 vertex로 표현할 수도 있지만, 이는 계산량이 너무 많다. 때문에 우리는 vertex를 정의하고 그 vertex를 이어 triangle을 만들어 model을 표현한다. 이번 page에서는 model을 만들기 위한 간단한 data structure, representation 등을 알아본다.

일단 가장 기본적으로는 Vertex list를 사용하지만, Edge list를 사용하기도 한다.

## Representing
![image](https://user-images.githubusercontent.com/79836443/116817713-b84c6c80-aba2-11eb-81e2-2598b5cb3aab.png){:.align-center}

이 mesh를 보면 8개의 vertex면 충분히 표현할 수 있고, 이 vertex를 연결한 edge(line)는 12개이다. 그러나 당연히 vertex가 정의됐다고 자동으로 line이나 face가 정의되는 것은 아니기 때문에 이에 대한 정보도 기록되어있어야 한다

또, 만약 면이 정의된다고 해도 점의 순서를 어떻게 하냐에 따라 내부의 면과 외부의 면이 달라진다. 이 내부와 외부가 정확하게 정의되어야 face에 색이나 texture를 입혔을 때 원하는 대로 보이게 할 수 있다. 이때 **right-hand rule**을 적용하면 반시계방향으로 이동하며 엄지손가락이 향하는 방향이 외부의 면의 방향이 된다. 때문에 {v1, v6, v7}과 {v6, v7, v1}은 서로 같지만, {v1, v7, v6}은 달라진다.

## Geometry, Topology
**Geometry는 vertex들의 위치와 같이 3차원 형상, 모양을 나타내는 정보를 가지고 있고, Topology는 vertex, edge간의 연결 등에 대한 정보를 가지고 있다.** 예를 들어 vertex를 정의했을 때  veretx 하나의 위치를 바꾸면 그 모양이 바뀌고 Geometry가 바뀐다. 그러나 vertex의 위치가 바뀐다고 vertex간의 연결 관계가 변하지는 않는다. 즉 Topology는 유지되는 것이다. 예를 들어 사람의 손가락의 모양이 바뀐다면 geometry는 변화된다. 그러나 그 손가락들의 연결 관계는 변하지 않기 때문에 topology는 유지된다.

## List
### Vertex List
![image](https://user-images.githubusercontent.com/79836443/116818255-62c58f00-aba5-11eb-9b82-b2e2535e916a.png){:.align-center}{: width="80%" height="80%"}

8개의 vertex가 정의되고 이 상태에서 어떤 vertex들을 이용해 어떤 Polygon을 정의했는지 저장한다. 이때, **vertex의 위치값들이 geometry를 결정**하고, **Polygon을 만들기 위해 어떤 vertex들이 연결됐는지가 Topology를 결정**한다.

### Edge List
![image](https://user-images.githubusercontent.com/79836443/116818369-ee3f2000-aba5-11eb-986f-b3333997a710.png){:.align-center}{: width="80%" height="80%"}

8개의 vertex가 정의되고 이 상태에서 어떤 vertex들을 이용해 어떤 edge를 정의했는지 저장한다.
