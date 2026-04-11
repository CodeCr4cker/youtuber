import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowRight, Users, Video, Eye } from 'lucide-react';
import { siteStats } from '@/data/mockData';
import gsap from 'gsap';

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  useEffect(() => {
    if (isInView && imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { clipPath: 'inset(100% 0 0 0)' },
        {
          clipPath: 'inset(0% 0 0 0)',
          duration: 1,
          ease: 'expo.out',
          delay: 0.3,
        }
      );
    }
  }, [isInView]);

  const stats = [
    { icon: Users, value: siteStats.subscribers, label: 'YouTube Subscribers' },
    { icon: Video, value: siteStats.videos, label: 'Videos Published' },
    { icon: Eye, value: siteStats.views, label: 'Total Views' },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-32 bg-white dark:bg-black overflow-hidden"
    >
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative"
          >
            <div ref={imageRef} className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=1000&fit=crop&crop=face"
                  alt="About Prayagraj Creator"
                  className="w-full aspect-[4/5] object-cover"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
              </div>

              {/* Floating Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.8, duration: 0.6 }}
                className="absolute -bottom-6 -right-6 bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6"
              >
                <div className="text-4xl font-bold text-[#f41d1d]">5+</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  Years Creating
                </div>
              </motion.div>
            </div>

            {/* Decorative Elements */}
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute -top-4 -left-4 w-24 h-24 bg-[#f41d1d]/10 rounded-full -z-10"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="absolute top-1/2 -right-8 w-16 h-16 border-4 border-[#f41d1d]/30 rounded-full -z-10"
            />
          </motion.div>

          {/* Content */}
          <div>
            {/* Label */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 mb-4"
            >
              <span className="w-8 h-0.5 bg-[#f41d1d]" />
              <span className="section-label">About Me</span>
            </motion.div>

            {/* Title */}
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold mb-6"
            >
              Storyteller from the{' '}
              <span className="text-[#f41d1d]">Heart of Prayagraj</span>
            </motion.h2>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4 text-gray-600 dark:text-gray-300 mb-8"
            >
              <p className="leading-relaxed">
                Born and raised in the sacred city of Prayagraj, I&apos;ve always
                been fascinated by the power of stories. What started as a hobby
                sharing local insights has grown into a community of over 100,000
                subscribers who join me on this incredible journey.
              </p>
              <p className="leading-relaxed">
                My content spans tech reviews, lifestyle vlogs, and the untold
                stories of our beautiful city. Every video is crafted with
                passion, authenticity, and a desire to add value to your day.
              </p>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="grid grid-cols-3 gap-6 mb-8"
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.4 + index * 0.1 }}
                  whileHover={{ scale: 1.05, backgroundColor: 'rgba(244, 29, 29, 0.05)' }}
                  className="text-center p-4 rounded-xl transition-colors cursor-pointer"
                >
                  <stat.icon className="w-6 h-6 mx-auto mb-2 text-[#f41d1d]" />
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.a
              href="/about"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              whileHover={{ scale: 1.05, x: 5 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 text-[#f41d1d] font-semibold group"
            >
              More About Me
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </motion.a>
          </div>
        </div>
      </div>
    </section>
  );
}
