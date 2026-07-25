import StaticPage from '../components/StaticPage';

const CareersPage = () => (
  <StaticPage eyebrow="Join Us" title="Careers">
    <p>
      We&apos;re a small team obsessed with food and good design. We&apos;re not
      actively hiring right now, but we&apos;re always happy to hear from people who
      share our love of cooking.
    </p>

    <div className="my-8 p-6 bg-cream/60 rounded-2xl border border-divider">
      <h2 className="section-heading text-2xl mb-4">Why Work With Us</h2>
      <p className="mb-4">
        LWS Kitchen is a place where food meets craft. We care about making something
        genuinely useful — a site that helps people cook better meals without the noise.
        If that resonates with you, we&apos;d love to connect.
      </p>
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <span className="mt-1 w-2 h-2 rounded-full bg-amber shrink-0" />
          <p><strong>Meaningful work.</strong> Every line of code, every recipe, every design decision directly impacts how people cook at home.</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="mt-1 w-2 h-2 rounded-full bg-terracotta shrink-0" />
          <p><strong>Small team, big impact.</strong> You won&apos;t be a cog in a machine. Your ideas matter and your work is visible.</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="mt-1 w-2 h-2 rounded-full bg-sage shrink-0" />
          <p><strong>Flexible &amp; remote-friendly.</strong> We believe good work happens when people have space to focus and time to recharge.</p>
        </div>
      </div>
    </div>

    <h2 className="section-heading text-2xl mt-8 mb-4">Roles We&apos;re Interested In</h2>
    <p className="mb-4">
      While we&apos;re not posting formal openings, we&apos;re always open to talking
      with people who could contribute in these areas:
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <div className="p-5 bg-white rounded-xl border border-divider">
        <h3 className="font-semibold text-ink mb-2">Recipe Development</h3>
        <p className="text-sm text-muted">
          Test, refine, and write recipes that are clear, reliable, and delicious.
          Food writing experience and a passion for cooking are essential.
        </p>
      </div>
      <div className="p-5 bg-white rounded-xl border border-divider">
        <h3 className="font-semibold text-ink mb-2">Frontend Engineering</h3>
        <p className="text-sm text-muted">
          Build fast, accessible interfaces that make finding and following recipes
          effortless. React, Next.js, and an eye for detail.
        </p>
      </div>
      <div className="p-5 bg-white rounded-xl border border-divider">
        <h3 className="font-semibold text-ink mb-2">Food Photography</h3>
        <p className="text-sm text-muted">
          Capture recipes in a way that makes people want to cook. Natural light,
          real kitchens, honest styling — no stock photo vibes.
        </p>
      </div>
      <div className="p-5 bg-white rounded-xl border border-divider">
        <h3 className="font-semibold text-ink mb-2">Content Strategy</h3>
        <p className="text-sm text-muted">
          Help us figure out what to cook next, what our readers need, and how to
          grow a community around good food.
        </p>
      </div>
    </div>

    <h2 className="section-heading text-2xl mt-8 mb-4">How to Reach Us</h2>
    <p>
      If that&apos;s you, reach out through our{' '}
      <a href="/contact" className="text-amber-dark hover:underline font-medium">contact page</a>{' '}
      and tell us what you&apos;d bring to the kitchen. Include a link to your work
      (portfolio, GitHub, blog, recipe collection — whatever shows what you do best).
    </p>
    <p>
      We don&apos;t do formal interviews right away. We like to start with a casual
      conversation to see if there&apos;s a good fit on both sides.
    </p>
  </StaticPage>
);

export default CareersPage;
