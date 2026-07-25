'use client';

import React, { useState } from 'react';

const NewsLetter = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;
    setSubscribed(true);
    setEmail('');
  };

  return (
    <section className="mb-16 md:mb-24 relative overflow-hidden rounded-3xl bg-gradient-to-br from-amber/10 via-cream to-terracotta/5 border border-divider">
      {/* Decorative circles */}
      <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-amber/10 blur-3xl" />
      <div className="absolute -bottom-10 -left-10 w-40 h-40 rounded-full bg-sage/10 blur-2xl" />

      <div className="relative px-6 py-10 md:px-12 md:py-14">
        <div className="max-w-2xl">
          <span className="badge-amber mb-4 inline-block">Stay Updated</span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-ink mb-3 text-balance">
            Deliciousness to your inbox
          </h2>
          <p className="text-muted mb-6 md:mb-8">
            Enjoy weekly hand-picked recipes and recommendations
          </p>

          {subscribed ? (
            <p className="text-ink font-medium bg-white/70 rounded-full px-5 py-3 w-fit">
              🎉 Thanks for subscribing! Warm recipes are headed to your inbox.
            </p>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="input-field flex-1"
              />
              <button type="submit" className="btn-primary shrink-0">
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default NewsLetter;
