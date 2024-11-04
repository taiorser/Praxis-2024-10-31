import { Hero } from '@/components/hero';
import { Features } from '@/components/features';
import { Pricing } from '@/components/pricing';
import { Testimonials } from '@/components/testimonials';
import { Contact } from '@/components/contact';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <Pricing />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}