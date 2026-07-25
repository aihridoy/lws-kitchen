import StaticPage from '../components/StaticPage';

const ContactPage = () => (
  <StaticPage eyebrow="Get in Touch" title="Contact Us">
    <p>
      Have a question about a recipe, a partnership idea, or just want to say hello?
      We&apos;d love to hear from you.
    </p>

    <div className="my-8 p-6 bg-cream/60 rounded-2xl border border-divider">
      <h2 className="section-heading text-2xl mb-4">Ways to Reach Us</h2>
      <div className="space-y-4">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-amber/15 flex items-center justify-center shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-dark" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-ink">General Inquiries</h3>
            <p className="text-sm text-muted">hello@lwskitchen.example</p>
            <p className="text-xs text-muted mt-1">For partnership, press, or general questions. We aim to reply within 48 hours.</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-terracotta/15 flex items-center justify-center shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-terracotta" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-ink">Recipe Questions</h3>
            <p className="text-sm text-muted">recipes@lwskitchen.example</p>
            <p className="text-xs text-muted mt-1">Substitution help, cooking troubleshooting, or requests for specific cuisines.</p>
          </div>
        </div>
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-full bg-sage/15 flex items-center justify-center shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sage" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-ink">Feedback &amp; Suggestions</h3>
            <p className="text-sm text-muted">feedback@lwskitchen.example</p>
            <p className="text-xs text-muted mt-1">Feature ideas, bug reports, or anything you&apos;d like us to improve.</p>
          </div>
        </div>
      </div>
    </div>

    <h2 className="section-heading text-2xl mt-8 mb-4">Response Times</h2>
    <p>
      We&apos;re a small team, so we may not reply instantly — but we do read every
      message. Here&apos;s what to expect:
    </p>
    <ul className="list-disc pl-5 space-y-2 text-muted">
      <li><strong className="text-ink">General inquiries:</strong> Within 2–3 business days</li>
      <li><strong className="text-ink">Recipe questions:</strong> Usually within 24 hours</li>
      <li><strong className="text-ink">Bug reports:</strong> Acknowledged within 48 hours, fixed as soon as possible</li>
      <li><strong className="text-ink">Partnership requests:</strong> Reviewed weekly, response within 5 business days</li>
    </ul>

    <h2 className="section-heading text-2xl mt-8 mb-4">Before You Write</h2>
    <p>
      Check if your question is already answered on our site — many common questions
      about recipes, substitutions, and dietary needs are covered in the recipe pages
      themselves. For legal matters, see our{' '}
      <a href="/terms" className="text-amber-dark hover:underline font-medium">Terms of Service</a>{' '}
      and{' '}
      <a href="/conditions" className="text-amber-dark hover:underline font-medium">Conditions of Use</a>.
    </p>
    <p>
      We look forward to hearing from you — whether it&apos;s a quick hello or a
      detailed recipe request. Every message helps us make LWS Kitchen better.
    </p>
  </StaticPage>
);

export default ContactPage;
