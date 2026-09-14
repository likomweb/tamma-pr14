'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { useLanguage } from './LanguageContext';
import ScrollReveal from './ScrollReveal';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useReducedMotion } from 'framer-motion';

export default function Industries() {
  const { language } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [slidesPerView, setSlidesPerView] = useState<number>(1);
  const containerRef = useRef<HTMLDivElement>(null);

  // Responsive slides-per-view
  useEffect(() => {
    const updateSlidesPerView = () => {
      if (typeof window === 'undefined') return;
      if (window.innerWidth >= 1024) setSlidesPerView(4);
      else if (window.innerWidth >= 640) setSlidesPerView(2);
      else setSlidesPerView(1);
    };
    updateSlidesPerView();
    window.addEventListener('resize', updateSlidesPerView);
    return () => window.removeEventListener('resize', updateSlidesPerView);
  }, []);

  const content = {
    fr: {
      tag: "Industries & Domaines",
      title: "Quatre industries critiques.<br/>Une expertise reconnue.",
      subtitle: "Nos secteurs d'intervention couvrent l'ensemble des infrastructures énergétiques et industrielles qui font fonctionner l'Algérie.",
      industries: [
        { name: "Transport d'Électricité THT", subtitle: "Lignes 400 kV & Postes de Transformation", desc: "Construction de lignes aériennes et souterraines 400/220/60 kV, postes blindés GIS Siemens SF6, transformateurs de puissance et raccordement au dispatching national Sonelgaz.", image: "/images/tamma_real/pole1_tht_transmission.webp", stats: ["400 kV", "GIS", "Sonelgaz"], projectCount: 9, capacity: "9/34 projets · 400 kV nominal", ref: "PÔLE-01/THT/2024" },
        { name: "Hydrocarbures & Gazoducs", subtitle: "Pipelines HP & Plateformes Pétrolières", desc: "Gazoducs haute pression jusqu'à 28'' (Adrar 34 km), plateformes de forage et workover à Hassi Messaoud, conduites d'eau, et logistique lourde pour Sonatrach DP/HMD.", image: "/images/tamma_real/pole2_hydrocarbon.webp", stats: ["28'' HP", "P161", "Sonatrach"], projectCount: 11, capacity: "11/34 projets · 28'' HP", ref: "PÔLE-02/HYD/2024" },
        { name: "Construction Industrielle EPC", subtitle: "Usines Clé en Main & Charpente Métallique", desc: "Réalisation d'usines complètes (dolomite Ain M'lila), charpente métallique 1200T, silos de stockage, concasseurs, fondations spéciales et bâtiments techniques.", image: "/images/tamma_real/pole3_epc_construction.webp", stats: ["EPC", "1200 T", "ENCC-SPA"], projectCount: 7, capacity: "7/34 projets · 1200 T charpente", ref: "PÔLE-03/EPC/2024" },
        { name: "Infrastructures Télécoms", subtitle: "Fibre Optique Backbone Saharien", desc: "Pose de fourreaux et tirage de câbles fibre optique en plein Sahara (320 km Djanet, 160 km Illizi) pour Algérie Télécom. Tranchées mécanisées et raccordements.", image: "/images/tamma_real/pole4_telecom_fiber.webp", stats: ["480 km", "Fibre", "Algérie Télécom"], projectCount: 2, capacity: "2/34 projets · 480 km fibre", ref: "PÔLE-04/FIBER/2024" },
      ]
    },
    en: {
      tag: "Industries & Domains",
      title: "Four critical industries.<br/>One recognized expertise.",
      subtitle: "Our sectors cover all the energy and industrial infrastructure that keeps Algeria running.",
      industries: [
        { name: "THT Power Transmission", subtitle: "400 kV Lines & Transformation Substations", desc: "Construction of overhead and underground 400/220/60 kV lines, Siemens SF6 GIS metal-clad substations, power transformers, and connection to the Sonelgaz national dispatching.", image: "/images/tamma_real/pole1_tht_transmission.webp", stats: ["400 kV", "GIS", "Sonelgaz"], projectCount: 9, capacity: "9/34 projects · 400 kV nominal", ref: "PÔLE-01/THT/2024" },
        { name: "Oil & Gas Pipelines", subtitle: "HP Pipelines & Petroleum Platforms", desc: "High-pressure gas pipelines up to 28'' (Adrar 34 km), drilling and workover platforms at Hassi Messaoud, water lines, and heavy logistics for Sonatrach DP/HMD.", image: "/images/tamma_real/pole2_hydrocarbon.webp", stats: ["28'' HP", "P161", "Sonatrach"], projectCount: 11, capacity: "11/34 projects · 28'' HP", ref: "PÔLE-02/HYD/2024" },
        { name: "EPC Industrial Construction", subtitle: "Turnkey Plants & Steel Structure", desc: "Complete plant construction (Ain M'lila dolomite), 1200T steel structure, storage silos, crushers, special foundations and technical buildings.", image: "/images/tamma_real/pole3_epc_construction.webp", stats: ["EPC", "1200 T", "ENCC-SPA"], projectCount: 7, capacity: "7/34 projects · 1200 T steel", ref: "PÔLE-03/EPC/2024" },
        { name: "Telecom Infrastructure", subtitle: "Saharan Backbone Fiber Optic", desc: "Duct laying and fiber optic cable pulling in the Sahara (320 km Djanet, 160 km Illizi) for Algérie Télécom. Mechanized trenching and connections.", image: "/images/tamma_real/pole4_telecom_fiber.webp", stats: ["480 km", "Fiber", "Algérie Télécom"], projectCount: 2, capacity: "2/34 projects · 480 km fiber", ref: "PÔLE-04/FIBER/2024" },
      ]
    },
    ar: {
      tag: "الصناعات والمجالات",
      title: "أربع صناعات حرجة.<br/>خبرة معترف بها.",
      subtitle: "تغطي قطاعاتنا جميع البنى التحتية الطاقوية والصناعية.",
      industries: [
        { name: "نقل الكهرباء THT", subtitle: "خطوط 400 kV ومحطات التحويل", desc: "بناء خطوط 400/220/60 kV، محطات GIS، محولات طاقة.", image: "/images/tamma_real/pole1_tht_transmission.webp", stats: ["400 kV", "GIS", "سونلغاز"], projectCount: 9, capacity: "9/34 مشروع · 400 kV", ref: "PÔLE-01/THT/2024" },
        { name: "الهيدروكربونات", subtitle: "أنابيب HP ومنصات نفطية", desc: "أنابيب غاز HP حتى 28 بوصة (أدرار 34 كم)، منصات عمل.", image: "/images/tamma_real/pole2_hydrocarbon.webp", stats: ["28'' HP", "P161", "سوناطراك"], projectCount: 11, capacity: "11/34 مشروع · 28 بوصة", ref: "PÔLE-02/HYD/2024" },
        { name: "البناء الصناعي EPC", subtitle: "مصانع تسليم مفتاح", desc: "بناء مصانع كاملة (دولوميت)، هيكل معدني 1200 طن.", image: "/images/tamma_real/pole3_epc_construction.webp", stats: ["EPC", "1200 T", "ENCC-SPA"], projectCount: 7, capacity: "7/34 مشروع · 1200 طن", ref: "PÔLE-03/EPC/2024" },
        { name: "البنية التحتية للاتصالات", subtitle: "الألياف الضوئية الصحراوية", desc: "وضع كابلات ألياف ضوئية في الصحراء.", image: "/images/tamma_real/pole4_telecom_fiber.webp", stats: ["480 km", "ألياف", "اتصالات"], projectCount: 2, capacity: "2/34 مشروع · 480 كم", ref: "PÔLE-04/FIBER/2024" },
      ]
    }
  };

  const t = content[language] || content.fr;
  const industries = t.industries;

  const maxIndex = Math.max(0, industries.length - slidesPerView);
  const canGoLeft = currentIndex > 0;
  const canGoRight = currentIndex < maxIndex;

  const goLeft = () => {
    if (canGoLeft) setCurrentIndex((i) => i - 1);
  };
  const goRight = () => {
    if (canGoRight) setCurrentIndex((i) => i + 1);
  };

  // Keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goLeft();
      if (e.key === 'ArrowRight') goRight();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canGoLeft, canGoRight]);

  // Touch swipe support
  const touchStart = useRef<number | null>(null);
  const onTouchStart = (e: React.TouchEvent) => {
    touchStart.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStart.current === null) return;
    const diff = touchStart.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) goRight();
      else goLeft();
    }
    touchStart.current = null;
  };

  return (
    <section id="industries" className="bg-[var(--color-paper)] paper-texture section-pad">
      <div className="container-editorial">

        <ScrollReveal>
          <div className="grid lg:grid-cols-12 gap-8 mb-8 lg:mb-10 pb-10">
            <div className="lg:col-span-5 space-y-5">
              <div className="section-label">
                <span className="num">02</span>
                <span className="name">{language === 'ar' ? 'مجالات العمل' : language === 'en' ? 'Sectors' : 'Domaines'}</span>
              </div>
              <div className="eyebrow">{t.tag}</div>
              <h2 className="display-lg text-[var(--color-ink)]" dangerouslySetInnerHTML={{ __html: t.title }} />
            </div>
            <div className="lg:col-span-5 lg:col-start-8 flex items-end">
              <p className="body-lg text-[var(--color-graphite)]">{t.subtitle}</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Premium Carousel — 4 poles, responsive slides */}
        <div
          className="relative"
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          ref={containerRef}
        >
          <div className="overflow-hidden">
            <div
              className={`flex ${shouldReduceMotion ? '' : 'transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]'}`}
              style={{ transform: `translateX(-${currentIndex * (100 / slidesPerView)}%)` }}
            >
              {industries.map((ind, idx) => (
                <div
                  key={idx}
                  className="shrink-0 px-3"
                  style={{ width: `${100 / slidesPerView}%` }}
                >
                  <article className="card editorial-interactive group overflow-hidden h-full flex flex-col">
                    {/* Image */}
                    <div className="relative aspect-[4/3] overflow-hidden">
                      <Image src={ind.image} alt={ind.name} fill className={`object-cover ${shouldReduceMotion ? '' : 'transition-transform duration-700 group-hover:scale-105'}`} />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent" />
                      {/* PÔLE badge */}
                      <div className="absolute top-4 left-4">
                        <span className="text-[10px] font-bold tracking-[0.16em] text-white bg-white/15 backdrop-blur-md px-3 py-1.5 uppercase rounded-full">
                          PÔLE {String(idx + 1).padStart(2, '0')}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6 flex flex-col flex-1 space-y-4">
                      <div>
                        <span className="text-[10px] font-medium tracking-[0.15em] text-[var(--color-mist)] uppercase mb-1 block">
                          {ind.subtitle}
                        </span>
                        <h3 className="text-base lg:text-lg font-semibold text-[var(--color-ink)] font-display tracking-tight leading-[1.2]">
                          {ind.name}
                        </h3>
                      </div>

                      <p className="text-sm text-[var(--color-graphite)] leading-[1.65] flex-1">
                        {ind.desc}
                      </p>

                      <div className="pt-4 flex items-center justify-between border-t border-[rgba(10,12,13,0.06)]">
                        <div className="flex items-center gap-3">
                          {ind.stats.map((s) => (
                            <span key={s} className="text-[10px] font-mono text-[var(--color-mist)] tracking-wider">{s}</span>
                          ))}
                        </div>
                        <span className="text-[10px] font-mono text-[var(--color-accent)] tracking-wider">{ind.projectCount} {language === 'ar' ? 'مشاريع' : language === 'en' ? 'projects' : 'projets'}</span>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </div>

          {/* Arrows — desktop sides, mobile below */}
          <div className="flex absolute left-0 right-0 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
            <button
              type="button"
              onClick={goLeft}
              disabled={!canGoLeft}
              aria-label="Previous pole"
              className={`pointer-events-auto absolute -left-2 lg:-left-5 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/95 backdrop-blur-md border border-[rgba(10,12,13,0.08)] shadow-lg flex items-center justify-center text-[var(--color-ink)] transition-all duration-300 active:scale-95 ${
                canGoLeft ? 'opacity-100 hover:bg-[var(--color-ink)] hover:text-white hover:scale-110 hover:shadow-xl' : 'opacity-30 cursor-not-allowed'
              }`}
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              type="button"
              onClick={goRight}
              disabled={!canGoRight}
              aria-label="Next pole"
              className={`pointer-events-auto absolute -right-2 lg:-right-5 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white/95 backdrop-blur-md border border-[rgba(10,12,13,0.08)] shadow-lg flex items-center justify-center text-[var(--color-ink)] transition-all duration-300 active:scale-95 ${
                canGoRight ? 'opacity-100 hover:bg-[var(--color-ink)] hover:text-white hover:scale-110 hover:shadow-xl' : 'opacity-30 cursor-not-allowed'
              }`}
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Dot indicators + counter */}
        <div className="mt-8 flex items-center justify-center gap-2.5">
          {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrentIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-300 rounded-full ${
                currentIndex === idx
                  ? 'w-8 h-1.5 bg-[var(--color-accent)]'
                  : 'w-1.5 h-1.5 bg-[var(--color-mist)]/30 hover:bg-[var(--color-mist)]/60'
              }`}
            />
          ))}
          <span className="ml-3 text-[10px] font-mono text-[var(--color-mist)] tracking-widest">
            {String(currentIndex + 1).padStart(2, '0')} / {String(maxIndex + 1).padStart(2, '0')}
          </span>
        </div>

      </div>
    </section>
  );
}
