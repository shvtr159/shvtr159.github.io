---
title: "[MLPR #] Bayes Decision Classification"
categories:
- MLPR
use_math: true
toc: true
---

Bayes Decision Theory : 이 방식은 모든 확률 값들을 알고 있다고 가정한다(평균, 분산 등).
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

### Decision Rule

$$\begin{matrix}
p(\underline{x} \mid S_1)p(S_1)>p(\underline{x} \mid S_2)p(S_2) \rightarrow \underline{x}\in S_1 \\ \\
p(\underline{x} \mid S_1)p(S_1)<p(\underline{x} \mid S_2)p(S_2) \rightarrow \underline{x}\in S_2
\end{matrix}$$

으로 표현되고 다음과 같이 다시 정리할 수 있다.

$$\frac{p(\underline{x} \mid S_1)}{p(\underline{x} \mid S_2)}\quad\begin{matrix}
\underline{x}\in S_1\\ 
>\\ 
<\\ 
\underline{x}\in S_2
\end{matrix}\quad \frac{P(S_1)}{P(S_2)}
$$

이 때, $l(x) = \frac{p(\underline{x} \mid S_1)}{p(\underline{x} \mid S_2)}$를 likelihood ratio(우도 비), $\frac{P(S_1)}{P(S_2)} = T$를 threshold value 라고 한다.

위 정리된 식은 Log를 취해 \*를 +로 바꿔 cost를 크게 줄일 수 있고, 다음과 같이 변경된다.

$$h(\underline{x})=-\textup{ln}(l(\underline{x}))=\textup{ln}(p(\underline{x} \mid S_2))-\textup{ln}(p(\underline{x} \mid S_1))<\textup{ln}(\frac{P(S_1)}{P(S_2)})\quad \Rightarrow \; \underline{x}\in S_1$$

### Probability of Error
이는 error region을 integrate 하는 형식으로 구해진다. 2 class의 경우

$$P_e=p(S_1)\int_{\Gamma_2}p(\underline{x} \mid S_1)dx+p(S_2)\int_{\Gamma_1}p(\underline{x} \mid S_2)dx$$

이며 다중 class의 경우 $P_e=1-P(correct)$ 으로 알기 쉽게 표현할 수 있다. 이때, $P(correct)$ 은 $\sum_{i=1}^{K}\int_{\Gamma_i}p(\underline{x} \mid S_i)P(S_i)d\underline{x}$ 이다.
## Bayes Decision Rule for 최소 Risk (2-class)
Bayes minimun error를 일반화 한다. $C(S_k \mid S_j)$를 $\underline{x}$가 $S_j$인데 $S_k$로 판별했을 때의 cost라고 하자. 그리고 이는 간단히 $C_{kj}=C(S_k \mid S_j)$로 표기한다(책에서는 $C_{kj}$ 대신 $\lambda_{kj}$로 표현하였다). 일반적으로 틀렸을 때 초래되는 손실은 맞을 때보다 더 크므로 $C_{21}>C_{11}$, $C_{12}>C_{22}$이다. 이를 한번에 matrix로 다음과 같이 표기한다.

$$\underline{C}=\begin{bmatrix}
C_{11} & C_{12}\\ 
C_{21} & C_{22}
\end{bmatrix}$$

이때, 조건부 평균 risk (conditional avarage loss or risk) $R(S_k \mid \underline{x})$이고 2 class 에서 이 식은 모든 class의 값을 합한

$$\begin{matrix}
R(S_1 \mid \underline{x})=C(S_1 \mid S_1)P(S_1 \mid \underline{x})+C(S_1 \mid S_2)P(S_2 \mid \underline{x})\\ 
R(S_2 \mid \underline{x})=C(S_2 \mid S_1)P(S_1 \mid \underline{x})+C(S_2 \mid S_2)P(S_2 \mid \underline{x})
\end{matrix}$$

이며, Decision cule은 total expected risk를 최소화 하기위한 action으로 다음과 같다.

$$R=\int_{\Gamma_1}R(S_1 \mid \underline{x})p(x)d\underline{x}+\int_{\Gamma_2}R(S_2 \mid \underline{x})p(x)d\underline{x}$$

여기서 R을 최소화하기 위해 각 $\underline{x}$에 대한 $R(S_k \mid \underline{x})$이 최소화되는 영역으로 선택한다(Risk는 작을수록 좋으므로).

