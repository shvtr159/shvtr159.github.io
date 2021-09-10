---
title: PU-Net review
use_math: true
categories:
- 논문
---

## Abstract
Key point : point당 multi-level feature들을 학습하고 multi-branch convolution unit을 통해 feature space에 implicit하게 point set을 확장한다. 이후 확장된 feature는 multitude of feature들로 분할한 뒤 upsampling된 point set로 재구성한다. 이 Network는 patch-level에서 적용되고, upsampling된 point들이 surface에 균일한 분포로 underlying할 수 있도록 하는 joint loss function를 가진다. some baseline 방법들과 optimization-based 방법들과 성능을 비교한다.

## 1. Introduction
> Recently, pioneering works [29, 30, 18] began to explore the possibility of reasoning point clouds by means of deep networks for understanding geometry and recognizing 3D structures. In these works, the deep networks directly extract features from the raw 3D point coordinates without using traditional features, e.g., normal and curvature.

최근, pioneering work들이 geometry를 이해하고, 3D structure를 recognize하기 위한 deep 네트워크를 통해 point cloud의 reasoning 가능성을 explore하기 시작했다. 이러한 연구들에서 deep network는 raw 3D point coordinate로부터 normal과 curvature같은 traditional feature들 없이 바로 feature들을 추출하였다

> First, unlike the image space, which is represented by a regular grid, point clouds do not have any spatial order and regular structure. Second, the generated points should describe the underlying geometry of a latent target object, meaning that they should roughly lie on the target object surface. Third, the generated points should be informative and should not clutter together. Having said that, the generated output point set should be more uniform on the target object surface. Thus, simple interpolation between input points cannot produce satisfactory results.

Image S.R과 달라하야는 이유 : 1. Regular grid로 표현되는 image와 달린 point cloud는 spatial 순서와 regular한 구조를 전혀 가지지 않는다. 2. 생성된 point cloud는 잠재적인 대상 object의 underlying geometry를 설명해야만 하며, 이는 대상 object의 표면에 rough하게 위치해야 한다는 것을 의미한다. 3. 생성된 point들은 정보를 제공해야하고 서로 clutter?? 해서는 안된다. 따라서, 생성된 output point set은 target object 표면에 균일하게 있어야 하므로 단순히 input point들을 interpolation 하는 것은 만족스러운 결과를 얻을 수 없다.

> Our network, namely PU-Net, learns geometry semantics of point-based patches from 3D models, and applies the learned knowledge to upsample a given point cloud. It should be noted that unlike previous network-based methods designed for 3D point sets [29, 30, 18], the number of input and output points in our network are not the same.

PU-Net은 3D model로부터 point 기반 patch의 geometry적 의미?를 학습하고 이 지식을 주어진 point cloud를 upsampling하는데 적용한다. 이전 network-based 방법(pioneering works)과 달리, PU-Net의 input과 output point의 수는 같지 않다는 점을 유의해야 한다.

> We formulate two metrics, distribution uniformity and distance deviation from underlying surfaces, to quantitatively evaluate the upsampled point set, and test our method using variety of synthetic and real-scanned data.

Upsampling된 point set을 정량적으로 평가하고 다양한 실제, 합성 data를 이용해 방법을 test하기 위해 Distribution uniformity과 underlying surfaces로부터의 거리 편차라는 두개의 metrics를 formulate했다.

#### Related work
##### optimization-based methods
- **Alexa et al.** : local 탄젠트 space의 Voronoi 다이어그램의 vertex들을 interpolation한 point를 이용해 point set을 upsampleing한다.
- **Lipman et al.** : L1 median에 기초한 point resampling과 surface reconstruction을 위한 Locally Optimal Projection(LOP)를 제시.
- **Huang et al.** : point set density문제를 해결하기 위한 개선된 LOP 제시.

좋은 결과를 보여주었지만 underlying surface가 smooth하다는 강한 가정을 하였기 때문에 방법의 범위가 제한된다.

- **Wu et al.** : 일관성 있는 하나의 step으로 consolidation(통합)과 completion을 합치는 deep points 표현 방법을 제안한다. 그러나 global smoothness를 강제하지 않아 큰 noise에 취약하다.

이 방법들은 data-driven 방법이 아니므로 priors(머신러닝이 아닌 방법. 이미 주어진 지식을 바탕으로 알고리즘 이용 등)에 크게 의존한다.

##### deep-learning-based methods
대부분 기존의 work들은 point cloud를 volumetric grid도, geometric graph와 같은 다른 3D 표현으로 변환하여 처리한다. Qi et al. 은 처음으로 point cloud classification, segmentation을 위한 딥러닝 network를 제안했다. 다양한 방법이 있지만, To the best of our knowledge, upsampling에 초점을 둔 것은 없었다.

