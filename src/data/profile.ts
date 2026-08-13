export const profile = {
  name: 'Yifu Zhang',
  currentPosition: 'Incoming Mathematics PhD student',
  currentInstitution: 'Imperial College London',
  previousDegree: {
    degree: 'MMath in Mathematics',
    institution: 'University of Oxford',
    result: 'First class (24/126), with distinction in Masters',
  },
  researchAreas: [
    'Numerical analysis',
    'Randomized numerical linear algebra',
    'Approximation theory',
    'Operator learning',
  ],
  supervisors: [
    { name: 'Nicolas Boullé', institution: 'Imperial College London' },
    { name: 'Greg Pavliotis', institution: 'Imperial College London' },
    { name: 'Matthew Colbrook', institution: 'University of Cambridge' },
  ],
  statement:
    'I study numerical methods for approximation and learning, with an emphasis on stable, efficient algorithms informed by approximation theory and randomized numerical linear algebra.',
  links: {
    github: 'https://github.com/YifuZhang314',
    cv: '/Yifu_Zhang_CV.pdf',
  },
} as const;

export const researchAreaLine = profile.researchAreas.join(' · ');
