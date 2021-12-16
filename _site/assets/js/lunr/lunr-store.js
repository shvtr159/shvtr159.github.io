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
        "title": "기타 정리",
        "excerpt":"CNN 연산 3차원의 합성곱 연산에서 3차원 데이터의 모양은 (채널, 높이, 너비) 또는 (높이, 너비, 채널)과 같은 순서로 쓴다. 필터도 마찬가지로 하여 합성곱의 출력은 다음과 같다. 위 이미지에서는 출력 데이터의 채널이 1인데 다수의 채널을 내보내기 위해서는 다음과 같이 여러개의 필터를 사용하면 필터 갯수만큼의 채널이 생성된다. bias는 다음과 같이 대응 채널의 원소에...","categories": ["ML"],
        "tags": [],
        "url": "/ml/point-cloud-feature/",
        "teaser": null
      },{
        "title": "PU-Net: Point Cloud Upsampling Network",
        "excerpt":"Abstract Key point : point당 multi-level feature들을 학습하고 multi-branch convolution unit을 통해 feature space에 implicit하게 point set을 확장한다. 이후 확장된 feature는 multitude of feature들로 분할한 뒤 upsampling된 point set로 재구성한다. 이 Network는 patch-level에서 적용되고, upsampling된 point들이 surface에 균일한 분포로 underlying할 수 있도록 하는 joint loss function을 가진다. some baseline 방법들과...","categories": ["논문"],
        "tags": [],
        "url": "/%EB%85%BC%EB%AC%B8/pu-net-review/",
        "teaser": null
      },{
        "title": "PU-GAN: A Point Cloud Upsampling Adversarial Network",
        "excerpt":"Introduction PU-Net, EC-Net, MPU 등의 network들은 학습을 통해 point cloud upsampling의 장점을 입증했다. 그러나 이 네트워크들은 sparse하고 non-uniform한 low-quality inputs로부터 좋은 결과를 얻지 못할 수 있다. 그래서 upsampling과 data amendment 능력을 결합한 PU-GAN을 제안한다. 주된 기여는 latent space에서 다양한 point 분포를 생성하도록 generator를 학습시키고, 이 point set에 대해 implicit하게 평하가는...","categories": ["논문"],
        "tags": [],
        "url": "/%EB%85%BC%EB%AC%B8/pu-gan/",
        "teaser": null
      },{
        "title": "PointNet: Deep Learning on Point Sets for 3D Classification and Segmentation",
        "excerpt":"Abstract 기존에는 point cloud의 irregular한 형식때문에 regular한 3D voxel grid 또는 collection of images로 바꿔 사용하곤 했지만 이것은 불필요하게 많은 data가 렌더링 되는 문제가 있다. 그래서 여기서는 point cloud를 바로 사용하며 input point들의 permutation invariance1를 잘 고려하는 neural network를 설계하였다. PointNet은 object detection, part segmentation, scene semantic parsing에 이르는 application들을...","categories": ["논문"],
        "tags": [],
        "url": "/%EB%85%BC%EB%AC%B8/pointnet-deep-learning-on-point-sets-for-3d-classification-and-segmentation/",
        "teaser": null
      },{
        "title": "머신러닝 시스템의 종류",
        "excerpt":"핸즈온 머신러닝의 머신러닝 내용 일부를 정리. 머신러닝 시스템의 종류 머신러닝 시스템은 다음과 같이 분류할 수 있지만 서로 배타적이지 않고 원하는 대로 연결 가능하다. 훈련 지도 여부 : 지도 학습, 비지도 학습, 준지도 학습, 강화 학습 실시간 훈련 여부 : 온라인 학습, 배치 학습 훈련 지도 여부 지도 학습 (supervised learning)...","categories": ["ML"],
        "tags": [],
        "url": "/ml/ml/",
        "teaser": null
      },{
        "title": "PointNet++: Deep Hierarchical Feature Learning on\nPoint Sets in a Metric Space",
        "excerpt":"PointNet++은 PointNet이 point가 존재하는 metric space에 의해 유도된 local structure를 활용하지 못해서 fine-grained1 패턴들을 잘 인식하지 못하고 복잡한 scene들을 일반화하는 능력이 떨어지는 문제를 해결하기 위해 제안되었다. PointNet++은 입력 point set의 nested partitioning에 PointNet을 recursive하게 적용하는 hierarchical 신경망이다. 이 네트워크는 metric space distance를 활용하여 contextual scale이 증가하는 local feature를 학습할 수...","categories": ["논문"],
        "tags": [],
        "url": "/%EB%85%BC%EB%AC%B8/pointnet-deep-hierarchical-feature-learning-on-point-sets-in-a-metric-space/",
        "teaser": null
      },{
        "title": "[MLPR #1] Introduction",
        "excerpt":"Notation $\\underline{ \\textbf{x}}$ : data 벡터 prototypes: $\\underline{y}_ m^{(k)}$ : class $S_ {k}$에 속한 m번째 prototype k = class index $m_k$ = $S_ {k}$에 있는 prototype들의 번호 $\\underline{y}_ m^{(k)}$, m = 1,2, … , $m_k$ 는 class $S_ {k}$의 모든 prototype로 정의 Classification 각각의 Class를 나누기 위해서는 Decision Rule이 결정되어야...","categories": ["MLPR"],
        "tags": [],
        "url": "/mlpr/mlpr-1-notation/",
        "teaser": null
      },{
        "title": "[MLPR #] Bayes Decision Classification",
        "excerpt":"Bayes Decision Theory : 이 방식은 모든 확률 값들을 알고 있다고 가정한다(평균, 분산 등). Bayes Formula \\[P(S\\mid x)=\\frac{P(x\\mid S)P(S_k)}{P(x)}\\] $P(S\\mid x)$ : posterior probability (사후 확률) $P(x\\mid S)$ : likelihood (우도, 가능도) $P(S)$ : prior probability (사전 확률) $P(x)$ : Evidence Bayes Decision Rule for 최소 Error (2-class) \\[\\begin{matrix} p(S_1\\mid...","categories": ["MLPR"],
        "tags": [],
        "url": "/mlpr/mlpr-statistical-cassification1/",
        "teaser": null
      },{
        "title": "[MLPR #] Bayes Classifiers",
        "excerpt":"discriminant decision $g_i(\\underline{x})$를 이용하여 모든 $i \\neq j$에 대해 $g_i(\\underline{x})&gt;g_j(\\underline{x})$ 분류를 사용한다. 이를 probability term으로 표현하면   \\[g_i(\\underline{x})=p(S_i \\mid \\underline{x})\\]  \\[\\rightarrow \\; g_i(\\underline{x})=p(\\underline{x} \\mid S_i)P(S_i)\\]  \\[\\rightarrow \\; g_i(\\underline{x})=\\textup{ln}(p(\\underline{x} \\mid S_i))+\\textup{ln}(P(S_i))\\]  Normal Density  ","categories": ["MLPR"],
        "tags": [],
        "url": "/mlpr/mlpr-bayes-classifiers/",
        "teaser": null
      },{
        "title": "[MLPR #] Parameter Estimation 1 (미완)",
        "excerpt":"이전까지는 모든 statistics과 probability(prior probabiliteis, class-conditional densities(likelihood) 등)를 알 때 Bayes Classifier를 이용해 data가 어디에 속하는지 분류할 수 있었다. 그러나 이렇게 모든 statistics를 아는 상황은 드물기 때문에 data로부터 이를 추정해야만 한다. priori를 모른다고 가정할 때 다음 두 technique를 이용하여 $p(x\\mid S_{i})$를 추정할 수 있다. Parametric : $p(x\\mid S_{i})$의 form을 알거나,...","categories": ["MLPR"],
        "tags": [],
        "url": "/mlpr/mlpr-parameter-estimation/",
        "teaser": null
      },{
        "title": "[MLPR #] Parameter Estimation 2 (미완)",
        "excerpt":"Parameter Estimation 1에서 추정 방법중 Maximum likelihood에 대해 알아보았다. 2에서는 나머지 한가지 방법인 Maximum a Posterior (MAP) estimation에 대해서 알아본다. MLPR 11~13  ","categories": ["MLPR"],
        "tags": [],
        "url": "/mlpr/mlpr-parameter-estimation-2/",
        "teaser": null
      },{
        "title": "[MLPR #] Nonparameteric Estimation 1 (미완)",
        "excerpt":"이전까지 확률을 이용해 density function을 추정했다면 Nonparameteric Technique는 math form 없이 density를 추정한다. Introduction Estimation Procedure $x$의 density를 추정하기 위한 절차를 알아보자 영역 $R_1, R_2, …$을 생성한다. 이때 영역 $R_j$는 j개의 sample들로 구성된다. ?? $R_j$의 크기를 $V_j$라고 한다 $R_j$에 속해있는 sample들의 개수를 $k_j$라고 한다 $p(x)$의 j번째 추정은 $p_j(x)=[k_j/j]/V_j$이다. $p_j(x)$는 다음과...","categories": ["MLPR"],
        "tags": [],
        "url": "/mlpr/mlpr-nonparametric-estimation/",
        "teaser": null
      },{
        "title": "[MLPR #] Unsupervised Classification 1 (fisher)",
        "excerpt":"Supervised 에서는 data에 label도 있고 전체 class의 갯수를 알 수 있기때문에 data로부터 그 분포를 추정할 수 있었다. unsupervised classification은 이러한 정보가 없을 때 data를 구분하는 방법이다. Unknown targets를 분류하는 방법에는 다양한 방법이 있는데 다음과 같은 방법이 있다. Criterion function 방법 : Sum of squared error, Min. variance, Scatter matrices, Optimization...","categories": ["MLPR"],
        "tags": [],
        "url": "/mlpr/mlpr-unsupervised-classification-1/",
        "teaser": null
      },{
        "title": "[MLPR #] Unsupervised Classification 2 (미완)",
        "excerpt":"   Similarity and Similarity Measures   Chain Method of Clustering   Clustering Criterion Functions   Iterative Optimization   Clustering procedure – basic min. squared error   K-means Clustering   Hierarchical Clustering   Mixture Densities: Gaussian Mixtures   Component Analysis: PCA, ICA   Iterative Optimization  ","categories": ["MLPR"],
        "tags": [],
        "url": "/mlpr/mlpr-unsupervised-classification-2/",
        "teaser": null
      }]
