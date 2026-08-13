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
    'My research is concerned with numerical methods for approximation and learning. I am particularly interested in how approximation theory and randomized numerical linear algebra can support stable, efficient algorithms, including in operator-learning settings.',
  links: {
    github: 'https://github.com/YifuZhang314',
    cv: '/Yifu_Zhang_CV.pdf',
  },
} as const;

export const researchAreaLine = profile.researchAreas.join(', ');
