import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Clients from '@/components/Clients';
import About from '@/components/About';
import Industries from '@/components/Industries';
import EPCValueChain from '@/components/EPCValueChain';
import Portfolio from '@/components/Portfolio';
import InteractiveAlgeriaMap from '@/components/InteractiveAlgeriaMap';
import SpecsTable from '@/components/SpecsTable';
import QHSE from '@/components/QHSE';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';
import PageIndicator from '@/components/PageIndicator';
import ReadingProgress from '@/components/ReadingProgress';
import SectionBackdrop from '@/components/SectionBackdrop';

const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'SARL TAMMA SERVICES',
  alternateName: 'TAMMA EPC Solutions',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3014',
  logo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3014'}/images/tamma-logo-dark.png`,
  description: 'Entreprise algérienne d’ingénierie et de construction EPC pour les infrastructures d’énergie, pétrole et gaz.',
  areaServed: {
    '@type': 'Country',
    name: 'Algeria',
  },
  knowsAbout: [
    'Engineering, procurement and construction',
    'Electrical infrastructure',
    'Oil and gas infrastructure',
    'Civil engineering',
  ],
};

export default function HomePage() {
  return (
    <main id="main-content" className="min-h-screen bg-[var(--color-paper)] text-[var(--color-charcoal)] antialiased selection:bg-[var(--color-ink)] selection:text-[var(--color-paper)] overflow-x-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <SectionBackdrop />
      <Navbar />
      <ReadingProgress />
      <PageIndicator />
      <Hero />
      <Clients />
      <About />
      <Industries />
      <EPCValueChain />
      <Portfolio />
      <InteractiveAlgeriaMap />
      <SpecsTable />
      <QHSE />
      <ContactSection />
      <Footer />
    </main>
  );
}
