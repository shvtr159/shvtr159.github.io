---
title: "[MLPR #1] Introduction"
categories:
- MLPR
use_math: true
---

## Notation
- $\underline{ \textbf{x}}$ : data 벡터
- prototypes:
	- $\underline{y}_ m^{(k)}$ : class $S_ {k}$에 속한 m번째 prototype
	- k = class index
	- $m_k$ = $S_ {k}$에 있는 prototype들의 번호
	- $\underline{y}_ m^{(k)}$, m = 1,2, ... , $m_k$ 는  class $S_ {k}$의 모든 prototype로 정의

## Classification
각각의 Class를 나누기 위해서는 Decision Rule이 결정되어야 한다. 예를 들어 변수 값에 따라 분류 할 때, 값이 5.5 초과면 $S_ {1}$, 이하면 $S_ {2}$로 분류할 수 있다. 그러나 이러한 feature가 1개일때보다는 2개일때 더 정확한 분류를 할 수 있고, 더 많아질수록 더 정확히 분류할 수 있다. 이렇게 fature의 차원이 커짐에 따라 decision surface의 차원도 점, 선, 면 으로 점점 증가하게 된다. 

이렇게 나눠진 많은 Class들 중 $\underline{ \textbf{x}}$ 가 어디에 속하는 지 알기 위해서는 해당 class와 $\underline{ \textbf{x}}$의 거리를 측정해야 한다.
