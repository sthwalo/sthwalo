import { useEffect, useState } from 'react';
import { publicMetricsSnapshot } from '../data/publicMetricsSnapshot';
import { trackTrustMetricsLoad } from '../utils/analytics';

export interface TrustMetrics {
  updatedAt: string;
  metrics: Record<string, number>;
  definitions: Record<string, string>;
  methodology: string[];
  source: 'live' | 'reviewed snapshot';
}

const apiBase = import.meta.env.VITE_FIN_API_URL || 'https://api.sthwalo.com';

export function useTrustMetrics() {
  const [data, setData] = useState<TrustMetrics>({
    updatedAt: publicMetricsSnapshot.reviewedAt,
    metrics: publicMetricsSnapshot.metrics,
    definitions: publicMetricsSnapshot.definitions,
    methodology: ['Reviewed snapshot used when the live privacy-safe aggregate endpoint is unavailable.'],
    source: 'reviewed snapshot',
  });

  useEffect(() => {
    let active = true;
    fetch(`${apiBase}/api/v1/public/trust-metrics`)
      .then(response => {
        if (!response.ok) throw new Error('Trust metrics unavailable');
        return response.json();
      })
      .then(payload => {
        if (!active || !payload?.data?.metrics) return;
        setData({ ...payload.data, source: 'live' });
        trackTrustMetricsLoad('live');
      })
      .catch(() => trackTrustMetricsLoad('reviewed_snapshot'));
    return () => { active = false; };
  }, []);

  return data;
}
