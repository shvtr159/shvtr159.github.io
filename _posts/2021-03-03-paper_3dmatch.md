---
title: '3DMatch: Learning the Matching of Local 3D Geometry in Range Scans - 요약'
categories:
- 논문
use_math: true
---

## 3. Geometric Representation
geometric matching의 목표는 3D geometry의 'fragments'간 robust한 대응관계를 만드는 것이다.


## 5. Geometric Matching Network
unified deep neural network 구조를 사용.
1. feature network : 3D ConvNet을 이용하여 local 3D TDF volume을 고차원 feature representation에 mapping.
2. metric network : fully connected 내적 layer들의 set를 통해 feature의 쌍들을 similarity value에 mapping.
 
네트워크 구조
1, 각 query keypoint의  주변의 local TDF volume이 geometric fragment에서 crop된다. 이 volume들은 독립적으로 feature network를 통해 전달되어 2048개의 요소가 포함된 feature descriptor에 mapping. 이 feature vector들의 쌍들이 연결되고 metric network를 통해 공급된다. 이 network는 두 point의 유사도를 측정하는 match score로 끝이 난다.
2, 데이터로부터 최고의 distance function을 자동으로 학습
### 5.1 네트워크 구조
**Geometric feature network**

키포인트의 3D local region을 간결한 feature 표현에 매핑하는 descriptor 함수로 구성. 
Input : 31x31x31의 voxel TDF volume인 반면, feature 표현은 2048차원의 feature vector이다. Feature network는 convolutional layer(ReLU)와 하나의 polling layer로 구성.

**Metric network**

두 feature representations은 비교하고 두 relevant keypoints가 서로 일치하는지 결정하는 Non-linear 매칭 function. 
Input : 두 feature vector의 concatenation. 
output : keypoint간 유사도를 나타내는 0~1의 confidence value.
몇몇의 fully connected layer로 구성(ReLu). 마지막 layer는 Softmax를 사용하고 이 두 value는 각각 두 feature들이 일치하고, 일치하지 않는 확률의 network estimate.

**Matcing cost**

t-Stochastic Neighbor Embedding (t-SNE) : vector visualization을 위하여 자주 이용되는 알고리즘. 차원 축소와 시각화 방법론으로 널리 쓰인다. SNE는 n 차원에 분포된 이산 데이터를 k(n 이하의 정수) 차원으로 축소하며 거리 정보를 보존하되, 거리가 가까운 데이터의 정보를 우선하여 보존하기 위해 고안되었다. 연속적인 확률 분포(가우시안 분포)로서 가중치를 부여한다. t-SNE는 SNE에서 가우시안 분포 대신 t 분포를 사용한다.
스토캐스틱 gradient descent를 이용. 식의 yi 는 binary label(O or X), input xi 와 yihat 은 softmax layer의 output으로 나온 확률 estimate

### 5.2. Feature Visualization


### References
paper : Andy Zeng, Shuran Song, Matthias Nießner, Matthew Fisher, Jianxiong Xiao. 3DMatch: Learning the Matching of Local 3D Geometry in Range Scans. IEEE Conference on Computer Vision and Pattern Recognition (CVPR) 2017.