---
title: 'Column Subset Selection: how to choose a small representative subset from millions of data points?'
description: 'Why a small subset of actual matrix columns can provide an interpretable, structure-preserving low-rank approximation, and how common CSSP algorithms choose them.'
published: 2026-09-03
tags:
  - Numerical analysis
  - Numerical linear algebra
  - Low-rank approximation
draft: false
---

In the modern world, we casually interact with millions of data points on a
daily basis. They may come from high-res images, recommendation systems, or
sensors on a weather station. Regardless of their origins, numerical analysts
can view them in the same way: as columns in a matrix.

Luckily for us, these numbers do not necessarily require millions of degrees of
freedom to store them. The nearby pixels in an image are likely to be
correlated; someone who favours Mary Poppins might also enjoy Alice in
Wonderland, and weather measurements in London may follow some seasonal trend
each year. Large datasets can often come with a large degree of redundancy.

We can describe this idea more precisely using the term "low-rank structure".
If you are reading this blog, I'm guessing you've come across the singular value
decomposition (SVD) or principal component analysis (PCA) before. In short, the
SVD uncovers the dominant directions of your data that contribute most to the
"information" stored in your matrix. If only a few of these directions are
important, we can safely truncate all the other directions and replace the
original matrix with a lower-rank one, which is much easier to store and operate
on.

<figure>
  <img
    src="./svd.png"
    alt="Diagram of the truncated singular value decomposition: a matrix A is approximated by the rank-r product U_r Sigma_r V_r transpose."
    width="1999"
    height="786"
    loading="lazy"
    decoding="async"
  />
  <figcaption>The Truncated SVD</figcaption>
</figure>

## Some problems with the SVD

The truncated SVD gives the optimal low-rank approximation to an $m\times n$
matrix $A$; that is, amongst all rank-$r$ matrices $B$, the approximation $A_r$
obtained from truncating the SVD has the smallest error measured in, say, the
Frobenius norm (or any unitarily invariant norm).

$$
\lVert A-A_r\rVert_F \leq \lVert A-B\rVert_F
\qquad \text{for all rank-}r\text{ matrices }B\text{ of size }m\times n.
$$

However, there are a few things that make the SVD less suitable in some
applications. The SVD finds the dominant directions, which are complicated
linear combinations of columns. Wouldn't it be nicer if we could actually know
_which_ columns are important? As a concrete example, a column might represent
a viewer's interests across different movies. A selection of columns can pick
out some particular viewers whose interests represent the entire audience base.
The SVD, however, would produce an abstract combination of different viewers.

Another problem is updating the matrix. For example, if the weather station
collects a new day of data, this might be represented as a new column in the
matrix. If we use the SVD, this requires us to update the SVD of the new matrix,
which can be expensive. If we select specific columns instead, we can simply
decide whether the new column is important or not.[^1]

The final issue I would like to mention is preserving the structure. If a matrix
is, for example, sparse, i.e., it contains a lot of zeros, its SVD is, in
general, still going to be dense. However, since a column subset uses the exact
entries of the original matrix, it can better preserve the sparsity structure.

## The column subset selection problem

How to pick columns that best represent the whole matrix is known as the column
subset selection problem (CSSP), and it is a very active area of research in
numerical linear algebra.

