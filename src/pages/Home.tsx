import Hero from '../components/home/Hero';
import FeaturedWork from '../components/home/FeaturedWork';
import ServicesOverview from '../components/home/ServicesOverview';
import TrustSignals from '../components/home/TrustSignals';

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedWork />
      <ServicesOverview />
      <TrustSignals />
    </>
  );
}
