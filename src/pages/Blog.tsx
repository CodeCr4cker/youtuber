import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Search,
  Filter,
  Clock,
  Calendar,
  TrendingUp,
  ArrowRight,
  User,
} from 'lucide-react';
import { featuredBlogPosts, categories } from '@/data/mockData';

export default function Blog() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    document.title = 'Blog - Prayagraj Creator';
  }, []);

  const filteredPosts = featuredBlogPosts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All' || post.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const featuredPost = filteredPosts[0];
  const regularPosts = filteredPosts.slice(1);

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
              <span className="section-label mb-4 block">From the Blog</span>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Stories & <span className="text-[#f41d1d]">Insights</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Explore articles about travel, tech, lifestyle, and the untold
                stories of Prayagraj.
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
                  placeholder="Search articles..."
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

        {/* Blog Content */}
        <section ref={sectionRef} className="py-16">
          <div className="container-custom">
            {filteredPosts.length > 0 ? (
              <>
                {/* Featured Post */}
                {featuredPost && (
                  <motion.a
                    href={`/blog/${featuredPost.slug}`}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.6 }}
                    whileHover={{ y: -5 }}
                    className="block group mb-12"
                  >
                    <div className="grid lg:grid-cols-2 gap-8 bg-gray-50 dark:bg-gray-800 rounded-3xl overflow-hidden">
                      <div className="relative aspect-[16/10] lg:aspect-auto">
                        <img
                          src={featuredPost.featuredImage}
                          alt={featuredPost.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-4 py-1.5 bg-[#f41d1d] text-white text-sm font-semibold rounded-full">
                            {featuredPost.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-8 lg:p-12 flex flex-col justify-center">
                        <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(
                              featuredPost.publishedAt
                            ).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {featuredPost.readTime} min read
                          </span>
                          <span className="flex items-center gap-1">
                            <TrendingUp className="w-4 h-4" />
                            {featuredPost.views.toLocaleString()} views
                          </span>
                        </div>
                        <h2 className="text-3xl lg:text-4xl font-bold mb-4 group-hover:text-[#f41d1d] transition-colors">
                          {featuredPost.title}
                        </h2>
                        <p className="text-gray-600 dark:text-gray-300 mb-6 line-clamp-3">
                          {featuredPost.excerpt}
                        </p>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-[#f41d1d] rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <p className="font-semibold">
                              {featuredPost.author}
                            </p>
                            <p className="text-sm text-gray-500">Author</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.a>
                )}

                {/* Regular Posts Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {regularPosts.map((post, index) => (
                    <motion.a
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      initial={{ opacity: 0, y: 30 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
                      whileHover={{ y: -10 }}
                      className="group bg-white dark:bg-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
                    >
                      <div className="relative aspect-[4/3]">
                        <img
                          src={post.featuredImage}
                          alt={post.title}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-[#f41d1d] text-white text-xs font-semibold rounded-full">
                            {post.category}
                          </span>
                        </div>
                      </div>
                      <div className="p-6">
                        <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-gray-400 mb-3">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-4 h-4" />
                            {new Date(post.publishedAt).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {post.readTime} min
                          </span>
                        </div>
                        <h3 className="font-bold text-lg mb-2 group-hover:text-[#f41d1d] transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center gap-2 text-[#f41d1d] font-semibold text-sm">
                          Read More
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </div>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">
                  No articles found matching your criteria.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
