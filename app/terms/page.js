import StaticPage from '../components/StaticPage';

const TermsPage = () => (
  <StaticPage eyebrow="Legal" title="Terms of Service">
    <p>
      By using LWS Kitchen, you agree to the following terms. Please read them
      carefully — they govern your use of our site and content.
    </p>

    <div className="my-8 p-6 bg-cream/60 rounded-2xl border border-divider">
      <p className="text-xs text-muted uppercase tracking-wider mb-1">Last updated</p>
      <p className="font-medium text-ink">July 2026</p>
    </div>

    <h2 className="section-heading text-2xl mt-8 mb-4">1. Acceptance of Terms</h2>
    <p>
      By accessing or using LWS Kitchen (the &quot;Site&quot;), you agree to be bound by
      these Terms of Service. If you do not agree, please do not use the Site. We may
      update these terms from time to time, and continued use of the Site means you
      accept the current version.
    </p>

    <h2 className="section-heading text-2xl mt-8 mb-4">2. Use of Content</h2>
    <p>
      All recipes, articles, photos, and other content on LWS Kitchen are provided for
      personal, non-commercial use. You may:
    </p>
    <ul className="list-disc pl-5 space-y-2 text-muted">
      <li>View and follow recipes for your own cooking</li>
      <li>Share links to recipes with friends and family</li>
      <li>Print recipes for personal use</li>
    </ul>
    <p className="mt-4">You may not:</p>
    <ul className="list-disc pl-5 space-y-2 text-muted">
      <li>Republish, redistribute, or resell our content without permission</li>
      <li>Use our content for commercial purposes (e.g., in a paid class or product)</li>
      <li>Scrape, copy, or bulk-download recipes from the Site</li>
      <li>Remove copyright or attribution notices from any content</li>
    </ul>

    <h2 className="section-heading text-2xl mt-8 mb-4">3. Recipes &amp; Cooking Results</h2>
    <p>
      Recipes are provided as-is. Cooking results may vary depending on your
      ingredients, equipment, altitude, and technique. We test every recipe
      thoroughly, but we cannot guarantee specific outcomes. Use your best judgment
      when cooking, especially with allergens, high heat, and sharp tools.
    </p>

    <h2 className="section-heading text-2xl mt-8 mb-4">4. Nutritional Information</h2>
    <p>
      Any nutritional information provided with recipes is an estimate only. It is
      calculated using standard databases and should not be considered medical or
      dietary advice. Consult a healthcare professional for specific dietary needs.
    </p>

    <h2 className="section-heading text-2xl mt-8 mb-4">5. User Conduct</h2>
    <p>
      When using LWS Kitchen (including submitting feedback or contacting us), you
      agree not to:
    </p>
    <ul className="list-disc pl-5 space-y-2 text-muted">
      <li>Post content that is unlawful, harmful, threatening, or abusive</li>
      <li>Impersonate another person or entity</li>
      <li>Attempt to gain unauthorized access to the Site or its systems</li>
      <li>Interfere with or disrupt the Site&apos;s functionality</li>
    </ul>

    <h2 className="section-heading text-2xl mt-8 mb-4">6. Third-Party Links</h2>
    <p>
      The Site may contain links to third-party websites (e.g., social media platforms).
      We are not responsible for the content, privacy practices, or availability of
      external sites. Use them at your own risk.
    </p>

    <h2 className="section-heading text-2xl mt-8 mb-4">7. Disclaimer</h2>
    <p>
      LWS Kitchen is provided &quot;as is&quot; without warranties of any kind. We do
      not guarantee that the Site will be available, error-free, or free of harmful
      components. We are not liable for any damages arising from your use of the Site.
    </p>

    <h2 className="section-heading text-2xl mt-8 mb-4">8. Changes to These Terms</h2>
    <p>
      We may revise these terms at any time. Updates will be posted on this page with a
      revised date. Your continued use of the Site after changes are posted constitutes
      acceptance of the new terms.
    </p>

    <h2 className="section-heading text-2xl mt-8 mb-4">9. Contact</h2>
    <p>
      Questions about these terms? Reach out via our{' '}
      <a href="/contact" className="text-amber-dark hover:underline font-medium">contact page</a>{' '}
      or email{' '}
      <span className="text-ink font-medium">hello@lwskitchen.example</span>.
    </p>
  </StaticPage>
);

export default TermsPage;
