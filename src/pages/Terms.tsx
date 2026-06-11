import LegalPageLayout, { type LegalSection } from '../components/legal/LegalPageLayout';

const sections: LegalSection[] = [
  {
    heading: 'Using FIN',
    body: (
      <p>
        FIN provides software for financial management, accounting workflows, reports, VAT, assets, budgets and
        payroll features where included in your plan. You are responsible for the accuracy of data you enter and
        for reviewing outputs before relying on them.
      </p>
    ),
  },
  {
    heading: 'Accounts and Security',
    body: (
      <p>
        You must provide accurate account information, keep credentials confidential and notify us of suspected
        unauthorised access. We may suspend access to protect users, data, payment systems or the platform.
      </p>
    ),
  },
  {
    heading: 'Subscriptions and Payments',
    body: (
      <p>
        Paid plans are billed in South African Rand through the configured payment provider. Upgrades may take effect
        immediately after payment confirmation. Downgrades, cancellations and access expiry follow the rules shown in
        the app and payment flow.
      </p>
    ),
  },
  {
    heading: 'No Professional Advice',
    body: (
      <p>
        FIN is software, not professional accounting, tax, payroll, legal or audit advice. You should consult a
        qualified professional where decisions require expert judgement or regulatory interpretation.
      </p>
    ),
  },
  {
    heading: 'Acceptable Use',
    body: (
      <p>
        You may not use FIN unlawfully, attack the platform, upload malicious content, attempt unauthorised access,
        misuse payment systems or process information where you lack authority to do so.
      </p>
    ),
  },
  {
    heading: 'Liability',
    body: (
      <p>
        To the extent allowed by South African law, FIN is provided without guarantees that every calculation, report
        or integration will be error-free. Our liability is limited to direct losses caused by proven fault and excludes
        indirect, consequential or loss-of-profit claims where legally permitted.
      </p>
    ),
  },
  {
    heading: 'Governing Law',
    body: <p>These terms are governed by the laws of the Republic of South Africa.</p>,
  },
];

export default function Terms() {
  return (
    <LegalPageLayout
      title="Terms of Service"
      seoDescription="Terms of use for FIN by Sthwalo Holdings (Pty) Ltd — accounts, subscriptions and payments, acceptable use, liability and governing law under South African law."
      url="/terms"
      intro="These terms govern your use of FIN Financial Management. By using the service you agree to them."
      sections={sections}
    />
  );
}
