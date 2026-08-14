export interface AcademicEvent {
  title: string;
  shortName?: string;
  type: 'Conference' | 'Workshop';
  status: 'Upcoming' | 'Attended';
  dateLabel: string;
  startDate: string;
  location: string;
  url: string;
}

export const academicEvents: readonly AcademicEvent[] = [
  {
    title: 'Operator approaches to dynamics – new connections',
    shortName: 'OMDW01',
    type: 'Workshop',
    status: 'Upcoming',
    dateLabel: '17–21 August 2026',
    startDate: '2026-08-17',
    location: 'Isaac Newton Institute, Cambridge',
    url: 'https://www.newton.ac.uk/event/omdw01/',
  },
  {
    title:
      'Emerging Numerical Linear Algebra Research Gathering for Exchanging Developments',
    shortName: 'ENLARGED',
    type: 'Workshop',
    status: 'Upcoming',
    dateLabel: '14 September 2026',
    startDate: '2026-09-14',
    location: 'Rutherford Appleton Laboratory, Harwell',
    url: 'https://www.numerical.rl.ac.uk/events/numerical-linear-algebra-workshop/',
  },
];
