---
title: "[논문 리뷰] Deep Learning for 3D Point Clouds: A Survey"
categories:
- 논문
toc: true
---

본 survey는 IEEE TPAMI에 게재된 것으로 2020년 까지 Point cloud를 사용하는 Deep Learning에 대해 정리하였다.<sup>[1](#footnote_1)</sup> 다음과 같이 크게 3개의 task에 대해 설명하지만 이 글에서는 Segmentation을 제외한 2가지 task에 대해 정리한다.
## Background
### Evaluation Metrics
각 task를 평가하기 위해 다양한 방법이 사용된다. 주로 사용되는 방법은 다음과 같다.
- **3D shape classification** : Overall Accuracy(OA), mean class accuracy(mAcc). OA는 모든 etst instances에 대한 평균 accuracy이고, mAcc는 모든 shape classes의 평균 accuracy를 의미한다.
- **3D object detection** : Average Precision(AP). precision-recall curve의 아래 면적으로 계산.
- **3D single object tracker** : Precision, Success
- **3D multi object tracker** : Average Multi-Object Tracking Accuracy(AMOTA), Average Multi-Object Tracking Precision(AMOTP)
- **3D point cloud segmentation** : OA, mean Intersection over Union(mIoU), mean class Accuracy(mAcc), mean Average Precision(mAP).

## 3D Shape Classification
### 1. Multi-view based Methods
이 방법은 먼저 3D shape를 다양한 view로 projection을 하고 각 view에서의 feature를 추출한다. 그리고 이 feature들을 fu 
## 3D Object Detection and Tracking
### 3D Object Detection
### 3D Object Tracking
첫 frame에서 object의 위치가 주어지면, 연속되는 frame에서 이 object의 state를 추정하고 위치를 찾는다. Point cloud는 풍부한 geometric 정보를 사용할 수 있기 때문에 image 기반의 tracking에서 겪던 occlusion이나 조명 및 scale 변화같은 단점을 극복할 수 있다. image 기반 tracking에서 Siamese network를 성공적으로 사용한것이 기반해서 SC3D는 shape completion regularization을 사용하는 3D Siamese network를 제안하였다. 여기서는 먼저 Kalman filter를 사용해서 후보를 생성하고, shape regularization을 사용하여 model과 후보들을 encoding 하였다. 그리고 다음 frame에서 tracking 하는 object의 위치를 찾기 위해 cosine similarity를 사용한다.



__ __ __ __ __ __ __

<a name="footnote_1">1</a>: [Y. Guo, H. Wang, Q. Hu, H. Liu, L. Liu and M. Bennamoun, "Deep Learning for 3D Point Clouds: A Survey," in IEEE Transactions on Pattern Analysis and Machine Intelligence, vol. 43, no. 12, pp. 4338-4364, 1 Dec. 2021, doi: 10.1109/TPAMI.2020.3005434.](https://ieeexplore.ieee.org/abstract/document/9127813)<br>
