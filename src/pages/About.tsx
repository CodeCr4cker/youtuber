import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Youtube,
  Instagram,
  Twitter,
  Facebook,
  Award,
  TrendingUp,
  Users,
  Globe,
  Heart,
  Camera,
  Laptop,
} from 'lucide-react';
import { siteStats } from '@/data/mockData';

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  useEffect(() => {
    document.title = 'About - Prayagraj Creator';
  }, []);

  const milestones = [
    { year: '2019', event: 'Started YouTube Channel' },
    { year: '2020', event: 'Reached 10K Subscribers' },
    { year: '2021', event: 'First Brand Collaboration' },
    { year: '2022', event: '50K Subscribers Milestone' },
    { year: '2023', event: 'Launched Blog Website' },
    { year: '2024', event: '100K Subscribers Celebration' },
  ];

  const values = [
    {
      icon: Heart,
      title: 'Authenticity',
      description: 'Every piece of content is genuine and true to who I am.',
    },
    {
      icon: Camera,
      title: 'Quality',
      description: 'Committed to producing high-quality videos and articles.',
    },
    {
      icon: Users,
      title: 'Community',
      description: 'Building a supportive community of like-minded individuals.',
    },
    {
      icon: Laptop,
      title: 'Innovation',
      description: 'Always exploring new ways to create and share content.',
    },
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <Header />
      <main>
        {/* Hero Section */}
        <section className="pt-32 pb-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <span className="section-label mb-4 block">About Me</span>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                The Story Behind{' '}
                <span className="text-[#f41d1d]">Prayagraj Creator</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                From a small town dreamer to a content creator inspiring
                thousands. This is my journey.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Main Content */}
        <section ref={sectionRef} className="py-24">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                  <img
                    src="https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=800&h=1000&fit=crop&crop=face"
                    alt="Prayagraj Creator"
                    className="w-full aspect-[4/5] object-cover"
                  />
                </div>
                <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-[#f41d1d]/10 rounded-full -z-10" />
                <div className="absolute -top-6 -left-6 w-32 h-32 border-4 border-[#f41d1d]/30 rounded-full -z-10" />
              </motion.div>

              {/* Content */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h2 className="text-4xl font-bold mb-6">
                  Hi, I&apos;m a{' '}
                  <span className="text-[#f41d1d]">Content Creator</span> from
                  Prayagraj
                </h2>
                <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                  <p>
                    Born and raised in the sacred city of Prayagraj, I&apos;ve
                    always been fascinated by the power of stories. Growing up
                    at the confluence of the Ganga, Yamuna, and Saraswati rivers,
                    I was surrounded by rich culture, history, and spirituality
                    that shaped my perspective on life.
                  </p>
                  <p>
                    What started as a hobby in 2019 - sharing local insights and
                    tech reviews - has grown into a community of over 100,000
                    subscribers who join me on this incredible journey of
                    discovery and learning.
                  </p>
                  <p>
                    My content spans tech reviews, lifestyle vlogs, travel
                    documentaries, and the untold stories of our beautiful city.
                    Every video and article is crafted with passion,
                    authenticity, and a desire to add value to your day.
                  </p>
                </div>

                {/* Social Links */}
                <div className="mt-8">
                  <p className="text-sm text-gray-500 mb-4">Follow me on:</p>
                  <div className="flex gap-4">
                    {[
                      { icon: Youtube, href: '#' },
                      { icon: Instagram, href: '#' },
                      { icon: Twitter, href: '#' },
                      { icon: Facebook, href: '#' },
                    ].map((social, index) => (
                      <motion.a
                        key={index}
                        href={social.href}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-[#f41d1d] hover:text-white transition-colors"
                      >
                        <social.icon className="w-5 h-5" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24"
            >
              {[
                { icon: Users, value: siteStats.subscribers, label: 'Subscribers' },
                { icon: TrendingUp, value: siteStats.views, label: 'Total Views' },
                { icon: Award, value: '50+', label: 'Brand Deals' },
                { icon: Globe, value: '10+', label: 'Countries Reached' },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="text-center p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl"
                >
                  <stat.icon className="w-8 h-8 mx-auto mb-3 text-[#f41d1d]" />
                  <div className="text-3xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>

            {/* Values */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mb-24"
            >
              <h2 className="text-3xl font-bold text-center mb-12">
                My <span className="text-[#f41d1d]">Values</span>
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {values.map((value, index) => (
                  <motion.div
                    key={value.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    whileHover={{ y: -5 }}
                    className="p-6 bg-gray-50 dark:bg-gray-800 rounded-2xl text-center"
                  >
                    <div className="w-14 h-14 bg-[#f41d1d]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <value.icon className="w-7 h-7 text-[#f41d1d]" />
                    </div>
                    <h3 className="font-bold text-lg mb-2">{value.title}</h3>
                    <p className="text-sm text-gray-500">{value.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Timeline */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <h2 className="text-3xl font-bold text-center mb-12">
                My <span className="text-[#f41d1d]">Journey</span>
              </h2>
              <div className="relative">
                {/* Timeline Line */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-200 dark:bg-gray-700" />
                
                <div className="space-y-12">
                  {milestones.map((milestone, index) => (
                    <motion.div
                      key={milestone.year}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.9 + index * 0.1 }}
                      className={`flex items-center ${
                        index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                      }`}
                    >
                      <div className="w-1/2 pr-8 text-right">
                        {index % 2 === 0 && (
                          <>
                            <div className="text-2xl font-bold text-[#f41d1d]">
                              {milestone.year}
                            </div>
                            <div className="text-gray-600 dark:text-gray-300">
                              {milestone.event}
                            </div>
                          </>
                        )}
                      </div>
                      <div className="relative z-10 w-4 h-4 bg-[#f41d1d] rounded-full border-4 border-white dark:border-black" />
                      <div className="w-1/2 pl-8">
                        {index % 2 === 1 && (
                          <>
                            <div className="text-2xl font-bold text-[#f41d1d]">
                              {milestone.year}
                            </div>
                            <div className="text-gray-600 dark:text-gray-300">
                              {milestone.event}
                            </div>
                          </>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
