#  Why is Diffe-Hellman Key Exchange secure?

Let’s analyze security from different perspectives:

## What Does an Outsider See?

- Observes $g, A, B, $p$, but doesn’t know $a, b$
- Since an outsider only knows $A = g^a$ and $B = g^b$, to derive the shared secret $S = g^{ab}\ mod\ p$ requires either $a$ or $b$. Unfortunately, from Discrete Logarithm Problem (link to previous chapter), it is very hard to obtain $a$ from $A = g^a\ mod\ p$. The same hardness applies when we try to obtain $b$ from $B  = g^b\ mod\ p$

## Can Alice Learn Bob’s Private Value?

Alice knows $a, A, B, S$, let's explore why she cannot derive $b$ which is Bob's private value on her own.
- If she tries to derive $b$ either from $B = g^b\ mod\ p$, this is basically Discrete Logarithm Problem (Link to previous chapter) which is again very hard.

<Quiz id="1" />


## Can Bob Learn Alice’s Private Value?

Similarly, Bob knows $a, A, B, S$ but again cannot derive $a$ either from $A = g^a\ mod\ p$ or from $B = g^b\ mod\ p$  and $S = g^{ab}\ mod\ p$ due to Discrete Logarithm Problem.

<Quiz id="2" />
