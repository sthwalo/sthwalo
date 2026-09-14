import { ArrowRight, Check, Info } from 'lucide-react';
import AnimatedSection from '../ui/AnimatedSection';

/**
 * What a free account actually gets, said before anyone signs up.
 *
 * <p>The site once sent people here with "Access FIN" or "Sign In to FIN" — an
 * instruction that only makes sense to someone who already has an account — and
 * where it did mention signing up it promised a 14-day trial that no longer
 * exists. FIN has had a permanent free tier since the Trial was retired.
 *
 * <p>"Access FIN" still appears in the navbar, and that is not a relapse: the
 * navbar is a persistent way in for people who already have an account, so it
 * names the destination. The CTAs on the page are where someone decides to sign
 * up, and those say what they get.
 *
 * <p>Every limit here is a real configured value, checked against the plan
 * migrations (V100/V163 for the caps, V170/V172 for the add-ons, V176/V178/V180
 * for the download allowance) rather than rounded for marketing. The
 * download line matters most: reports are readable in full on screen at every
 * tier, and it is only the copy taken away that is metered — which is the part
 * people assume the worst about if you leave it out.
 */
const included = [
  'One company workspace, one user',
  '100 bank transactions a month',
  'Five invoices a month',
  'Bank statement import, classification and reconciliation',
  'The full ledger: cashbook, general ledger, trial balance',
  'Income statement, balance sheet and cash flow — on screen, in full',
  'Inventory, stock and trading documents',
  'Fixed assets and depreciation schedules',
  'Your source documents retained and downloadable',
];

const worthKnowing = [
  'Reports are readable on screen in full — always, on every plan.',
  'Downloads are what is metered. Each month the free plan includes one copy of the cashbook, general ledger, trial balance, income statement, balance sheet and cash flow — each in each format, so a PDF and a spreadsheet are separate copies.',
  'Extra copies are R10 each, R80 for ten, or R100 for everything you can download that month.',
  'Invoices you create are never metered — download them as often as you like.',
  'Combined packs — the financial bundle, management pack, monthly accounts — stay readable on screen, but taking a copy is a paid plan or a purchase.',
  'VAT is the one advanced capability the free plan does not carry. It, payroll, budgets and CIPC are add-ons you can buy from the free plan, without upgrading first.',
];

export default function FreePlan() {
  return (
    <section className="section-padding bg-warm-sand-50">
      <div className="section-container max-w-5xl">
        <AnimatedSection>
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-sm font-semibold tracking-widest uppercase text-harvest-gold-600">
              Free account
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-deep-space-800 mt-3">
              Start free. No card, no countdown.
            </h2>
            <p className="text-deep-space-600 mt-4">
              The free plan is permanent — it is a monthly cap that prompts an upgrade, not a clock.
              Here is exactly what it includes.
            </p>
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl bg-white border border-warm-sand-300/50 p-7">
            <h3 className="font-bold text-deep-space-800 mb-4">What you get</h3>
            <ul className="space-y-3">
              {included.map((item) => (
                <li key={item} className="flex gap-3 text-deep-space-600">
                  <Check className="w-5 h-5 flex-shrink-0 text-harvest-gold-600 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl bg-deep-space-800 text-warm-sand-100 p-7">
            <h3 className="font-bold mb-4">Worth knowing up front</h3>
            <ul className="space-y-3">
              {worthKnowing.map((item) => (
                <li key={item} className="flex gap-3 text-warm-sand-300">
                  <Info className="w-5 h-5 flex-shrink-0 text-harvest-gold-200 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </AnimatedSection>

        <AnimatedSection className="mt-10 text-center">
          <a
            href="https://sthwalo.com/fin"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-harvest-gold-200 text-deep-space-800 font-semibold rounded-lg hover:bg-harvest-gold-300 transition-colors"
          >
            Create a free account
            <ArrowRight className="w-4 h-4" />
          </a>
          <p className="text-sm text-deep-space-500 mt-4">
            Already have one? The same link signs you in.
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
