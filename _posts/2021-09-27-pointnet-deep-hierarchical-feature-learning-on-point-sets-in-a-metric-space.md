---
title: |-
  PointNet++: Deep Hierarchical Feature Learning on
  Point Sets in a Metric Space
---

PointNet++은 PointNet이 point가 존재하는 metric space에 의해 유도된 local structure를 활용하지 못해서 fine-grained<sup>[1](#footnote_1)</sup> 패턴들을 잘 인식하지 못하고 복잡한 scene들을 일반화하는 능력이 떨어지는 문제를 해결하기 위해 제안되었다. PointNet++은 입력 point set의 nested partitioning에 PointNet을 recursive하게 적용하는 hierarchical 신경망이다. 이 네트워크는 metric space distance를 활용하여 contextual scale이 증가하는 local feature를 학습할 수 있다.

## 1. Introduction
기존 PointNet의 아이디어는 각 point의 공간 encoding을 학습하고, 모든 개별 point feature들을 global 포인트 클라우드 signature와 aggregate하는 것이었다. 그러나 이런 구조는 metric에 의해 유도된 local structure를 활용하지 않는다. 그러나 convolutional architecture의 성공에 local structure를 활용하는 것이 중요한 요소라는 것이 증명되어왔다. CNN은 multi-resolution hierarchy를 따라 점점 더 큰 scale의 feature를 찾아낼 수 있다. CNN 구조 특성 상 낮은 level의 layer에서는 작은 receptive field를 가지고 높은 layer에서는 큰 receptive field를 가지기 때문이다. 이러한 hierarchy를 따라 local pattern들을 추상화하는 기능은 일반화에 더욱 유용하다.

해서, PointNet++이라는 hierarchical 신경망을 소개한다. 




<br>
<br>

__ __ __ __ __ __ __

<a name="footnote_1">1</a>: 세분화된 것을 의미하는 말로 여기서는 작은 패턴들을 의미한다. 반대말로 coarse-grained가 있다.<br>
