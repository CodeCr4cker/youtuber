import { useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/sections/Hero';
import About from '@/sections/About';
import Videos from '@/sections/Videos';
import Blog from '@/sections/Blog';
import Gallery from '@/sections/Gallery';
import InstagramSection from '@/sections/Instagram';

export default function Home() {
  useEffect(() => {
    // Update document title and meta tags for SEO
    document.title = 'Prayagraj Creator - YouTuber & Blogger from Prayagraj';
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Welcome to Prayagraj Creator - A YouTube channel and blog sharing stories from Prayagraj, tech insights, and lifestyle content. Join 100K+ subscribers!');
    }
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <Header />
      <main>
        <Hero />
        <About />
        <Videos />
        <Blog />
        <Gallery />
        <InstagramSection />
      </main>
      <Footer />
    </div>
  );
}
