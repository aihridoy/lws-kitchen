import StaticPage from '../components/StaticPage';

const CopyrightPage = () => (
  <StaticPage eyebrow="Legal" title="Copyright">
    <p>
      LWS Kitchen puts a lot of effort into creating original recipes, photography,
      and writing. This page explains how our content is protected and what you can
      do with it.
    </p>

    <div className="my-8 p-6 bg-cream/60 rounded-2xl border border-divider">
      <p className="text-xs text-muted uppercase tracking-wider mb-1">Last updated</p>
      <p className="font-medium text-ink">July 2026</p>
    </div>

    <h2 className="section-heading text-2xl mt-8 mb-4">Ownership</h2>
    <p>
      &copy; {new Date().getFullYear()} LWS Kitchen. All recipes, photos, articles,
      and written content on this site are the property of LWS Kitchen unless otherwise
      noted. This includes:
    </p>
    <ul className="list-disc pl-5 space-y-2 text-muted">
      <li>Recipe text, ingredient lists, and cooking instructions</li>
      <li>Photography and food styling</li>
      <li>Website design, layout, and code</li>
      <li>Articles, guides, and educational content</li>
      <li>Logos, branding, and visual identity</li>
    </ul>

    <h2 className="section-heading text-2xl mt-8 mb-4">What You Can Do</h2>
    <div className="p-5 bg-sage/10 rounded-xl border border-sage/20 mt-4">
      <h3 className="font-semibold text-sage mb-3">Freely Allowed</h3>
      <ul className="space-y-2 text-muted">
        <li className="flex items-start gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sage shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <p>Share links to our recipes on social media, blogs, or with friends</p>
        </li>
        <li className="flex items-start gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sage shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <p>Print recipes for personal, non-commercial use</p>
        </li>
        <li className="flex items-start gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sage shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <p>Reference or quote a recipe with proper attribution (name + link to original)</p>
        </li>
        <li className="flex items-start gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sage shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          <p>Save recipes to your browser for personal reference</p>
        </li>
      </ul>
    </div>

    <h2 className="section-heading text-2xl mt-8 mb-4">What Requires Permission</h2>
    <div className="p-5 bg-terracotta/10 rounded-xl border border-terracotta/20 mt-4">
      <h3 className="font-semibold text-terracotta mb-3">Needs Our OK</h3>
      <ul className="space-y-2 text-muted">
        <li className="flex items-start gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-terracotta shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          <p>Republishing full recipe text on another website or platform</p>
        </li>
        <li className="flex items-start gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-terracotta shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          <p>Using our photos in commercial projects (cookbooks, products, ads)</p>
        </li>
        <li className="flex items-start gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-terracotta shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          <p>Creating derivative works (modifying and republishing our content)</p>
        </li>
        <li className="flex items-start gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-terracotta shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
          <p>Using our brand name, logo, or visual identity in your own materials</p>
        </li>
      </ul>
    </div>

    <h2 className="section-heading text-2xl mt-8 mb-4">How to Request Permission</h2>
    <p>
      If you&apos;d like to use our content in a way not listed above, reach out
      through our{' '}
      <a href="/contact" className="text-amber-dark hover:underline font-medium">contact page</a>{' '}
      with:
    </p>
    <ul className="list-disc pl-5 space-y-2 text-muted">
      <li>Which content you want to use (specific recipe names or page URLs)</li>
      <li>How you plan to use it (context and medium)</li>
      <li>Whether the use is commercial or non-commercial</li>
    </ul>
    <p className="mt-4">
      We review requests on a case-by-case basis. Educational and non-commercial uses
      are generally granted with proper attribution.
    </p>

    <h2 className="section-heading text-2xl mt-8 mb-4">Third-Party Content</h2>
    <p>
      Some recipes may reference techniques, ingredients, or traditions from specific
      cuisines. While we credit cultural origins where possible, the recipes themselves
      are original interpretations developed by our team. If you believe we&apos;ve
      missed proper attribution for any specific content, please let us know.
    </p>

    <h2 className="section-heading text-2xl mt-8 mb-4">DMCA &amp; Takedowns</h2>
    <p>
      If you believe your copyrighted work has been used on LWS Kitchen without
      authorization, please contact us at{' '}
      <span className="text-ink font-medium">hello@lwskitchen.example</span> with
      details of the claim. We take intellectual property seriously and will respond
      promptly.
    </p>

    <h2 className="section-heading text-2xl mt-8 mb-4">Changes to This Policy</h2>
    <p>
      We may update this page as our content and usage terms evolve. The latest version
      will always be available here with a current revision date.
    </p>
  </StaticPage>
);

export default CopyrightPage;
