export type BlogBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'heading'; text: string }
  | { type: 'list'; items: string[] };

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  category: string;
  audience: string;
  author: string;
  date: string;
  reviewedDate: string;
  slug: string;
  featuredImage: string;
  readTime: string;
  sourceLabel: string;
  sourceHref: string;
  blocks: BlogBlock[];
}

const sharedImage = '/images/demo-thumbnails/1.webp';

export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Why I Built FIN: Financial Records Should Stay Reviewable',
    excerpt: 'FIN was built to help South African businesses move from scattered source records to controlled, reviewable financial workflows.',
    category: 'Founder Notes',
    audience: 'Business owners',
    author: 'Immaculate Nyoni',
    date: '2026-05-07',
    reviewedDate: '2026-06-07',
    slug: 'why-i-built-fin',
    featuredImage: sharedImage,
    readTime: '5 min read',
    sourceLabel: 'FIN value proposition',
    sourceHref: '/resources#value-proposition',
    blocks: [
      { type: 'paragraph', text: 'Many businesses already have useful financial source records: bank statements, invoices, payroll information, receipts, and operational documents. The difficult part is turning those records into a current, understandable accounting workflow.' },
      { type: 'heading', text: 'The aim is control, not invisible automation' },
      { type: 'paragraph', text: 'FIN imports supported bank statements and documents, presents extracted records for review, and helps users classify transactions. Reusable rules can reduce repeated work, while classifications, journals, corrections, and reports remain visible.' },
      { type: 'list', items: ['Upload supported financial records.', 'Review extracted transactions and classifications.', 'Inspect journals and ledger-backed reports.', 'Correct records when professional judgement is required.'] },
      { type: 'heading', text: 'Built for work throughout the year' },
      { type: 'paragraph', text: 'FIN is designed to help owners and finance teams maintain better records before reporting and tax deadlines arrive. It supports the work; it does not replace responsible review by the business, bookkeeper, accountant, or tax practitioner.' },
    ],
  },
  {
    id: 2,
    title: 'Your Bank Statement Is a Starting Point, Not a Finished Set of Books',
    excerpt: 'A bank statement contains useful transaction data, but it still needs classification, reconciliation, ledger posting, and review.',
    category: 'Accounting Workflows',
    audience: 'Business owners',
    author: 'Immaculate Nyoni',
    date: '2026-05-07',
    reviewedDate: '2026-06-07',
    slug: 'you-already-have-your-financial-data',
    featuredImage: sharedImage,
    readTime: '5 min read',
    sourceLabel: 'Business-owner manual',
    sourceHref: '/resources#business-owners',
    blocks: [
      { type: 'paragraph', text: 'Every bank transaction records a date, description, and amount. That is useful source data, but it does not explain the accounting treatment, supporting document, VAT position, or business purpose.' },
      { type: 'heading', text: 'How FIN uses the source record' },
      { type: 'list', items: ['Import supported PDF or CSV statements.', 'Review duplicates and extracted transaction details.', 'Classify transactions and create reusable mapping rules.', 'Reconcile records and inspect the resulting journals and reports.'] },
      { type: 'paragraph', text: 'Rules can make recurring classification more consistent, but users should still review the outcome. FIN does not guarantee extraction, classification, accounting, or tax accuracy.' },
      { type: 'heading', text: 'The result is traceability' },
      { type: 'paragraph', text: 'The value is a repeatable path from source record to reviewed accounting output, with corrections and audit-supporting records available when something needs attention.' },
    ],
  },
  {
    id: 3,
    title: 'Turning Bank Statements Into Reviewable Financial Workflows',
    excerpt: 'A practical walkthrough of importing, reviewing, classifying, reconciling, and reporting from supported bank statements.',
    category: 'Product Guides',
    audience: 'Owners and finance teams',
    author: 'Immaculate Nyoni',
    date: '2026-06-07',
    reviewedDate: '2026-06-07',
    slug: 'bank-statements-to-reviewable-workflows',
    featuredImage: sharedImage,
    readTime: '6 min read',
    sourceLabel: 'Bookkeeper manual',
    sourceHref: '/resources#bookkeepers',
    blocks: [
      { type: 'paragraph', text: 'A controlled bank-statement workflow separates ingestion from review. FIN keeps those stages visible so a user can see what was imported and what accounting treatment was applied.' },
      { type: 'list', items: ['Select the correct company and fiscal period.', 'Import a supported PDF or CSV statement.', 'Review extracted rows and possible duplicates.', 'Classify transactions and inspect reusable rules.', 'Reconcile records before relying on downstream reports.'] },
      { type: 'paragraph', text: 'Supported formats and extraction quality vary. OCR fallback and mapping rules assist the workflow, but the responsible user remains accountable for review and correction.' },
    ],
  },
  {
    id: 4,
    title: 'A Practical FIN Workflow for Bookkeepers',
    excerpt: 'Use FIN to keep recurring capture, classification, documents, payroll, and housekeeping organised across companies.',
    category: 'Product Guides',
    audience: 'Bookkeepers',
    author: 'Immaculate Nyoni',
    date: '2026-06-07',
    reviewedDate: '2026-06-07',
    slug: 'practical-fin-workflow-for-bookkeepers',
    featuredImage: sharedImage,
    readTime: '6 min read',
    sourceLabel: 'Bookkeeper manual',
    sourceHref: '/resources#bookkeepers',
    blocks: [
      { type: 'paragraph', text: 'Bookkeeping quality improves when recurring work follows a visible sequence and exceptions are handled before period-end reporting.' },
      { type: 'list', items: ['Confirm the active company and period.', 'Import and review bank activity.', 'Classify and reconcile transactions.', 'Capture and review customer, supplier, and payroll records.', 'Resolve exceptions and keep supporting documents connected.'] },
      { type: 'paragraph', text: 'FIN supports multi-company work and reusable rules, while company-scoped access limits which workspaces and actions a user may reach.' },
    ],
  },
  {
    id: 5,
    title: 'Ledger-Backed Reporting for Accountants',
    excerpt: 'FIN reports are built from operational records, journals, and the general ledger, with review still required.',
    category: 'Accounting Workflows',
    audience: 'Accountants',
    author: 'Immaculate Nyoni',
    date: '2026-06-07',
    reviewedDate: '2026-06-07',
    slug: 'ledger-backed-reporting-for-accountants',
    featuredImage: sharedImage,
    readTime: '6 min read',
    sourceLabel: 'Accountant manual',
    sourceHref: '/resources#accountants',
    blocks: [
      { type: 'paragraph', text: 'A report is more useful when its numbers can be traced back through journals and supporting operational records. FIN provides that ledger-backed path across core reporting workflows.' },
      { type: 'list', items: ['Review chart-of-accounts and fiscal-period context.', 'Inspect manual and workflow-generated double-entry journals.', 'Use the general ledger and trial balance as review foundations.', 'Generate financial, VAT, payroll, management, and audit-trail outputs.', 'Export reviewed outputs in supported formats.'] },
      { type: 'paragraph', text: 'FIN reports support accounting work and stakeholder communication. They do not constitute an audit opinion and do not remove the need for professional review.' },
    ],
  },
  {
    id: 6,
    title: 'What FIN Automates, What You Review, and What Remains Manual',
    excerpt: 'An honest boundary guide covering automation, user review, SARS-facing outputs, and future integrations.',
    category: 'Trust and Boundaries',
    audience: 'All FIN users',
    author: 'Immaculate Nyoni',
    date: '2026-06-07',
    reviewedDate: '2026-06-07',
    slug: 'what-fin-automates-and-what-remains-manual',
    featuredImage: sharedImage,
    readTime: '7 min read',
    sourceLabel: 'Trust and operating boundaries',
    sourceHref: '/resources#trust-boundaries',
    blocks: [
      { type: 'heading', text: 'FIN automates parts of the internal workflow' },
      { type: 'paragraph', text: 'FIN supports extraction, classification rules, double-entry postings, calculations, report generation, document output, and audit-supporting history across implemented workflows.' },
      { type: 'heading', text: 'Users review the financial result' },
      { type: 'paragraph', text: 'OCR, classification, accounting treatment, payroll, VAT, and reports require responsible review. FIN does not guarantee accuracy, compliance, savings, or business outcomes.' },
      { type: 'heading', text: 'External submission remains manual' },
      { type: 'paragraph', text: 'FIN is not connected to SARS APIs or eFiling. Users export or print reviewed SARS-facing preparation reports and submit or share them through the appropriate external process.' },
      { type: 'heading', text: 'Provider integrations are roadmap items' },
      { type: 'paragraph', text: 'Direct bank feeds, CIPC, labour-service connections, and broad partner integrations must not be presented as current capabilities.' },
    ],
  },
];

export const blogCategories = ['All', ...Array.from(new Set(blogPosts.map(post => post.category)))];

export const getBlogPostBySlug = (slug: string) => blogPosts.find(post => post.slug === slug) ?? null;
