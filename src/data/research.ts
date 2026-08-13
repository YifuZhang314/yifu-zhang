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
      'HeteroChebtrunc adapts Chebyshev-based approximation to the heteroskedastic setting, where noise variance depends on the sampling location. The paper gives a high-probability infinity-norm error comparison and studies sample-variance estimation under subgaussian noise.',
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
      'My Oxford MMath dissertation studied Gram matrices approximations using CUR.',
    paragraphs: [
      'My Oxford MMath dissertation studied approximation of Gram matrices given a column subset selection, applying techniques from CUR approximation and sketch-and-solve least-squares.',
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
