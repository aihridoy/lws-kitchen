const StaticPage = ({ eyebrow, title, children }) => (
  <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 md:pt-28 pb-16">
    <span className="badge-amber mb-3 inline-block">{eyebrow}</span>
    <h1 className="section-heading text-4xl md:text-5xl mb-6">{title}</h1>
    <div className="text-muted leading-relaxed space-y-4">{children}</div>
  </main>
);

export default StaticPage;
