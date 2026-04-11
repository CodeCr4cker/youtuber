import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Play, Clock, Eye, ArrowRight, Youtube } from 'lucide-react';
import { youtubeVideos } from '@/data/mockData';

export default function Videos() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const featuredVideo = youtubeVideos[0];
  const sideVideos = youtubeVideos.slice(1);

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-32 bg-gray-50 dark:bg-gray-900 overflow-hidden"
    >
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 mb-4"
            >
              <Youtube className="w-5 h-5 text-[#f41d1d]" />
              <span className="section-label">Latest Content</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold"
            >
              Fresh from the <span className="text-[#f41d1d]">Channel</span>
            </motion.h2>
          </div>
          <motion.a
            href="https://youtube.com/@prayagrajcreator"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ scale: 1.05, x: 5 }}
            className="inline-flex items-center gap-2 text-[#f41d1d] font-semibold group"
          >
            View All Videos
            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
          </motion.a>
        </div>

        {/* Videos Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Featured Video */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:row-span-2"
          >
            <motion.a
              href={`https://youtube.com/watch?v=${featuredVideo.id}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ y: -10 }}
              className="block group relative rounded-2xl overflow-hidden shadow-xl"
            >
              <div className="relative aspect-video">
                <img
                  src={featuredVideo.thumbnail}
                  alt={featuredVideo.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                {/* Play Button */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-20 h-20 bg-[#f41d1d] rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                    <Play className="w-8 h-8 text-white ml-1" fill="white" />
                  </div>
                </motion.div>

                {/* Duration Badge */}
                <div className="absolute top-4 right-4 bg-black/80 text-white text-sm px-3 py-1 rounded-full flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {featuredVideo.duration}
                </div>

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <span className="inline-block px-3 py-1 bg-[#f41d1d] text-white text-xs font-semibold rounded-full mb-3">
                    Featured
                  </span>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-2">
                    {featuredVideo.title}
                  </h3>
                  <p className="text-gray-300 text-sm mb-3 line-clamp-2">
                    {featuredVideo.description}
                  </p>
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <span className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      {featuredVideo.viewCount} views
                    </span>
                    <span>•</span>
                    <span>
                      {new Date(featuredVideo.publishedAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </div>
            </motion.a>
          </motion.div>

          {/* Side Videos */}
          <div className="space-y-4">
            {sideVideos.map((video, index) => (
              <motion.a
                key={video.id}
                href={`https://youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                whileHover={{ x: 10, backgroundColor: 'rgba(244, 29, 29, 0.05)' }}
                className="flex gap-4 p-3 rounded-xl transition-all group"
              >
                {/* Thumbnail */}
                <div className="relative w-40 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="w-8 h-8 text-white" fill="white" />
                  </div>
                  <div className="absolute bottom-1 right-1 bg-black/80 text-white text-xs px-2 py-0.5 rounded">
                    {video.duration}
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-sm md:text-base line-clamp-2 group-hover:text-[#f41d1d] transition-colors">
                    {video.title}
                  </h4>
                  <div className="flex items-center gap-3 mt-2 text-xs text-gray-500 dark:text-gray-400">
                    <span className="flex items-center gap-1">
                      <Eye className="w-3 h-3" />
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
        </div>
      </div>
    </section>
  );
}
