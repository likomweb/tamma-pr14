'use client';

import React, { useState } from 'react';
import { useLanguage } from './LanguageContext';
import ScrollReveal from './ScrollReveal';
import { Compass, PackageCheck, Construction, Activity, Wrench } from 'lucide-react';

export default function EPCValueChain() {
  const { language } = useLanguage();
  const [activeStep, setActiveStep] = useState<number>(0);

  const content = {
    fr: {
      tag: "Approche Intégrée Clé en Main",
      title: "Notre Chaîne de Valeur<br/>EPC + Maintenance.",
      subtitle: "De l'ingénierie préliminaire à la maintenance post-démarrage, SARL TAMMA assure l'intégralité du cycle de vie des projets énergétiques.",
      steps: [
        { step: '01', code: 'ENGINEERING', title: 'Études & Ingénierie de Détail', desc: 'Conception technique avancée et ingénierie rigoureuse pour les infrastructures critiques d\'énergie et d\'hydrocarbures.', items: ['Études de faisabilité & calculs de massifs / structures', 'Ingénierie de détail pour postes THT/HT/MT (400/220/60kV)', 'Plans d\'exécution de pose de gazoducs 28" et plateformes', 'Assistance technique & validation Sonelgaz / Sonatrach'] },
        { step: '02', code: 'PROCUREMENT', title: 'Approvisionnement & Logistique', desc: 'Sourcing et acheminement sécurisé des équipements lourds et fournitures industrielles certifiées.', items: ['Approvisionnement en béton certifié via 02 centrales fixes (120 m³/h)', 'Fourniture d\'équipements haute tension et isolateurs THT', 'Gestion de la chaîne logistique lourde sur sites désertiques', 'Flotte de transport porte-engins 60T et camions tactiques 6×6'] },
        { step: '03', code: 'CONSTRUCTION', title: 'Construction, Génie Civil & Montage', desc: 'Exécution clé en main des chantiers industriels avec une flotte d\'engins lourds et des équipes certifiées.', items: ['Génie civil lourd, fondations spéciales et massifs de transformateurs', 'Pose et soudage de gazoducs haute pression 28" (34 km Adrar)', 'Montage et levage de pylônes THT et charpentes métalliques (Grues 80T)', 'Ouverture de pistes d\'accès sahariennes et plateformes VRD'] },
        { step: '04', code: 'COMMISSIONING', title: 'Pré-commissioning & Mise en Service', desc: 'Validation des performances électriques, régénération diélectrique et mise sous tension sous protocoles stricts.', items: ['Essais diélectriques Hipot, micro-ohmmètre et injection', 'Régénération et déshydratation d\'huile transformateur (12 000 L/h)', 'Mise en service de postes blindés GIS (400/220/60 kV)', 'Mise sous tension certifiée et dossiers DOE'] },
        { step: '05', code: 'MAINTENANCE', title: 'Maintenance Industrielle', desc: 'Maintien de la performance des actifs énergétiques, réhabilitation des installations et arrêts programmés.', items: ['Maintenance préventive & corrective des sous-stations', 'Arrêts d\'unités programmés (Shutdowns) sur sites Sonatrach', 'Modernisation et réhabilitation des réseaux de transport', 'Maintenance mécanique des centrales et groupes turbo-alternateurs'] },
      ]
    },
    en: {
      tag: "Integrated Turnkey Approach",
      title: "Our EPC + Maintenance<br/>Value Chain.",
      subtitle: "From preliminary engineering to post-commissioning maintenance, SARL TAMMA covers the full life cycle of energy projects.",
      steps: [
        { step: '01', code: 'ENGINEERING', title: 'Studies & Detail Engineering', desc: 'Advanced technical design and rigorous engineering for critical energy and hydrocarbon infrastructure.', items: ['Feasibility studies & structural foundation calculations', 'Detail engineering for THT/HT/MT substations (400/220/60kV)', 'Execution plans for 28" gas pipeline and platform laying', 'Technical assistance & Sonelgaz / Sonatrach validation'] },
        { step: '02', code: 'PROCUREMENT', title: 'Procurement & Logistics', desc: 'Secure sourcing and delivery of heavy equipment and certified industrial supplies.', items: ['Certified concrete supply via 02 fixed plants (120 m³/h)', 'Supply of HV equipment and THT insulators', 'Heavy logistics chain management on isolated desert sites', '60T equipment carrier fleet and 6×6 tactical trucks'] },
        { step: '03', code: 'CONSTRUCTION', title: 'Construction, Civil Engineering & Assembly', desc: 'Turnkey execution of industrial sites with a heavy equipment fleet and certified teams.', items: ['Heavy civil works, special foundations & transformer blocks', '28" HP gas pipeline laying and welding (34 km Adrar)', 'THT pylon assembly and lifting, steel structures (80T cranes)', 'Saharan access track opening and petroleum VRD platforms'] },
        { step: '04', code: 'COMMISSIONING', title: 'Pre-Commissioning & Energization', desc: 'Electrical performance validation, dielectric regeneration and energization under strict protocols.', items: ['Hipot dielectric testing, micro-ohmmeter and injection', 'Transformer oil regeneration and dehydration (12,000 L/h)', 'GIS substation commissioning (400/220/60 kV)', 'Certified energization and DOE file handover'] },
        { step: '05', code: 'MAINTENANCE', title: 'Industrial Maintenance', desc: 'Maintaining energy asset performance, installation rehabilitation and scheduled shutdowns.', items: ['Preventive & corrective substation maintenance', 'Scheduled unit shutdowns on Sonatrach sites', 'Transmission network modernization and rehabilitation', 'Mechanical maintenance of power plants and turbo-generators'] },
      ]
    },
    ar: {
      tag: "النهج المتكامل",
      title: "سلسلة القيمة EPC<br/>+ الصيانة.",
      subtitle: "من الهندسة إلى الصيانة، نغطي دورة حياة المشاريع.",
      steps: [
        { step: '01', code: 'الهندسة', title: 'الدراسات والهندسة', desc: 'تصميم تقني متقدم.', items: ['دراسات جدوى', 'هندسة تفصيلية لمحطات THT', 'مخططات تنفيذ', 'مساعدة تقنية'] },
        { step: '02', code: 'التوريد', title: 'التوريد والوجستيات', desc: 'توريد آمن.', items: ['توريد خرسانة', 'معدات HV', 'لوجستيات ثقيلة', 'ناقلات 60T'] },
        { step: '03', code: 'البناء', title: 'البناء والتجميع', desc: 'تنفيذ تسليم مفتاح.', items: ['هندسة مدنية ثقيلة', 'وضع أنابيب 28"', 'تجميع أبراج', 'مسارات صحراوية'] },
        { step: '04', code: 'التشغيل', title: 'التشغيل التجريبي', desc: 'تحقق كهربائي.', items: ['اختبارات Hipot', 'تجديد زيت', 'تشغيل GIS', 'تسليم DOE'] },
        { step: '05', code: 'الصيانة', title: 'الصيانة', desc: 'الحفاظ على الأداء.', items: ['صيانة وقائية', 'توقفات مبرمجة', 'تحديث شبكات', 'صيانة ميكانيكية'] },
      ]
    }
  };

  const t = content[language] || content.fr;
  const current = t.steps[activeStep];
  const icons = [Compass, PackageCheck, Construction, Activity, Wrench];
  const phaseCodes = ['ENG', 'PRO', 'CON', 'COM', 'MNT'];

  return (
    <section id="epc" className="bg-[var(--color-paper)] paper-texture section-pad">
      <div className="container-editorial">

        <ScrollReveal>
          <div className="grid lg:grid-cols-12 gap-8 mb-8 lg:mb-10">
            <div className="lg:col-span-7 space-y-5">
              <div className="section-label">
                <span className="num">03</span>
                <span className="name">{language === 'ar' ? 'سلسلة القيمة' : language === 'en' ? 'Value Chain' : 'Chaîne de Valeur'}</span>
              </div>
              <div className="eyebrow">{t.tag}</div>
              <h2 className="display-lg text-[var(--color-ink)]" dangerouslySetInnerHTML={{ __html: t.title }} />
            </div>
            <div className="lg:col-span-4 lg:col-start-9 flex items-end">
              <p className="body-lg text-[var(--color-graphite)]">{t.subtitle}</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Step Tabs — premium pill nav */}
        <div className="flex flex-nowrap gap-1 sm:gap-2 mb-8 w-full overflow-x-auto">
          {t.steps.map((s, idx) => {
            const Icon = icons[idx];
            const isActive = activeStep === idx;
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveStep(idx)}
                className={`group flex shrink-0 items-center gap-2 sm:gap-3 px-3 sm:px-5 py-3 rounded-full text-sm font-medium transition-all duration-300 ${
                  isActive
                    ? 'bg-[var(--color-ink)] text-white shadow-md'
                    : 'bg-white text-[var(--color-graphite)] hover:text-[var(--color-ink)] shadow-sm hover:shadow-md'
                }`}
              >
                <span className={`text-[10px] font-mono font-bold tracking-wider ${isActive ? 'text-[var(--color-rust)]' : 'text-[var(--color-accent)]'}`}>
                  {phaseCodes[idx]}
                </span>
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[var(--color-rust)]' : 'text-[var(--color-accent)]'}`} />
                <span className="hidden sm:inline">{s.title.split(' & ')[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Active Step — premium card */}
        <div className="card editorial-interactive p-8 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            <div className="lg:col-span-4 space-y-5">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono font-bold text-[var(--color-accent)] tracking-[0.18em] uppercase">
                  Phase {current.step} · {phaseCodes[activeStep]}
                </span>
                <div className="flex-1 h-[1px] bg-[rgba(10,12,13,0.06)]" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-semibold text-[var(--color-ink)] font-display tracking-tight leading-[1.1]">
                {current.title}
              </h3>
              <p className="text-base text-[var(--color-graphite)] leading-[1.7]">
                {current.desc}
              </p>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <div className="space-y-1">
                {current.items.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-4 py-4 border-b border-[rgba(10,12,13,0.05)] last:border-b-0">
                    <span className="font-mono text-[10px] font-bold text-[var(--color-accent)] tracking-wider mt-0.5 shrink-0 w-6">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="text-sm text-[var(--color-charcoal)] leading-[1.65] flex-1">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
