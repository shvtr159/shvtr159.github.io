---
title: "[MLPR #] Nonparameteric Estimation 1 (미완)"
categories:
- MLPR
use_math: true
toc: true
---

이전까지 확률을 이용해 density function을 추정했다면 Nonparameteric Technique는 math form 없이 density를 추정한다. 

## Introduction

## Estimation Procedure
$x$의 density를 추정하기 위한 절차를 알아보자
1. 영역 $R_1, R_2, ...$을 생성한다.
2. 이때 영역 $R_j$는 j개의 sample들로 구성된다. ??
3. $R_j$의 크기를 $V_j$라고 한다
4. $R_j$에 속해있는 sample들의 개수를 $k_j$라고 한다
5. $p(x)$의 j번째 추정은 $p_j(x)=\[k_j/j\]/V_j$이다. $p_j(x)$는 다음과 같은 경우에 $p(x)$에 수렴한다.<br>
	(1) $\lim_{j\to\infty}V_j=0$<br>
	(2) $\lim_{j\to\infty}k_j=\infty$<br>
	(3) $\lim_{j\to\infty}k_j/j=0$<br>
위 조건을 만족하는 방법 두가지
1. 영역의 크기를 축소시켜가는것. $V_j=1/\sqrt{j}$ (Parzen window)
2. $k_j=\sqrt{j}$로 설정하여 $x$ 주변 $k_j$개의 sample을 포함할때까지 크기를 증가시키는 것. (nearest neighbor)

## Two Popular Techniques
### 1) Parzen Window Estimation
window function은 $\Delta(\underline{u})=\Delta(\underline{x}-\underline{x}_ i)$로 정의한다($\underline{x}_ i$가 중심이 된다).



### 2) K Nearest Neighbor
