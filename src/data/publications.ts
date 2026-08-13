export interface Publication {
  slug: string;
  title: string;
  authors: readonly string[];
  year: number;
  type: 'Preprint';
  identifier: string;
  subject: string;
  citation: string;
  summary: string;
  datePublished: string;
  links: {
    arxiv: string;
    pdf: string;
    doi: string;
    code: string;
  };
}

export const publications: readonly Publication[] = [
  {
    slug: 'efficient-function-approximation-heteroskedastic-noise',
    title: 'Efficient Function Approximation Under Heteroskedastic Noise',
    authors: ['Yuji Nakatsukasa', 'Yifu Zhang'],
    year: 2025,
    type: 'Preprint',
    identifier: 'arXiv:2508.08683',
    subject: 'Numerical Analysis (math.NA)',
    citation:
      'Yuji Nakatsukasa and Yifu Zhang. “Efficient Function Approximation Under Heteroskedastic Noise.” arXiv:2508.08683 [math.NA], 2025.',
    summary:
      'Introduces HeteroChebtrunc, a method for approximating functions from samples with location-dependent noise, together with high-probability error analysis and numerical experiments.',
    datePublished: '2025-08-12',
    links: {
      arxiv: 'https://arxiv.org/abs/2508.08683',
      pdf: 'https://arxiv.org/pdf/2508.08683',
      doi: 'https://doi.org/10.48550/arXiv.2508.08683',
      code: 'https://github.com/YifuZhang314/HeteroChebtrunc',
    },
  },
];
