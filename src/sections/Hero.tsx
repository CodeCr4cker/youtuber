import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Play, BookOpen, ChevronRight } from 'lucide-react';
import { siteStats } from '@/data/mockData';
import gsap from 'gsap';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);

  useEffect(() => {
    // GSAP animations for text
    const ctx = gsap.context(() => {
      // Animate title characters
      if (titleRef.current) {
        const chars = titleRef.current.querySelectorAll('.char');
        gsap.fromTo(
          chars,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.03,
            ease: 'expo.out',
            delay: 0.8,
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Split text into characters
  const splitText = (text: string) => {
    return text.split('').map((char, i) => (
      <span key={i} className="char inline-block" style={{ opacity: 0 }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  };

  return (
    <motion.section
      ref={containerRef}
      style={{ opacity, scale }}
      className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f41d1d' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      {/* Floating Decorative Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute top-20 left-10 w-20 h-20 bg-[#f41d1d]/10 rounded-full blur-xl"
      />
      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="absolute bottom-40 right-20 w-32 h-32 bg-[#f41d1d]/10 rounded-full blur-xl"
      />

      <div className="container-custom relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen py-32">
          {/* Content */}
          <motion.div style={{ y }} className="order-2 lg:order-1">
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex items-center gap-2 mb-6"
            >
              <span className="w-12 h-0.5 bg-[#f41d1d]" />
              <span className="text-sm font-semibold uppercase tracking-widest text-[#f41d1d]">
                YouTuber & Blogger
              </span>
            </motion.div>

            {/* Title */}
            <h1 ref={titleRef} className="mb-6">
              <span className="block text-4xl md:text-5xl lg:text-6xl text-gray-600 dark:text-gray-400 mb-2">
                Hi, I&apos;m
              </span>
              <span className="block text-5xl md:text-6xl lg:text-7xl font-bold text-black dark:text-white">
                {splitText('Prayagraj Creator')}
              </span>
            </h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="text-lg text-gray-600 dark:text-gray-300 mb-8 max-w-lg leading-relaxed"
            >
              Welcome to my creative space where I share stories from Prayagraj,
              tech insights, and lifestyle content that inspires and entertains
              a community of 100K+ subscribers.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="flex flex-wrap gap-4 mb-12"
            >
              <motion.a
                href="https://youtube.com/@prayagrajcreator"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#f41d1d] text-white font-semibold rounded-full hover:bg-black transition-colors duration-300 shadow-lg hover:shadow-xl animate-pulse-glow"
              >
                <Play className="w-5 h-5" />
                Latest Videos
              </motion.a>
              <motion.a
                href="/blog"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 border-2 border-black dark:border-white text-black dark:text-white font-semibold rounded-full hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all duration-300"
              >
                <BookOpen className="w-5 h-5" />
                Read Blog
              </motion.a>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.6 }}
              className="flex flex-wrap gap-8"
            >
              {[
                { value: siteStats.subscribers, label: 'Subscribers' },
                { value: siteStats.videos, label: 'Videos' },
                { value: siteStats.views, label: 'Views' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1.8 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl md:text-4xl font-bold text-[#f41d1d]">
                    {stat.value}
                  </div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Hero Image */}
          <motion.div
            ref={imageRef}
            className="order-1 lg:order-2 relative"
            initial={{ opacity: 0, rotateY: 90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ perspective: 1000 }}
          >
            <div className="relative">
              {/* Image Container with 3D effect */}
              <motion.div
                whileHover={{ rotateY: 5, rotateX: -5 }}
                transition={{ duration: 0.4 }}
                className="relative z-10"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=800&fit=crop&crop=face"
                    alt="Prayagraj Creator"
                    className="w-full aspect-square object-cover"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                </div>
              </motion.div>

              {/* Floating Badge */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.5, type: 'spring' }}
                className="absolute -bottom-4 -left-4 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4 z-20"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-[#f41d1d] rounded-full flex items-center justify-center">
                    <Play className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="font-semibold">Latest Video</div>
                    <div className="text-sm text-gray-500">Watch Now</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-[#f41d1d]" />
                </div>
              </motion.div>

              {/* Decorative Elements */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="absolute -top-6 -right-6 w-24 h-24 bg-[#f41d1d] rounded-2xl -z-10"
              />
              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity }}
                className="absolute -bottom-8 -right-8 w-32 h-32 border-4 border-[#f41d1d]/30 rounded-2xl -z-10"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center pt-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-[#f41d1d] rounded-full"
          />
        </motion.div>
      </motion.div>
    </motion.section>
  );
}
