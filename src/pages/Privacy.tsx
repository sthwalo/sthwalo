import { ExternalLink } from 'lucide-react';
import LegalPageLayout, { type LegalSection } from '../components/legal/LegalPageLayout';

const linkClass = 'text-harvest-gold-600 hover:text-harvest-gold-700 font-medium';

const sections: LegalSection[] = [
  {
    heading: 'Responsible Party',
    body: (
      <p>
        Sthwalo Holdings (Pty) Ltd is the responsible party for personal information processed through FIN.
        Privacy requests may be sent to{' '}
        <a href="mailto:sthwaloe@gmail.com" className={linkClass}>sthwaloe@gmail.com</a>.
      </p>
    ),
  },
  {
    heading: 'Information We Process',
    body: (
      <p>
        We process account details, contact details, authentication and session information, company records,
        accounting records, invoices, customers, suppliers, assets, VAT records, payroll information where enabled,
        support tickets, audit logs, payment status and subscription information.
      </p>
    ),
  },
  {
    heading: 'Why We Process It',
    body: (
      <p>
        We process personal information to create and secure accounts, provide accounting and reporting services,
        manage subscriptions and payments, support users, comply with tax and accounting obligations, prevent abuse,
        maintain audit trails and improve the service.
      </p>
    ),
  },
  {
    heading: 'Legal Basis Under POPIA',
    body: (
      <p>
        Processing is based on contract performance, user consent where required, compliance with legal obligations,
        legitimate service and security interests, and the protection of lawful rights. We process only information
        reasonably required for the service purpose.
      </p>
    ),
  },
  {
    heading: 'Sharing and Operators',
    body: (
      <p>
        We share information with service providers only where needed to operate FIN, including payment processing
        through PayFast, hosting, email delivery, support, backups, analytics where enabled and security monitoring.
        Operators must process information only on our instructions and protect it appropriately.
      </p>
    ),
  },
  {
    heading: 'Retention',
    body: (
      <p>
        We retain account, payment, accounting, audit and support information for as long as needed to provide the
        service, meet tax, accounting and legal obligations, resolve disputes and maintain security records. Users may
        request deletion, subject to records that must legally or operationally be retained.
      </p>
    ),
  },
  {
    heading: 'Your Rights',
    body: (
      <>
        <p>
          Data subjects may request access, correction, deletion, objection to processing, restriction where applicable
          and details of third parties who received their personal information. Complaints may be lodged with the
          Information Regulator (South Africa).
        </p>
        <p>
          Information Regulator:{' '}
          <a href="https://inforegulator.org.za/complaints/" target="_blank" rel="noreferrer" className={`inline-flex items-center gap-1 ${linkClass}`}>
            complaints portal <ExternalLink className="w-3 h-3" />
          </a>
        </p>
      </>
    ),
  },
  {
    heading: 'Security Compromises',
    body: (
      <p>
        If a security compromise is reasonably suspected, we will investigate, take containment steps and notify
        affected data subjects and the Information Regulator where POPIA requires notification.
      </p>
    ),
  },
];

export default function Privacy() {
  return (
    <LegalPageLayout
      title="Privacy Policy"
      seoDescription="How FIN by Sthwalo Holdings processes personal information under POPIA — what we collect, why, your rights, and how to reach the Information Regulator."
      url="/privacy"
      intro="This notice explains how FIN processes personal information in line with the Protection of Personal Information Act (POPIA)."
      sections={sections}
    />
  );
}
