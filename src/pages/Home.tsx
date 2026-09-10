import Hero from '../components/home/Hero';
import HowFinWorks from '../components/home/HowFinWorks';
import FeaturedWork from '../components/home/FeaturedWork';
import AudienceSplit from '../components/home/AudienceSplit';
import TrustSignals from '../components/home/TrustSignals';
import TrustMetrics from '../components/home/TrustMetrics';
import SeoMeta from '../components/ui/SeoMeta';

export default function Home() {
  return (
    <>
      <SeoMeta
        title="FIN - Close the Books Without Chasing Documents | Sthwalo Holdings"
        description="FIN keeps every invoice, bank statement, payslip and stock movement filed against its transaction, so accountants, bookkeepers and auditors spend less time verifying source documents before sign-off."
        url="/"
      />
      <Hero />
      <TrustMetrics />
      <HowFinWorks />
      <FeaturedWork />
      <AudienceSplit />
      <TrustSignals />
    </>
  );
}
