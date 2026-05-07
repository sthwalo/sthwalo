import { ArrowRight, Sparkles, Play, TrendingUp, CreditCard, FileText, Users } from 'lucide-react';
import Button from '../ui/Button';
import { trackCTAClick } from '../../utils/analytics';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-deep-space-800">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-harvest-gold-200/5 blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 rounded-full bg-oxblood-600/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-ember-400/3 blur-3xl" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, rgba(242,207,99,0.4) 1px, transparent 0)',
            backgroundSize: '48px 48px',
          }}
        />
      </div>

      <div className="section-container relative z-10 pt-28 pb-20">
        <div className="max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left Column - Copy */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 animate-fade-in">
                <Sparkles className="w-4 h-4 text-harvest-gold-200" />
                <span className="text-sm font-medium text-warm-sand-300">
                  Financial Operations Platform for SMEs
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-warm-sand-100 leading-[1.08] tracking-tight mb-6 animate-fade-in-up">
                Automate Financial Operations{' '}
                <span className="text-harvest-gold-200">From Transactions To Reporting</span>
              </h1>

              <p className="text-lg md:text-xl text-warm-sand-400 leading-relaxed max-w-2xl mb-10 animate-fade-in-up animate-delay-200">
                FIN helps SMEs, accountants, and growing businesses simplify reconciliation, payroll, financial reporting, and compliance workflows from one secure platform.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animate-delay-300">
                <Button
                  href="https://sthwalo.com/app"
                  variant="primary"
                  size="lg"
                  onClick={() => trackCTAClick('trial_signup', 'hero')}
                >
                  Start Free 14-Day Trial
                  <ArrowRight className="w-4 h-4" />
                </Button>
                <Button
                  to="/demo"
                  variant="outline"
                  size="lg"
                  className="border-warm-sand-400/30 text-warm-sand-200 hover:bg-white/5 hover:text-warm-sand-100 hover:border-warm-sand-300/50"
                  onClick={() => trackCTAClick('watch_demo', 'hero')}
                >
                  <Play className="w-4 h-4" />
                  Watch Demo
                </Button>
              </div>

              <div className="mt-16 pt-10 border-t border-white/5 grid grid-cols-2 md:grid-cols-4 gap-8 animate-fade-in-up animate-delay-400">
                {[
                  { value: '7,156+', label: 'Transactions Processed' },
                  { value: '25+', label: 'Business Services' },
                  { value: '24', label: 'REST Controllers' },
                  { value: '2021', label: 'CIPC Registered' },
                ].map((stat) => (
                  <div key={stat.label}>
                    <div className="text-2xl md:text-3xl font-bold text-harvest-gold-200 mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm text-warm-sand-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Product Visual */}
            <div className="animate-fade-in-up animate-delay-300">
              <div className="relative rounded-2xl overflow-hidden bg-deep-space-900/80 border border-white/10 p-4">
                {/* Mock browser bar */}
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-white/10">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-oxblood-400/60" />
                    <div className="w-3 h-3 rounded-full bg-harvest-gold-400/60" />
                    <div className="w-3 h-3 rounded-full bg-green-500/60" />
                  </div>
                  <div className="flex-1 bg-white/5 rounded-md px-3 py-1 text-xs text-warm-sand-500">
                    sthwalo.com/app/management-report
                  </div>
                </div>

                {/* Dashboard header */}
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs text-warm-sand-500">Sthwalo Holdings · FY 2027</p>
                    <p className="text-sm font-semibold text-warm-sand-100">Management Report</p>
                  </div>
                  <span className="text-xs px-2 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                    Live
                  </span>
                </div>

                {/* KPI cards row */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  {[
                    { icon: TrendingUp, label: 'Total Revenue', value: 'R 12 750', change: 'Net Profit: R 10 750', color: 'text-green-400' },
                    { icon: CreditCard, label: 'Profit Margin', value: '84.31%', change: 'Total Expenses: R 2 000', color: 'text-harvest-gold-200' },
                    { icon: FileText, label: 'Cash Balance', value: 'R 5 000', change: '869 days of cash', color: 'text-blue-400' },
                    { icon: Users, label: 'Aged Receivables', value: 'R 5 750', change: 'Avg 15 days', color: 'text-ember-400' },
                  ].map(({ icon: Icon, label, value, change, color }) => (
                    <div key={label} className="bg-white/5 rounded-xl p-3 border border-white/5">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-warm-sand-500">{label}</span>
                        <Icon className={`w-3.5 h-3.5 ${color}`} />
                      </div>
                      <p className="text-sm font-bold text-warm-sand-100">{value}</p>
                      <p className={`text-xs mt-0.5 ${color}`}>{change}</p>
                    </div>
                  ))}
                </div>

                {/* Mini bar chart */}
                <div className="bg-white/5 rounded-xl p-3 border border-white/5 mb-3">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs text-warm-sand-400 font-medium">Profitability Ratios</span>
                    <span className="text-xs text-warm-sand-500">FY 2027</span>
                  </div>
                  <div className="flex items-end gap-1.5 h-12">
                    {[100, 84, 84, 100, 0].map((h, i) => (
                      <div key={i} className="flex-1 flex flex-col justify-end gap-0.5">
                        <div
                          className="rounded-sm bg-harvest-gold-200/70"
                          style={{ height: `${h * 0.48}px` }}
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between mt-1">
                    {['ROA', 'GPM', 'NPM', 'AT', 'ROE'].map((m) => (
                      <span key={m} className="text-[10px] text-warm-sand-600">{m}</span>
                    ))}
                  </div>
                </div>

                {/* Budget variance */}
                <div className="bg-white/5 rounded-xl p-3 border border-white/5">
                  <p className="text-xs text-warm-sand-400 font-medium mb-2">Budget Variance</p>
                  {[
                    { name: 'Total Revenue', category: 'Actual vs Budget', amount: 'R 12 750', color: 'text-green-400' },
                    { name: 'Total Expenses', category: 'Actual vs Budget', amount: 'R 2 000', color: 'text-red-400' },
                    { name: 'Cash Closing Balance', category: 'Cash Flow Forecast', amount: 'R 4 833', color: 'text-blue-400' },
                  ].map((tx) => (
                    <div key={tx.name} className="flex items-center justify-between py-1.5 border-b border-white/5 last:border-0">
                      <div>
                        <p className="text-xs text-warm-sand-200">{tx.name}</p>
                        <p className="text-[10px] text-warm-sand-600">{tx.category}</p>
                      </div>
                      <span className={`text-xs font-medium ${tx.color}`}>{tx.amount}</span>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-sm text-warm-sand-500 mt-4 text-center">
                Real management report data — generated automatically from your transactions
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
