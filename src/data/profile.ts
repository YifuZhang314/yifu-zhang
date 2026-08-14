export const profile = {
  name: 'Yifu Zhang',
  currentPosition: 'Incoming Mathematics PhD student',
  currentInstitution: 'Imperial College London',
  currentInstitutionUrl: 'https://www.imperial.ac.uk/mathematics/',
  previousDegree: {
    degree: 'MMath in Mathematics',
    institution: 'University of Oxford',
    institutionUrl: 'https://www.maths.ox.ac.uk/',
    result: 'First class',
  },
  researchAreas: [
    'Numerical analysis',
    'Randomized numerical linear algebra',
    'Approximation theory',
    'Operator learning',
  ],
  supervisors: [
    {
      name: 'Nicolas Boullé',
      institution: 'Imperial College London',
      website: 'https://nboulle.github.io/',
    },
    {
      name: 'Greg Pavliotis',
      institution: 'Imperial College London',
      website: 'https://www.ma.imperial.ac.uk/~pavl/',
    },
    {
      name: 'Matthew Colbrook',
      institution: 'University of Cambridge',
      website: 'https://www.damtp.cam.ac.uk/user/mjc249/home.html',
    },
  ],
  statement:
    'I am interested in numerical analysis in general. I have worked in approximation theory and randomised numerical linear algebra before, and currently I am exploring their applications for areas like operator learning, Koopman operators and numerical methods for SPDEs. ',
  links: {
    github: 'https://github.com/YifuZhang314',
    cv: '/Yifu_Zhang_CV.pdf',
  },
} as const;

export const researchAreaLine = profile.researchAreas.join(' · ');

export interface EducationItem {
  period: string;
  degree: string;
  institution: string;
  institutionUrl: string;
  status: string;
  award?: string;
}

export const education: readonly EducationItem[] = [
  {
    period: 'Oct 2026–Jun 2030',
    degree: 'PhD in Mathematics',
    institution: profile.currentInstitution,
    institutionUrl: profile.currentInstitutionUrl,
    status: 'Incoming',
  },
  {
    period: 'Oct 2022–Jun 2026',
    degree: profile.previousDegree.degree,
    institution: profile.previousDegree.institution,
    institutionUrl: profile.previousDegree.institutionUrl,
    status: profile.previousDegree.result,
  },
  {
    period: 'Graduated Jun 2022',
    degree: 'International Baccalaureate Diploma',
    institution: 'Keystone Academy',
    institutionUrl: 'https://www.keystoneacademy.cn/en',
    status: 'Beijing, China',
    award: 'Keystone Scholarship · Awarded 2021 and 2022',
  },
];
