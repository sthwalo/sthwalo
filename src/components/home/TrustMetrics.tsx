import { useTrustMetrics } from '../../hooks/useTrustMetrics';

const labels: Record<string, string> = {
  transactionsProcessed: 'Transactions processed',
  companyWorkspaces: 'Company workspaces',
  activeUsersLast30Days: 'Active users in 30 days',
};

export default function TrustMetrics() {
  const trust = useTrustMetrics();
  const entries = Object.entries(trust.metrics);

  return (
    <section className="py-12 bg-deep-space-900 border-y border-white/5">
      <div className="section-container">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          <div className="max-w-xl">
            <p className="text-xs uppercase tracking-widest font-bold text-harvest-gold-200 mb-2">Verified Usage</p>
            <h2 className="text-2xl font-bold text-warm-sand-100">Current FIN activity, reported with privacy controls</h2>
            <p className="text-sm text-warm-sand-400 mt-3">Values are rounded down and smaller counts are withheld. Source: {trust.source}; updated {new Date(trust.updatedAt).toLocaleDateString()}.</p>
          </div>
          <dl className="grid grid-cols-1 sm:grid-cols-3 gap-4 min-w-[50%]">
            {entries.length === 0 && (
              <div className="sm:col-span-3 rounded-xl bg-white/5 border border-white/10 p-5">
                <dt className="text-xs text-warm-sand-500">Verified aggregate publication</dt>
                <dd className="text-lg font-bold text-harvest-gold-200 mt-1">Pending live endpoint deployment</dd>
              </div>
            )}
            {entries.map(([key, value]) => (
              <div key={key} className="rounded-xl bg-white/5 border border-white/10 p-5" title={trust.definitions[key]}>
                <dt className="text-xs text-warm-sand-500">{labels[key] ?? key}</dt>
                <dd className="text-3xl font-bold text-harvest-gold-200 mt-1">{value.toLocaleString()}+</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
