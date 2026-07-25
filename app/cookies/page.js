import StaticPage from '../components/StaticPage';

const CookiesPage = () => (
  <StaticPage eyebrow="Legal" title="Cookie Policy">
    <p>
      LWS Kitchen keeps things simple. This page explains what data we store, how we
      use it, and how you can control it.
    </p>

    <div className="my-8 p-6 bg-cream/60 rounded-2xl border border-divider">
      <p className="text-xs text-muted uppercase tracking-wider mb-1">Last updated</p>
      <p className="font-medium text-ink">July 2026</p>
    </div>

    <h2 className="section-heading text-2xl mt-8 mb-4">What We Store</h2>
    <p>
      LWS Kitchen uses browser local storage to save your preferences and saved
      recipes. This data stays on your device — we never send it to our servers.
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
      <div className="p-5 bg-white rounded-xl border border-divider">
        <h3 className="font-semibold text-ink mb-2">Saved Recipes</h3>
        <p className="text-sm text-muted">
          When you save a recipe, it&apos;s stored in your browser&apos;s local
          storage. Only you can access this data. It&apos;s not shared with us or
          any third party.
        </p>
      </div>
      <div className="p-5 bg-white rounded-xl border border-divider">
        <h3 className="font-semibold text-ink mb-2">UI Preferences</h3>
        <p className="text-sm text-muted">
          Settings like dark mode or preferred categories may be stored to remember
          your choices between visits. These are purely functional.
        </p>
      </div>
    </div>

    <h2 className="section-heading text-2xl mt-8 mb-4">What We Don&apos;t Use</h2>
    <ul className="list-disc pl-5 space-y-2 text-muted">
      <li><strong className="text-ink">No tracking cookies.</strong> We don&apos;t use Google Analytics, Facebook Pixel, or any other tracking tools.</li>
      <li><strong className="text-ink">No third-party cookies.</strong> We don&apos;t load scripts from ad networks or data brokers.</li>
      <li><strong className="text-ink">No profiling.</strong> We don&apos;t build user profiles or sell data to advertisers.</li>
      <li><strong className="text-ink">No server-side sessions.</strong> We don&apos;t store login credentials or session tokens on our servers.</li>
    </ul>

    <h2 className="section-heading text-2xl mt-8 mb-4">How to Clear Your Data</h2>
    <p>
      You can remove all data LWS Kitchen stores at any time:
    </p>
    <ol className="list-decimal pl-5 space-y-3 text-muted">
      <li>
        <strong className="text-ink">Open your browser&apos;s developer tools</strong> (usually F12 or right-click → Inspect)
      </li>
      <li>
        <strong className="text-ink">Go to the Application tab</strong> (Chrome) or Storage tab (Firefox)
      </li>
      <li>
        <strong className="text-ink">Find &quot;Local Storage&quot;</strong> and select this site
      </li>
      <li>
        <strong className="text-ink">Clear the entries</strong> or delete them individually
      </li>
    </ol>
    <p className="mt-4">
      Alternatively, clearing your browser&apos;s site data for lwskitchen.com will
      remove everything at once. Your saved recipes will need to be re-saved.
    </p>

    <h2 className="section-heading text-2xl mt-8 mb-4">Why Local Storage?</h2>
    <p>
      We chose local storage over server-side accounts for a few reasons:
    </p>
    <ul className="list-disc pl-5 space-y-2 text-muted">
      <li><strong className="text-ink">Privacy.</strong> Your data never leaves your device.</li>
      <li><strong className="text-ink">Simplicity.</strong> No account creation, no passwords, no email required.</li>
      <li><strong className="text-ink">Speed.</strong> Reading from local storage is instant — no server round-trip.</li>
      <li><strong className="text-ink">Control.</strong> You have full access to delete or manage your data at any time.</li>
    </ul>
    <p className="mt-4">
      The tradeoff is that saved recipes won&apos;t sync across devices. We think the
      privacy benefit is worth it, and we may add optional sync in the future if
      there&apos;s enough interest.
    </p>

    <h2 className="section-heading text-2xl mt-8 mb-4">Browser Support</h2>
    <p>
      Local storage is supported by all modern browsers (Chrome, Firefox, Safari,
      Edge). If you&apos;re using an older browser, some features like saving recipes
      may not work.
    </p>

    <h2 className="section-heading text-2xl mt-8 mb-4">Changes to This Policy</h2>
    <p>
      If we ever change how we handle data, we&apos;ll update this page and note the
      revision date. We won&apos;t retroactively change how existing data is handled
      without clear notice.
    </p>

    <h2 className="section-heading text-2xl mt-8 mb-4">Questions?</h2>
    <p>
      If you have questions about your data or this policy, reach out via our{' '}
      <a href="/contact" className="text-amber-dark hover:underline font-medium">contact page</a>{' '}
      or email{' '}
      <span className="text-ink font-medium">hello@lwskitchen.example</span>.
    </p>
  </StaticPage>
);

export default CookiesPage;
