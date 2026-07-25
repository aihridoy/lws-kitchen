'use client';

import React, { useState, useEffect } from 'react';
import logo from '/public/assets/lws-kitchen.png';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import MobileMenu from './MobileMenu';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-paper/90 backdrop-blur-md shadow-soft'
            : 'bg-paper'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 shrink-0">
              <Image
                src={logo}
                alt="LWS Kitchen"
                width={100}
                height={50}
                className="h-8 md:h-10 w-auto"
                priority
              />
            </Link>

            {/* Desktop nav */}
            <ul className="hidden md:flex items-center gap-1">
              <li>
                <Link
                  href="/"
                  className="px-4 py-2 rounded-full text-sm font-medium text-ink hover:bg-cream transition-colors"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/category"
                  className="px-4 py-2 rounded-full text-sm font-medium text-ink hover:bg-cream transition-colors"
                >
                  Categories
                </Link>
              </li>
              <li>
                <Link
                  href="/latest"
                  className="px-4 py-2 rounded-full text-sm font-medium text-ink hover:bg-cream transition-colors"
                >
                  Latest Recipes
                </Link>
              </li>
              <li>
                <Link
                  href="/saved"
                  className="px-4 py-2 rounded-full text-sm font-medium text-ink hover:bg-cream transition-colors"
                >
                  Saved
                </Link>
              </li>
            </ul>

            {/* Right side: search + mobile hamburger */}
            <div className="flex items-center gap-2">
              {isSearchOpen ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (!searchTerm.trim()) return;
                    router.push(`/search?q=${encodeURIComponent(searchTerm.trim())}`);
                    setIsSearchOpen(false);
                    setSearchTerm('');
                  }}
                  className="flex items-center gap-1"
                >
                  <input
                    type="text"
                    autoFocus
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search recipes..."
                    className="input-field h-10 w-40 sm:w-56 text-sm py-0"
                  />
                  <button
                    type="button"
                    onClick={() => setIsSearchOpen(false)}
                    className="p-2.5 rounded-full hover:bg-cream transition-colors"
                    aria-label="Close search"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </form>
              ) : (
                <button
                  className="p-2.5 rounded-full hover:bg-cream transition-colors"
                  aria-label="Search"
                  onClick={() => setIsSearchOpen(true)}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </button>
              )}

              {/* Mobile hamburger */}
              <button
                className="md:hidden p-2.5 rounded-full hover:bg-cream transition-colors"
                onClick={() => setIsMobileMenuOpen(true)}
                aria-label="Open menu"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />
    </>
  );
};

export default Header;
