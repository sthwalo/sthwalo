/**
 * Engineering problems solved, shown on the Portfolio page.
 *
 * Short by design: problem, solution, result. The full account of each one — the diagnosis, the
 * trade-offs, what went wrong first — is kept privately for interviews, not published here.
 *
 * Publish the control that exists now, never the flaw that preceded it, and nothing that maps the
 * attack surface (hostnames, roles, paths, addresses). Only work that is live in production.
 */
export type CaseStudy = {
  title: string;
  problem: string;
  solution: string;
  result: string;
  tags: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    title: 'Tenant isolation in the database',
    problem:
      'Every company on FIN shares one database, so a single missing filter in application code could expose one client’s books to another.',
    solution:
      'Added PostgreSQL row-level security beneath the application’s permission checks, enforced through a non-owner database role and architecture tests that fail the build when a tenant query runs outside it.',
    result: 'Isolation holds even when application code is wrong.',
    tags: ['PostgreSQL', 'Multi-tenancy', 'Spring Security'],
  },
  {
    title: 'One origin for the app and its API',
    problem:
      'Serving the application and its API from separate domains required cross-origin requests and cross-site cookies, which complicated authentication and CSRF protection.',
    solution:
      'Moved both onto a single origin, with the API under one path prefix behind the same reverse proxy, so the browser treats every request as same-origin.',
    result: 'No cross-origin configuration remains to maintain or misconfigure.',
    tags: ['nginx', 'HTTP', 'Web security'],
  },
  {
    title: 'Origin protection behind a CDN',
    problem:
      'A CDN only protects traffic that passes through it; a server that still answers direct connections lets clients bypass every edge rule.',
    solution:
      'Restricted the server’s firewall to the CDN’s published address ranges, required certificate-verified TLS between edge and origin, and refused any request that did not arrive through the edge.',
    result: 'The origin is reachable only through the CDN.',
    tags: ['Cloudflare', 'AWS', 'TLS'],
  },
  {
    title: 'Sign-in that survives a mail outage',
    problem:
      'Multi-factor sign-in depended on email delivered over SMTP, so a certificate change at the mail provider was enough to stop users signing in.',
    solution:
      'Moved authentication mail to a cloud email service over its HTTPS API, authenticated by the server’s own cloud role, with a correlation id carried from request to delivery.',
    result: 'Sign-in no longer depends on a third-party mail server, and no mail secret is stored.',
    tags: ['AWS SES', 'Resilience', 'Observability'],
  },
  {
    title: 'Bank statements routed by issuer',
    problem:
      'Imported statements were assigned to a bank by counting bank names across all lines, so the banks of counterparties could outvote the bank that issued the statement.',
    solution:
      'Changed all five statement parsers to identify the issuing bank from the statement’s own identity fields rather than from its transaction lines.',
    result: 'Each statement is filed under the bank that issued it.',
    tags: ['Java', 'Parsing', 'Domain modelling'],
  },
  {
    title: 'An API contract that cannot drift',
    problem:
      'Hand-maintained API documentation drifts from the code, and generated documentation can silently omit endpoints or guess their access rules.',
    solution:
      'Generated the OpenAPI contract and endpoint catalogue from the running application, reading access rules from the gates that enforce them, with build checks that fail when an endpoint is missing or misdescribed.',
    result: 'Over 770 operations are documented from the code that serves them.',
    tags: ['OpenAPI', 'Spring Boot', 'Testing'],
  },
];
