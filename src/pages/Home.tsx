import Hero from '../components/home/Hero';
import HowFinWorks from '../components/home/HowFinWorks';
import FeaturedWork from '../components/home/FeaturedWork';
import ServicesOverview from '../components/home/ServicesOverview';
import TrustSignals from '../components/home/TrustSignals';
import TrustMetrics from '../components/home/TrustMetrics';
import SeoMeta from '../components/ui/SeoMeta';

export default function Home() {
  return (
    <>
      <SeoMeta
        title="FIN - Financial Operations Platform for SMEs | Sthwalo Holdings"
        description="Automate financial operations from transactions to reporting. FIN helps SMEs, accountants, and growing businesses simplify reconciliation, payroll, and compliance workflows."
        url="/"
      />
      <Hero />
      <TrustMetrics />
      <HowFinWorks />
      <FeaturedWork />
      <ServicesOverview />
      <TrustSignals />
    </>
  );
}
