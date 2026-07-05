import { BookOpen, Briefcase, Calculator, Download, ExternalLink, Landmark, Lock, ShieldCheck, Sparkles } from 'lucide-react';
import Button from '../components/ui/Button';
import SeoMeta from '../components/ui/SeoMeta';
import { trackResourceView, trackSocialDemoClick } from '../utils/analytics';
import { useEffect } from 'react';

const guides = [
  { id: 'whats-new', icon: Sparkles, title: "What's new in FIN", text: 'The July handbook refresh covers the new sidebar, Accounting Workbench, Inventory Management, Tax & Compliance, Reports & AFS, and Budgets & Forecasts.', article: '/blog/recent-fin-improvements-payables-corrections-residency' },
  { id: 'document-vault', icon: Lock, title: 'Your documents, kept safe', text: 'Uploaded invoices, receipts, statements, and CSVs are retained as originals in private, encrypted, South African storage you can download from.', article: '/blog/your-source-documents-stay-safe' },
  { id: 'business-owners', icon: Briefcase, title: 'Business-owner guide', text: 'Business Overview, Entity & Period Setup, team access, Reports & AFS, Inventory Management, Budgets & Forecasts, billing, and support.', article: '/blog/why-i-built-fin' },
  { id: 'bookkeepers', icon: BookOpen, title: 'Bookkeeper guide', text: 'Accounting Workbench imports and classification, Inventory Management documents and ledgers, payroll capture, retained source files, and housekeeping.', article: '/blog/practical-fin-workflow-for-bookkeepers' },
  { id: 'accountants', icon: Calculator, title: 'Accountant guide', text: 'Chart of accounts, journals, audit-linked reversals, General Ledger, Tax & Compliance, Reports & AFS, Fixed Assets, inventory, budgets, and year-end.', article: '/blog/ledger-backed-reporting-for-accountants' },
  { id: 'trust-boundaries', icon: ShieldCheck, title: 'Trust and operating boundaries', text: 'What FIN automates, what requires review, and which promises are not made.', article: '/blog/what-fin-automates-and-what-remains-manual' },
  { id: 'regulatory-reporting', icon: Landmark, title: 'Regulatory reporting boundary', text: 'Tax & Compliance prepares SARS-facing reports for review, export, print, and manual submission.', article: '/blog/what-fin-automates-and-what-remains-manual' },
];

// Animated tours of the current FIN UI (public/images/*.gif), generated from the live app.
const tours = [
  { gif: 'overview', title: 'Business Overview', text: 'Portfolio KPIs, companies, and payroll readiness.', link: '/blog/why-i-built-fin' },
  { gif: 'setup', title: 'Entity & Period Setup', text: 'Companies, fiscal periods, RBAC, and Row-Level Security.', link: '/resources#business-owners' },
  { gif: 'bank-to-ledger', title: 'Accounting Workbench', text: 'Import → classify → cashbook → reconcile → ledger.', link: '/blog/bank-statements-to-reviewable-workflows' },
  { gif: 'document-vault', title: 'Document Vault', text: 'Capture → OCR extraction → retained source files.', link: '/blog/your-source-documents-stay-safe' },
  { gif: 'inventory', title: 'Inventory Management', text: 'Stock, 3-way purchase matching, AR/AP, and reports.', link: '/blog/recent-fin-improvements-payables-corrections-residency' },
  { gif: 'tax-compliance', title: 'Tax & Compliance', text: 'VAT review reconciled into a VAT201 working paper.', link: '/blog/what-fin-automates-and-what-remains-manual' },
  { gif: 'fixed-assets', title: 'Fixed Assets', text: 'Asset register and depreciation posting to the ledger.', link: '/blog/ledger-backed-reporting-for-accountants' },
  { gif: 'payroll', title: 'Payroll', text: 'Pay run, Time & Attendance, and EMP201 preparation.', link: '/blog/practical-fin-workflow-for-bookkeepers' },
  { gif: 'reporting', title: 'Reports & AFS', text: 'Ledger → budgets → statements and compliance packs.', link: '/blog/ledger-backed-reporting-for-accountants' },
];

const socials = [
  ['YouTube', 'https://youtube.com/@sthwalo'],
  ['LinkedIn', 'https://www.linkedin.com/in/inyoni/'],
  ['Instagram', 'https://www.instagram.com/sthwalos/'],
  ['Facebook', 'https://web.facebook.com/sthwalosenkosi/'],
  ['X', 'https://x.com/nyoniimma'],
];

