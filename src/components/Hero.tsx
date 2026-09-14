'use client';

import React, { useRef, useState, useEffect } from 'react';
import { useLanguage } from './LanguageContext';
import { ArrowUpRight } from 'lucide-react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';
import MouseEffects from './MouseEffects';
import CountUp from './CountUp';

export default function Hero() {
  const { language } = useLanguage();
  const sectionRef = useRef<HTMLElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const [videoReady, setVideoReady] = useState(false);
  const [videoStarted, setVideoStarted] = useState(false);

  // Only render video after mount — prevents poster image flash on refresh
  useEffect(() => {
    setVideoReady(true);
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  // Subtle parallax: image moves up slower than scroll
  const imageY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ['0%', '0%'] : ['0%', '18%']);
  const imageScale = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? [1, 1] : [1, 1.12]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.7], shouldReduceMotion ? [1, 1] : [1, 0]);
  const copyY = useTransform(scrollYProgress, [0, 1], shouldReduceMotion ? ['0px', '0px'] : ['0px', '-40px']);

  const copy = {
    fr: {
      tag: "Catégorie VII · BTPH & Construction Industrielle",
      title: "L'Ingénierie qui construit l'Algérie.",
      subtitle: "Étude, conception et réalisation de grands projets d'infrastructures industrielles et énergétiques. Plus de 25 ans d'expérience au service des opérateurs nationaux.",
      ctaProjects: "Voir nos Réalisations",
      ctaContact: "Nous Contacter",
      m1: "25+",
      m1L: "Années d'Opération",
      m2: "VII",
      m2L: "Catégorie Maximale BTPH",
      m3: "34",
      m3L: "Projets Documentés",
    },
    en: {
      tag: "Category VII · Public Works & Industrial Construction",
      title: "Engineering that builds Algeria.",
      subtitle: "Study, design, and realization of large-scale industrial and energy infrastructure projects. Over 25 years serving Algeria's national operators.",
      ctaProjects: "View Our Projects",
      ctaContact: "Get in Touch",
      m1: "25+",
      m1L: "Years of Operation",
      m2: "VII",
      m2L: "Maximum BTPH Category",
      m3: "34",
      m3L: "Documented Projects",
    },
    ar: {
      tag: "شهادة التأهيل من الدرجة السابعة · الأشغال العمومية والبناء الصناعي",
      title: "الهندسة التي تبني الجزائر.",
      subtitle: "دراسة وتصميم وتنفيذ مشاريع البنى التحتية الصناعية والطاقوية الكبرى. أكثر من 25 عاماً من الخبرة في خدمة المتعاملين الوطنيين.",
      ctaProjects: "استعراض المشاريع",
      ctaContact: "تواصل معنا",
      m1: "+25",
      m1L: "سنوات من العمل",
      m2: "VII",
      m2L: "أعلى درجة تأهيل BTPH",
      m3: "34",
      m3L: "مشروع موثق",
    }
  };

  const c = copy[language] || copy.fr;

  return (
    <section id="hero" ref={sectionRef} className="relative min-h-[100svh] pb-0 pt-20 sm:pt-24 lg:pt-[100px] overflow-hidden bg-[#0a0e12] text-white noise-overlay">

      {/* Mouse effects — gradient + trail */}
      <MouseEffects />

      {/* Full-bleed hero video with parallax */}
      <div className="absolute inset-0 overflow-hidden bg-[#0a0e12]">
        <div
          aria-hidden="true"
          className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ${
            videoStarted ? 'opacity-0' : 'opacity-100'
          }`}
          style={{ backgroundImage: 'url("/images/hero-video-poster.jpg")' }}
        />
        {videoReady && (
          <motion.video
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onPlaying={() => setVideoStarted(true)}
            className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ${
              videoStarted ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              y: imageY,
              scale: imageScale,
              willChange: 'transform',
            }}
          >
            <source src="/images/hero-video.mp4" type="video/mp4" />
          </motion.video>
        )}
        {/* Rich layered gradient — premium depth (visible even before video loads) */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a0e12] via-[#0a0e12]/70 via-50% to-[#0a0e12]/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0e12] via-[#0a0e12]/15 to-transparent" />
        {/* Subtle overlay on image side */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent" />
      </div>

      <motion.div
        className="relative z-10 container-editorial w-full"
        style={{ opacity: copyOpacity, y: copyY }}
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.1 } },
        }}
      >
        <div className="min-h-[calc(100svh-80px)] flex flex-col justify-between py-12 sm:py-16 lg:py-20">

          {/* Main hero copy */}
          <div className="max-w-2xl space-y-6 sm:space-y-8">
            <motion.div
              className="flex items-center gap-4"
              variants={{ hidden: { opacity: 0, x: -16 }, visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }}
            >
              <div className="w-12 h-[1px] bg-[var(--color-rust)]" />
              <span className="text-[10px] sm:text-[11px] font-bold tracking-[0.24em] text-[var(--color-rust)] uppercase">
                {c.tag}
              </span>
            </motion.div>

            <motion.h1
              className="display-xl text-white"
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } } }}
            >
              {c.title}
            </motion.h1>

            <motion.p
              className="text-base sm:text-lg text-white/55 max-w-xl leading-[1.65] font-light"
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }}
            >
              {c.subtitle}
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2"
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } }}
            >
              <a href="#projects" className="btn-premium group">
                <span>{c.ctaProjects}</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
              </a>
              <a href="#contact-form" className="btn-ghost-light">
                <span>{c.ctaContact}</span>
              </a>
            </motion.div>
          </div>

          {/* Metrics row — premium, floating at bottom */}
          <motion.div
            className="pt-12 sm:pt-16"
            variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.3 } } }}
          >
            <div className="flex flex-col sm:flex-row gap-8 sm:gap-0 sm:divide-x sm:divide-white/10">
              {[
                { num: c.m1, label: c.m1L, end: 25, prefix: '', suffix: '+', decimals: 0 },
                { num: c.m2, label: c.m2L, end: 7, prefix: '', suffix: '', decimals: 0 },
                { num: c.m3, label: c.m3L, end: 34, prefix: '', suffix: '', decimals: 0 },
              ].map((metric, idx) => (
                <div key={idx} className={`space-y-2 ${idx > 0 ? 'sm:pl-12' : ''}`}>
                  <div className="text-4xl sm:text-5xl lg:text-6xl font-display text-white tracking-[-0.04em] leading-none font-medium">
                    <CountUp end={metric.end} prefix={metric.prefix} suffix={metric.suffix} decimals={metric.decimals} duration={1.8} />
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-[1px] bg-[var(--color-rust)]" />
                    <div className="text-[10px] sm:text-[11px] text-white/45 tracking-[0.14em] uppercase leading-[1.5]">
                      {metric.label}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </motion.div>

      {/* Bottom fade into next dark section (Clients) */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#14181c] to-transparent pointer-events-none" />
    </section>
  );
}
