import LegalPageLayout, { type LegalSection } from '../components/legal/LegalPageLayout';

const linkClass = 'text-harvest-gold-600 hover:text-harvest-gold-700 font-medium';

const sections: LegalSection[] = [
  {
    heading: 'Your Rights Under South African Law',
    body: (
      <p>
        Nothing in this policy limits any right you have under South African law, including the Consumer Protection
        Act and the Electronic Communications and Transactions Act where they apply to you. If your statutory rights
        give you more than this policy does, your statutory rights win.
      </p>
    ),
  },
  {
    heading: 'Try Before You Pay',
    body: (
      <p>
        FIN offers a free 14-day Trial plan. We would rather you find out FIN is not right for you during the trial
        than argue about a refund afterwards — please use it.
      </p>
    ),
  },
  {
    heading: 'The 14-Day Refund',
    body: (
      <p>
        If you are within 14 days of your first payment to us and FIN is not right for you, tell us and we will
        refund that payment in full. You do not need to give a reason. This applies to your first payment only.
      </p>
    ),
  },
  {
    heading: 'Refunds After 14 Days',
    body: (
      <p>
        After the first 14 days, subscription fees are generally not refundable, because you have had access to the
        service for the period you paid for. We will refund pro-rata where we terminate for our own convenience,
        where we materially breach the agreement and do not fix it within a reasonable time, or where we got the
        billing wrong (a duplicate charge, a charge after valid cancellation, or a charge at the wrong rate —
        corrections have no time limit).
      </p>
    ),
  },
  {
    heading: 'When We Will Not Refund',
    body: (
      <p>
        We do not refund where you changed your mind after the 14-day window, did not use the service during a paid
        period, or are dissatisfied with an outcome that depends on data you entered. FIN is not connected to SARS,
        SARS eFiling or any bank feed — you export or print reports and submit them yourself, and expecting otherwise
        is not grounds for a refund. We also do not refund where access was suspended or terminated for breach.
      </p>
    ),
  },
  {
    heading: 'Cancelling',
    body: (
      <p>
        Contact us at <a href="mailto:sthwaloe@gmail.com" className={linkClass}>sthwaloe@gmail.com</a> to cancel. You
        keep access until the end of the period you have already paid for; cancelling does not by itself trigger a
        refund of that period. Downgrades take effect at the end of your current billing period. Please export
        anything you need before you cancel — after your subscription ends, your data is retained for 30 days for
        export and then deleted, except where the law requires us to keep it.
      </p>
    ),
  },
  {
    heading: 'Requesting a Refund',
    body: (
      <p>
        Email <a href="mailto:sthwaloe@gmail.com" className={linkClass}>sthwaloe@gmail.com</a> with the account and
        company name and the payment you are asking about. We will acknowledge within 2 business days, decide within
        10 business days, and pay approved refunds within 10 business days of the decision, by EFT to the account the
        payment came from. If you believe a charge is wrong, please contact us before raising a bank chargeback — we
        will almost always resolve it faster.
      </p>
    ),
  },
];

export default function Refunds() {
  return (
    <LegalPageLayout
      title="Refund and Cancellation Policy"
      seoDescription="Refunds and cancellation for FIN by Sthwalo Holdings — 14-day trial, 14-day first-payment refund, cancellation and turnaround times."
      url="/refunds"
      intro="What happens when you cancel your FIN subscription or ask for your money back."
      sections={sections}
    />
  );
}
