---
title: 'PointNet: Deep Learning on Point Sets for 3D Classification and Segmentation'
use_math: true
categories:
- 논문
---

## Abstract
기존에는 point cloud의 irregular한 형식때문에  regular한 3D voxel grid 또는 collection of images로 바꿔 사용하곤 했지만 이것은 불필요하게 많은 data가 렌더링 되는 문제가 있다. 그래서 여기서는 point cloud를 바로 사용하며 input point들의 permutation invariance<sup>[1](#footnote_1)</sup>를 잘 고려하는 neural network를 설계하였다. PointNet은 object detection, part segmentation, scene semantic parsing에 이르는 application들을 위한 통일된 구조를 제공한다. 또한, 이론적으로, network가 무엇을 학습했는지와 network가 왜 perturbation(noise와 유사)과 corruption에 robust한지 이해하기 위한 분석을 제공한다.

## Introduction
기존에는 point cloud의 irregular한 형식 때문에 대부분이 deep net architecture에 넣기 전  regular한 3D voxel grid 또는 collection of images (e.g, views)로 변형하곤 했다. 그러나 이것은 불필요하게 많은 data가 렌더링 되는 문제가 있다. 그래서 point cloud를 직접 사용하도록 하였다. 이를 위해서는 permutation invariance 한 성질로 인해 net computation에서 특정 대칭화가 필요하고, rigid motion<sup>[2](#footnote_2)</sup>에 invariance하다는 사실을 고려해야 한다.

<a name="footnote_1">1</a>: 입력 벡터 요소의 순서와 상관 없이 같은 출력을 생성하는 것. MLP가 이에 해당하며 CNN, RNN은 이에 해당하지 않는다.
<a name="footnote_2">2</a>: rigid motion은 transformation을 하더라도 point들간의 distance와 방향은 그대로 유지되는 변환을 말한다. 여기에는 translation, rotation, reflection, glide reflection이 해당된다.
