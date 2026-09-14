'use client';

import React from 'react';
import { useLanguage } from './LanguageContext';
import ContactForm from './ContactForm';
import ScrollReveal from './ScrollReveal';
import { ArrowUpRight, MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

export default function ContactSection() {
  const { language } = useLanguage();

  const content = {
    fr: {
      tag: "Études Techniques & Appels d'Offres",
      title: "Engageons<br/>votre prochain<br/>chantier.",
      subtitle: "Nos directeurs de projets et équipes d'ingénierie se tiennent à votre disposition pour étudier vos cahiers des charges.",
      hubsTitle: "Nos Bases Régionales",
      hubs: [
        { city: "Hassi Messaoud", region: "Ouargla", role: "Base Opérationnelle Saharienne", address: "Si-El Haouasse N°02, Hassi Messaoud", phone: "+213 (0) 661.85.13.85" },
        { city: "El-Oued", region: "Direction Générale", role: "Siège Social", address: "Rimmel 02, Moustfaoui Mall, El-Oued", phone: "+213 (0) 32.14.22.57 · +213 (0) 666.13.01.13" },
        { city: "Alger (Hydra)", region: "Direction Commerciale", role: "Bureau Commercial & Ingénierie", address: "64 Logts B 01, Sidi Yahya Street, Hydra", phone: "+213 (0) 661.85.13.85 · +213 (0) 699.70.73.84" }
      ],
      directChannel: "Direction Commerciale Directe",
      directEmail: "commercial@tamma-services.dz",
      directPhone: "+213 (0) 32.14.22.57",
    },
    en: {
      tag: "Technical Studies & Tenders",
      title: "Let's engage<br/>your next<br/>project.",
      subtitle: "Our project directors and engineering teams are at your disposal to study your specifications.",
      hubsTitle: "Regional Hubs",
      hubs: [
        { city: "Hassi Messaoud", region: "Ouargla", role: "Saharan Operational Base", address: "Si-El Haouasse N°02, Hassi Messaoud", phone: "+213 (0) 661.85.13.85" },
        { city: "El-Oued", region: "Head Office", role: "Headquarters", address: "Rimmel 02, Moustfaoui Mall, El-Oued", phone: "+213 (0) 32.14.22.57 · +213 (0) 666.13.01.13" },
        { city: "Algiers (Hydra)", region: "Commercial Office", role: "Commercial & Engineering Office", address: "64 Logts B 01, Sidi Yahya Street, Hydra", phone: "+213 (0) 661.85.13.85 · +213 (0) 699.70.73.84" }
      ],
      directChannel: "Direct Commercial Line",
      directEmail: "commercial@tamma-services.dz",
      directPhone: "+213 (0) 32.14.22.57",
    },
    ar: {
      tag: "الدراسات الفنية والعطاءات",
      title: "لنبدأ<br/>مشروعك<br/>القادم.",
      subtitle: "مدراء المشاريع لدينا وفرق الهندسة تحت تصرفكم لدراسة مواصفاتكم.",
      hubsTitle: "المراكز الإقليمية",
      hubs: [
        { city: "حاسي مسعود", region: "ورقلة", role: "قاعدة صحراوية", address: "سي الحواس N°02", phone: "+213 (0) 661.85.13.85" },
        { city: "الوادي", region: "المقر الرئيسي", role: "المقر الاجتماعي", address: "ريمال 02", phone: "+213 (0) 32.14.22.57" },
        { city: "الجزائر (حيدرة)", region: "مكتب تجاري", role: "مكتب تجاري وهندسي", address: "حيدرة", phone: "+213 (0) 661.85.13.85" }
      ],
      directChannel: "القسم التجاري المباشر",
      directEmail: "commercial@tamma-services.dz",
      directPhone: "+213 (0) 32.14.22.57",
    }
  };

  const c = content[language] || content.fr;

  return (
    <section id="contact" className="bg-[var(--color-paper)] paper-texture section-pad">
      <div className="container-editorial">

        <ScrollReveal>
          <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 mb-8 lg:mb-10">
            <div className="lg:col-span-7 space-y-5">
              <div className="section-label">
                <span className="num">08</span>
                <span className="name">{language === 'ar' ? 'اتصل بنا' : language === 'en' ? 'Contact' : 'Contact'}</span>
              </div>
              <div className="eyebrow">{c.tag}</div>
              <h2 className="display-lg text-[var(--color-ink)] leading-[0.95]" dangerouslySetInnerHTML={{ __html: c.title }} />
            </div>
            <div className="lg:col-span-4 lg:col-start-9 flex items-end">
              <p className="body text-[var(--color-graphite)] sm:body-lg">{c.subtitle}</p>
            </div>
          </div>
        </ScrollReveal>

        <div className="grid lg:grid-cols-12 gap-6 lg:gap-8 items-start">

          <ScrollReveal className="lg:col-span-5 space-y-6">

            <div className="card editorial-interactive p-7 lg:p-8 space-y-7">
              <h3 className="text-[10px] font-bold tracking-[0.22em] text-[var(--color-mist)] uppercase">
                {c.hubsTitle}
              </h3>

              <div className="space-y-7">
                {c.hubs.map((hub, idx) => (
                  <div key={idx} className="space-y-2.5 pb-7 border-b border-[rgba(10,12,13,0.06)] last:border-b-0 last:pb-0">
                    <span className="text-[10px] font-bold tracking-[0.18em] text-[var(--color-mist)] uppercase">
                      {hub.role}
                    </span>
                    <h4 className="text-xl font-semibold text-[var(--color-ink)] font-display tracking-tight">
                      {hub.city} <span className="text-[var(--color-mist)] font-normal text-sm">/ {hub.region}</span>
                    </h4>
                    <div className="space-y-1.5 text-sm text-[var(--color-graphite)]">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-3.5 h-3.5 text-[var(--color-accent)] mt-1 shrink-0" />
                        <span>{hub.address}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="w-3.5 h-3.5 text-[var(--color-accent)] shrink-0" />
                        <a href={`tel:${hub.phone}`} className="font-semibold text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors">
                          {hub.phone}
                        </a>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="card editorial-interactive p-7 lg:p-8 space-y-4">
              <h4 className="text-[10px] font-bold tracking-[0.22em] text-[var(--color-accent)] uppercase">
                {c.directChannel}
              </h4>
              <div className="space-y-3">
                <a
                  href={`mailto:${c.directEmail}`}
                  className="flex items-center gap-3 text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-[var(--color-paper)] flex items-center justify-center group-hover:bg-[var(--color-accent)] group-hover:text-white transition-colors">
                    <Mail className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-sm">{c.directEmail}</span>
                  <ArrowUpRight className="w-4 h-4 ml-auto opacity-50 group-hover:opacity-100" />
                </a>
                <a
                  href={`tel:${c.directPhone}`}
                  className="flex items-center gap-3 text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-[var(--color-paper)] flex items-center justify-center group-hover:bg-[var(--color-accent)] group-hover:text-white transition-colors">
                    <Phone className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-sm">{c.directPhone}</span>
                  <ArrowUpRight className="w-4 h-4 ml-auto opacity-50 group-hover:opacity-100" />
                </a>
                <a
                  href="https://wa.me/213661851385"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-3 text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors group"
                >
                  <div className="w-9 h-9 rounded-lg bg-[var(--color-paper)] flex items-center justify-center group-hover:bg-[var(--color-accent)] group-hover:text-white transition-colors">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-sm">{language === 'fr' ? 'WhatsApp direct' : language === 'en' ? 'Direct WhatsApp' : 'واتساب مباشر'}</span>
                  <ArrowUpRight className="w-4 h-4 ml-auto opacity-50 group-hover:opacity-100" />
                </a>
              </div>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.1} className="lg:col-span-7">
            <div id="contact-form" className="card p-8 lg:p-12 scroll-mt-24 lg:scroll-mt-20">
              <ContactForm />
            </div>
          </ScrollReveal>

        </div>

      </div>
    </section>
  );
}
