// Reviewed fallback for the public trust metrics. The live, privacy-safe aggregate endpoint
// (GET /api/v1/public/trust-metrics) is the source of truth; this snapshot is shown only when
// that endpoint is unavailable (e.g. at build/SSR time or during an API blip). Keep the values
// in step with the live aggregates — last reviewed against production on the date below.
export const publicMetricsSnapshot = {
  reviewedAt: '2026-06-21',
  metrics: {
    companyWorkspaces: 20,
    transactionsProcessed: 24800,
  },
  definitions: {
    transactionsProcessed: 'Imported bank transactions currently recorded by FIN.',
    companyWorkspaces: 'Company workspaces created in FIN.',
    activeUsersLast30Days: 'Non-super-admin users who signed in during the previous 30 days.',
  },
};
