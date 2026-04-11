import { useRef, useState } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { ArrowRight, Clock, Calendar, TrendingUp } from 'lucide-react';
import { featuredBlogPosts, categories } from '@/data/mockData';
import type { BlogPost } from '@/types';

interface BlogCardProps {
  post: BlogPost;
  index: number;
  featured?: boolean;
}

function BlogCard({ post, index, featured = false }: BlogCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      whileHover={{ y: -15 }}
      className={`group relative bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-400 ${
        featured ? 'lg:col-span-2 lg:row-span-2' : ''
      }`}
      style={{ perspective: 1000 }}
    >
      <a href={`/blog/${post.slug}`} className="block">
        {/* Image */}
        <div
          className={`relative overflow-hidden ${
            featured ? 'aspect-[16/10]' : 'aspect-[4/3]'
          }`}
        >
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* Category Badge */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: index * 0.1 + 0.2, type: 'spring' }}
            className="absolute top-4 left-4"
          >
            <span className="px-4 py-1.5 bg-[#f41d1d] text-white text-xs font-semibold rounded-full">
              {post.category}
            </span>
          </motion.div>

          {/* Views Badge */}
          {featured && (
            <div className="absolute top-4 right-4 flex items-center gap-1 px-3 py-1.5 bg-black/70 text-white text-xs rounded-full">
              <TrendingUp className="w-3 h-3" />
              {post.views.toLocaleString()} views
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Meta */}
          <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
            <span className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              {new Date(post.publishedAt).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {post.readTime} min read
            </span>
          </div>

          {/* Title */}
          <h3
            className={`font-bold mb-3 group-hover:text-[#f41d1d] transition-colors line-clamp-2 ${
              featured ? 'text-2xl md:text-3xl' : 'text-lg'
            }`}
          >
            {post.title}
          </h3>

          {/* Excerpt */}
          <p
            className={`text-gray-600 dark:text-gray-300 line-clamp-2 ${
              featured ? 'text-base' : 'text-sm'
            }`}
          >
            {post.excerpt}
          </p>

          {/* Read More */}
          <div className="mt-4 flex items-center gap-2 text-[#f41d1d] font-semibold text-sm group/link">
            Read More
            <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
          </div>
        </div>
      </a>
    </motion.article>
  );
}

export default function Blog() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredPosts =
    activeCategory === 'All'
      ? featuredBlogPosts
      : featuredBlogPosts.filter((post) => post.category === activeCategory);

  return (
    <section
      ref={sectionRef}
      className="py-24 lg:py-32 bg-white dark:bg-black overflow-hidden"
    >
      <div className="container-custom">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="flex items-center gap-2 mb-4"
            >
              <span className="w-8 h-0.5 bg-[#f41d1d]" />
              <span className="section-label">From the Blog</span>
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-5xl font-bold"
            >
              Stories & <span className="text-[#f41d1d]">Insights</span>
            </motion.h2>
          </div>

          {/* Category Filter */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap gap-2"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-[#f41d1d] text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Blog Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {filteredPosts.map((post, index) => (
              <BlogCard
                key={post.id}
                post={post}
                index={index}
                featured={index === 0}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="mt-12 text-center"
        >
          <motion.a
            href="/blog"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-8 py-4 border-2 border-[#f41d1d] text-[#f41d1d] font-semibold rounded-full hover:bg-[#f41d1d] hover:text-white transition-all duration-300"
          >
            View All Posts
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
