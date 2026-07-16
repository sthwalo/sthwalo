import LegalPageLayout, { type LegalSection } from '../components/legal/LegalPageLayout';

const sections: LegalSection[] = [
  {
    heading: 'Essential Cookies',
    body: (
      <p>
        FIN uses essential cookies and similar browser storage for login sessions, session refresh, CSRF protection,
        security, selected working context and payment-flow continuity. These are required for the app to work safely.
      </p>
    ),
  },
  {
    heading: 'Analytics and Optional Cookies',
    body: (
      <p>
        We do not require optional advertising cookies for the core service. If analytics or marketing cookies are
        introduced, the app should request consent before setting them and allow users to withdraw consent.
      </p>
    ),
  },
  {
    heading: 'Managing Cookies',
    body: (
      <p>
        You can block or delete cookies in your browser. Blocking essential cookies may prevent login, payment
        confirmation, CSRF protection and normal app functionality.
      </p>
    ),
  },
];

export default function Cookies() {
  return (
    <LegalPageLayout
      title="Cookie Policy"
      seoDescription="How FIN by Sthwalo Holdings uses essential cookies, and our position on analytics and optional cookies."
      url="/cookies"
      intro="FIN uses only the cookies it needs to work safely."
      sections={sections}
    />
  );
}