## 2. Network Architecture
![image](https://user-images.githubusercontent.com/79836443/132798267-c60cfc2d-e67d-48b7-8113-cd495d5ea480.png){:.align-center}{: width="80%" height="80%"}

> Given a 3D point cloud with point coordinates in nonuniform distributions, our network aims to output a denser point cloud that follows the underlying surface of the target object while being uniform in distribution.

불균일한 분포의 point coordinate를 가진 3D point cloud가 주어진 경우, 분포가 균일하면서도 object의 underlying surface를 따라가는 높은 밀도의 point cloud를 출력하는 것을 목표로 한다.

> Our network architecture (see Fig. 1) has four components: patch extraction, point feature embedding, feature expansion, and coordinate reconstruction.

Network Architecture는 4개의 component를 가진다. 
1.	**Patch-Extraction** : prior 3D model들의 집합으로부터 다양한 scale과 distribution의 point의 patch를 추출한다. – fig1과 같이 다양한 patch를 추출한다.
2. **Point Feature Embedding** : 계층적 feature learning과 multi-level feature aggregation(집계)을 통해 raw 3D coordinate를 feature space로 mapping한다.
3.	**Feature Expansion** : feature의 개수를 증가시킨다.
4.	**Coordinate Reconstruction** : F.C layer의 series를 통해 output point cloud의 3D coordinate를 reconstruction 한다.

#### 2.1 Patch Extraction
다양한 모양의 3D object들을 training을 위한 prior information으로 수집한다. 기본적으로 network가 upsampling 하려면 object로부터 local geometry pattern들을 학습해야 한다. 이것이 patch 기반 접근법을 선택한 motive이다.

> In detail, we randomly select M points on the surface of these objects. From each selected point, we grow a surface patch on the object, such that any point on the patch is within a certain geodesic distance (d) from the selected point over the surface. Then, we use Poisson disk sampling to randomly generate N_hat points on each patch as the referenced ground truth point distribution on the patch. In our upsampling task, both local and global context contribute to a smooth and uniform output. Hence, we set d with varying sizes, so that we can extract patches of points on the prior objects with varying scale and density.

Detail. object의 surface에서 random하게 M개의 point를 선택한다. 각각의 선택된 point에서 object 표면에서의 patch 크기를 키우면서, patch 위의 모든 점이 선택된 point로부터의 certain geodesic distance (d) 내에 있도록 한다. 그리고 나서 ground truth의 patch에서의 point 분포를 기준으로 Poisson disk sampling를 이용해 각 patch에 $\widehat{N}$개의 point를 생성한다. Upsampling task에서 local 및 global context 모두 output이 smooth하고 uniform하도록 기여한다. 우리는 d를 다양한 크기로 설정하여 다양한 scale과 density로 prior object에 point들의 patch들을 추출할 수 있도록 하였다.

#### 2.2	Point Feature Embedding
patch로부터 Local 및 global geometry context를 학습하기 위해 다음 두 feature learning 전략을 사용하였으며, 그 이점들로 서로 보완한다.

**Hierarchical feature learning.** PointNet++의 계층적 feature 학습 매커니즘을 네트워크의 가장 frontal한 부분으로 채택한다. 계층적 feature 학습을 채택하기 위해 각 level에서 상대적으로 작은 grouping 반경을 사용한다.

**Multi-level feature aggregation** network의 lower layer일수록 더 작은 local feature에 대응되고 그 반대도 마찬가지이다. 더 좋은 upsampling 결과를 위해 여기서는 서로 다른 level의 feature들을 optimal 하게 종합해야 한다.  몇몇 기존의 연구들은 cascaded multi-level feature 종합을 위해 skip-connection을 사용하였지만 이러한 top-down propagation 방식은 upsampling 문제에는 효율적이지 않았다. 그래서 여기서는  서로 다른 level의 feature들을 직접 결합하고, network가 각 level의 중요성을 배울수 있도록 하였다.

> Since the input point set on each patch (see point feature embedding in Fig. 1) is subsampled gradually in hierarchical feature extraction, we concatenate the point features from each level by first restoring the features of all original points from the downsampled point features by the interpolation method in PointNet++

각 patch에 설정된 input point는 hierarchical feature extraction에서 점진적으로 subsampling 되므로 PointNet++의 interpolation 방법에 의해 downsampling된 모든 origin point들의 feature를 처음으로 복원하여 각 level에서 point feature들을 concatenate한다. 특히 level $\ell$에 있는 interpolated된 point $x$의 fature는 다음 식에 의해 계산된다 :
$$f^{(\ell)}(x)=\frac{\sum_{i=1}^{3}w_{i}(x)f^{(\ell)}(x_{i})}{\sum_{i=1}^{3}w_{i}(x)}$$
