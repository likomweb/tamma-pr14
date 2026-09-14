'use client';

import React from 'react';
import { useLanguage } from './LanguageContext';
import ScrollReveal from './ScrollReveal';
import { ShieldCheck, Leaf, HeartPulse } from 'lucide-react';

export default function QHSE() {
  const { language } = useLanguage();

  const content = {
    fr: {
      tag: "Politique QHSE",
      title: "Trois certifications.<br/>Un engagement formel.",
      subtitle: "TAMMA vise à devenir un partenaire idéal et de référence dans le management de projets en Algérie — dans l'étude, la réalisation et le développement de structures énergétiques, génie civil, travaux publics et hydraulique.",
      pillars: [
        {
          num: "ISO 9001:2015",
          icon: ShieldCheck,
          title: "Management de la Qualité",
          desc: "Notre gestion de projet est méticuleusement structurée, garantissant la livraison d'un produit de qualité.",
          footer: "Conformité Réglementaire · Audits Annuels",
          scope: "Étude, conception et réalisation de projets EPC — Postes THT/HT, lignes aériennes et souterraines, gazoducs, génie civil industriel, fibre optique et maintenance.",
        },
        {
          num: "ISO 14001:2015",
          icon: Leaf,
          title: "Management Environnemental",
          desc: "Minimiser les risques de contamination, notamment les déversements d'hydrocarbures et les rejets d'eau dans le milieu naturel, et prévenir les nuisances et contaminations.",
          footer: "Protection des Écosystèmes Sahariens",
          scope: "Prévention des déversements d'hydrocarbures, gestion des déchets de chantier en zone saharienne, protection de la nappe phréatique et des écosystèmes steppiques.",
        },
        {
          num: "ISO 45001:2018",
          icon: HeartPulse,
          title: "Santé & Sécurité au Travail",
          desc: "Réduire ou éliminer les atteintes à la santé de nos employés. Mettre à disposition les ressources nécessaires à l'amélioration continue de notre système intégré.",
          footer: "Politique Zéro Incident",
          scope: "Travaux en hauteur sur pylônes THT, manipulation de transformateurs de puissance, opérations de levage lourd, chantier en zone désertique isolée, habilitations électriques H0V/B2V/BR.",
        }
      ],
      kpis: [
        { num: "0", unit: "incident", label: "Objectif Zéro Accident" },
        { num: "100", unit: "%", label: "Personnel Habilité Électrique" },
        { num: "12", unit: "/an", label: "Audits Internes Programmés" },
      ],
      quote: "Conformité, prévention et amélioration continue : notre engagement QHSE.",
      attribution: "La Direction Générale · SARL TAMMA"
    },
    en: {
      tag: "QHSE Policy",
      title: "Three certifications.<br/>A formal commitment.",
      subtitle: "TAMMA aims to become an ideal and reference partner in project management in Algeria — in the study, realization, and development of energy structures, civil engineering, public works, and hydraulics.",
      pillars: [
        {
          num: "ISO 9001:2015",
          icon: ShieldCheck,
          title: "Quality Management",
          desc: "Our project management is meticulously structured, ensuring the delivery of a quality product.",
          footer: "Regulatory Compliance · Annual Audits",
          scope: "Study, design and realization of EPC projects — HV/MV substations, overhead and underground lines, gas pipelines, industrial civil works, fiber optic and maintenance.",
        },
        {
          num: "ISO 14001:2015",
          icon: Leaf,
          title: "Environmental Management",
          desc: "Minimize contamination risks, particularly hydrocarbon spills and water discharges into the natural environment, and prevent nuisances and contamination.",
          footer: "Saharan Ecosystem Protection",
          scope: "Hydrocarbon spill prevention, construction waste management in Saharan zones, aquifer and steppe ecosystem protection.",
        },
        {
          num: "ISO 45001:2018",
          icon: HeartPulse,
          title: "Occupational Health & Safety",
          desc: "Reduce or eliminate harm to the health of our employees. Provide the necessary resources for the continuous improvement of our integrated system.",
          footer: "Zero Incident Policy",
          scope: "Working at height on HV pylons, power transformer handling, heavy lifting operations, isolated desert site work, electrical authorizations H0V/B2V/BR.",
        }
      ],
      kpis: [
        { num: "0", unit: "incident", label: "Zero Accident Target" },
        { num: "100", unit: "%", label: "Electrically Authorized Staff" },
        { num: "12", unit: "/yr", label: "Internal Audits Planned" },
      ],
      quote: "Compliance, prevention, and continuous improvement: our QHSE commitment.",
      attribution: "General Management · SARL TAMMA"
    },
    ar: {
      tag: "سياسة QHSE",
      title: "ثلاث شهادات.<br/>التزام رسمي.",
      subtitle: "تطمح تامة إلى أن تصبح شريكاً مثالياً ومرجعياً في إدارة المشاريع في الجزائر.",
      pillars: [
        { num: "ISO 9001:2015", icon: ShieldCheck, title: "إدارة الجودة", desc: "إدارة مشاريع منظمة بدقة.", footer: "الامتثال التنظيمي", scope: "دراسة وتصميم وتنفيذ مشاريع EPC." },
        { num: "ISO 14001:2015", icon: Leaf, title: "الإدارة البيئية", desc: "تقليل مخاطر التلوث.", footer: "حماية النظم البيئية", scope: "منع الانسكابات، إدارة النفايات." },
        { num: "ISO 45001:2018", icon: HeartPulse, title: "الصحة والسلامة", desc: "تقليل الأضرار بصحة الموظفين.", footer: "سياسة عدم الحوادث", scope: "العمل على ارتفاعات، الرفع الثقيل." },
      ],
      kpis: [
        { num: "0", unit: "حادثة", label: "هدف صفر حادث" },
        { num: "100", unit: "٪", label: "موظفون مرخصون" },
        { num: "12", unit: "/سنة", label: "عمليات تدقيق" },
      ],
      quote: "الامتثال والوقاية والتحسين المستمر: التزامنا بنظام QHSE.",
      attribution: "الإدارة العامة · سارل تامة"
    }
  };

  const c = content[language] || content.fr;

  return (
    <section id="qhse" className="bg-[var(--color-midnight)] text-white relative section-pad">
      {/* Section transition — fade from dark QHSE into light Contact section */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-b from-transparent to-[var(--color-paper)] pointer-events-none" />
      <div className="container-editorial relative z-10">

        <ScrollReveal>
          <div className="grid lg:grid-cols-12 gap-8 mb-8 lg:mb-10">
            <div className="lg:col-span-5 space-y-5">
              <div className="section-label on-dark">
                <span className="num">07</span>
                <span className="name">{language === 'ar' ? 'QHSE' : language === 'en' ? 'QHSE' : 'Politique QHSE'}</span>
              </div>
              <div className="eyebrow on-dark">{c.tag}</div>
              <h2 className="display-lg text-white" dangerouslySetInnerHTML={{ __html: c.title }} />
            </div>
            <div className="lg:col-span-5 lg:col-start-8 flex items-end">
              <p className="body-lg" style={{ color: 'rgba(255,255,255,0.35)' }}>{c.subtitle}</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Operational proof */}
        <div className="mb-8 lg:mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="h-px w-8 bg-[var(--color-rust)]" />
            <span className="text-[11px] font-medium text-white/50">
              {language === 'fr' ? 'Preuves opérationnelles' : language === 'en' ? 'Operational proof' : 'الأداء التشغيلي'}
            </span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:gap-4 items-stretch">
            {c.kpis.map((kpi, idx) => (
              <div
                key={kpi.num}
                className={`min-h-[112px] p-5 sm:p-6 lg:p-7 rounded-[20px] border flex items-center gap-5 transition-colors ${
                  idx === 0
                    ? 'bg-[#1b1b1e]/90 border-white/[0.1] hover:bg-[#202024]'
                    : idx === 1
                      ? 'bg-[#1b201e]/90 border-emerald-100/[0.1] hover:bg-[#202622]'
                      : 'bg-[#201c1c]/90 border-orange-100/[0.1] hover:bg-[#262020]'
                }`}
              >
                <div className="flex shrink-0 items-baseline gap-1.5">
                  <span className="text-4xl sm:text-5xl font-display font-semibold text-white tracking-[-0.04em] leading-none">
                    {kpi.num}
                  </span>
                  <span className="text-sm text-[var(--color-rust)]">{kpi.unit}</span>
                </div>
                <p className="text-sm font-medium text-white/70 leading-[1.4]">
                  {kpi.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Certification Pillars — corporate assurance */}
        <div className="mb-8 lg:mb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 auto-rows-fr gap-4 lg:gap-5 items-stretch">
          {c.pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <ScrollReveal
                key={pillar.num}
                delay={idx * 0.08}
                className={`flex self-stretch ${
                  idx === 2 ? 'md:col-span-2 md:max-w-[calc(50%-0.5rem)] md:mx-auto xl:col-span-1 xl:max-w-none xl:mx-0' : ''
                }`}
              >
                <article className={`group h-full min-h-[430px] rounded-[20px] border p-7 sm:p-8 lg:p-9 flex flex-col transition-all duration-500 hover:-translate-y-1 hover:border-white/[0.2] ${
                  idx === 0
                    ? 'bg-[#1b1b1e]/90 border-white/[0.1] hover:bg-[#202024]'
                    : idx === 1
                      ? 'bg-[#1b201e]/90 border-emerald-100/[0.1] hover:bg-[#202622]'
                      : 'bg-[#201c1c]/90 border-orange-100/[0.1] hover:bg-[#262020]'
                }`}>
                  <div className="flex items-start justify-between gap-4">
                    <p className="text-sm font-medium text-white/75 tracking-[0.03em]">
                      {pillar.num}
                    </p>
                    <Icon className="w-5 h-5 text-white/45 transition-colors group-hover:text-[var(--color-rust)]" />
                  </div>

                  <div className="mt-10">
                    <h3 className="text-2xl lg:text-[2rem] font-semibold text-white font-display tracking-[-0.025em] leading-[1.1]">
                      {pillar.title}
                    </h3>
                    <span className="mt-5 block h-px w-8 bg-[var(--color-rust)]" />
                  </div>

                  <p className="mt-7 min-h-[105px] text-[15px] text-white/70 leading-[1.75]">
                    {pillar.desc}
                  </p>

                  <div className="mt-auto pt-6 border-t border-white/[0.12]">
                    <span className="block text-[11px] font-medium text-white/50 mb-3">
                      {language === 'fr' ? 'Périmètre de certification' : language === 'en' ? 'Certification scope' : 'نطاق الشهادة'}
                    </span>
                    <p className="text-xs text-white/60 leading-[1.7]">
                      {pillar.scope}
                    </p>
                  </div>
                </article>
              </ScrollReveal>
            );
          })}
        </div>
        </div>

        <ScrollReveal>
          <div className="card-dark p-8 lg:p-12">
            <div className="flex items-start gap-6">
              <span className="text-6xl lg:text-7xl text-[var(--color-rust)] font-display leading-none shrink-0">"</span>
              <div className="flex-1 space-y-6">
                <p className="text-base lg:text-xl text-white leading-[1.6] font-display font-medium tracking-[-0.015em]">
                  {c.quote}
                </p>
                <div className="pt-4 border-t border-white/[0.08]">
                  <p className="text-[10px] font-bold tracking-[0.2em] text-white/70 uppercase">
                    — {c.attribution}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>

      </div>
    </section>
  );
}
