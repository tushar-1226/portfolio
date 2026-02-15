import dynamic from 'next/dynamic';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Projects from '@/components/Projects';
import SolidBackground from '@/components/SolidBackground';
import BackToTop from '@/components/BackToTop';

// Dynamic imports for heavy components
const Testimonials = dynamic(() => import('@/components/Testimonials'));
const Achievements = dynamic(() => import('@/components/Achievements'));
const Skills = dynamic(() => import('@/components/Skills'));
const Blog = dynamic(() => import('@/components/Blog'));
const Gallery = dynamic(() => import('@/components/Gallery'));
const Contact = dynamic(() => import('@/components/Contact'));
const Footer = dynamic(() => import('@/components/Footer'));

import { getSortedPostsData } from '@/lib/blog';

// ... other imports

export default function Home() {
  const posts = getSortedPostsData();

  return (
    <main>
      <SolidBackground />
      <Navbar />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Achievements />
      <Testimonials />
      <Blog posts={posts} />
      <Gallery />
      <Contact />
      <Footer />
      <BackToTop />
    </main>
  );
}
