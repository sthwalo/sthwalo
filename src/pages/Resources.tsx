import { BookOpen, Briefcase, Calculator, ExternalLink, Landmark, ShieldCheck } from 'lucide-react';
import Button from '../components/ui/Button';
import SeoMeta from '../components/ui/SeoMeta';
import { trackResourceView, trackSocialDemoClick } from '../utils/analytics';
import { useEffect } from 'react';

const guides = [
  { id: 'business-owners', icon: Briefcase, title: 'Business-owner guide', text: 'Company setup, dashboards, reports, plans, users, and support.', article: '/blog/why-i-built-fin' },
  { id: 'bookkeepers', icon: BookOpen, title: 'Bookkeeper guide', text: 'Bank imports, classification, invoices, payroll capture, and housekeeping.', article: '/blog/practical-fin-workflow-for-bookkeepers' },
  { id: 'accountants', icon: Calculator, title: 'Accountant guide', text: 'Chart of accounts, journals, general ledger, VAT, reports, assets, and year-end.', article: '/blog/ledger-backed-reporting-for-accountants' },
  { id: 'trust-boundaries', icon: ShieldCheck, title: 'Trust and operating boundaries', text: 'What FIN automates, what requires review, and which promises are not made.', article: '/blog/what-fin-automates-and-what-remains-manual' },
  { id: 'regulatory-reporting', icon: Landmark, title: 'Regulatory reporting boundary', text: 'FIN prepares SARS-facing reports for review, export, print, and manual submission.', article: '/blog/what-fin-automates-and-what-remains-manual' },
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
          <p className="text-lg text-warm-sand-400">Manuals and practical walkthroughs based on the maintained FIN documentation. Video demonstrations are published on Sthwalo social channels.</p>
        </div>
      </section>
      <section className="section-padding bg-warm-sand-50">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {guides.map(({ id, icon: Icon, title, text, article }) => <article id={id} key={id} className="p-8 rounded-2xl bg-white border border-warm-sand-300/30 scroll-mt-28"><Icon className="w-8 h-8 text-harvest-gold-600" /><h2 className="text-xl font-bold text-deep-space-800 mt-5">{title}</h2><p className="text-deep-space-600 mt-3 mb-6">{text}</p><Button to={article} variant="secondary" size="sm" onClick={() => trackResourceView(id)}>Read the guide</Button></article>)}
          </div>
          <div id="value-proposition" className="mt-14 p-8 rounded-2xl bg-deep-space-800 text-warm-sand-100 scroll-mt-28">
            <h2 className="text-2xl font-bold">FIN's documented value proposition</h2>
            <p className="text-warm-sand-400 mt-3 max-w-3xl">FIN helps South African finance teams turn everyday financial records into reviewable accounting workflows and decision-ready reports. It uses controlled automation without hiding the accounting result.</p>
          </div>
          <div className="mt-14 text-center"><h2 className="text-2xl font-bold text-deep-space-800">Watch separately published demonstrations</h2><p className="text-deep-space-600 mt-3 mb-6">Follow the platform you use. Every demonstration should link back to the relevant written guide.</p><div className="flex flex-wrap justify-center gap-3">{socials.map(([name, href]) => <a key={name} href={href} target="_blank" rel="noreferrer" onClick={() => trackSocialDemoClick(name)} className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white border border-warm-sand-300/50 font-semibold text-deep-space-800">{name}<ExternalLink className="w-4 h-4" /></a>)}</div></div>
          <div className="mt-12 text-center"><a href="/resources/FIN_Public_Handbook.pdf" className="inline-flex items-center gap-2 font-semibold text-deep-space-800 underline">Download the public FIN handbook (PDF)<ExternalLink className="w-4 h-4" /></a></div>
        </div>
      </section>
    </>
  );
}
