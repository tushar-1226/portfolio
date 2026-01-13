import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import ScrollProgress from '@/components/ScrollProgress';
import NetworkBackground from '@/components/NetworkBackground';
import BackToTop from '@/components/BackToTop';

// Dynamic imports for heavy components
const Testimonials = dynamic(() => import('@/components/Testimonials'));
const Achievements = dynamic(() => import('@/components/Achievements'));
const Skills = dynamic(() => import('@/components/Skills'));
const Blog = dynamic(() => import('@/components/Blog'));
const Gallery = dynamic(() => import('@/components/Gallery'));
const Contact = dynamic(() => import('@/components/Contact'));
const Footer = dynamic(() => import('@/components/Footer'));

export default function Home() {
  return (
    <main>
      <NetworkBackground />
      <Navbar />
      <ScrollProgress />
      <Hero />
      <About />
      <Projects />
      <Testimonials />
      <Achievements />
      <Skills />
      <Blog />
      <Gallery />
      <Contact />
      <Footer />
      <BackToTop />
    </main>
  );
}
