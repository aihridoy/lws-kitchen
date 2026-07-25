import StaticPage from '../components/StaticPage';

const FeedbackPage = () => (
  <StaticPage eyebrow="We&apos;re Listening" title="Feedback">
    <p>
      LWS Kitchen gets better with every suggestion from people who actually use it.
      Found a bug, have an idea, or think a recipe needs work? Tell us.
    </p>

    <div className="my-8 p-6 bg-cream/60 rounded-2xl border border-divider">
      <h2 className="section-heading text-2xl mb-4">What We Love Hearing</h2>
      <div className="space-y-3">
        <div className="flex items-start gap-3">
          <span className="mt-1 w-2 h-2 rounded-full bg-amber shrink-0" />
          <p><strong>Recipe feedback.</strong> Did a recipe work well? Was something unclear? Did you make a substitution that worked great? We want to know.</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="mt-1 w-2 h-2 rounded-full bg-terracotta shrink-0" />
          <p><strong>Bug reports.</strong> Something broken? A link not working? A page loading weirdly? The more detail you give, the faster we can fix it.</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="mt-1 w-2 h-2 rounded-full bg-sage shrink-0" />
          <p><strong>Feature ideas.</strong> Wish you could save recipes in a certain way? Want a shopping list feature? We build what you need.</p>
        </div>
        <div className="flex items-start gap-3">
          <span className="mt-1 w-2 h-2 rounded-full bg-amber shrink-0" />
          <p><strong>Content requests.</strong> Craving a specific cuisine? Need more vegetarian options? Want a guide on a cooking technique? Ask away.</p>
        </div>
      </div>
    </div>

    <h2 className="section-heading text-2xl mt-8 mb-4">How to Send Feedback</h2>
    <p>
      Send your thoughts to{' '}
      <span className="text-ink font-medium">feedback@lwskitchen.example</span> —
      every message gets read.
    </p>
    <p className="mt-4">
      To help us respond faster, include:
    </p>
    <ul className="list-disc pl-5 space-y-2 text-muted">
      <li><strong className="text-ink">What page or recipe</strong> your feedback is about (a link or name helps)</li>
      <li><strong className="text-ink">What happened</strong> vs. what you expected</li>
      <li><strong className="text-ink">Your browser and device</strong> if it&apos;s a technical issue</li>
      <li><strong className="text-ink">Screenshots</strong> if something looks wrong visually</li>
    </ul>

    <h2 className="section-heading text-2xl mt-8 mb-4">What Happens Next</h2>
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-4">
      <div className="p-5 bg-white rounded-xl border border-divider text-center">
        <div className="w-10 h-10 rounded-full bg-amber/15 flex items-center justify-center mx-auto mb-3">
          <span className="text-amber-dark font-bold text-lg">1</span>
        </div>
        <h3 className="font-semibold text-ink mb-1">We Read It</h3>
        <p className="text-sm text-muted">
          Every message is read by a real person on our team, not a bot.
        </p>
      </div>
      <div className="p-5 bg-white rounded-xl border border-divider text-center">
        <div className="w-10 h-10 rounded-full bg-terracotta/15 flex items-center justify-center mx-auto mb-3">
          <span className="text-terracotta font-bold text-lg">2</span>
        </div>
        <h3 className="font-semibold text-ink mb-1">We Act On It</h3>
        <p className="text-sm text-muted">
          Great ideas go straight to our roadmap. Bugs get prioritized by severity.
        </p>
      </div>
      <div className="p-5 bg-white rounded-xl border border-divider text-center">
        <div className="w-10 h-10 rounded-full bg-sage/15 flex items-center justify-center mx-auto mb-3">
          <span className="text-sage font-bold text-lg">3</span>
        </div>
        <h3 className="font-semibold text-ink mb-1">We Follow Up</h3>
        <p className="text-sm text-muted">
          If your feedback leads to a change, we&apos;ll let you know when it goes live.
        </p>
      </div>
    </div>

    <div className="mt-8 p-5 bg-ink/5 rounded-xl text-center">
      <p className="text-muted">
        Your feedback directly shapes what LWS Kitchen becomes. Thank you for taking
        the time to help us improve — it means more than you know.
      </p>
    </div>
  </StaticPage>
);

export default FeedbackPage;
