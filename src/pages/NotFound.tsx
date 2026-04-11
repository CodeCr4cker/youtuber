import { motion } from 'framer-motion';
import { Home, ArrowLeft, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-black p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center max-w-lg"
      >
        {/* 404 Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="relative mb-8"
        >
          <div className="text-9xl font-bold text-[#f41d1d]/10">404</div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <span className="text-6xl font-bold text-[#f41d1d]">404</span>
          </motion.div>
        </motion.div>

        {/* Content */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-3xl font-bold mb-4"
        >
          Page Not Found
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-gray-600 dark:text-gray-300 mb-8"
        >
          Oops! The page you&apos;re looking for seems to have wandered off. It
          might have been moved, deleted, or never existed in the first place.
        </motion.p>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.a
            href="/"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#f41d1d] text-white font-semibold rounded-full hover:bg-black transition-colors"
          >
            <Home className="w-5 h-5" />
            Go Home
          </motion.a>
          <motion.button
            onClick={() => window.history.back()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-semibold rounded-full hover:border-[#f41d1d] hover:text-[#f41d1d] transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Go Back
          </motion.button>
        </motion.div>

        {/* Search Suggestion */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700"
        >
          <p className="text-sm text-gray-500 mb-4">
            Looking for something specific?
          </p>
          <a
            href="/blog"
            className="inline-flex items-center gap-2 text-[#f41d1d] hover:underline"
          >
            <Search className="w-4 h-4" />
            Browse our blog
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}
