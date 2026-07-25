import StaticPage from '../components/StaticPage';

const FeedbackPage = () => (
  <StaticPage eyebrow="We're Listening" title="Feedback">
    <p>
      LWS Kitchen gets better with every suggestion from people who actually use it.
      Found a bug, have an idea, or think a recipe needs work? Tell us.
    </p>
    <p>
      Send your thoughts to{' '}
      <span className="text-ink font-medium">feedback@lwskitchen.example</span> —
      every message gets read.
    </p>
  </StaticPage>
);

export default FeedbackPage;