Given an $m\times n$ matrix $A$, we select an $m\times r$ column submatrix
$C = A(:,J)$. Here, $J$ is the index set containing the indices of the columns
selected, and $A(:,J)$ is MATLAB notation for the columns indexed by $J$. In
order to approximate $A$ using $C$, we form $CC^\dagger A$, where $^\dagger$
denotes the
[Moore–Penrose pseudoinverse](https://en.wikipedia.org/wiki/Moore%E2%80%93Penrose_inverse).
This is called the one-sided interpolative decomposition (ID).

<figure>
  <img
    src="./one-sided-id.png"
    alt="Diagram of a one-sided interpolative decomposition: the matrix A is approximated by a selected-column matrix C multiplied by C dagger A."
    width="1942"
    height="809"
    loading="lazy"
    decoding="async"
  />
  <figcaption>The one-sided ID</figcaption>
</figure>

The big idea is that $CC^\dagger$ is a _projection_ onto the space spanned by
the columns of $C$. $CC^\dagger A$ is like a shadow cast from $A$ onto the
column space of $C$, and we hope that, by choosing a proper $C$, this shadow
looks as much like $A$ as possible. We also note that the one-sided ID is a
low-rank approximation, since $C$ is $m\times r$.

To measure how good $C$ is, we can calculate the error
$\lVert A-CC^\dagger A\rVert_F$. What's great about column subset selection is
that it is provable that for any matrix $A$ and target rank $r$, there exists a
column subset $C$ such that

$$
\lVert A-CC^\dagger A\rVert_F \leq \sqrt{r+1}\lVert A-A_r\rVert_F.
$$

Recall that $A_r$ is the _best_ possible rank-$r$ approximation from truncating
the SVD of $A$, and $r$ is typically quite small. That is, by just using the
exact columns of $A$, we can achieve an approximation accuracy that is within a
constant factor (depending on $r$) of the best approximation. Isn't that
something!

## How to choose C?

I will now try to answer the question in the title: how to choose these columns?
There are many methods to do so, and I list some popular ones (that I have some
brief experience with) here. Details and implementations for the methods below
can be found online. I will only give a brief description and some informal
thoughts on them.[^2]

1. **Column-Pivoted QR
   [(CPQR)](https://en.wikipedia.org/wiki/QR_decomposition#Column_pivoting):**
   CPQR selects the column of the current residual with the largest norm, then
   projects out that column from the matrix through a step in QR factorisation
   (known as a Householder reflection), and repeats this process $r$ times. CPQR
   can be unreliable when facing adversarial examples since it's deterministic.

2. **LU with partial pivoting
   [(LUPP)](https://en.wikipedia.org/wiki/LU_decomposition#LU_factorization_with_partial_pivoting):**
   pivots are the diagonal entries of a matrix. LUPP selects the column with the
   largest pivot, then uses Gaussian elimination to remove the column. It has
   the same issue with adversarial inputs since it's also deterministic.

3. **Osinsky's Method [[1]](#ref-osinsky):** This is a relatively recent method
   and the first deterministic method that satisfies the optimal $\sqrt{r+1}$
   guarantee using only one SVD. It is, however, more expensive to use in
   practice than the previous methods.

4. **Adaptive randomised pivoting (ARP) [[4]](#ref-arp):** ARP is a randomised
   algorithm inspired by Osinsky's method and satisfies the same optimal
   guarantee in expectation. It is much simpler and cheaper to use than
   Osinsky's method (more practical with the same guarantee!), but requires a
   (randomised) orthogonalisation step from an SVD/QR factorisation.

5. **Randomly Pivoted QR [[2]](#ref-rpqr):** this is a randomised method that I
   have become interested in. It is closely related to CPQR. Instead of always
   choosing the column with the largest norm, it selects randomly with
   probability proportional to the columns' norm squared. This makes it less
   vulnerable to adversarial inputs as it's no longer deterministic. It is also
   cheaper than the ARP, though it does not have the optimal theoretical
   guarantee.[^3]

6. **RandLUPP [[3]](#ref-randlupp):** this is a randomised version of LUPP. It
   does not yet have a $\sqrt{r+1}$ theoretical guarantee either, but it's a fast
   and accurate method I personally favour in practice (LU only needs half the
   time of QR!)

_Before you go:_ the idea that a few exact columns can accurately represent the
entire matrix is quite mind-blowing to me, and it's something that can find more applications to other scientific problems. Whether you want to find some representative data or need a
low-rank approximation,[^4] I hope you might consider selecting some columns!

[^1]: This is something of an oversimplification, since, to determine whether the new column is important, we need to compare it with the previous columns. However, this is still much easier than updating the SVD.

[^2]: In a future blog, I will provide some numerical experiments and compare their performance.

[^3]: This can be remedied with oversampling.

[^4]: The one-sided ID is not the favoured approximation method in practice. Should I write a blog on CUR?

## References

1. <span id="ref-osinsky"></span>Osinsky, A. I. "Close to optimal column
   approximation using a single SVD." _Linear Algebra and its Applications_
   (2025).
2. <span id="ref-rpqr"></span>Chen, Yifan, Ethan N. Epperly, Joel A. Tropp, and
   Robert J. Webber. "Randomly pivoted Cholesky: Practical approximation of a
   kernel matrix with few entry evaluations." _Communications on Pure and
   Applied Mathematics_ **78**, no. 5 (2025): 995-1041.
3. <span id="ref-randlupp"></span>Dong, Yijun, and Per-Gunnar Martinsson.
   "Simpler is better: a comparative study of randomized pivoting algorithms
   for CUR and interpolative decompositions." _Advances in Computational
   Mathematics_ **49**, no. 4 (2023): 66.
4. <span id="ref-arp"></span>Cortinovis, Alice, and Daniel Kressner. "Adaptive
   randomized pivoting for column subset selection, DEIM, and low-rank
   approximation." _SIAM Journal on Matrix Analysis and Applications_ **47**,
   no. 1 (2026): 25-47.
