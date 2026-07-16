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
        support tickets, audit logs, payment status and subscription information. We also store the source documents
        you upload (such as bank statements, supplier invoices and payroll documents), and, where your employer
        enables time and attendance with location verification, clock-in and clock-out records including GPS
        coordinates, device and network identifiers.
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
        We share personal information with service providers (&ldquo;operators&rdquo;) only where needed to operate
        FIN: Amazon Web Services for cloud hosting, database and backup storage in the AWS Africa (Cape Town)
        region, and our email service provider for delivery of transactional email such as payslips, notifications
        and password resets. Operators may process personal information only on our instructions and must protect
        it appropriately. We do not currently use analytics or advertising services, we do not sell your personal
        information, and we do not use it to train machine-learning models. If we enable a payment provider or any
        new operator, we will update this policy before doing so.
      </p>
    ),
  },
  {
    heading: 'Where Your Information Is Stored',
    body: (
      <p>
        FIN is hosted in South Africa: our application, database, backups and your uploaded documents are located
        in the Amazon Web Services Africa (Cape Town) region, and your accounting, payroll and banking records stay
        there. The email we send you (including payslips) is delivered by our email service provider on servers
        located in the European Union.
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
