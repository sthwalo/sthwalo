// React Router 7 exports StaticRouter from the core package; `react-router-dom/server`
// was a v6 path and no longer exists.
import { StaticRouter } from 'react-router';
import AppRoutes from './AppRoutes';

/**
 * The pages rendered to static HTML at build time.
 *
 * Why this exists: sthwalo.com served a 1.9 kB shell and **zero** words of body text to anything
 * that does not run JavaScript. Two consequences, both costly. The portfolio could not rank for
 * its own author's name, and the links to aosfin.com — the whole point of the reframe, and that
 * domain's first inbound links — existed only inside a JavaScript bundle, where they are
 * discovered late and count for less.
 *
 * Only pages whose content is in the source are listed. `/blog`, `/blog/:slug` and `/admin` fetch
 * from the MySQL-backed API at runtime, so prerendering them would bake an empty list into the
 * HTML and state a falsehood more confidently than rendering nothing. They keep the SPA fallback.
 *
 * Paths carry no trailing slash, matching the route table and every internal link. The .htaccess
 * serves `/about` from `/about/index.html` without redirecting, so the address stays canonical.
 */
export interface PrerenderRoute {
  path: string;
  /** Destination inside dist/. */
  file: string;
  title: string;
  description: string;
}

export const routes: PrerenderRoute[] = [
  {
    path: '/',
    // Not index.html: that file is the SPA fallback for /blog and every client route, so the home
    // page's markup cannot live in it without appearing under every unprerendered URL too.
    file: 'home.html',
    title: 'Immaculate Nyoni — Full-stack engineer | Sthwalo Holdings',
    description:
      'Full-stack engineer in South Africa building systems that hold up to an audit. Java 17, Spring Boot, React and PostgreSQL — including FIN, a multi-tenant financial platform in production.',
  },
  {
    path: '/about',
    file: 'about/index.html',
    title: 'About — Immaculate Nyoni',
    description:
      'A decade of accounting before writing software for a living, and systems built the way books are audited: precision, visible controls, and work someone else can check.',
  },
  {
    path: '/services',
    file: 'services/index.html',
    title: 'Services — full-stack, cloud, and financial systems',
    description:
      'Full-stack development, cloud and DevOps, security and compliance, and financial systems automation. What I can be hired to build.',
  },
  {
    path: '/portfolio',
    file: 'portfolio/index.html',
    title: 'Portfolio — FIN and client systems',
    description:
      'FIN, a multi-tenant financial platform with 200 migrations and 2,000+ automated tests, alongside live client sites across healthcare, training, hospitality and vehicle rental.',
  },
  {
    path: '/contact',
    file: 'contact/index.html',
    title: 'Contact — Immaculate Nyoni',
    description:
      'Get in touch about a project, a role, or FIN. Based in South Africa, working with clients locally and remotely.',
  },
  {
    path: '/privacy',
    file: 'privacy/index.html',
    title: 'Privacy Policy | Sthwalo Holdings',
    description: 'How Sthwalo Holdings (Pty) Ltd handles personal information, under POPIA.',
  },
  {
    path: '/terms',
    file: 'terms/index.html',
    title: 'Terms of Use | Sthwalo Holdings',
    description: 'The terms that apply to this site and the services offered through it.',
  },
  {
    path: '/cookies',
    file: 'cookies/index.html',
    title: 'Cookie Policy | Sthwalo Holdings',
    description: 'What this site stores in your browser, and why.',
  },
  {
    path: '/paia',
    file: 'paia/index.html',
    title: 'PAIA Manual | Sthwalo Holdings',
    description:
      'Promotion of Access to Information Act manual for Sthwalo Holdings (Pty) Ltd.',
  },
  {
    path: '/refunds',
    file: 'refunds/index.html',
    title: 'Refund and Cancellation Policy | Sthwalo Holdings',
    description: 'How refunds and cancellations are handled.',
  },
];

/** Renders one route's markup. Kept here so the script never imports React itself. */
export function renderRoute(path: string) {
  return (
    <StaticRouter location={path}>
      <AppRoutes />
    </StaticRouter>
  );
}
