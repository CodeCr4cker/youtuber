import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Play, Clock, Eye, Search, Filter, Youtube } from 'lucide-react';
import { youtubeVideos } from '@/data/mockData';

export default function Videos() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    document.title = 'Videos - Prayagraj Creator';
  }, []);

  const categories = ['All', 'Travel', 'Tech', 'Lifestyle', 'Food', 'Vlogs'];

  const filteredVideos = youtubeVideos.filter((video) => {
    const matchesSearch = video.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || video.title.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16 bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center max-w-3xl mx-auto"
            >
              <span className="section-label mb-4 block">
                <Youtube className="w-5 h-5 inline mr-2" />
                YouTube Channel
              </span>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Latest <span className="text-[#f41d1d]">Videos</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Explore our collection of tech reviews, travel vlogs, and
                lifestyle content from Prayagraj.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 border-b border-gray-200 dark:border-gray-800">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search */}
              <div className="relative w-full md:w-96">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search videos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-full focus:outline-none focus:ring-2 focus:ring-[#f41d1d] transition-all"
                />
              </div>

              {/* Categories */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
                <Filter className="w-5 h-5 text-gray-400 flex-shrink-0" />
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 text-sm font-medium rounded-full whitespace-nowrap transition-all ${
                      selectedCategory === category
                        ? 'bg-[#f41d1d] text-white'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Videos Grid */}
        <section ref={sectionRef} className="py-16">
          <div className="container-custom">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredVideos.map((video, index) => (
                <motion.a
                  key={video.id}
                  href={`https://youtube.com/watch?v=${video.id}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                >
                  {/* Thumbnail */}
                  <div className="relative aspect-video">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 bg-[#f41d1d] rounded-full flex items-center justify-center">
                        <Play className="w-8 h-8 text-white ml-1" fill="white" />
                      </div>
                    </div>
                    {/* Duration */}
                    <div className="absolute bottom-3 right-3 bg-black/80 text-white text-sm px-2 py-1 rounded flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {video.duration}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-2 group-hover:text-[#f41d1d] transition-colors line-clamp-2">
                      {video.title}
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                      {video.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        {video.viewCount}
                      </span>
                      <span>•</span>
                      <span>
                        {new Date(video.publishedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>

            {filteredVideos.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">
                  No videos found matching your criteria.
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Subscribe CTA */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center max-w-2xl mx-auto"
            >
              <h2 className="text-3xl font-bold mb-4">
                Don&apos;t Miss Any Updates
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-8">
                Subscribe to our YouTube channel and hit the bell icon to get
                notified about new videos.
              </p>
              <motion.a
                href="https://youtube.com/@prayagrajcreator"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#f41d1d] text-white font-semibold rounded-full hover:bg-black transition-colors"
              >
                <Youtube className="w-5 h-5" />
                Subscribe Now
              </motion.a>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
