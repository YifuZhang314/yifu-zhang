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
    'I am interested in numerical analysis in general. I have worked in approximation theory and randomised numerical linear algebra before, and currently I am exploring their applications for areas like operator learning, Koopman operators and numerical methods for SPDEs ',
  links: {
    github: 'https://github.com/YifuZhang314',
    cv: '/Yifu_Zhang_CV.pdf',
  },
} as const;

export const researchAreaLine = profile.researchAreas.join(' · ');
