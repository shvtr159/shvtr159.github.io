---
title: "[MLPR #] Bayes Classifiers"
categories:
- MLPR
use_math: true
---

discriminant decision $g_i(\underline{x})$를 이용하여 모든 $i \neq j$에 대해 $g_i(\underline{x})>g_j(\underline{x})$ 분류를 사용한다. 이를 probability term으로 표현하면

$$g_i(\underline{x})=p(S_i \mid \underline{x})$$

$$\rightarrow \; g_i(\underline{x})=p(\underline{x} \mid S_i)P(S_i)$$

$$\rightarrow \; g_i(\underline{x})=\textup{ln}(p(\underline{x} \mid S_i))+\textup{ln}(P(S_i))$$

## Normal Density
