import StaticPage from '../components/StaticPage';

const CookiesPage = () => (
  <StaticPage eyebrow="Legal" title="Cookie Policy">
    <p>
      LWS Kitchen keeps things simple: your saved recipes are stored locally in your
      browser so they&apos;re there next time you visit. We don&apos;t use
      third-party tracking cookies.
    </p>
    <p>
      You can clear this data anytime by clearing your browser&apos;s local storage
      for this site.
    </p>
  </StaticPage>
);

export default CookiesPage;
