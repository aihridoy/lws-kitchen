import StaticPage from '../components/StaticPage';

const ContactPage = () => (
  <StaticPage eyebrow="Get in Touch" title="Contact Us">
    <p>
      Have a question about a recipe, a partnership idea, or just want to say hello?
      We&apos;d love to hear from you.
    </p>
    <p>
      Email us anytime at{' '}
      <span className="text-ink font-medium">hello@lwskitchen.example</span> and
      we&apos;ll get back to you as soon as we can.
    </p>
  </StaticPage>
);

export default ContactPage;
