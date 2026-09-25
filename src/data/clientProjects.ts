/**
 * Client work, in one place.
 *
 * The same four projects were listed twice — once in `TrustSignals` on the home page and once in
 * the Portfolio page's "Client websites & systems" section — with descriptions that had already
 * drifted apart ("Public-facing website with content management" against "Public-facing website
 * with CMS and content management"). Two copies of a fact is one copy too many: the next edit
 * lands on whichever the author happened to open.
 *
 * `name` rather than `title`, because that is what these are. The Portfolio page destructured
 * `title`; it now reads `name` from here.
 */
export type ClientProject = {
  name: string;
  /** Live site. These are the strongest evidence on the site, so every one must resolve. */
  url: string;
  description: string;
};

export const clientProjects: ClientProject[] = [
  {
    name: 'African Health Excellence Organisation',
    url: 'https://heosa.africa',
    description: 'Public-facing website with CMS and content management.',
  },
  {
    name: 'Dr. Tracy Mmako',
    url: 'https://drmmako.co.za',
    description:
      'Neurologist practice site at Riverside Medical Center — professional medical presence.',
  },
  {
    name: 'ExecuHire',
    url: 'https://www.execuhire.co.za',
    description: 'Luxury vehicle rental platform with booking system and fleet showcase.',
  },
  {
    name: 'Leolilian Care International',
    url: 'https://leolilly.org',
    description:
      'Caregiver, cruise-ship hospitality and professional chef training provider — programme catalogues with online enrolment and automated email confirmation.',
  },
];
