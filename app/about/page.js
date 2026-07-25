import StaticPage from '../components/StaticPage';

const AboutPage = () => (
  <StaticPage eyebrow="Our Story" title="About Us">
    <p>
      LWS Kitchen started as a small collection of family recipes and grew into a home
      for cooks who love good food without the fuss. We believe great meals come from
      simple ingredients, clear instructions, and a bit of curiosity.
    </p>
    <p>
      Every recipe on this site is tested, tasted, and written by people who actually
      cook. Our mission is to make your time in the kitchen easier and more enjoyable,
      one dish at a time.
    </p>

    <div className="my-8 p-6 bg-cream/60 rounded-2xl border border-divider">
      <h2 className="section-heading text-2xl mb-4">What We Believe</h2>
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <span className="mt-1 w-2 h-2 rounded-full bg-amber shrink-0" />
          <p><strong>Good food shouldn&apos;t be complicated.</strong> We strip recipes down to what matters — clear steps, real ingredients, and honest flavor.</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="mt-1 w-2 h-2 rounded-full bg-terracotta shrink-0" />
          <p><strong>Everyone can cook.</strong> Whether you&apos;re making dinner for the first time or perfecting a family classic, our recipes meet you where you are.</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="mt-1 w-2 h-2 rounded-full bg-sage shrink-0" />
          <p><strong>Cooking brings people together.</strong> The best meals aren&apos;t about perfection — they&apos;re about sharing something you made with care.</p>
        </div>
      </div>
    </div>

    <h2 className="section-heading text-2xl mt-8 mb-4">How It Started</h2>
    <p>
      LWS Kitchen was born from a simple frustration: too many recipe sites bury the
      actual instructions under long stories, pop-ups, and cluttered layouts. We wanted
      a place where you could find a recipe, understand it in seconds, and start cooking
      immediately.
    </p>
    <p>
      What began as a personal project quickly became something bigger. Friends shared
      recipes with friends, and before long, we had a community of home cooks who valued
      simplicity as much as we did.
    </p>

    <h2 className="section-heading text-2xl mt-8 mb-4">What Makes Us Different</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
      <div className="p-5 bg-white rounded-xl border border-divider">
        <h3 className="font-semibold text-ink mb-2">Tested &amp; Verified</h3>
        <p className="text-sm text-muted">
          Every recipe is cooked at least three times before we publish it. We check
          timings, temperatures, and ingredient amounts so you don&apos;t have to guess.
        </p>
      </div>
      <div className="p-5 bg-white rounded-xl border border-divider">
        <h3 className="font-semibold text-ink mb-2">Honest Ingredients</h3>
        <p className="text-sm text-muted">
          We use ingredients you can find at your local grocery store. No specialty
          equipment or hard-to-find items without a clear substitute.
        </p>
      </div>
      <div className="p-5 bg-white rounded-xl border border-divider">
        <h3 className="font-semibold text-ink mb-2">No Clutter</h3>
        <p className="text-sm text-muted">
          Jump straight to the recipe without scrolling past ads, videos, and life
          stories. We respect your time.
        </p>
      </div>
      <div className="p-5 bg-white rounded-xl border border-divider">
        <h3 className="font-semibold text-ink mb-2">Built for Real Kitchens</h3>
        <p className="text-sm text-muted">
          Our recipes are designed for home kitchens with standard tools. If a recipe
          needs something special, we tell you upfront.
        </p>
      </div>
    </div>

    <h2 className="section-heading text-2xl mt-8 mb-4">Our Promise</h2>
    <p>
      We&apos;ll keep doing what we do best: finding, testing, and sharing recipes that
      make your everyday cooking better. No gimmicks, no shortcuts — just good food
      made simple.
    </p>
    <p>
      Have a recipe you think we should feature? A technique you want us to cover?
      We&apos;re always listening. Reach out through our{' '}
      <a href="/contact" className="text-amber-dark hover:underline font-medium">contact page</a>{' '}
      or send us{' '}
      <a href="/feedback" className="text-amber-dark hover:underline font-medium">feedback</a>{' '}
      — we read every message.
    </p>
  </StaticPage>
);

export default AboutPage;
