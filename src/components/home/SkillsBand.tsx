/**
 * The thirty-second skim.
 *
 * A recruiter scanning for a stack match should not have to read prose to find it. Four groups,
 * no proficiency bars, no years-of-experience claims — just what is actually in the work shown on
 * this site, which is why every item here appears in a shipped system rather than on a course
 * certificate.
 */

const groups = [
  {
    heading: 'Languages & frameworks',
    items: ['Java 17', 'Spring Boot 3.5', 'TypeScript', 'React 19', 'Node'],
  },
  {
    heading: 'Data',
    items: ['PostgreSQL 17', 'Flyway', 'JPA / Hibernate', 'Row-level security', 'MySQL'],
  },
  {
    heading: 'Infrastructure',
    items: ['AWS (EC2, RDS, S3, SSM, SES)', 'Docker', 'nginx', 'Cloudflare', 'GitHub Actions'],
  },
  {
    heading: 'Practice',
    items: ['TDD', 'Testcontainers', 'Static analysis in CI', 'OpenAPI', 'Gradle'],
  },
];

export default function SkillsBand() {
  return (
    <section className="py-16 bg-deep-space-900 border-y border-white/5">
      <div className="section-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {groups.map((group) => (
            <div key={group.heading}>
              <h2 className="text-xs uppercase tracking-widest font-bold text-harvest-gold-200 mb-4">
                {group.heading}
              </h2>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="text-sm text-warm-sand-300 leading-snug">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
