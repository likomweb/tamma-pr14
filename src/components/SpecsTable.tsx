'use client';

import React from 'react';
import { useLanguage } from './LanguageContext';
import ScrollReveal from './ScrollReveal';
import { ArrowUpRight, Cog, Construction, Truck, Cable, Zap, Home } from 'lucide-react';

export default function SpecsTable() {
  const { language } = useLanguage();

  const content = {
    fr: {
      tag: 'Moyens Matériels',
      title: 'Notre parc.<br/>Notre autonomie.',
      subtitle: 'Une flotte en pleine propriété qui garantit réactivité et indépendance sur tous les sites — y compris en zone saharienne isolée.',
      capabilitiesHead: 'Capacités opérationnelles',
      capabilities: [
        { value: '140+', unit: 'engins', label: 'Parc matériel roulant' },
        { value: '275', unit: 'm³/h', label: 'Production béton' },
        { value: '80', unit: 'T', label: 'Levage maximal' },
        { value: '34', unit: 'km', label: 'Pipeline 28" posé · Adrar' },
        { value: '12 000', unit: 'L/h', label: 'Régén. huile diélectrique' },
        { value: '480', unit: 'km', label: 'Fibre optique déployée' },
      ],
      domains: [
        {
          icon: Cog, num: '01', title: 'Production de Béton', total: '17 unités',
          items: [
            { qty: '02', label: 'Centrales à béton fixes', spec: '120 m³/h chacune' },
            { qty: '01', label: 'Centrale mobile', spec: '35 m³/h' },
            { qty: '14', label: 'Toupies béton', spec: '9 m³ · malaxage continu' },
            { qty: '04', label: 'Pompes à béton', spec: 'Pression HP · Ø 125 mm' },
            { qty: '04', label: 'Auto-chargeuses Fiori', spec: 'Production in-situ' },
          ],
          benefit: 'Coulage continu pour massifs THT 400 kV et plateformes industrielles sans dépendance externe.',
        },
        {
          icon: Construction, num: '02', title: 'Levage & Manutention Lourde', total: '18 unités',
          items: [
            { qty: '04', label: 'Grues 4×4 tout-terrain', spec: 'Capacité jusqu\'à 80 T' },
            { qty: '05', label: 'Grues mobiles', spec: 'Flèche télescopique · 30-80 T' },
            { qty: '03', label: 'Camions bras de grue', spec: 'Assistance levage' },
            { qty: '02', label: 'Chariots télescopiques', spec: 'Manutention chantier' },
            { qty: '04', label: 'Mâts de levage', spec: 'Travées THT · 18 m' },
          ],
          benefit: 'Montage de transformateurs de puissance, pylônes très haute tension et charpentes métalliques.',
        },
        {
          icon: Truck, num: '03', title: 'Terrassement & VRD', total: '58+ engins',
          items: [
            { qty: '09', label: 'Bulldozers', spec: 'Lame · ripper · D6/D7' },
            { qty: '12', label: 'Pelles sur chenilles', spec: 'Godet · BRH · 20-30 T' },
            { qty: '04', label: 'Poseurs P161', spec: 'Conduites 28" / 40"' },
            { qty: '21', label: 'Camions bennes', spec: '20 T · 6×6' },
            { qty: '12', label: 'Camions 6×6', spec: '15 T · saharien' },
          ],
          benefit: 'Ouverture de pistes sahariennes, fouilles profondes, pose de gazoducs haute pression 28".',
        },
        {
          icon: Cable, num: '04', title: 'Lignes HT & Fibres Optiques', total: '14 équipements',
          items: [
            { qty: '02', label: 'Freineuses', spec: '5 T · déroulage contrôlé' },
            { qty: '02', label: 'Treuils hydrauliques', spec: '9 T · tirage' },
            { qty: '06', label: 'Outillage aérien', spec: 'Pylônes · nacelles' },
            { qty: '04', label: 'Dérouleuses chantier', spec: 'Câbles THT/HT/MT' },
          ],
          benefit: 'Déroulage câbles et pose de fibres optiques sur 480 km cumulés (Djanet, Illizi).',
        },
        {
          icon: Zap, num: '05', title: 'Essais & Traitement Électrique', total: '1 unité + 5 bancs',
          items: [
            { qty: '01', label: 'Machine régénération huile', spec: '12 000 L/h · diélectrique' },
            { qty: '—', label: 'Valises d\'injection', spec: 'Mise sous vide' },
            { qty: '—', label: 'Hipot', spec: 'Essais diélectriques' },
            { qty: '—', label: 'Micro-ohmmètre', spec: 'Contacts · 100 A' },
            { qty: '—', label: 'Spectromètre', spec: 'Analyse huile' },
            { qty: '—', label: 'Banc décharge batteries', spec: '480 V · 200 A' },
          ],
          benefit: 'Pré-commissioning complet, régénération diélectrique et mise en service certifiée.',
        },
        {
          icon: Home, num: '06', title: 'Bases de Vie & Transport', total: '36+ modules',
          items: [
            { qty: '11', label: 'Cabines sanitaires', spec: '12 m · autonomes' },
            { qty: '05', label: 'Bureaux de chantier', spec: '6 m · climatisés' },
            { qty: '15', label: 'Véhicules tactiques 4×4', spec: 'Désert · équipés' },
            { qty: '—', label: 'Porte-engins', spec: '60 T · 2 essieux' },
          ],
          benefit: 'Autonomie totale sur chantiers isolés en milieu désertique extrême.',
        },
      ],
    },
    en: {
      tag: 'Equipment Fleet',
      title: 'Our fleet.<br/>Our autonomy.',
      subtitle: 'A fully-owned equipment fleet guaranteeing reactivity and independence on every site — including isolated Saharan zones.',
      capabilitiesHead: 'Operational capabilities',
      capabilities: [
        { value: '140+', unit: 'units', label: 'Rolling equipment fleet' },
        { value: '275', unit: 'm³/h', label: 'Concrete production' },
        { value: '80', unit: 'T', label: 'Maximum lift capacity' },
        { value: '34', unit: 'km', label: '28" pipeline laid · Adrar' },
        { value: '12,000', unit: 'L/h', label: 'Dielectric oil regeneration' },
        { value: '480', unit: 'km', label: 'Fiber optic deployed' },
      ],
      domains: [
        {
          icon: Cog, num: '01', title: 'Concrete Production', total: '17 units',
          items: [
            { qty: '02', label: 'Fixed concrete plants', spec: '120 m³/h each' },
            { qty: '01', label: 'Mobile plant', spec: '35 m³/h' },
            { qty: '14', label: 'Mixer trucks', spec: '9 m³ · continuous mixing' },
            { qty: '04', label: 'Concrete pumps', spec: 'HP · Ø 125 mm' },
            { qty: '04', label: 'Fiori self-loaders', spec: 'On-site production' },
          ],
          benefit: 'Continuous pouring for 400 kV THT foundations and industrial platforms without external dependency.',
        },
        {
          icon: Construction, num: '02', title: 'Heavy Lifting & Handling', total: '18 units',
          items: [
            { qty: '04', label: '4×4 all-terrain cranes', spec: 'Up to 80 T capacity' },
            { qty: '05', label: 'Mobile cranes', spec: 'Telescopic boom · 30-80 T' },
            { qty: '03', label: 'Crane trucks', spec: 'Lifting assistance' },
            { qty: '02', label: 'Telescopic forklifts', spec: 'Site handling' },
            { qty: '04', label: 'Lifting masts', spec: 'THT bays · 18 m' },
          ],
          benefit: 'Power transformer assembly, extra high voltage pylons and steel structures.',
        },
        {
          icon: Truck, num: '03', title: 'Earthworks & VRD', total: '58+ units',
          items: [
            { qty: '09', label: 'Bulldozers', spec: 'Blade · ripper · D6/D7' },
            { qty: '12', label: 'Crawler excavators', spec: 'Bucket · BRH · 20-30 T' },
            { qty: '04', label: 'P161 pipe-layers', spec: '28" / 40" pipes' },
            { qty: '21', label: 'Dump trucks', spec: '20 T · 6×6' },
            { qty: '12', label: '6×6 trucks', spec: '15 T · saharan' },
          ],
          benefit: 'Saharan track opening, deep excavations, 28" HP gas pipeline laying.',
        },
        {
          icon: Cable, num: '04', title: 'HT Lines & Fiber Optics', total: '14 equipment',
          items: [
            { qty: '02', label: 'Brake-unwinders', spec: '5 T · controlled stringing' },
            { qty: '02', label: 'Hydraulic pullers', spec: '9 T · tensioning' },
            { qty: '06', label: 'Aerial tool sets', spec: 'Pylons · buckets' },
            { qty: '04', label: 'Construction unwinders', spec: 'THT/HT/MT cables' },
          ],
          benefit: 'Cable stringing and fiber optic laying over 480 km total (Djanet, Illizi).',
        },
        {
          icon: Zap, num: '05', title: 'Testing & Electrical Treatment', total: '1 unit + 5 banks',
          items: [
            { qty: '01', label: 'Oil regeneration unit', spec: '12,000 L/h · dielectric' },
            { qty: '—', label: 'Injection kits', spec: 'Vacuum filling' },
            { qty: '—', label: 'Hipot', spec: 'Dielectric testing' },
            { qty: '—', label: 'Micro-ohmmeter', spec: 'Contacts · 100 A' },
            { qty: '—', label: 'Spectrometer', spec: 'Oil analysis' },
            { qty: '—', label: 'Battery discharge bank', spec: '480 V · 200 A' },
          ],
          benefit: 'Complete pre-commissioning, dielectric regeneration and certified energization.',
        },
        {
          icon: Home, num: '06', title: 'Base Camps & Transport', total: '36+ modules',
          items: [
            { qty: '11', label: 'Sanitary cabins', spec: '12 m · autonomous' },
            { qty: '05', label: 'Site offices', spec: '6 m · air-conditioned' },
            { qty: '15', label: 'Tactical 4×4 vehicles', spec: 'Desert · equipped' },
            { qty: '—', label: 'Equipment carriers', spec: '60 T · 2 axles' },
          ],
          benefit: 'Full autonomy on isolated sites in extreme desert environment.',
        },
      ],
    },
    ar: {
      tag: 'الأسطول',
      title: 'أسطولنا.<br/>استقلاليتنا.',
      subtitle: 'أسطول مملوك بالكامل يضمن الاستقلالية والاستجابة في جميع المواقع.',
      capabilitiesHead: 'القدرات التشغيلية',
      capabilities: [
        { value: '+140', unit: 'وحدة', label: 'أسطول المعدات المتحركة' },
        { value: '275', unit: 'م³/س', label: 'إنتاج الخرسانة' },
        { value: '80', unit: 'طن', label: 'السعة القصوى للرفع' },
        { value: '34', unit: 'كم', label: 'أنبوب 28" موضوع · أدرار' },
        { value: '12,000', unit: 'لتر/س', label: 'تجديد الزيت العازل' },
        { value: '480', unit: 'كم', label: 'الألياف الضوئية المنتشرة' },
      ],
      domains: [
        { icon: Cog, num: '01', title: 'إنتاج الخرسانة', total: '17 وحدة', items: [{ qty: '02', label: 'محطات خرسانة ثابتة', spec: '120 م³/س' }], benefit: '' },
        { icon: Construction, num: '02', title: 'الرفع', total: '18 وحدة', items: [], benefit: '' },
        { icon: Truck, num: '03', title: 'الحفر', total: '+58 معدة', items: [], benefit: '' },
        { icon: Cable, num: '04', title: 'خطوط', total: '14 معدة', items: [], benefit: '' },
        { icon: Zap, num: '05', title: 'الاختبارات', total: '1+5', items: [], benefit: '' },
        { icon: Home, num: '06', title: 'قواعد', total: '+36 وحدة', items: [], benefit: '' },
      ],
    },
  };

  const t = content[language] || content.fr;
  const capabilityGroups = {
    fr: [
      { title: 'Construire', label: '01', intro: 'Des moyens réunis pour préparer et bâtir les infrastructures critiques.', indices: [0, 1], tone: 'bg-[#1b1b1e]/90 border-white/[0.1]' },
      { title: 'Connecter', label: '02', intro: 'Des réseaux et équipements pour relier les territoires avec précision.', indices: [2, 3], tone: 'bg-[#1b2022]/90 border-sky-100/[0.1]' },
      { title: 'Soutenir', label: '03', intro: 'Des ressources de test, de transport et de vie pour rester autonome.', indices: [4, 5], tone: 'bg-[#201d1b]/90 border-orange-100/[0.1]' },
    ],
    en: [
      { title: 'Build', label: '01', intro: 'Integrated resources for preparing and building critical infrastructure.', indices: [0, 1], tone: 'bg-[#1b1b1e]/90 border-white/[0.1]' },
      { title: 'Connect', label: '02', intro: 'Networks and equipment that link territories with precision.', indices: [2, 3], tone: 'bg-[#1b2022]/90 border-sky-100/[0.1]' },
      { title: 'Sustain', label: '03', intro: 'Testing, transport, and site resources for operational autonomy.', indices: [4, 5], tone: 'bg-[#201d1b]/90 border-orange-100/[0.1]' },
    ],
    ar: [
      { title: 'البناء', label: '01', intro: 'موارد متكاملة لإعداد وإنجاز البنى التحتية الحيوية.', indices: [0, 1], tone: 'bg-[#1b1b1e]/90 border-white/[0.1]' },
      { title: 'الربط', label: '02', intro: 'شبكات ومعدات لربط المناطق بدقة.', indices: [2, 3], tone: 'bg-[#1b2022]/90 border-sky-100/[0.1]' },
      { title: 'الدعم', label: '03', intro: 'اختبارات ونقل وموارد ميدانية لضمان الاستقلالية التشغيلية.', indices: [4, 5], tone: 'bg-[#201d1b]/90 border-orange-100/[0.1]' },
    ],
  };
  const groups = capabilityGroups[language] || capabilityGroups.fr;
  return (
    <section id="specs" className="bg-[var(--color-midnight)] text-white relative section-pad">
      <div className="container-editorial relative z-10">

        <ScrollReveal>
          <div className="grid lg:grid-cols-12 gap-8 mb-8 lg:mb-10">
            <div className="lg:col-span-7 space-y-5">
              <div className="section-label on-dark">
                <span className="num">06</span>
                <span className="name">{language === 'ar' ? 'المعدات' : language === 'en' ? 'Equipment' : 'Moyens Matériels'}</span>
              </div>
              <div className="eyebrow on-dark">{t.tag}</div>
              <h2 className="display-lg text-white" dangerouslySetInnerHTML={{ __html: t.title }} />
            </div>
            <div className="lg:col-span-4 lg:col-start-9 flex items-end">
              <p className="body-lg" style={{ color: 'rgba(255,255,255,0.35)' }}>{t.subtitle}</p>
            </div>
          </div>
        </ScrollReveal>

        {/* Capabilities summary — premium soft metric tiles */}
        <ScrollReveal>
          <div className="mb-6 lg:mb-8">
            <div className="flex items-center gap-3 mb-6">
              <span className="text-[10px] font-bold tracking-[0.2em] text-white/80 uppercase">{t.capabilitiesHead}</span>
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-[9px] font-mono tracking-widest text-white/40 uppercase">06 capacités</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 lg:gap-4">
              {t.capabilities.map((cap, idx) => (
                <div key={idx} className="p-4 sm:p-5 lg:p-6 rounded-2xl bg-white/[0.04] backdrop-blur-md border border-white/[0.06] hover:bg-white/[0.06] transition-colors">
                  <div className="flex items-baseline gap-1.5 flex-wrap">
                    <span className="text-lg sm:text-xl lg:text-3xl font-display font-medium text-white tracking-[-0.02em] leading-none">{cap.value}</span>
                    <span className="text-[9px] sm:text-[10px] font-mono text-[var(--color-rust)] tracking-wider uppercase">{cap.unit}</span>
                  </div>
                  <p className="text-[9px] sm:text-[10px] text-white/55 leading-[1.5] tracking-wide mt-2 sm:mt-3">{cap.label}</p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>

        {/* Integrated capability groups */}
        <ScrollReveal>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-5">
            {groups.map((group) => (
              <article key={group.label} className={`group min-h-[360px] rounded-2xl border p-6 sm:p-7 lg:p-8 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:border-white/[0.2] ${group.tone}`}>
                <div className="flex items-start justify-between">
                  <span className="text-[10px] font-mono tracking-[0.2em] text-white/40">{group.label}</span>
                  <span className="text-[10px] font-mono tracking-widest text-white/40 uppercase">{language === 'fr' ? 'Système' : language === 'en' ? 'System' : 'النظام'}</span>
                </div>
                <h3 className="mt-12 text-2xl lg:text-3xl font-display font-semibold text-white tracking-[-0.03em]">{group.title}</h3>
                <span className="mt-5 block h-px w-8 bg-[var(--color-rust)]" />
                <p className="mt-6 text-sm text-white/60 leading-[1.65]">{group.intro}</p>
                <div className="mt-auto pt-7 border-t border-white/[0.1] space-y-4">
                  {group.indices.map((index) => {
                    const d = t.domains[index];
                    const Icon = d.icon;
                    return (
                      <div key={d.num} className="flex items-center gap-3">
                        <Icon className="w-4 h-4 shrink-0 text-white/45" />
                        <span className="text-sm text-white/80">{d.title}</span>
                        <span className="ml-auto text-[10px] font-mono text-[var(--color-rust)] tracking-wider">{d.total}</span>
                      </div>
                    );
                  })}
                </div>
              </article>
            ))}
          </div>
        </ScrollReveal>

        {/* CTA */}
        <div className="mt-8 lg:mt-10 card-dark p-6 sm:p-8 lg:p-10 flex flex-col sm:flex-row items-center justify-between gap-6 text-center sm:text-left">
          <div>
            <h3 className="text-lg lg:text-xl font-semibold text-white font-display">
              {language === 'fr' ? 'Disponibilité immédiate sur les pôles énergétiques' : language === 'en' ? 'Immediate availability on energy hubs' : 'التوفر الفوري على المراكز الطاقوية'}
            </h3>
            <p className="text-sm text-white/55 mt-1">
              {language === 'fr'
                ? 'Bases opérationnelles à Hassi Messaoud, Alger (Hydra) et El-Oued avec chaîne logistique intégrée.'
                : language === 'en'
                ? 'Operational bases in Hassi Messaoud, Algiers (Hydra) and El-Oued with integrated logistics chain.'
                : 'قواعد تشغيلية في حاسي مسعود والجزائر (حيدرة) والوادي.'}
            </p>
          </div>
          <a href="#contact-form" className="inline-flex items-center gap-2 px-6 py-3 bg-[var(--color-rust)] hover:bg-[var(--color-accent)] text-white text-xs font-bold uppercase tracking-wider rounded-md transition-colors shrink-0 w-full sm:w-auto justify-center">
            <span>{language === 'fr' ? 'Demander la liste complète' : language === 'en' ? 'Request full inventory' : 'طلب القائمة الكاملة'}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </section>
  );
}
