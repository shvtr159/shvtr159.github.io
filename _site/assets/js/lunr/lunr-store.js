var store = [{
        "title": "[Computer Vision] Harris corner detector",
        "excerpt":"이미지에서 코너는 edge 등에 비해 noise와 같은 문제에도 안정적으로 descriptor의 역할을 할 수 있습니다. 이 때 corner를 찾기 위해서 사용하는 알고리즘 중 harris corner detector에 대해서 알아봅니다. 1. Basic idea flat : 지역에서는 모든 방향으로 변화가 없음 edge : 영역에서는 edge 방향으로는 변화가 없으나 이에 수직한 방향으로는 변화가 있음. corner...","categories": ["Computer Vision"],
        "tags": [],
        "url": "/computer%20vision/harris/",
        "teaser": null
      },{
        "title": "3DMatch: Learning the Matching of Local 3D Geometry in Range Scans - 요약",
        "excerpt":"3. Geometric Representation geometric matching의 목표는 3D geometry의 ‘fragments’간 robust한 대응관계를 만드는 것이다. 5. Geometric Matching Network unified deep neural network 구조를 사용. feature network : 3D ConvNet을 이용하여 local 3D TDF volume을 고차원 feature representation에 mapping. metric network : fully connected 내적 layer들의 set를 통해 feature의 쌍들을 similarity value에...","categories": ["논문"],
        "tags": [],
        "url": "/%EB%85%BC%EB%AC%B8/paper_3dmatch/",
        "teaser": null
      },{
        "title": "[Computer Graphics #1] 빛과 색",
        "excerpt":"그래픽을 만들어내기 위해서는 빛에 대한 내용 또한 알고 있어야 한다. Light 태양과 형광등과 같은 일반적인 광원은 가시광선의 거의 모든 영역을 포함하고 있기 때문에 모든 색을 표현할 수 있다. 그러나 광원에서 나오는 빛의 색이 한정되어있는 경우도 있기 때문에 광원에서 나온 빛이 물체에 반사되어 카메라로 들어올 때의 모습을 표현하기 위해 빛의 특징...","categories": ["Graphics"],
        "tags": [],
        "url": "/graphics/computer-graphics-geometric-objects/",
        "teaser": null
      },{
        "title": "[Computer Graphics #2] Camera model",
        "excerpt":"Transformation transform 작업은 이 변환들이 같은 수학적 group이라는 것을 알게 되면 여러 작업을 한 번에 수행할 수 있다는 큰 장점을 얻을 수 있다. group이 되기 위한 조건으로는 이 집합은 어떤 operator에 대해 닫혀있어야 한다. \\(A \\in G\\,and\\,B \\in G \\rightarrow A*B \\in G\\) 다음을 만족하는 identity element I가 존재해야 한다....","categories": ["Graphics"],
        "tags": [],
        "url": "/graphics/computer-graphics-lec-2-camera-model/",
        "teaser": null
      },{
        "title": "[Computer Graphics #3] Geometric Objects",
        "excerpt":" ","categories": [],
        "tags": [],
        "url": "/geometric-objects/",
        "teaser": null
      },{
        "title": "[Computer Graphics #5] Viewing - Orthogonal Projection",
        "excerpt":"Normalization 통일성을 주기 위해 각각 다른 projection 종류에 맞는 projection matrix를 system에서 모두 수행하기보다 projection은 항상 orthogonal projection을 하도록 만든다. 이 orthogonal projection을 했을 때 원하는 projection의 모습을 나타낼 수 있도록 data의 형태를 바꿔준다. Pipeline View modelview transformation projection transformation perspective division clipping projection 이 5단계 중 앞의 1~3단계에서 각각의...","categories": ["Graphics"],
        "tags": [],
        "url": "/graphics/computer-graphics-lec6-viewing/",
        "teaser": null
      },{
        "title": "[Computer Graphics #6-1] Meshing and Geometry - OpenGL",
        "excerpt":"0차원(점), 1차원(선), 2차원(면)을 이용해 가상의 3차원(공간)에 물체를 표현할 때, 가상의 물체의 면을 Mesh라고 하고, 이 표현으로 생성된 물체를 Geometry라 한다.이번 챕터에서는 3차원의 물체를 표현하기 위해 mesh를 생성하는 방법과 mesh와 vertex를 이용해 어떻게 geometry를 나타낼 것인지를 알아본다. 이번 글에서는 OpenGL을 이용한 Vertex, Line, Mesh 생성 방법을 먼저 알아본다. Point, Line Point...","categories": ["Graphics"],
        "tags": [],
        "url": "/graphics/computer-graphics-6/",
        "teaser": null
      },{
        "title": "[Computer Graphics #6-2] Meshing and Geometry",
        "excerpt":"이번 내용은 적절한 mesh를 생성하기위한 방법과 생성된 Mesh와 vertex들을 이용해 적절한 Geometry를 생성하기 위한 방법에 대해서 이야기 한다. Delaunay triangulation (들로네 삼각분할) 저번 글에서 OpenGL을 이용해 Vertex와 Line, Mesh를 위한 triangle을 만드는 방법 등에 대해 알아보았다. triangle을 생성하는 함수에서 간단히 이야기했듯이 모델과 상황에 따라 적절한 triangle의 모습은 다르지만 대체로 정삼각형에...","categories": [],
        "tags": [],
        "url": "/computer-graphics-6-2-geometry1/",
        "teaser": null
      },{
        "title": "[Computer Graphics #7] Meshing and Geometry 2",
        "excerpt":"Meshing and Geometry 1 에서는 기본적인 geometry를 위한 triangle을 만드는 것에 대해서 배워보았다. 이번 geometry2 에서는 post-processing을 해서라도 좀 더 다양한 shape를 만드는 방법에 대한 geometry를 알아본다. Points to Curve regression &amp; interpolation 우리가 vertex 위에 면을 붙이는 과정을regression 또는 interpolation에 해당하는 과정과 비교해서 이해할 수 있다. 일반적으로 regression의 경우...","categories": [],
        "tags": [],
        "url": "/computer-graphics-7-meshing-and-geometry-2/",
        "teaser": null
      }]
