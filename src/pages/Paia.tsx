import LegalPageLayout, { type LegalSection } from '../components/legal/LegalPageLayout';

const linkClass = 'text-harvest-gold-600 hover:text-harvest-gold-700 font-medium';

const sections: LegalSection[] = [
  {
    heading: 'Access to Information',
    body: (
      <p>
        PAIA gives people the right to request access to records needed to exercise or protect rights. POPIA also
        gives data subjects rights to access and correct their personal information.
      </p>
    ),
  },
  {
    heading: 'Submitting Requests',
    body: (
      <p>
        Requests should identify the requester, the record requested, the right being exercised or protected and the
        preferred contact details. Send requests to{' '}
        <a href="mailto:sthwaloe@gmail.com" className={linkClass}>sthwaloe@gmail.com</a>.
      </p>
    ),
  },
  {
    heading: 'Records Available',
    body: (
      <p>
        Records may include company registration and governance records, service records, policies, customer support
        records, billing records and personal-information records, subject to lawful grounds for refusal.
      </p>
    ),
  },
  {
    heading: 'Regulator Guidance',
    body: (
      <p>
        PAIA and POPIA guidance is available from the Information Regulator and Department of Justice:{' '}
        <a href="https://www.justice.gov.za/paia/paia.htm" target="_blank" rel="noreferrer" className={linkClass}>
          PAIA guidance
        </a>.
      </p>
    ),
  },
];

export default function Paia() {
  return (
    <LegalPageLayout
      title="PAIA Manual"
      seoDescription="Promotion of Access to Information Act manual for FIN by Sthwalo Holdings (Pty) Ltd — how to request access to records."
      url="/paia"
      intro="How to request access to records held by Sthwalo Holdings under PAIA and POPIA."
      sections={sections}
    />
  );
}
