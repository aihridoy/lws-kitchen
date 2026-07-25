import StaticPage from '../components/StaticPage';

const CopyrightPage = () => (
  <StaticPage eyebrow="Legal" title="Copyright">
    <p>
      &copy; {new Date().getFullYear()} LWS Kitchen. All recipes, photos, and written
      content on this site are the property of LWS Kitchen unless otherwise noted.
    </p>
    <p>
      You&apos;re welcome to share a link to our recipes. Please don&apos;t republish
      full recipe text or photos without permission.
    </p>
  </StaticPage>
);

export default CopyrightPage;
