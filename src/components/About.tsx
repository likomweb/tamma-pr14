'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useLanguage } from './LanguageContext';
import ScrollReveal from './ScrollReveal';
import CountUp from './CountUp';
import { motion, useSpring, useTransform, useInView, AnimatePresence } from 'framer-motion';

function AnimatedBar({ targetPct }: { targetPct: number }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-60px' });
  const raw = useSpring(0, { stiffness: 60, damping: 18 });
  const display = useTransform(raw, (v) => `${Math.round(v)}%`);

  React.useEffect(() => {
    if (isInView) raw.set(targetPct);
  }, [isInView, targetPct, raw]);

  return (
    <div ref={ref} className="w-full">
      <div className="h-0.5 bg-[rgba(10,12,13,0.08)] rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-[var(--color-accent)] rounded-full origin-left"
          style={{ scaleX: useTransform(raw, [0, 100], [0, 1]) }}
        />
      </div>
      <motion.span className="text-[9px] font-mono text-[var(--color-accent)] tracking-wider mt-1 block">
        {display}
      </motion.span>
    </div>
  );
}

export default function About() {
  const { language } = useLanguage();

  const content = {
    fr: {
      tag: "Profil de l'Entreprise",
      titleStart: "Une position de partenaire",
      titleEm: "majeur sur le marché national",
      titleEnd: ".",
      subtitle: "SARL TAMMA est un partenaire de référence pour Sonelgaz et Sonatrach depuis vingt-cinq ans. Entreprise de qualification catégorie VII pour les travaux publics, l'hydraulique et le bâtiment — avec un effectif permanent de 137 personnes et un parc matériel en pleine propriété.",
      pillarsTitle: "Quatre Principes d'Exécution",
      pillarsSubtitle: "Comment nous garantissons la satisfaction client en termes de qualité, coûts et délais.",
      pillarLink: "En savoir plus",
      pillar1Title: "Expertise Technique",
      pillar1Desc: "Une équipe qualifiée et expérimentée dans les domaines de l'ingénierie électrique, mécanique et civile.",
      pillar1Extra: "137 collaborateurs permanents · 12 chefs de projet · Qualification Catégorie VII · 25 ans d'expérience sur les infrastructures Sonelgaz & Sonatrach.",
      pillar2Title: "Qualité et Fiabilité",
      pillar2Desc: "Opération selon des normes de qualité strictes pour garantir la sécurité et la performance des installations.",
      pillar2Extra: "Certifié ISO 9001:2015 · 2 ingénieurs QC et 3 techniciens d'essais dédiés · Procédures de pré-commissioning et essais diélectriques normalisées.",
      pillar3Title: "Réactivité",
      pillar3Desc: "Un service de dépannage rapide pour minimiser les temps d'arrêt et les perturbations.",
      pillar3Extra: "3 bases régionales (Hassi Messaoud, El-Oued, Alger) · Parc matériel en pleine propriété · Équipes workover mobilisables sous 48h sur tout le territoire.",
      pillar4Title: "Personnalisation",
      pillar4Desc: "Des solutions sur mesure adaptées aux besoins spécifiques de chaque client.",
      pillar4Extra: "Étude, conception et réalisation en interne · 34 projets livrés sur cahier des charges spécifique · Capacité EPC clé en main du génie civil à la mise en service.",
      pullQuote: "Pour nous, les ressources humaines représentent sans aucun doute la ressource la plus précieuse. L'équipe SARL TAMMA possède une adaptabilité et une expertise remarquables qui lui permettent de valoriser toutes les autres ressources.",
      attribution: "SARL TAMMA · Présentation institutionnelle",
      refTag: "Référence Chantier",
      refLocation: "Poste 400/220 kV · Larbaa",
      hrTitle: "Moyens Humains",
      hrEyebrow: "Annexe RH · 2024",
      hrSubtitle: "Effectif permanent de cent trente-sept (137) collaborateurs, structuré en quatre pôles de compétence — Direction, Qualité-Sécurité, Technique et Exécution.",
      hrTotal: "137",
      hrTotalLabel: "Collaborateurs permanents",
      hrRatio: "1 cadre / 3,4 exécutants",
      hrFamilies: [
        { letter: "A", num: "01", name: "Direction & Encadrement", head: 25, pct: "18 %", spec: "12 chefs de projet · 10 administration · 5 QHSE" },
        { letter: "B", num: "02", name: "Qualité & Contrôle", head: 5, pct: "4 %", spec: "2 ingénieurs QC · 3 techniciens d'essais" },
        { letter: "C", num: "03", name: "Métiers Techniques", head: 45, pct: "33 %", spec: "20 électriciens THT/HT · 25 opérateurs engins" },
        { letter: "D", num: "04", name: "Exécution Chantier", head: 60, pct: "44 %", spec: "Main-d'œuvre qualifiée, pipeline & GC" },
      ],
      hrRows: [
        { code: "PM", label: "Chefs de projet", qty: 12, pct: "8,8 %" },
        { code: "ADM", label: "Administration & Finance", qty: 10, pct: "7,3 %" },
        { code: "QHSE", label: "Hygiène, Sécurité, Environnement", qty: 5, pct: "3,6 %" },
        { code: "QC-ING", label: "Ingénieurs Qualité / Contrôle", qty: 2, pct: "1,5 %" },
        { code: "QC-TEC", label: "Techniciens d'essais & mesures", qty: 3, pct: "2,2 %" },
        { code: "ELEC", label: "Électriciens THT / HT / MT", qty: 20, pct: "14,6 %" },
        { code: "OPR", label: "Opérateurs engins lourds", qty: 25, pct: "18,2 %" },
        { code: "EXE", label: "Exécution pipeline & GC", qty: 60, pct: "43,8 %" },
      ],
      hrRef: "Référentiel ISO 9001:2015 § 7.1 · Compétences",
    },
    en: {
      tag: "Company Profile",
      titleStart: "A position as",
      titleEm: "major partner in the national market",
      titleEnd: ".",
      subtitle: "SARL TAMMA is a reference partner for Sonelgaz and Sonatrach — twenty-five years of infrastructure delivery across the Algerian energy sector. Holder of category VII professional qualification, with 137 permanent staff and a fully-owned equipment fleet.",
      pillarsTitle: "Four Execution Principles",
      pillarsSubtitle: "How we guarantee customer satisfaction in terms of quality, costs, and deadlines.",
      pillarLink: "Learn more",
      pillar1Title: "Technical Expertise",
      pillar1Desc: "A qualified and experienced team in the fields of electrical, mechanical, and civil engineering.",
      pillar1Extra: "137 permanent staff · 12 project managers · Category VII qualification · 25 years on Sonelgaz & Sonatrach infrastructure contracts.",
      pillar2Title: "Quality and Reliability",
      pillar2Desc: "Operation according to strict quality standards to ensure the safety and performance of installations.",
      pillar2Extra: "ISO 9001:2015 certified · 2 QC engineers and 3 testing technicians · Standardized pre-commissioning and dielectric test procedures.",
      pillar3Title: "Reactivity",
      pillar3Desc: "A rapid troubleshooting service to minimize downtime and disruptions.",
      pillar3Extra: "3 regional bases (Hassi Messaoud, El-Oued, Algiers) · Fully-owned equipment fleet · Workover teams deployable in under 48h nationwide.",
      pillar4Title: "Customization",
      pillar4Desc: "Tailor-made solutions adapted to the specific needs of each client.",
      pillar4Extra: "In-house study, design and execution · 34 projects delivered against bespoke specifications · Full EPC turnkey capability from civil works to commissioning.",
      pullQuote: "Human resources undoubtedly represent the most precious resource we have. The SARL TAMMA team possesses remarkable adaptability and expertise, allowing it to enhance all other resources.",
      attribution: "SARL TAMMA · Institutional Presentation",
      refTag: "Field Reference",
      refLocation: "Substation 400/220 kV · Larbaa",
      hrTitle: "Human Resources",
      hrEyebrow: "HR Annex · 2024",
      hrSubtitle: "A permanent workforce of one hundred and thirty-seven (137) employees, structured across four competence poles.",
      hrTotal: "137",
      hrTotalLabel: "Permanent staff",
      hrRatio: "1 manager / 3.4 operatives",
      hrFamilies: [
        { letter: "A", num: "01", name: "Management & Supervision", head: 25, pct: "18 %", spec: "12 project managers · 10 admin · 5 QHSE" },
        { letter: "B", num: "02", name: "Quality & Control", head: 5, pct: "4 %", spec: "2 QC engineers · 3 testing technicians" },
        { letter: "C", num: "03", name: "Technical Trades", head: 45, pct: "33 %", spec: "20 electricians HT/MT · 25 plant operators" },
        { letter: "D", num: "04", name: "Field Execution", head: 60, pct: "44 %", spec: "Qualified labour, pipeline & GC specialists" },
      ],
      hrRows: [
        { code: "PM", label: "Project Managers", qty: 12, pct: "8.8 %" },
        { code: "ADM", label: "Administration & Finance", qty: 10, pct: "7.3 %" },
        { code: "QHSE", label: "Health, Safety, Environment", qty: 5, pct: "3.6 %" },
        { code: "QC-ING", label: "QC Engineers", qty: 2, pct: "1.5 %" },
        { code: "QC-TEC", label: "Testing & Measurement Techs", qty: 3, pct: "2.2 %" },
        { code: "ELEC", label: "HT / MT Electricians", qty: 20, pct: "14.6 %" },
        { code: "OPR", label: "Heavy Plant Operators", qty: 25, pct: "18.2 %" },
        { code: "EXE", label: "Pipeline & GC Execution", qty: 60, pct: "43.8 %" },
      ],
      hrRef: "ISO 9001:2015 § 7.1 · Competence",
    },
    ar: {
      tag: "نبذة عن الشركة",
      titleStart: "موقع الشريك",
      titleEm: "الرئيسي في السوق الوطني",
      titleEnd: ".",
      subtitle: "سارل تامة شريك مرجعي لسونلغاز وسوناطراك منذ خمس وعشرين سنة. شركة تأهيل درجة VII للأشغال العمومية والري والبناء.",
      pillarsTitle: "أربعة مبادئ تنفيذ",
      pillarsSubtitle: "كيف نضمن رضا العملاء.",
      pillarLink: "اعرف المزيد",
      pillar1Title: "الخبرة التقنية",
      pillar1Desc: "فريق مؤهل في الهندسة الكهربائية والميكانيكية والمدنية.",
      pillar1Extra: "137 موظف دائم · 12 مدير مشاريع · تأهيل درجة VII · 25 سنة خبرة في بنية تحتية سونلغاز وسوناطراك.",
      pillar2Title: "الجودة والموثوقية",
      pillar2Desc: "العمل وفق معايير جودة صارمة.",
      pillar2Extra: "شهادة ISO 9001:2015 · مهندسان QC و 3 تقنيين قياس · إجراءات ما قبل التشغيل والاختبارات.",
      pillar3Title: "الاستجابة السريعة",
      pillar3Desc: "خدمة إصلاح سريعة لتقليل التوقفات.",
      pillar3Extra: "3 قواعد إقليمية · أسطول معدات خاص · فرق workover جاهزة خلال 48 ساعة.",
      pillar4Title: "التخصيص",
      pillar4Desc: "حلول مخصصة لكل عميل.",
      pillar4Extra: "دراسة وتصميم وتنفيذ داخلي · 34 مشروع منفصل · قدرة EPC تسليم مفتاح.",
      pullQuote: "الموارد البشرية أثمن مورد نملكه.",
      attribution: "سارل تامة · عرض مؤسسي",
      refTag: "مرجع ميداني",
      refLocation: "محطة 400/220 · لاربعة",
      hrTitle: "الموارد البشرية",
      hrEyebrow: "ملحق الموارد · 2024",
      hrSubtitle: "فعالية دائمة من 137 متعاوناً عبر أربعة محاور.",
      hrTotal: "137",
      hrTotalLabel: "متعاون دائم",
      hrRatio: "1 إطار / 3,4 منفذين",
      hrFamilies: [
        { letter: "أ", num: "01", name: "التسيير والقيادة", head: 25, pct: "18 %", spec: "12 مدير مشروع · 10 إدارة · 5 QHSE" },
        { letter: "ب", num: "02", name: "الجودة والمراقبة", head: 5, pct: "4 %", spec: "2 مهندس QC · 3 تقنيي اختبارات" },
        { letter: "ج", num: "03", name: "الحرف التقنية", head: 45, pct: "33 %", spec: "20 كهربائي · 25 سائق آليات" },
        { letter: "د", num: "04", name: "التنفيذ الميداني", head: 60, pct: "44 %", spec: "يد عاملة مؤهلة" },
      ],
      hrRows: [
        { code: "PM", label: "مدراء المشاريع", qty: 12, pct: "8,8 %" },
        { code: "ADM", label: "الإدارة والمالية", qty: 10, pct: "7,3 %" },
        { code: "QHSE", label: "الصحة والسلامة", qty: 5, pct: "3,6 %" },
        { code: "QC-ING", label: "مهندسو QC", qty: 2, pct: "1,5 %" },
        { code: "QC-TEC", label: "تقنيو الاختبارات", qty: 3, pct: "2,2 %" },
        { code: "ELEC", label: "كهربائيو THT/MT", qty: 20, pct: "14,6 %" },
        { code: "OPR", label: "سائقو الآليات", qty: 25, pct: "18,2 %" },
        { code: "EXE", label: "تنفيذ GC", qty: 60, pct: "43,8 %" },
      ],
      hrRef: "ISO 9001:2015 § 7.1 · الكفاءات",
    }
  };

  const c = content[language] || content.fr;

  const [expandedPillar, setExpandedPillar] = useState<string | null>(null);
  const togglePillar = (num: string) => {
    setExpandedPillar((current) => (current === num ? null : num));
  };

  const pillars = [
    { num: "01", title: c.pillar1Title, desc: c.pillar1Desc, extra: c.pillar1Extra },
    { num: "02", title: c.pillar2Title, desc: c.pillar2Desc, extra: c.pillar2Extra },
    { num: "03", title: c.pillar3Title, desc: c.pillar3Desc, extra: c.pillar3Extra },
    { num: "04", title: c.pillar4Title, desc: c.pillar4Desc, extra: c.pillar4Extra },
  ];

  return (
    <section id="about" className="paper-texture section-pad">
      <div className="container-editorial">

        {/* Header */}
        <ScrollReveal>
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-16 mb-16 lg:mb-28">
            <div className="lg:col-span-7 space-y-5 lg:space-y-8">
              <div className="section-label">
                <span className="num">01</span>
                <span className="name">{language === 'ar' ? 'نبذة عن الشركة' : language === 'en' ? 'Company' : "L'Entreprise"}</span>
              </div>
              <div className="eyebrow">{c.tag}</div>
              <h2 className="display-lg max-w-3xl text-[var(--color-ink)]">
                {c.titleStart} <em className="italic text-[var(--color-accent)] font-normal">{c.titleEm}</em>{c.titleEnd}
              </h2>
            </div>
            <div className="lg:col-span-4 lg:col-start-9 flex items-end">
              <p className="body-lg text-[var(--color-graphite)] leading-[1.7]">
                {c.subtitle}
              </p>
            </div>
          </div>
        </ScrollReveal>

        {/* Image + Pull Quote — premium asymmetric layout */}
        <ScrollReveal>
          <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start mb-20 lg:mb-32">
            <div className="lg:col-span-7">
              <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-[16/9]">
                <Image
                  src="/images/tamma_real/larbaa_transformer.png"
                  alt="SARL TAMMA — Poste 400/220kV Larbaa"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="mt-5 flex items-center gap-4">
                <span className="text-[10px] font-mono font-semibold tracking-[0.15em] text-[var(--color-accent)] uppercase">
                  Réf. {c.refLocation}
                </span>
                <div className="h-[1px] flex-1 bg-[rgba(10,12,13,0.08)]" />
              </div>
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <div className="space-y-6 lg:pt-8">
                <span className="block text-6xl text-[var(--color-accent)] leading-none font-display opacity-60">"</span>
                <p className="text-xl lg:text-2xl text-[var(--color-ink)] leading-[1.4] font-display font-medium tracking-[-0.02em] -mt-4">
                  {c.pullQuote}
                </p>
                <footer className="pt-5">
                  <p className="text-[10px] font-bold tracking-[0.2em] text-[var(--color-mist)] uppercase">
                    {c.attribution}
                  </p>
                </footer>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Pillars */}
        <ScrollReveal>
          <div className="mb-8 lg:mb-12">
            <div className="grid lg:grid-cols-12 gap-6 mb-10 lg:mb-14">
              <div className="lg:col-span-7">
                <h3 className="display-md text-[var(--color-ink)] max-w-2xl">
                  {c.pillarsTitle}
                </h3>
              </div>
              <div className="lg:col-span-4 lg:col-start-9 flex items-end">
                <p className="body text-[var(--color-graphite)]">
                  {c.pillarsSubtitle}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
              {pillars.map((pillar) => {
                const isOpen = expandedPillar === pillar.num;
                return (
                  <div
                    key={pillar.num}
                    className={`card p-6 lg:p-8 space-y-4 group relative overflow-hidden transition-colors duration-300 ${
                    isOpen ? 'bg-[var(--color-accent-tint)] border border-[var(--color-accent)]/20' : 'hover:bg-[var(--color-cream)]/50'
                  }`}>
                    {/* Background tint on hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                    <div className="flex items-center gap-3 relative z-10">
                      <span className="text-[11px] font-mono font-semibold text-[var(--color-accent)] tracking-wider">
                        Art. {pillar.num}
                      </span>
                      <div className="flex-1 h-[1px] bg-[rgba(10,12,13,0.06)]" />
                    </div>

                    <div className="relative z-10 space-y-3">
                      <h4 className="text-base lg:text-lg font-semibold text-[var(--color-ink)] tracking-[-0.02em] leading-[1.2] font-display">
                        {pillar.title}
                      </h4>
                      <p className="text-sm text-[var(--color-graphite)] leading-[1.6]">
                        {pillar.desc}
                      </p>
                    </div>

                    {/* Expanded content — spring physics */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{
                            height: { type: 'spring', stiffness: 220, damping: 24, mass: 0.7 },
                            opacity: { duration: 0.25, ease: [0.22, 1, 0.36, 1] },
                          }}
                          className="overflow-hidden relative z-10"
                        >
                          <div className="pt-4 border-t border-[var(--color-accent)]/15">
                            <p className="text-xs text-[var(--color-graphite)] leading-[1.7]">
                              {pillar.extra}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Toggle button */}
                    <button
                      type="button"
                      onClick={() => togglePillar(pillar.num)}
                      className="relative z-10 flex items-center gap-2 text-[10px] font-bold tracking-[0.14em] uppercase text-[var(--color-accent)] cursor-pointer group/btn pt-1 active:scale-95 transition-transform"
                    >
                      <span className="transition-transform duration-300 group-hover/btn:translate-x-0.5">
                        {isOpen
                          ? (language === 'ar' ? '收起' : language === 'en' ? 'Show less' : 'Afficher moins')
                          : (c.pillarLink || (language === 'en' ? 'Learn more' : 'En savoir plus'))}
                      </span>
                      <motion.span
                        animate={{ rotate: isOpen ? 90 : 0 }}
                        transition={{ type: 'spring', stiffness: 320, damping: 18 }}
                        className="inline-block origin-center"
                      >→</motion.span>
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </ScrollReveal>

        {/* HR Inventory Block — editorial composition */}
        <ScrollReveal>
          <div className="mb-8 lg:mb-12">

            {/* Header */}
            <div className="grid lg:grid-cols-12 gap-6 mb-12">
              <div className="lg:col-span-7">
                <div className="section-label">
                  <span className="num">02</span>
                  <span className="name">{language === 'ar' ? 'الموارد البشرية' : language === 'en' ? 'Human Resources' : 'Ressources Humaines'}</span>
                </div>
                <div className="eyebrow mt-2">{c.hrEyebrow}</div>
                <h3 className="display-md text-[var(--color-ink)] max-w-2xl mt-4">{c.hrTitle}</h3>
              </div>
              <div className="lg:col-span-4 lg:col-start-9 flex items-end">
                <p className="body text-[var(--color-graphite)] leading-[1.7]">{c.hrSubtitle}</p>
              </div>
            </div>

            {/* Headline number — the 137 story */}
            <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 mb-12 lg:mb-16">
              <div className="lg:col-span-5">
                <div className="flex items-baseline gap-4">
                  <span className="text-7xl lg:text-8xl font-display font-medium text-[var(--color-ink)] leading-none tracking-[-0.04em]">
                    <CountUp end={137} duration={2.2} />
                  </span>
                  <span className="text-base text-[var(--color-mist)] leading-[1.3] max-w-[140px]">
                    {c.hrTotalLabel}
                  </span>
                </div>
                <div className="mt-4 h-px bg-[var(--color-accent)] w-16" />
                <p className="mt-4 text-sm text-[var(--color-graphite)] leading-[1.7] max-w-sm">
                  {language === 'ar'
                    ? 'تأهيل الفئة السابعة · إشراف مباشر · ملكية خاصة بنسبة 100%'
                    : language === 'en'
                      ? 'Category VII qualification · direct supervision · 100% privately held'
                      : "Qualification Catégorie VII · encadrement direct · 100 % capital privé"}
                </p>
              </div>

              <div className="lg:col-span-6 lg:col-start-7 flex items-end">
                <p className="text-2xl lg:text-3xl font-display font-medium text-[var(--color-ink)] leading-[1.3] tracking-[-0.02em]">
                  {language === 'ar'
                    ? 'فريق واحد، أربع كفاءات، التزام واحد: التميز في كل مشروع.'
                    : language === 'en'
                      ? 'One team, four competencies, one commitment: excellence in every project.'
                      : "Une équipe, quatre compétences, un engagement : l'excellence sur chaque chantier."}
                </p>
              </div>
            </div>

            {/* 4 Family Cards — minimalist editorial style with animated bars */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-[rgba(10,12,13,0.08)] mb-10 lg:mb-14">
              {c.hrFamilies.map((fam) => {
                const pctNum = parseInt(fam.pct);
                return (
                  <div key={fam.letter} className="bg-[var(--color-paper)] p-6 lg:p-8 group cursor-default relative overflow-hidden hover:bg-white transition-colors duration-500">
                    <div className="absolute top-0 left-0 right-0 h-px bg-[var(--color-accent)] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                    <div className="flex items-baseline justify-between mb-4">
                      <span className="text-[10px] font-mono font-bold text-[var(--color-mist)] tracking-widest">
                        {fam.letter}
                      </span>
                    </div>

                    <h4 className="text-sm font-semibold text-[var(--color-ink)] tracking-[-0.01em] mb-3 leading-[1.3] min-h-[2.6em]">
                      {fam.name}
                    </h4>

                    <div className="text-4xl font-display font-medium text-[var(--color-ink)] leading-none tracking-[-0.03em] mb-5">
                      <CountUp end={fam.head} duration={1.6} />
                    </div>

                    <AnimatedBar targetPct={pctNum} />

                    <p className="text-[11px] text-[var(--color-graphite)] leading-[1.5] mt-4">
                      {fam.spec}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Reference footnote */}
            <div className="pt-4 border-t border-[rgba(10,12,13,0.08)] flex items-center justify-between">
              <span className="text-[10px] font-mono text-[var(--color-mist)] tracking-[0.14em] uppercase">{c.hrRef}</span>
              <span className="text-[10px] font-mono text-[var(--color-mist)] tracking-widest">2024</span>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
