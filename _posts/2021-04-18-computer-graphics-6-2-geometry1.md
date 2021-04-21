---
title: "[Computer Graphics #6-2] Meshing and Geometry"
---

이번 내용은 적절한 mesh를 생성하기위한 방법과 생성된 Mesh와 vertex들을 이용해 적절한 Geometry를 생성하기 위한 방법에 대해서 이야기 한다.


## Delaunay triangulation (들로네 삼각분할)
저번 글에서 OpenGL을 이용해 Vertex와  Line, Mesh를 위한 triangle을 만드는 방법 등에 대해 알아보았다. triangle을 생성하는 함수에서 간단히 이야기했듯이 모델과 상황에 따라 적절한 triangle의 모습은 다르지만 대체로 **정삼각형**에 가까운 형태가 가장 좋은 형태로 여겨진다.

이러한 좋은 triangle을 만들기 위해 적절한 vetrex 3개를 선택해야만 하는데 이때 Delaunay triangulation을 사용하게 된다. 들로네 삼각분할의 가장 큰 특징은 **"세 점으로 외접원을 그렸을 때 그 원 내부에 다른 점은 존재하지 않는다."** 이다. 

삼각형이 정삼각형에서 멀어질수록(삼각형의 최소 내각이 작아질수록) 삼각형의 외접원은 점점 커지기 때문에 원 내부에 삼각형의 vertex 외에 다른 점을 포함하게 될 수 있다. 그러므로  이 특징을 만족시키며 만든 삼각형들은 **삼각형의 최소내각을 최대화 하는 방향으로 이루어지며 이는 작은 원을 만드는 것으로 연결되고 좋은 triangle을 만들게 된다.**

이 과정은 순차적으로 삼각형으로 만들어 간 뒤 남은 vertex로 자연스럽게 만들어지는 triangle들의 상태를 판단하며 여러번에 걸쳐 global optima를 찾아가기 때문에 시간이 더 걸리게 된다. 

또한, 이를 3차원에서 수행할 경우 noise나 물체의 모양에 따라 물체 내부로 평면이 생기는 등의 문제가 발생할 수 있다. 이 때는 같이 Mesh를 만들고자 하는 local 영역의 vertex들을 2차원 평면에 투영시켜 삼각분할을 수행한 뒤 그 topology를 3차원에 적용시키는 방법을 사용한다.

## Mesh Construction - Subdivision
모델을 자세하게 만들기 위해서는 수많은 vertex, edge들이 필요하다. 그러나 이 수많은 vertex들을 수작업으로 만드는것은 매우 힘들기 때문에 자동으로 새로운 vertex들을 생성하고 위치시키는 방법을 사용하게 된다. 그 절차는 다음과 같다.
1. 저해상도의 model을 직접 만든다.
2. automatic한 방법/알고리즘으로 그 mesh를 refine 한다.
3. refine한 mesh를 semi-automatic한 방법/알고리즘으로 수정한다.
4. 이를 반복하며 더 좋은 model을 생성해나간다.

### Subdivision
mesh construction을 위한 방법으로 수작업으로 만든 rough한 model에 vertex를 추가하여 더 매끄러운 model로 만든다. 이 때 전제조건은 model의 global한 shape은 다 표현되어있다는 것이다. subdivision을 이용해서는 없던 뿔을 만드는 것처럼 새로운 것을 자동으로 추가할 수 없다. 즉 subdivision이 수행하는 과정은 다음과 같다.

![image](https://user-images.githubusercontent.com/79836443/115521177-e047f000-a2c5-11eb-9b76-3994cf63d7ff.png){:.align-center}{: width="90%" height="90%"}

기존의 vertex 사이에 새로운 vertex를 추가한다. 그 새롭게 추가된 vertex는 기존의 vertex 사이에 존재하게 되는데 기존의 점을 잇는 직선상에 존재한다면 새로운 vertex가 추가되더라도 형태 변화에 의미가 없다. 이에 curve를 표현하기 위해 새로 추가된 vertex는 곡률이 유지되도록 약간 바깥쪽으로 생성된다. 이 작업을 반복하면 가장 왼쪽의 모습에서 가장 오른쪽의 모습으로 둥글게 변하게 된다.

이렇게 새로운 vertex를 추가할 때에는 vertex의 위치를 결정하기 위한 rule이 필요하다. 이 rule은 **Continuity**로 연속성이 유지되는 형태로 subdivisioni을 수행한다. Continuity의 종류에는 C0, C1, C2 등이 있고 숫자는 derivative를 의미하게 된다.
- C0 :  point-wise의 continuous로 curve는 단지 vertex의 연결만을 보장하도록 생성된다.
- C1 : 1차 미분의 연속성으로 vertex가 연결될 때, 그 기울기가 연속되도록 생성된다.
- C2 : 2차 미분의 연속성으로 vertex가 연결될 때, 2차 미분값, 즉 기울기의 변화량(곡률)이 유지될 수 있도록 생성된다.

### Subdivision - Vertex의 이동
 기존의 vertex들은 이동시키지 않고 새로운 vertex만을 이동시킨다고 했지만 실제로 만들다 보면 기존의 vertex들도 조금씩 이동하면 더 좋은 형태의 model을 만들 수 있는 경우도 있다. 결국 새로 vertex를 생성하고 이동하면서 새로운 triangle들을 만드는 작업을 먼저 수행하고, 이후에 기존의 vertex도 이동시켜주는 작업을 수행하게 된다. 이 때 새로운 vertex와 기존의 vertex를 이동하는데 고려하는 방법은 다음과 같다.
 
![image](https://user-images.githubusercontent.com/79836443/115542791-9a962200-a2db-11eb-885c-c056028eef03.png){:.align-center}

위 사진에서 보는것과 같이 **새로 생긴 vertex**에 연결된 2 점만 사용하는것보다 그 주변의 점도 같이 사용하면 더 좋다. 이에 따라 그 주위의 vertex에 가중치를 다르게 주어 그 위치를 결정핟다.  
**original 점** 또한 원래 존재하며 연결된 vertex들에 준 가중치를 기준으로 이동하게 된다. 이 때, 그 가까운 정도와 직접 연결됐는지 등에 따라 그 가중치를 다르게 준게 된다.

#### subdivision 후 vertex의 종류에 따른 위치 변화

- 새롭게 생긴 vertex
![subdivision_new](https://user-images.githubusercontent.com/79836443/115544613-c61a0c00-a2dd-11eb-9f5d-4082e23f92af.gif){:.align-center}{:width="70%" height="70%"}

- 기존에 존재하던 vertex
![subdivision_origin](https://user-images.githubusercontent.com/79836443/115544618-c74b3900-a2dd-11eb-94bb-321386ae11f2.gif){:.align-center}{:width="70%" height="70%"}

- 기존에 존재하던 extraordinary vertex
![subdivision_extra](https://user-images.githubusercontent.com/79836443/115544620-c7e3cf80-a2dd-11eb-9c50-cc0d2f8869dd.gif){:.align-center}{:width="90%" height="90%"}

## subdivision 진행 과정과 결과

![subdivision](https://user-images.githubusercontent.com/79836443/115544092-2197ca00-a2dd-11eb-8d78-8d9a249d27d7.gif){:.align-center}{:width="90%" height="90%"}

suvdivision을 수행하며 model은 점점 매끄러워지지만 그만큼 튀어나온 부분은 사라지게 된다.
