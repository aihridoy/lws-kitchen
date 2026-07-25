import StaticPage from '../components/StaticPage';

const ConditionsPage = () => (
  <StaticPage eyebrow="Legal" title="Conditions of Use">
    <p>
      These conditions outline the rules and guidelines for using LWS Kitchen. By
      accessing the Site, you agree to follow them.
    </p>

    <div className="my-8 p-6 bg-cream/60 rounded-2xl border border-divider">
      <p className="text-xs text-muted uppercase tracking-wider mb-1">Last updated</p>
      <p className="font-medium text-ink">July 2026</p>
    </div>

    <h2 className="section-heading text-2xl mt-8 mb-4">1. Permitted Use</h2>
    <p>
      LWS Kitchen is designed for personal, non-commercial use. You may browse, search,
      save recipes, and share links freely. The Site is intended for home cooks and
      food enthusiasts looking for reliable recipes and cooking guidance.
    </p>

    <h2 className="section-heading text-2xl mt-8 mb-4">2. Prohibited Activities</h2>
    <p>
      You agree not to:
    </p>
    <ul className="list-disc pl-5 space-y-2 text-muted">
      <li><strong className="text-ink">Scrape content at scale.</strong> Automated copying or bulk downloading of recipes, images, or text is not allowed.</li>
      <li><strong className="text-ink">Republish without credit.</strong> You may quote or reference our recipes with proper attribution and a link back to the original page. Full republication without permission is prohibited.</li>
      <li><strong className="text-ink">Disrupt the Site.</strong> No attempts to overwhelm servers, inject malicious code, or interfere with normal operations.</li>
      <li><strong className="text-ink">Misrepresent ownership.</strong> Don&apos;t present our recipes or content as your own work.</li>
      <li><strong className="text-ink">Violate applicable laws.</strong> Use the Site only for lawful purposes.</li>
    </ul>

    <h2 className="section-heading text-2xl mt-8 mb-4">3. Intellectual Property</h2>
    <p>
      All content on LWS Kitchen — including recipes, writing, photography, and design
      — is owned by or licensed to LWS Kitchen. This content is protected by copyright
      and other intellectual property laws. See our{' '}
      <a href="/copyright" className="text-amber-dark hover:underline font-medium">Copyright page</a>{' '}
      for more details on what you can and can&apos;t do with our content.
    </p>

    <h2 className="section-heading text-2xl mt-8 mb-4">4. Account &amp; Saved Recipes</h2>
    <p>
      Saved recipes are stored locally in your browser. We don&apos;t create user
      accounts or store personal data on our servers. This means:
    </p>
    <ul className="list-disc pl-5 space-y-2 text-muted">
      <li>Your saved recipes are private — only you can see them</li>
      <li>Clearing your browser data will remove saved recipes</li>
      <li>We have no access to your saved content</li>
    </ul>
    <p className="mt-4">
      See our{' '}
      <a href="/cookies" className="text-amber-dark hover:underline font-medium">Cookie Policy</a>{' '}
      for more on how local storage works.
    </p>

    <h2 className="section-heading text-2xl mt-8 mb-4">5. Content Accuracy</h2>
    <p>
      We strive to provide accurate recipes, measurements, and cooking times. However,
      cooking is inherently variable. We recommend using your own judgment and adjusting
      recipes to your taste, equipment, and ingredients. We are not responsible for
      outcomes that differ from what&apos;s described.
    </p>

    <h2 className="section-heading text-2xl mt-8 mb-4">6. Site Availability</h2>
    <p>
      We reserve the right to update, modify, or discontinue any part of the Site at
      any time without notice. We may also impose limits on certain features or restrict
      access to parts of the Site without liability.
    </p>

    <h2 className="section-heading text-2xl mt-8 mb-4">7. Limitation of Liability</h2>
    <p>
      LWS Kitchen and its team are not liable for any indirect, incidental, or
      consequential damages arising from your use of the Site. This includes, but is
      not limited to, lost data, cooking failures, or reliance on recipe information.
    </p>

    <h2 className="section-heading text-2xl mt-8 mb-4">8. Changes to These Conditions</h2>
    <p>
      These conditions may be updated periodically. The latest version will always be
      available on this page. Continued use of the Site after changes are posted means
      you accept the updated conditions.
    </p>

    <h2 className="section-heading text-2xl mt-8 mb-4">9. Questions?</h2>
    <p>
      If anything here is unclear, or if you have a specific use case you&apos;d like
      to discuss, reach out through our{' '}
      <a href="/contact" className="text-amber-dark hover:underline font-medium">contact page</a>.
    </p>
  </StaticPage>
);

export default ConditionsPage;
