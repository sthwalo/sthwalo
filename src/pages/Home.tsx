import Hero from '../components/home/Hero';
import SkillsBand from '../components/home/SkillsBand';
import FeaturedWork from '../components/home/FeaturedWork';
import TrustSignals from '../components/home/TrustSignals';
import SeoMeta from '../components/ui/SeoMeta';

/**
 * The portfolio home: who, what they have shipped, and who else they have shipped it for.
 *
 * Three sections are gone rather than rewritten, because their job was to sell FIN to the people
 * who would use it, and that job belongs to aosfin.com now:
 *
 *   HowFinWorks  — a feature walkthrough of the product.
 *   FreePlan     — what a FIN signup includes. A portfolio has nothing to sign up to.
 *   AudienceSplit— addressed "if you run the business" and "if you review the books", neither of
 *                  whom is the audience here.
 *   TrustMetrics — live FIN usage counts, fetched from api.sthwalo.com. Product telemetry is not
 *                  portfolio evidence, and removing it drops this site's last runtime dependency
 *                  on a hostname that is being retired.
 *
 * They are deleted rather than left unused: dead components with stale links rot, and git history
 * keeps the copy perfectly well if any of it is wanted on aosfin.com.
 */
export default function Home() {
  return (
    <>
      <SeoMeta
        title="Immaculate Nyoni — Full-stack engineer | Sthwalo Holdings"
        description="Full-stack engineer in South Africa building systems that hold up to an audit. Java 17, Spring Boot, React and PostgreSQL — including FIN, a multi-tenant financial platform running in production."
        url="/"
      />
      <Hero />
      <SkillsBand />
      <FeaturedWork />
      <TrustSignals />
    </>
  );
}
