'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { useLanguage, Language } from './LanguageContext';
import { ArrowUpRight, Menu, X, ChevronDown, Globe } from 'lucide-react';

export default function Navbar() {
  const { language, setLanguage } = useLanguage();
  const [mounted, setMounted] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('');
  const [atTop, setAtTop] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [langOpenDesktop, setLangOpenDesktop] = useState(false);
  const langDropdownRef = useRef<HTMLDivElement>(null);
  const langDropdownRefDesktop = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const menuTouchStart = useRef<number | null>(null);
  const menuTouchHandledAt = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  const update = useCallback(() => {
    const sections = ['about', 'industries', 'epc', 'projects', 'specs', 'qhse', 'contact'];
    const currentScrollY = window.scrollY;
    setAtTop(currentScrollY < 50);
    setScrolled(currentScrollY > 50);

    const scrollPosition = currentScrollY + window.innerHeight / 3;
    let current = '';
    for (const sectionId of sections) {
      const el = document.getElementById(sectionId);
      if (el) {
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          current = sectionId;
        }
      }
    }
    setActiveSection(current);
  }, []);

  useEffect(() => {
    let rafId: number | null = null;

    const handleScroll = () => {
      if (rafId !== null) return; // already scheduled
      rafId = requestAnimationFrame(() => {
        update();
        rafId = null;
      });
    };

    const initialFrame = requestAnimationFrame(update);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(initialFrame);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, [update]);

  // Close menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Close menu on Escape key
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
        return;
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  // Close language dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langDropdownRef.current && !langDropdownRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
      if (langDropdownRefDesktop.current && !langDropdownRefDesktop.current.contains(e.target as Node)) {
        setLangOpenDesktop(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close menu on nav link click
  const closeMenu = () => setMenuOpen(false);
  const toggleMenu = () => setMenuOpen((open) => !open);
  const handleMenuClick = () => {
    if (Date.now() - menuTouchHandledAt.current < 500) return;
    toggleMenu();
  };
  const handleMenuTouchEnd = (event: React.TouchEvent<HTMLButtonElement>) => {
    event.preventDefault();
    menuTouchHandledAt.current = Date.now();
    toggleMenu();
  };

  const navLinks = [
    { id: 'about' },
    { id: 'industries' },
    { id: 'epc' },
    { id: 'projects' },
    { id: 'specs' },
    { id: 'qhse' },
    { id: 'contact' },
  ];

  const labels = {
    fr: {
      about: 'Entreprise', industries: 'Expertise', epc: 'Chaine EPC', projects: 'Realisations', specs: 'Moyens', qhse: 'QHSE',
      contact: 'Contact', cta: 'Prendre contact',
      menuClose: 'Fermer',
    },
    en: {
      about: 'About', industries: 'Expertise', epc: 'EPC Chain', projects: 'Projects', specs: 'Resources', qhse: 'QHSE',
      contact: 'Contact', cta: 'Get in touch',
      menuClose: 'Close',
    },
    ar: {
      about: 'من نحن', industries: 'مجالات العمل', epc: 'السلسلة', projects: 'مشاريعنا', specs: 'المعدات', qhse: 'QHSE',
      contact: 'اتصل', cta: 'تواصل معنا',
      menuClose: 'إغلاق',
    },
  };
  const displayLanguage = mounted ? language : 'fr';
  const t = labels[displayLanguage] || labels.fr;

  const langLabels = {
    fr: 'FR', en: 'EN', ar: 'AR',
  };

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <header className="fixed top-0 left-0 right-0 z-50">
        <nav
          className={`w-full transition-all duration-500 ${
            scrolled || menuOpen
              ? 'bg-white/95 backdrop-blur-xl shadow-[0_1px_0_rgba(10,12,13,0.06),0_4px_16px_rgba(10,12,13,0.06)] py-3'
              : atTop
                ? 'bg-transparent py-5'
                : 'bg-white/80 backdrop-blur-xl py-3'
          }`}
        >
          <div className="container-editorial flex items-center justify-between">

            {/* Logo */}
            <a href="#" className="flex items-center group z-50 relative">
              <div className="relative h-12 sm:h-13 w-auto shrink-0 transition-opacity duration-500">
                <Image
                  src="/images/tamma-logo-light.png?v=2"
                  alt="SARL TAMMA"
                  width={180}
                  height={40}
                  className={`h-12 sm:h-13 w-auto object-contain transition-opacity duration-500 ${
                    atTop && !scrolled && !menuOpen ? 'opacity-100' : 'opacity-0'
                  }`}
                />
                <Image
                  src="/images/tamma-logo-dark.png"
                  alt="SARL TAMMA"
                  width={180}
                  height={40}
                  className={`h-12 sm:h-13 w-auto object-contain absolute top-0 left-0 transition-opacity duration-500 ${
                    atTop && !scrolled && !menuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />
              </div>
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={`#${link.id}`}
                    aria-current={isActive ? 'page' : undefined}
                    className={`nav-link relative px-4 py-2 text-[13px] font-medium tracking-[0.01em] transition-all duration-300 rounded-md ${
                      isActive
                        ? atTop ? 'text-white is-active' : 'text-[var(--color-ink)] is-active'
                        : atTop
                          ? 'text-white/65 hover:text-white'
                          : 'text-[var(--color-graphite)] hover:text-[var(--color-ink)]'
                    }`}
                  >
                    <span>{t[link.id as keyof typeof t]}</span>
                  </a>
                );
              })}
            </div>

            {/* Desktop Right: Language + CTA */}
            <div className="hidden lg:flex items-center gap-3">
              {/* Language dropdown (desktop) */}
              <div className="relative" ref={langDropdownRefDesktop}>
                <button
                  type="button"
                  onClick={() => setLangOpenDesktop(!langOpenDesktop)}
                  className={`flex items-center gap-1.5 px-3 py-2 text-[11px] font-bold tracking-wider uppercase rounded-lg transition-colors duration-300 ${
                    atTop
                      ? 'text-white bg-white/10 hover:bg-white/20'
                      : 'text-[var(--color-ink)] bg-[var(--color-paper)] hover:bg-[rgba(10,12,13,0.08)]'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>{langLabels[displayLanguage].toUpperCase()}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${langOpenDesktop ? 'rotate-180' : ''}`} />
                </button>
                {langOpenDesktop && (
                  <div className={`absolute right-0 top-full mt-2 min-w-[140px] rounded-xl overflow-hidden shadow-lg border border-[rgba(10,12,13,0.08)] ${
                    atTop ? 'bg-[var(--color-ink)] border-white/10' : 'bg-white'
                  }`}>
                    {(['fr', 'en', 'ar'] as Language[]).map((lang) => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => { setLanguage(lang); setLangOpenDesktop(false); }}
                        className={`flex items-center gap-2 w-full px-4 py-2.5 text-[11px] font-bold tracking-wider uppercase transition-colors duration-150 ${
                          displayLanguage === lang
                            ? atTop
                              ? 'bg-white/10 text-white'
                              : 'bg-[var(--color-paper)] text-[var(--color-ink)]'
                            : atTop
                              ? 'text-white/80 hover:text-white hover:bg-white/10'
                              : 'text-[var(--color-graphite)] hover:text-[var(--color-ink)] hover:bg-[var(--color-paper)]'
                        }`}
                      >
                        <span>{langLabels[lang]}</span>
                        {displayLanguage === lang && <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <a
                href="#contact-form"
                className={`group inline-flex items-center gap-2 text-[12px] font-semibold tracking-[0.04em] transition-all duration-300 ${
                  atTop ? 'text-white' : 'text-[var(--color-ink)]'
                }`}
              >
                <span className="border-b border-current pb-0.5">{t.cta}</span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-active:translate-x-0.5 group-active:-translate-y-0.5 transition-transform duration-300" />
              </a>
            </div>

            {/* Mobile Hamburger */}
            <div className="flex lg:hidden items-center gap-2 z-50">
              {/* Language dropdown */}
              <div className="relative" ref={langDropdownRef}>
                <button
                  type="button"
                  onClick={() => setLangOpen(!langOpen)}
                  className={`flex items-center gap-1 px-3 py-2 text-[11px] font-bold tracking-wider uppercase rounded-lg transition-colors duration-300 ${
                    atTop && !menuOpen
                      ? 'text-white bg-white/10 hover:bg-white/20'
                      : 'text-[var(--color-ink)] bg-white/80 backdrop-blur-md hover:bg-[var(--color-paper)]'
                  }`}
                >
                  <Globe className="w-3.5 h-3.5" />
                  <span>{langLabels[displayLanguage].toUpperCase()}</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${langOpen ? 'rotate-180' : ''}`} />
                </button>
                {langOpen && (
                  <div className={`absolute right-0 top-full mt-2 rounded-xl overflow-hidden shadow-lg border border-[rgba(10,12,13,0.08)] ${
                    atTop && !menuOpen ? 'bg-[var(--color-ink)]' : 'bg-white'
                  }`}>
                    {(['fr', 'en', 'ar'] as Language[]).map((lang) => (
                      <button
                        key={lang}
                        type="button"
                        onClick={() => { setLanguage(lang); setLangOpen(false); }}
                        className={`flex items-center gap-2 w-full px-4 py-2.5 text-[11px] font-bold tracking-wider uppercase transition-colors duration-150 ${
                          displayLanguage === lang
                            ? atTop && !menuOpen
                              ? 'bg-white/10 text-white'
                              : 'bg-[var(--color-paper)] text-[var(--color-ink)]'
                            : atTop && !menuOpen
                              ? 'text-white/80 hover:text-white hover:bg-white/10'
                              : 'text-[var(--color-graphite)] hover:text-[var(--color-ink)] hover:bg-[var(--color-paper)]'
                        }`}
                      >
                        <span>{langLabels[lang]}</span>
                        {displayLanguage === lang && <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]" />}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Hamburger / Close button */}
              <button
                type="button"
                onClick={handleMenuClick}
                onTouchEnd={handleMenuTouchEnd}
                aria-label={menuOpen ? t.menuClose : 'Menu'}
                aria-expanded={menuOpen}
                aria-controls="mobile-navigation"
                className={`w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300 ${
                  atTop && !menuOpen
                    ? 'text-white hover:bg-white/10'
                    : 'text-[var(--color-ink)] hover:bg-[var(--color-paper)]'
                }`}
              >
                {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>

          </div>
        </nav>

        {/* Mobile Menu */}
        {menuOpen && (
          <div
            id="mobile-navigation"
            ref={mobileMenuRef}
            className="fixed inset-0 top-[60px] bg-white z-40 overflow-y-auto lg:hidden"
            role="dialog"
            aria-modal="true"
            onTouchStart={(event) => { menuTouchStart.current = event.touches[0].clientX; }}
            onTouchEnd={(event) => {
              if (menuTouchStart.current !== null && menuTouchStart.current - event.changedTouches[0].clientX < -70) closeMenu();
              menuTouchStart.current = null;
            }}
          >
            <div className="container-editorial pb-12 flex flex-col">
              {/* Nav links */}
              <nav className="flex-1 space-y-1">
                {navLinks.map((link) => {
                  const isActive = activeSection === link.id;
                  return (
                    <a
                      key={link.id}
                      href={`#${link.id}`}
                      onClick={closeMenu}
                      className={`flex items-center justify-between py-4 text-2xl font-display font-medium tracking-tight border-b border-[rgba(10,12,13,0.06)] transition-colors duration-200 active:opacity-60 ${
                        isActive
                          ? 'text-[var(--color-accent)]'
                          : 'text-[var(--color-ink)] hover:text-[var(--color-accent)] active:text-[var(--color-accent)]'
                      }`}
                    >
                      <span>{t[link.id as keyof typeof t]}</span>
                      {isActive && (
                        <span className="w-2 h-2 rounded-full bg-[var(--color-accent)]" />
                      )}
                    </a>
                  );
                })}
              </nav>

              {/* CTA at bottom */}
              <div className="pt-8 border-t border-[rgba(10,12,13,0.08)] space-y-4">
                <a
                  href="#contact-form"
                  onClick={closeMenu}
                  className="btn-premium w-full justify-center"
                >
                  {t.cta}
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
