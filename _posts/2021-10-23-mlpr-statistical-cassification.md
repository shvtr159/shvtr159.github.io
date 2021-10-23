---
title: "[MLPR #] Statistical Cassification"
categories:
- MLPR
use_math: true
---

Bayes Decision Theory : 모든 통계는 알고 있다고 가정한다(평균, 분산 등).
## Bayes Formula

$$P(S\mid x)=\frac{P(x\mid S)P(S_k)}{P(x)}$$

- $P(S\mid x)$ : posterior probability (사후 확률)
- $P(x\mid S)$ : likelihood (우도, 가능도)
- $P(S)$ : prior probability (사전 확률)
- $P(x)$ : Evidence

## Bayes Decision Rule for 최소 Error (2-class)

$$\begin{matrix}
p(S_1\mid \underline{x})>p(S_2\mid \underline{x})\rightarrow \underline{x}\in S_1 \\ \\
p(S_1\mid \underline{x})<p(S_2\mid \underline{x})\rightarrow \underline{x}\in S_2
\end{matrix}$$

즉, x는 두 class 중 확률이 더 높은 class에 속한다고 판단한다. 이를 Bayes Theorem을 이용하여 바꾸면

$$\begin{matrix}
p(\underline{x} \mid S_1)p(S_1)>p(\underline{x} \mid S_2)p(S_2) \rightarrow \underline{x}\in S_1 \\ \\
p(\underline{x} \mid S_1)p(S_1)<p(\underline{x} \mid S_2)p(S_2) \rightarrow \underline{x}\in S_2
\end{matrix}$$

으로 표현되고 다음과 같이 정리할 수 있다.
