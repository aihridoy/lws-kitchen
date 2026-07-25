import StaticPage from '../components/StaticPage';

const CareersPage = () => (
  <StaticPage eyebrow="Join Us" title="Careers">
    <p>
      We&apos;re a small team obsessed with food and good design. We&apos;re not
      actively hiring right now, but we&apos;re always happy to hear from people who
      share our love of cooking.
    </p>
    <p>
      If that&apos;s you, reach out through our{' '}
      <a href="/contact" className="text-amber-dark hover:underline">contact page</a>{' '}
      and tell us what you&apos;d bring to the kitchen.
    </p>
  </StaticPage>
);

export default CareersPage;
