'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useLanguage } from './LanguageContext';
import { ArrowUpRight } from 'lucide-react';

export default function Footer() {
  const [currentYear, setCurrentYear] = useState<number | null>(null);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);
  const { language } = useLanguage();

  return (
    <footer id="footer" className="bg-[var(--color-midnight)] text-white/70 scroll-dark">
      <div className="container-editorial py-16 lg:py-24 space-y-14">

        {/* Big Statement */}
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 pb-10">
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-4">
              <span className="block w-10 h-px bg-[var(--color-rust)]" />
              <span className="text-[10px] font-bold tracking-[0.22em] text-[var(--color-rust)] uppercase">
                SARL TAMMA SERVICES
              </span>
            </div>
            <h3 className="display-md text-white max-w-2xl">
              Vingt-cinq ans à construire l'Algérie.<br />
              Et ce n'est que le début.
            </h3>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 flex items-end">
            <p className="text-sm text-white/55 leading-[1.7] max-w-sm">
              Entreprise générale d'ingénierie et de construction (EPC) qualifiée Catégorie VII. ISO 9001 · 14001 · 45001.
            </p>
          </div>
        </div>

        {/* Footer Grid — premium soft columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pt-10 border-t border-white/[0.08]">

          {/* Brand & Contact */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-3.5">
              <div className="relative h-10 w-auto shrink-0 overflow-hidden">
                <Image
                  src="/images/tamma-logo-light.png?v=2"
                  alt="SARL TAMMA EPC Logo"
                  width={180}
                  height={40}
                  className="h-10 w-auto object-contain"
                />
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <a
                href="mailto:commercial@tamma-services.dz"
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors group"
              >
                <span>commercial@tamma-services.dz</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
              <a
                href="tel:+213661851385"
                className="flex items-center gap-2 text-white/70 hover:text-white transition-colors group"
              >
                <span>+213 (0) 661.85.13.85</span>
                <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2 space-y-4">
            <h4 className="text-[10px] font-bold tracking-[0.22em] text-white uppercase">
              Navigation
            </h4>
            <ul className="space-y-2.5 text-sm">
              {[
                { href: '#about', label: "L'Entreprise" },
                { href: '#capabilities', label: 'Expertise' },
                { href: '#projects', label: 'Réalisations' },
                { href: '#specs', label: 'Moyens' },
                { href: '#qhse', label: 'QHSE' },
                { href: '#contact-form', label: 'Contact' },
              ].map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-white/55 hover:text-white transition-colors duration-200">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Capabilities */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-[10px] font-bold tracking-[0.22em] text-white uppercase">
              Pôles
            </h4>
            <ul className="space-y-2.5 text-sm text-white/55">
              <li>Lignes &amp; Postes THT 400/220 kV</li>
              <li>Postes Blindés GIS</li>
              <li>Gazoducs HP 28''</li>
              <li>Construction Industrielle EPC</li>
            </ul>
          </div>

          {/* Regional */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-[10px] font-bold tracking-[0.22em] text-white uppercase">
              Sièges
            </h4>
            <ul className="space-y-2.5 text-sm text-white/55">
              <li><strong className="text-white font-semibold">Hassi Messaoud</strong> — Base Opérationnelle</li>
              <li><strong className="text-white font-semibold">Alger (Hydra)</strong> — Bureau Commercial</li>
              <li><strong className="text-white font-semibold">El-Oued</strong> — Direction Générale</li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-3 text-sm text-white/45">
          <p>© {currentYear ?? ''} SARL TAMMA SERVICES. Tous droits réservés.</p>
          <p className="tracking-wide">
            Étude · Ingénierie · Réalisation
          </p>
        </div>

      </div>
    </footer>
  );
}