$$\begin{matrix}
R(S_1 \mid \underline{x}) < R(S_2 \mid \underline{x}) \rightarrow S_1 \\ 
R(S_1 \mid \underline{x}) > R(S_2 \mid \underline{x}) \rightarrow S_2 
\end{matrix}$$

### Decision Rule (Minimum Risk Classifier)

$$R(S_1 \mid \underline{x}) \; \begin{matrix}
S_1\\ 
<\\ 
>\\ 
S_2
\end{matrix}\; R(S_2 \mid \underline{x})$$

이를 다시 이전의 $C$를 이용한 식으로 바꾸면

$$C_{11}P(S_1 \mid \underline{x})+C_{12}P(S_2 \mid \underline{x}) \quad \begin{matrix}
<\\ 
>
\end{matrix}\; C_{21}P(S_1 \mid \underline{x})+C_{22}P(S_2 \mid \underline{x})$$

이고, 같은 $P$끼리 정리하여 묶어낸 뒤 $P(S_k\mid x)=\frac{P(S_k)P(x\mid S_k)}{P(x)}$ 로 바꿔 쓴 뒤, likelihood ratio가 나타나도록 정리하면 최종적으로 다음 식이 된다.

$$l(\underline{x})=\frac{p(\underline{x} \mid S_1)}{p(\underline{x} \mid S_2)}\quad \begin{matrix}
>\\ 
<\\ 
\end{matrix}\quad \frac{(C_{12}-C_{22})P(S_2)}{(C_{21}-C_{11})P(S_1)}$$

이때, 만약 $C_{11}=0, C_{12}=1, C_{21}=1,C_{22}=0$ 이면 다음과 같은 형태의 **Bayes minimum error rule**이 된다.

$$l(\underline{x})=\frac{p(\underline{x} \mid S_1)}{p(\underline{x} \mid S_2)}\; \begin{matrix}
>\\ 
<\\ 
\end{matrix}\; \frac{P(S_2)}{P(S_1)}$$

## Bayes Minimum Error and Minimum Risk (다중 class)
### Bayes Minimum Error – Multiple Classes
모든 $i \neq j$에 대해 $P(S_i \mid \underline{x} )>P(S_j \mid \underline{x})$ 이면 $\underline{x}\in S_i$ 이다. 다시 변경하면, 모든 $i \neq j$에 대해 $p(\underline{x} \mid S_i)p(S_i)>p(\underline{x} \mid S_j)p(S_j)$ 이면 $\underline{x}\in S_i$ 이다. Discriminant function은 다음과 같다.

$$g_i(\underline{x})=p(\underline{x} \mid S_i)p(S_i)$$

### Bayes Minimum Risk – Multiple Classes
$R(S_k \mid \underline{x})=\sum_{i=1}^{K}C_{ki}P(S_i\mid \underline{x})$를 conditional loss로 변경하면 $R(S_k \mid \underline{x})=\sum_{i=1}^{K}C_{ki}P(\underline{x} \mid S_i)P(S_i)$ 이다. 만약, 모든 $i \neq j$에 대해 $R_c(S_i \mid \underline{x})<R_c(S_j \mid \underline{x})$ 이면 $\underline{x}\in S_i$ 이다. Discriminant function은 다음과 같다.

$$g_k(\underline{x})=-R_c(S_k \mid \underline{x})$$

'$-$'를 곱해주는 이유는 위의 표현처럼 $g_i(\underline{x})>g_j(\underline{x})$ 를 유지하기 위해서 이다.

$R_c$ 식은 다음과 같이 행렬식의 곱 형태로 나타낼 수 있고 이 경우 2가지 special case를 확인하기에 편리하다.

$$R_c(S_k \mid \underline{x})=\begin{bmatrix}
C_{11} & C_{12} & \cdots\\ 
C_{21}& \ddots  & \\ 
\cdots  &  & C_{kk}
\end{bmatrix}\begin{bmatrix}
p(\underline{x} \mid S_1)P(S_1)\\ 
p(\underline{x} \mid S_2)P(S_2)\\ 
\cdots
\end{bmatrix}$$

1. special case 1 : Symmetric 0-1 cost function
2. special case 2 : Diagonal Cost Function