export default function Resources() {
  useEffect(() => trackResourceView('resources-index'), []);
  return (
    <>
      <SeoMeta title="FIN Manuals, Guides and Trust Resources | Sthwalo Holdings" description="Read FIN's public manuals, current capability boundaries, and documentation-backed walkthroughs." url="/resources" />
      <section className="relative pt-32 pb-20 bg-deep-space-800">
        <div className="section-container max-w-4xl">
          <span className="text-sm font-semibold tracking-widest uppercase text-harvest-gold-200">FIN Resources</span>
          <h1 className="text-4xl md:text-6xl font-bold text-warm-sand-100 mt-4 mb-6">See how FIN works.<br /><span className="text-harvest-gold-200">Know where its boundaries are.</span></h1>
          <p className="text-lg text-warm-sand-400">Manuals and practical walkthroughs based on the maintained FIN documentation. See the <a href="#see-fin-in-action" className="text-harvest-gold-200 underline">animated product tours</a> below; full video demonstrations are published on Sthwalo social channels.</p>
        </div>
      </section>
      <section className="section-padding bg-warm-sand-50">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guides.map(({ id, icon: Icon, title, text, article }) => <article id={id} key={id} className="p-8 rounded-2xl bg-white border border-warm-sand-300/30 scroll-mt-28"><Icon className="w-8 h-8 text-harvest-gold-600" /><h2 className="text-xl font-bold text-deep-space-800 mt-5">{title}</h2><p className="text-deep-space-600 mt-3 mb-6">{text}</p><Button to={article} variant="secondary" size="sm" onClick={() => trackResourceView(id)}>Read the guide</Button></article>)}
          </div>
          <div id="value-proposition" className="mt-14 p-8 rounded-2xl bg-deep-space-800 text-warm-sand-100 scroll-mt-28">
            <h2 className="text-2xl font-bold">FIN's documented value proposition</h2>
            <p className="text-warm-sand-400 mt-3 max-w-3xl">FIN helps South African finance teams turn everyday financial records into reviewable accounting workflows and decision-ready reports across Accounting Workbench, Inventory Management, Payroll, Tax & Compliance, Budgets & Forecasts, and Reports & AFS. It uses controlled automation without hiding the accounting result.</p>
          </div>
          <div id="see-fin-in-action" className="mt-16 scroll-mt-28">
            <div className="text-center max-w-2xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold text-deep-space-800">See FIN in action</h2>
              <p className="text-deep-space-600 mt-3 mb-8">Animated tours of the current FIN interface — one per module, plus a full end-to-end walkthrough. Each links to the written guide it illustrates.</p>
            </div>
            <a href="/blog/why-i-built-fin" onClick={() => trackResourceView('tour-grand')} className="block rounded-2xl overflow-hidden border border-warm-sand-300/40 bg-deep-space-900 mb-8 group">
              <img src="/images/grand-tour.gif" alt="Full FIN walkthrough touring every module" className="w-full h-auto block" loading="lazy" />
              <div className="p-5 flex items-center justify-between bg-white"><div><h3 className="font-bold text-deep-space-800">Full platform tour</h3><p className="text-sm text-deep-space-600">Every module, end to end — overview, setup, workbench, inventory, tax, assets, payroll, budgets, and reports.</p></div><span className="text-sm font-semibold text-harvest-gold-600 whitespace-nowrap group-hover:underline">Read the story →</span></div>
            </a>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tours.map(({ gif, title, text, link }) => (
                <a key={gif} href={link} onClick={() => trackResourceView(`tour-${gif}`)} className="rounded-2xl overflow-hidden border border-warm-sand-300/40 bg-white flex flex-col group">
                  <img src={`/images/${gif}.gif`} alt={`FIN ${title} walkthrough`} className="w-full h-auto block border-b border-warm-sand-300/30" loading="lazy" />
                  <div className="p-5 flex flex-col flex-1">
                    <h3 className="font-bold text-deep-space-800">{title}</h3>
                    <p className="text-sm text-deep-space-600 mt-1 flex-1">{text}</p>
                    <span className="text-sm font-semibold text-harvest-gold-600 mt-4 group-hover:underline">Read the guide →</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
          <div className="mt-16 text-center"><h2 className="text-2xl font-bold text-deep-space-800">Watch separately published demonstrations</h2><p className="text-deep-space-600 mt-3 mb-6">Follow the platform you use. Every demonstration should link back to the relevant written guide.</p><div className="flex flex-wrap justify-center gap-3">{socials.map(([name, href]) => <a key={name} href={href} target="_blank" rel="noreferrer" onClick={() => trackSocialDemoClick(name)} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-warm-sand-300/50 font-semibold text-deep-space-800">{name}<ExternalLink className="w-4 h-4" /></a>)}</div></div>
          <div className="mt-12 text-center"><a href="/downloads/FIN_Public_Handbook.pdf" download="FIN_Public_Handbook.pdf" onClick={() => trackResourceView('handbook-pdf')} className="inline-flex items-center gap-2 font-semibold text-deep-space-800 underline"><Download className="w-4 h-4" />Download the public FIN handbook (PDF)</a></div>
        </div>
      </section>
    </>
  );
}
