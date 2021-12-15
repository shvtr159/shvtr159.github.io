---
title: "[MLPR #] Parameter Estimation 1 (미완)"
categories:
- MLPR
use_math: true
toc: true
---

이전까지는 모든 statistics과 probability(prior probabiliteis, class-conditional densities(likelihood) 등)를 알 때 Bayes Classifier를 이용해 data가 어디에 속하는지 분류할 수 있었다. 그러나 이렇게 모든 statistics를 아는 상황은 드물기 때문에 data로부터 이를 추정해야만 한다. priori를 모른다고 가정할 때 다음 두 technique를 이용하여 $p(x\mid S_{i})$를 추정할 수 있다.
1. **Parametric** : $p(x\mid S_{i})$의 form을 알거나, 안다고 가정할 때 함수의 parameter를 추정한다. 예를 들어$p(x\mid S_{i})=N(x,m_i,\Sigma_i)$인 Gaussian 함수라고 할 때, training sample로부터 $m_i,\Sigma_i$를 추정하는 것이다. 이 방법에는 **Maximum likelyhood estimation(최대 우도 추정)** 과 **Maximum a Posterior (MAP) estimation(최대 사후 확률 추정)** (Bayesian estimation)이 있다.
2. **Nonparametric** : density에 대한 정보도 없이 data만 있을때로 data로부터 density function을 추정한다.

ML과 Bayesian의 주된 차이점은 ML는 paramter가 확실히 정해져 있지만 우리가 모르고 있다는 관점이고, bayesian은 parameter 자체를 random variable로 본다. bayesian learning은 parameter의 true value와 가까울수록 peak값에 가까워지므로 추가적인 sample이 들어오면 더 좋은 posteriori density로 update할 수 있다.

![image](https://user-images.githubusercontent.com/79836443/146154164-1aed9de4-b178-421d-849e-d147df19da1a.png){: width="40%" height="40%"}
![image](https://user-images.githubusercontent.com/79836443/146154305-28796a2e-df6c-429c-9c83-3ed53da102f3.png){: width="55%" height="55%"}<center><span style="color:rgb(150, 150, 150)">Left: ML. true에 가까울수록 높다. / Right: MAP. sample이 많아질수록 peak에 가까워진다.</span></center>
## Introduction
해당 방법들에 대해 알아보기 전에 추정에 대해 간단히 알아본다.

먼저 $\underline{\theta }$를 고정돼있지만 우리가 지금 모르는 parameter들의 vector라고 하자(ex. 평균 or 분산). 그리고 $\hat{\underline{\theta }}$은 $\underline{\theta }$의 추정값이라고 한다. $\underline{\theta }$는 결정되어있고, $\hat{\underline{\theta }}$는 random하다.

또, $x_1, x_2, ...$를 우리가 추정할 density로부터 추출한 random sample vector라고 한다. 각각의 $x_i$들은 iid(independent, identically, distributed)하다고 가정한다.

이제 $\underline{z}=\[x_1, x_2, ... , x_J\]$라 하면, $\hat{\underline{\theta }}=G(x_1, x_2, ... , x_J)=G(\underline{z})=\hat{\underline{\theta }}(z)$으로 어떤한 process $G$를 수행하여 랜덤한 추정값을 얻게 되는 것이다.

### 좋은 추정값의 특성
#### 1. Unbiased estimate
가장 중요한 성질. 기대값 $E(\hat{\theta})=\theta$이면 이를 unbiased estimate라고 한다. 표본 평균은 unbiased estimate이나 표본 분산은 biased estimate 이다.

#### 2. Consistent estimate
![image](https://user-images.githubusercontent.com/79836443/146173297-87140ccb-0add-4190-b829-e5e1c7e5e974.png){:.align-center}
표본의 크기가 커질수록 추정값이 실제 값 $\underline{\theta}$에 가까워지는 성질.

#### 3. Efficient estimate
![image](https://user-images.githubusercontent.com/79836443/146173820-90aed70d-1f20-41f9-9bab-e8f935a54d68.png){:.align-center}
추정값의 분산이 작게 나타나는 성질으로 추정값의 분산이 작을수록 더  efficient하다고 할 수 있다.<sup>[1](#footnote_1)</sup>

#### 4. Sufficient estimate
추정값이 $\underline{\theta}$에 대해 많은 정보를 포함하는지에 대한 성질.

## Maximum-Likelihood


__ __ __ __ __ __ __

<a name="footnote_1">1</a>: 이미지 출처 : 정보통신기술용어해설 http://www.ktword.co.kr/test/view/view.php?m_temp1=458<br>
