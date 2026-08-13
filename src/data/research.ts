export interface ResearchProject {
  slug: string;
  title: string;
  area: string;
  summary: string;
  paragraphs: readonly string[];
  supervision: string;
  featured: boolean;
  links?: readonly { label: string; href: string }[];
}

export const researchProjects: readonly ResearchProject[] = [
  {
    slug: 'heterochebtrunc',
    title: 'Function approximation under heteroskedastic noise',
    area: 'Approximation theory · Numerical analysis',
    summary:
      'HeteroChebtrunc adapts Chebyshev-based approximation to samples whose noise variance changes across the domain.',
    paragraphs: [
      'Approximating a function from noisy point samples is a classical numerical problem. HeteroChebtrunc is designed for the heteroskedastic setting, where the noise level depends on the sampling location, and adapts the earlier NoisyChebtrunc algorithm to this structure.',
      'The analysis establishes a high-probability infinity-norm error comparison under heteroskedastic noise. The method runs in O(N + N̂ log N̂) operations for a chosen N̂ much smaller than N; the paper also studies non-asymptotic relative error for sample-variance estimation with subgaussian variables.',
    ],
    supervision: 'Joint work with Yuji Nakatsukasa.',
    featured: true,
    links: [
      { label: 'Read the preprint', href: 'https://arxiv.org/abs/2508.08683' },
      {
        label: 'View the code',
        href: 'https://github.com/YifuZhang314/HeteroChebtrunc',
      },
    ],
  },
  {
    slug: 'cur-gram-matrices',
    title: 'CUR approximation for Gram matrices',
    area: 'Randomized numerical linear algebra',
    summary:
      'My Oxford MMath dissertation studied CUR approximation for Gram matrices.',
    paragraphs: [
      'CUR approximation represents a matrix through selected columns and rows. My MMath dissertation considered this approach for Gram matrices, placing the project at the intersection of structured low-rank approximation and randomized numerical linear algebra.',
      'The dissertation was completed as part of the MMath in Mathematics at the University of Oxford.',
    ],
    supervision: 'Supervised by Yuji Nakatsukasa.',
    featured: true,
  },
  {
    slug: 'permutations-fixed-sets',
    title: 'Permutations and fixed sets',
    area: 'Analytic and probabilistic number theory',
    summary:
      'An earlier project examined fixed-set questions for permutations through analytic and probabilistic number theory.',
    paragraphs: [
      'This project investigated how questions about permutations fixing sets of specified sizes connect with number-theoretic counting problems.',
    ],
    supervision: 'Supervised by Ofir Gorodetsky.',
    featured: false,
  },
];

export const featuredResearch = researchProjects.filter(
  (project) => project.featured,
);
