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
        "title": "[Computer Graphics #2] Transformation",
        "excerpt":"Transformation transform 작업은 이 변환들이 같은 수학적 group이라는 것을 알게 되면 여러 작업을 한 번에 수행할 수 있다는 큰 장점을 얻을 수 있다. group이 되기 위한 조건으로는 이 집합은 어떤 operator에 대해 닫혀있어야 한다. \\(A \\in G\\,and\\,B \\in G \\rightarrow A*B \\in G\\) 다음을 만족하는 identity element I가 존재해야 한다....","categories": ["Graphics"],
        "tags": [],
        "url": "/graphics/computer-graphics-lec-2-camera-model/",
        "teaser": null
      },{
        "title": "[Computer Graphics #3-1] Geometric Objects",
        "excerpt":"다양한 model을 만들기 위해서는 그 model을 구성하는 다양한 object에 대해 알아야 한다. 이러한 object들과 그 정의를 알아본다. Scalar, Points, and Vectors Scalar real number로 value 하나를 가진다. ex) point간 거리(distance)나 길이 등 Points 공간상에서의 절대적인 위치, 지점을 나타낸다. 그래픽스에서는 주로 vertex로 나타난다. Vectors 방향(direction)과 크기(magnitude)를 가지는 quantity. directed line segment....","categories": ["Graphics"],
        "tags": [],
        "url": "/graphics/geometric-objects/",
        "teaser": null
      },{
        "title": "[Computer Graphics #3-2] Geometric Objects - Building Models",
        "excerpt":"우리가 만들어야 할 3D model의 기본은 vertex에서 시작한다. 모든 것을 vertex로 표현할 수도 있지만, 이는 계산량이 너무 많다. 때문에 우리는 vertex를 정의하고 그 vertex를 이어 triangle을 만들어 model을 표현한다. 이번 page에서는 model을 만들기 위한 간단한 data structure, representation 등을 알아본다. 일단 가장 기본적으로는 Vertex list를 사용하지만, Edge list를 사용하기도 한다....","categories": ["Graphics"],
        "tags": [],
        "url": "/graphics/computer-graphics-3-2-geometric-objects-building-models/",
        "teaser": null
      },{
        "title": "[Computer Graphics #4] Transformation in 3D",
        "excerpt":"#2에서 2차원에서의 Transformation을 알아보았다. 이번에는 이를 확장하여 3D에서의 변환을 알아본다. Affine Transformation (아핀 변환) Transformation은 point(or vector)를 다른 point(or vector)로 매핑하는 것을 의미한다. 그중 Affine 변환은 선형변환이라는 특징을 가진다. 이는 선이 변환됐을 때 곡선과 같이 변하는 것이 아니라 선형성을 유지하는 변환이다. Computer Graphic에서 대부분의 변환은 affine 변환으로 translation, rotation, scaling,...","categories": ["Graphics"],
        "tags": [],
        "url": "/graphics/computer-graphics-4-transformation/",
        "teaser": null
      },{
        "title": "[Computer Graphics #5-1] Viewing",
        "excerpt":"vertex, line 등을 이용해서 model을 만들고 나면 그 model을 어떻게 바라보는지 알아야 그 시점에 맞게 rendering 할 수 있다. Fundamental Types of Viewing Perspective view : COP(Center Of Projection)이 유한하고, 이 점으로 모든것을 projection 한다. 사람이 보는것과 유사하기 때문에 realistic한 정도가 커진다. Parrallel view : DOP(Direction of Projection), 즉 특정...","categories": ["Graphics"],
        "tags": [],
        "url": "/graphics/computer-graphics-5-1-viewing/",
        "teaser": null
      },{
        "title": "[Computer Graphics #5-2] Viewing - Orthogonal Projection",
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
        "excerpt":"이번 내용은 적절한 mesh를 생성하기 위한 방법과 생성된 Mesh와 vertex들을 이용해 적절한 Geometry를 생성하기 위한 방법에 관해서 이야기 한다. Delaunay triangulation (들로네 삼각분할) 저번 글에서 OpenGL을 이용해 Vertex와 Line, Mesh를 위한 triangle을 만드는 방법 등에 대해 알아보았다. triangle을 생성하는 함수에서 간단히 이야기했듯이 모델과 상황에 따라 적절한 triangle의 모습은 다르지만 대체로...","categories": ["Graphics"],
        "tags": [],
        "url": "/graphics/computer-graphics-6-2-geometry1/",
        "teaser": null
      },{
        "title": "[Computer Graphics #7] Meshing and Geometry 2",
        "excerpt":"Meshing and Geometry 1 에서는 기본적인 geometry를 위한 triangle을 만드는 것에 대해서 배워보았다. 이번 geometry2 에서는 post-processing을 해서라도 좀 더 다양한 shape를 만드는 방법에 대한 geometry를 알아본다. Points to Curve regression &amp; interpolation 우리가 vertex 위에 면을 붙이는 과정을regression 또는 interpolation에 해당하는 과정과 비교해서 이해할 수 있다. 일반적으로 regression의 경우...","categories": ["Graphics"],
        "tags": [],
        "url": "/graphics/computer-graphics-7-meshing-and-geometry-2/",
        "teaser": null
      },{
        "title": "[Computer Graphics #8-1] Optics & Lighting - Shading",
        "excerpt":"지금까지는 물체의 vertex, mesh 등을 만들어 물체의 특징과 형상을 나타내는 것에 대해 배웠다. 그러나 실체 물체를 볼 때 물체가 같은 색과 형상을 가지고 있더라도 광원의 위치에 따라 다른 색으로 보이게 된다. 또, 빛이 물체의 표면에 닿게 되면 반사되기도 하고 흡수되기도 한다. 같은 물체라도 광원의 위치에 따라 색이 달라지고 흰 광원에서...","categories": ["Graphics"],
        "tags": [],
        "url": "/graphics/computer-graphics-8-optics-lighting/",
        "teaser": null
      },{
        "title": "[Computer Graphics #8-2] Optics & Lighting - Shaders",
        "excerpt":"Shading 1에서 shading을 위해 알아야 할 성질과 그 성질을 표현하는 함수 중 BRDF의 Phong model에 대해서 알아보았다. 이번에는 이어서 BRDF에서 사용하는 term에 대해 알아본다. BRDF에서 사용하는 모든 parameter는 다음과 같이 표현된다. $$\\mathrm{BRDF}(\\lambda, \\omega_{i},\\omega_{o}, u, v)$$ $\\lambda$ : 빛의 파장 $ \\omega_{i} = (\\theta_{i}, \\phi_{i})$ : 2D 입사광의 방향 $ \\omega_{o}...","categories": ["Graphics"],
        "tags": [],
        "url": "/graphics/computer-graphics-8-2-optics-lighting-shading-2/",
        "teaser": null
      },{
        "title": "[Computer Graphics #9] Shaders 2",
        "excerpt":"vertex를 연결해서 polygon을 만들고 그 polygon 위에 색을 줄 때 물체의 표면이 가지는 특징을 BRDF로 표현할 수 있었다. 색이라는 것은 사실 표면과 light source와의 상호작용에 의해 결정되기 때문에 정의 가능한 light source 또한 알아보았다. 최종적으로 특정 위치에서 볼 때 실제적으로 rendering을 하기 위해 사용되는 shader를 알아본다. Polygonal Shading 실제 우리...","categories": ["Graphics"],
        "tags": [],
        "url": "/graphics/computer-graphics-9-shader2/",
        "teaser": null
      },{
        "title": "[Computer Graphics #10] Texture Mapping",
        "excerpt":"실제로 모델을 만들 때는 vertex의 색으로 칠하는 것으로는 완벽하지 않다. 때문에 이에 맞는 texture를 모델에 입히는 과정이 필요하다. 각 geometry의 surface에 일치하는 real object의 부분의 polygon을 입혀준다. Mapping 이때 다음과 같은 u, v의 Texture Coordinates를 사용한다. weight를 이용해 model에서 vertex 위치를 interpolation 하면 model의 좌표에서 이미지의 좌표값이 나오므로 해당 이미지...","categories": ["Graphics"],
        "tags": [],
        "url": "/graphics/computer-graphics-10-texture-mapping/",
        "teaser": null
      },{
        "title": "point cloud feature 논문에서 나오는 용어",
        "excerpt":"feature detector vs feature descriptor featrue detector : interest point (key point, salient point) detector는 어떤 criterion에 따라 point를 선택하는 알고리즘이다. 일반적으로 interest point는 “cornerness” metric과 같이 어떤 함수의 local maximum을 의미한다. feature descriptor : descriptor는 interest point의 주변 image patch를 설명하는 value의 vector이다. 이는 raw pixel value처럼 단순하거나, gradient...","categories": [],
        "tags": [],
        "url": "/point-cloud-feature/",
        "teaser": null
      },{
        "title": "PU-Net review",
        "excerpt":"Abstract Key point : point당 multi-level feature들을 학습하고 multi-branch convolution unit을 통해 feature space에 implicit하게 point set을 확장한다. 이후 확장된 feature는 multitude of feature들로 분할한 뒤 upsampling된 point set로 재구성한다. 이 Network는 patch-level에서 적용되고, upsampling된 point들이 surface에 균일한 분포로 underlying할 수 있도록 하는 joint loss function를 가진다. some baseline 방법들과...","categories": ["논문"],
        "tags": [],
        "url": "/%EB%85%BC%EB%AC%B8/pu-net-review/",
        "teaser": null
      }]
