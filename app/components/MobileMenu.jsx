'use client';

import React from 'react';
import Link from 'next/link';

const MobileMenu = ({ isOpen, onClose }) => {
  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-ink/40 backdrop-blur-sm z-40 transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Menu panel */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] bg-paper z-50 md:hidden
          shadow-lifted transition-transform duration-300 ease-out
          ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="flex flex-col h-full p-6">
          {/* Close button */}
          <button
            onClick={onClose}
            className="self-end p-2 rounded-full hover:bg-cream transition-colors"
            aria-label="Close menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Nav links */}
          <nav className="flex flex-col gap-1 mt-8">
            <Link
              href="/"
              onClick={onClose}
              className="px-4 py-3 rounded-xl text-lg font-medium text-ink hover:bg-cream transition-colors"
            >
              Home
            </Link>
            <Link
              href="/category"
              onClick={onClose}
              className="px-4 py-3 rounded-xl text-lg font-medium text-ink hover:bg-cream transition-colors"
            >
              Categories
            </Link>
            <Link
              href="/category"
              onClick={onClose}
              className="px-4 py-3 rounded-xl text-lg font-medium text-ink hover:bg-cream transition-colors"
            >
              Latest Recipes
            </Link>
          </nav>

          {/* Bottom accent */}
          <div className="mt-auto pt-6 border-t border-divider">
            <p className="text-sm text-muted text-center">
              LWS Kitchen
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
