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


export const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Why I Built FIN: Financial Records Should Stay Reviewable',
    excerpt: 'FIN was built to help South African businesses move from scattered source records to controlled, reviewable financial workflows.',
    category: 'Founder Notes',
    audience: 'Business owners',
    author: 'Immaculate Nyoni',
    date: '2026-05-07',
    reviewedDate: '2026-07-04',
    slug: 'why-i-built-fin',
    featuredImage: '/images/pipeline.gif',
    readTime: '5 min read',
    sourceLabel: 'FIN value proposition',
    sourceHref: '/resources#value-proposition',
    blocks: [
      { type: 'paragraph', text: 'Many businesses already have useful financial source records: bank statements, invoices, inventory and sales records, payroll information, receipts, and operational documents. The difficult part is turning those records into a current, understandable accounting workflow.' },
      { type: 'heading', text: 'The aim is control, not invisible automation' },
      { type: 'paragraph', text: 'FIN imports supported bank statements and documents through Accounting Workbench, presents extracted records for review, and helps users classify transactions. Inventory Management now holds sales documents, customers, suppliers, AR/AP, stock, purchasing, and inventory reports. Reusable rules can reduce repeated work, while classifications, journals, corrections, and reports remain visible.' },
      { type: 'list', items: ['Upload supported financial records in Accounting Workbench.', 'Review extracted transactions and classifications.', 'Manage documents, customers, suppliers, and stock from Inventory Management.', 'Inspect journals and ledger-backed reports in Accounting Workbench and Reports & AFS.', 'Correct records when professional judgement is required.'] },
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
    reviewedDate: '2026-07-04',
    slug: 'you-already-have-your-financial-data',
    featuredImage: '/images/bank-to-ledger.gif',
    readTime: '5 min read',
    sourceLabel: 'Business-owner manual',
    sourceHref: '/resources#business-owners',
    blocks: [
      { type: 'paragraph', text: 'Every bank transaction records a date, description, and amount. That is useful source data, but it does not explain the accounting treatment, supporting document, VAT position, or business purpose.' },
      { type: 'heading', text: 'How FIN uses the source record' },
      { type: 'list', items: ['Import supported PDF or CSV statements in Accounting Workbench.', 'Review duplicates and extracted transaction details.', 'Classify transactions and create reusable mapping rules.', 'Reconcile records before relying on reports.', 'Use Inventory Management for sales/supplier documents, AR/AP, and stock workflows.'] },
      { type: 'paragraph', text: 'Rules can make recurring classification more consistent, but users should still review the outcome. FIN does not guarantee extraction, classification, accounting, or tax accuracy.' },
      { type: 'heading', text: 'The result is traceability' },
      { type: 'paragraph', text: 'The value is a repeatable path from source record to reviewed accounting output, with corrections and audit-supporting records available when something needs attention.' },
    ],
  },
  {
    id: 3,
    title: 'Turning Bank Statements Into Accounting Workbench Reviews',
    excerpt: 'A practical walkthrough of importing, reviewing, classifying, reconciling, and reporting from supported bank statements in the refreshed FIN UI.',
    category: 'Product Guides',
    audience: 'Owners and finance teams',
    author: 'Immaculate Nyoni',
    date: '2026-06-07',
    reviewedDate: '2026-07-04',
    slug: 'bank-statements-to-reviewable-workflows',
    featuredImage: '/images/bank-to-ledger.gif',
    readTime: '6 min read',
    sourceLabel: 'Bookkeeper manual',
    sourceHref: '/resources#bookkeepers',
    blocks: [
      { type: 'paragraph', text: 'A controlled bank-statement workflow separates ingestion from review. In the current UI, that workflow sits in Accounting Workbench so a user can see what was imported, what accounting treatment was applied, and how it reaches the cashbook, general ledger, audit trail, and reports.' },
      { type: 'list', items: ['Select the correct company and fiscal period.', 'Open Accounting Workbench → Upload and import a supported PDF or CSV statement.', 'Review extracted rows and possible duplicates.', 'Classify transactions and inspect reusable rules.', 'Use Accounting Workbench → Cashbook, Bank Reconciliation, General Ledger, and Operations to review the result before relying on Reports & AFS.'] },
      { type: 'paragraph', text: 'Supported formats and extraction quality vary. OCR fallback and mapping rules assist the workflow, but the responsible user remains accountable for review and correction.' },
    ],
  },
  {
    id: 4,
    title: 'A Practical FIN Workflow for Bookkeepers',
    excerpt: 'Use FIN to keep Accounting Workbench capture, classification, Inventory Management documents, payroll, and housekeeping organised across companies.',
    category: 'Product Guides',
    audience: 'Bookkeepers',
    author: 'Immaculate Nyoni',
    date: '2026-06-07',
    reviewedDate: '2026-07-04',
    slug: 'practical-fin-workflow-for-bookkeepers',
    featuredImage: '/images/payroll.gif',
    readTime: '6 min read',
    sourceLabel: 'Bookkeeper manual',
    sourceHref: '/resources#bookkeepers',
    blocks: [
      { type: 'paragraph', text: 'Bookkeeping quality improves when recurring work follows a visible sequence and exceptions are handled before period-end reporting. The refreshed FIN UI separates source-to-ledger work from trading and stock operations so the workflow is easier to explain.' },
      { type: 'list', items: ['Confirm the active company and period.', 'Use Accounting Workbench to import source records, classify transactions, reconcile, inspect cashbook/general-ledger results, and run housekeeping operations.', 'Use Inventory Management for sales documents, supplier documents, customers, suppliers, AR/AP settlement, item master, stock control, purchases, and inventory reports.', 'Use Payroll for employees, pay runs, clocking, payslips, and payroll reports.', 'Resolve exceptions and keep supporting documents connected.'] },
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
    reviewedDate: '2026-07-04',
    slug: 'ledger-backed-reporting-for-accountants',
    featuredImage: '/images/reporting.gif',
    readTime: '6 min read',
    sourceLabel: 'Accountant manual',
    sourceHref: '/resources#accountants',
    blocks: [
      { type: 'paragraph', text: 'A report is more useful when its numbers can be traced back through journals and supporting operational records. FIN provides that ledger-backed path across core reporting workflows while making the current UI locations explicit.' },
      { type: 'list', items: ['Review chart-of-accounts and fiscal-period context in Accounting Workbench.', 'Inspect manual and workflow-generated double-entry journals, including audit-linked reversals.', 'Use Accounting Workbench → General Ledger and Reports & AFS → TB as review foundations.', 'Generate financial, VAT, payroll, inventory, management, AFS, and audit-trail outputs from the relevant current modules.', 'Export reviewed outputs in supported formats.'] },
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
    reviewedDate: '2026-07-04',
    slug: 'what-fin-automates-and-what-remains-manual',
    featuredImage: '/images/bank-to-ledger.gif',
    readTime: '7 min read',
    sourceLabel: 'Trust and operating boundaries',
    sourceHref: '/resources#trust-boundaries',
    blocks: [
      { type: 'heading', text: 'FIN automates parts of the internal workflow' },
      { type: 'paragraph', text: 'FIN supports extraction, classification rules, double-entry postings, calculations, report generation, document output, inventory and purchasing workflows, budget planning, and audit-supporting history across implemented workflows.' },
      { type: 'heading', text: 'Users review the financial result' },
      { type: 'paragraph', text: 'OCR, classification, accounting treatment, payroll, VAT, and reports require responsible review. FIN does not guarantee accuracy, compliance, savings, or business outcomes.' },
      { type: 'heading', text: 'External submission remains manual' },
      { type: 'paragraph', text: 'FIN is not connected to SARS APIs or eFiling. Users export or print reviewed SARS-facing preparation reports and submit or share them through the appropriate external process.' },
      { type: 'heading', text: 'Provider integrations are roadmap items' },
      { type: 'paragraph', text: 'Direct bank feeds, CIPC, labour-service connections, and broad partner integrations must not be presented as current capabilities.' },
    ],
  },
  {
    id: 7,
    title: 'Recent FIN Improvements: UI Refresh, Inventory, Budgets, and Handbook Updates',
    excerpt: 'A round-up of recent platform updates — refreshed navigation, Accounting Workbench, Inventory Management, Budgets & Forecasts, Tax & Compliance, Reports & AFS, and the updated public handbook.',
    category: 'Product Guides',
    audience: 'Owners and finance teams',
    author: 'Immaculate Nyoni',
    date: '2026-06-20',
    reviewedDate: '2026-07-04',
    slug: 'recent-fin-improvements-payables-corrections-residency',
    featuredImage: '/images/inventory.gif',
    readTime: '7 min read',
    sourceLabel: 'FIN user manuals',
    sourceHref: '/resources#business-owners',
    blocks: [
      { type: 'paragraph', text: 'FIN continues to mature as a controlled, reviewable financial workflow for South African businesses. The July public handbook refresh aligns the manuals and marketing resources with the current UI, so users see the same language in the product and in the guides. FIN supports the work and keeps it visible; it does not replace responsible review and is not connected to SARS APIs or eFiling.' },
      { type: 'heading', text: 'The sidebar now reflects how people work' },
      { type: 'paragraph', text: 'The current sidebar groups work into Command, Accounting Flow, and People. Current labels include Business Overview, Entity & Period Setup, Accounting Workbench, Inventory Management, Tax & Compliance, Fixed Assets, Budgets & Forecasts, Reports & AFS, Payroll, and Account, Billing & Access.' },
      { type: 'heading', text: 'Accounting Workbench is source-to-ledger' },
      { type: 'list', items: ['Upload bank statements and documents.', 'Review imported transactions and documents.', 'Classify transactions and manage reusable rules.', 'Use cashbook, bank reconciliation, general ledger, chart of accounts, adjustment entry, operations, and audit trail from one workbench.'] },
      { type: 'heading', text: 'Inventory Management now owns trading and stock workflows' },
      { type: 'paragraph', text: 'Sales documents, supplier documents, customers, suppliers, AR/AP ledgers, item master, stock control, purchasing, adjustments, costing/WIP, and inventory reports now sit under Inventory Management. Companies can enable inventory when they are ready to track stock and valuation workflows.' },
      { type: 'heading', text: 'Reports, tax, assets, and budgets have clearer homes' },
      { type: 'list', items: ['Reports & AFS contains Management Metrics, Monthly Accounts, TB, Income Statement, Balance Sheet, Cash Flow Statement, and AFS.', 'Tax & Compliance contains VAT, Income Tax Computation, Payroll Taxes, and Other Taxes.', 'Fixed Assets contains asset position, depreciation, and disposal workflows.', 'Budgets & Forecasts contains budget overview, line items, projections, assumptions, initiatives and milestones, monthly activities, strategic plan, and Strategic Plan PDF export.'] },
      { type: 'heading', text: 'The public handbook is current again' },
      { type: 'paragraph', text: 'The downloadable FIN Public Handbook now includes the general-user manual and reflects the July 2026 UI labels. It remains deliberately scoped to product use, role guidance, trust boundaries, and manual/reporting workflows — not internal architecture notes.' },
    ],
  },
  {
    id: 8,
    title: 'Your Source Documents Now Stay Safe in FIN',
    excerpt: 'Uploaded invoices, receipts, bank statements, and CSVs are now kept as their original files in private, encrypted storage hosted in South Africa — and you can download them whenever you need them.',
    category: 'Trust and Boundaries',
    audience: 'All FIN users',
    author: 'Immaculate Nyoni',
    date: '2026-06-21',
    reviewedDate: '2026-07-04',
    slug: 'your-source-documents-stay-safe',
    featuredImage: '/images/document-vault.gif',
    readTime: '4 min read',
    sourceLabel: 'FIN value proposition',
    sourceHref: '/resources#trust-boundaries',
    blocks: [
      { type: 'paragraph', text: 'Until recently, FIN read your uploaded files — invoice scans, receipts, bank statements, transaction CSVs — extracted the data, and then discarded the original. The records lived on, but the source file did not. That has changed: FIN now retains the original of every supported upload.' },
      { type: 'heading', text: 'Where your documents live' },
      { type: 'list', items: ['Originals are stored in a private, encrypted, versioned document vault.', 'The storage is hosted in the South African (Cape Town) region, which supports data-residency expectations for local businesses.', 'Files are reached only through short-lived, access-checked links — there are no public document URLs.'] },
      { type: 'heading', text: 'You can download them back' },
      { type: 'paragraph', text: 'Authorised users can download the original file from the imported-documents list and from the transactions view, so the source record sits alongside the transactions and reports it produced. That makes review, reconciliation, and audit easier — the paper trail is one click away.' },
      { type: 'heading', text: 'An honest boundary' },
      { type: 'paragraph', text: 'Keeping documents private, encrypted, and in-region is about good custody of your records and data residency. It is not a legal or regulatory compliance guarantee, and it does not replace your own backups or responsible review. As always, FIN supports your work and keeps it visible — it does not replace it.' },
    ],
  },
];

export const blogCategories = ['All', ...Array.from(new Set(blogPosts.map(post => post.category)))];

export const getBlogPostBySlug = (slug: string) => blogPosts.find(post => post.slug === slug) ?? null;
