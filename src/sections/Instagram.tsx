import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Instagram, Heart, MessageCircle, ExternalLink } from 'lucide-react';
import { instagramPosts } from '@/data/mockData';

export default function InstagramSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-32 bg-white dark:bg-black overflow-hidden"
    >
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, type: 'spring' }}
            className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-2xl mb-6"
          >
            <Instagram className="w-10 h-10 text-white" />
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-5xl font-bold mb-2"
          >
            @prayagrajcreator
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-500 dark:text-gray-400"
          >
            25K Followers • Daily updates from Prayagraj
          </motion.p>
          <motion.a
            href="https://instagram.com/prayagrajcreator"
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 mt-6 px-8 py-3 bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 text-white font-semibold rounded-full hover:shadow-lg transition-shadow"
          >
            <ExternalLink className="w-4 h-4" />
            Follow on Instagram
          </motion.a>
        </div>

        {/* Instagram Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {instagramPosts.map((post, index) => (
            <motion.a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, rotate: index % 2 === 0 ? -10 : 10 }}
              animate={isInView ? { opacity: 1, rotate: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="group relative aspect-square rounded-xl overflow-hidden"
            >
              <img
                src={post.imageUrl}
                alt={post.caption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Stats */}
              <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="flex items-center gap-1 text-white">
                  <Heart className="w-5 h-5" fill="white" />
                  <span className="font-semibold">
                    {post.likes >= 1000
                      ? `${(post.likes / 1000).toFixed(1)}K`
                      : post.likes}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-white">
                  <MessageCircle className="w-5 h-5" fill="white" />
                  <span className="font-semibold">{post.comments}</span>
                </div>
              </div>

              {/* Caption (visible on hover) */}
              <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white text-xs line-clamp-2">{post.caption}</p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
