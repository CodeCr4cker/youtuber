import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Clock,
  Calendar,
  User,
  Eye,
  Heart,
  Facebook,
  Twitter,
  Linkedin,
  Link as LinkIcon,
  MessageCircle,
  Send,
} from 'lucide-react';
import { featuredBlogPosts } from '@/data/mockData';
import { toast } from 'sonner';
import type { BlogPost, Comment } from '@/types';

export default function BlogPost() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [commentName, setCommentName] = useState('');
  const [commentEmail, setCommentEmail] = useState('');
  const [commentContent, setCommentContent] = useState('');
  const [comments, setComments] = useState<Comment[]>([]);
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const foundPost = featuredBlogPosts.find((p) => p.slug === slug);
    if (foundPost) {
      setPost(foundPost);
      setComments(foundPost.comments || []);
      document.title = `${foundPost.title} - Prayagraj Creator`;

      // Get related posts
      const related = featuredBlogPosts
        .filter(
          (p) =>
            p.id !== foundPost.id &&
            (p.category === foundPost.category ||
              p.tags.some((tag) => foundPost.tags.includes(tag)))
        )
        .slice(0, 3);
      setRelatedPosts(related);
    }
  }, [slug]);

  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (commentName && commentEmail && commentContent) {
      const newComment: Comment = {
        id: Date.now().toString(),
        postId: post?.id || '',
        author: commentName,
        email: commentEmail,
        content: commentContent,
        createdAt: new Date(),
        likes: 0,
      };
      setComments([...comments, newComment]);
      setCommentName('');
      setCommentEmail('');
      setCommentContent('');
      toast.success('Comment posted successfully!');
    }
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = post?.title || '';

    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(text)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        toast.success('Link copied to clipboard!');
        return;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  };

  const handleLike = () => {
    setLiked(!liked);
    if (!liked) {
      toast.success('You liked this article!');
    }
  };

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#f41d1d]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors duration-300">
      <Header />
      <main>
        {/* Hero */}
        <section className="pt-32 pb-16">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-4xl mx-auto"
            >
              {/* Category */}
              <span className="inline-block px-4 py-1.5 bg-[#f41d1d] text-white text-sm font-semibold rounded-full mb-6">
                {post.category}
              </span>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                {post.title}
              </h1>

              {/* Meta */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500 dark:text-gray-400 mb-8">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 bg-[#f41d1d] rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {post.author}
                    </p>
                    <p>Author</p>
                  </div>
                </div>
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.publishedAt).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {post.readTime} min read
                </span>
                <span className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  {post.views.toLocaleString()} views
                </span>
              </div>

              {/* Featured Image */}
              <div className="relative rounded-2xl overflow-hidden mb-8">
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full aspect-[16/9] object-cover"
                />
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between py-4 border-y border-gray-200 dark:border-gray-800 mb-8">
                <div className="flex items-center gap-4">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={handleLike}
                    className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${
                      liked
                        ? 'bg-red-100 text-red-600 dark:bg-red-900/30'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                    }`}
                  >
                    <Heart
                      className="w-5 h-5"
                      fill={liked ? 'currentColor' : 'none'}
                    />
                    {liked ? 'Liked' : 'Like'}
                  </motion.button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-gray-600 dark:text-gray-300">
                    <MessageCircle className="w-5 h-5" />
                    {comments.length} Comments
                  </button>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 mr-2">Share:</span>
                  {[
                    { icon: Facebook, platform: 'facebook' },
                    { icon: Twitter, platform: 'twitter' },
                    { icon: Linkedin, platform: 'linkedin' },
                    { icon: LinkIcon, platform: 'copy' },
                  ].map(({ icon: Icon, platform }) => (
                    <motion.button
                      key={platform}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleShare(platform)}
                      className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-[#f41d1d] hover:text-white transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Content */}
        <section className="pb-16">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="prose prose-lg dark:prose-invert max-w-none mb-12"
              >
                <p className="text-xl text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                  {post.excerpt}
                </p>
                <div className="text-gray-700 dark:text-gray-300 leading-relaxed space-y-4">
                  <p>{post.content}</p>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                  <p>
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum.
                  </p>
                  <h2 className="text-2xl font-bold mt-8 mb-4">
                    Key Takeaways
                  </h2>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>First important point about the topic</li>
                    <li>Second key insight to remember</li>
                    <li>Third valuable lesson learned</li>
                    <li>Final thought to consider</li>
                  </ul>
                  <p>
                    Sed ut perspiciatis unde omnis iste natus error sit
                    voluptatem accusantium doloremque laudantium, totam rem
                    aperiam, eaque ipsa quae ab illo inventore veritatis et
                    quasi architecto beatae vitae dicta sunt explicabo.
                  </p>
                </div>
              </motion.div>

              {/* Tags */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-12"
              >
                <h3 className="font-semibold mb-4">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded-full text-sm text-gray-600 dark:text-gray-300"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </motion.div>

              {/* Comments Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mb-12"
              >
                <h3 className="text-2xl font-bold mb-6">
                  Comments ({comments.length})
                </h3>

                {/* Comment Form */}
                <form
                  onSubmit={handleSubmitComment}
                  className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6 mb-8"
                >
                  <h4 className="font-semibold mb-4">Leave a comment</h4>
                  <div className="grid md:grid-cols-2 gap-4 mb-4">
                    <input
                      type="text"
                      placeholder="Your name"
                      value={commentName}
                      onChange={(e) => setCommentName(e.target.value)}
                      className="px-4 py-3 bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f41d1d]"
                      required
                    />
                    <input
                      type="email"
                      placeholder="Your email"
                      value={commentEmail}
                      onChange={(e) => setCommentEmail(e.target.value)}
                      className="px-4 py-3 bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f41d1d]"
                      required
                    />
                  </div>
                  <textarea
                    placeholder="Your comment..."
                    value={commentContent}
                    onChange={(e) => setCommentContent(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f41d1d] mb-4 resize-none"
                    required
                  />
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="px-6 py-3 bg-[#f41d1d] text-white font-semibold rounded-lg hover:bg-black transition-colors flex items-center gap-2"
                  >
                    <Send className="w-4 h-4" />
                    Post Comment
                  </motion.button>
                </form>

                {/* Comments List */}
                <div className="space-y-6">
                  {comments.map((comment) => (
                    <motion.div
                      key={comment.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-6"
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="w-10 h-10 bg-[#f41d1d] rounded-full flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold">{comment.author}</p>
                          <p className="text-sm text-gray-500">
                            {new Date(comment.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300">
                        {comment.content}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Related Posts */}
              {relatedPosts.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                >
                  <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    {relatedPosts.map((relatedPost) => (
                      <a
                        key={relatedPost.id}
                        href={`/blog/${relatedPost.slug}`}
                        className="group"
                      >
                        <div className="relative rounded-xl overflow-hidden mb-4">
                          <img
                            src={relatedPost.featuredImage}
                            alt={relatedPost.title}
                            className="w-full aspect-[4/3] object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        <span className="text-xs text-[#f41d1d] font-semibold uppercase">
                          {relatedPost.category}
                        </span>
                        <h4 className="font-bold mt-1 group-hover:text-[#f41d1d] transition-colors line-clamp-2">
                          {relatedPost.title}
                        </h4>
                      </a>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
