import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  Youtube,
  Instagram,
  Twitter,
  Facebook,
  Send,
  MapPin,
  Mail,
  Phone,
  ArrowRight,
  Heart,
} from 'lucide-react';
import { toast } from 'sonner';

export default function Footer() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-50px' });
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      toast.success('Thank you for subscribing!');
      setEmail('');
    }
  };

  const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Videos', href: '/videos' },
    { label: 'Blog', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ];

  const categories = [
    { label: 'Travel', href: '/blog?category=Travel' },
    { label: 'Tech', href: '/blog?category=Tech' },
    { label: 'Lifestyle', href: '/blog?category=Lifestyle' },
    { label: 'Food', href: '/blog?category=Food' },
    { label: 'Tips', href: '/blog?category=Tips' },
  ];

  const resources = [
    { label: 'Equipment', href: '#' },
    { label: 'Software', href: '#' },
    { label: 'Courses', href: '#' },
    { label: 'Collaborations', href: '#' },
  ];

  const legal = [
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
    { label: 'Cookie Policy', href: '#' },
  ];

  const socialLinks = [
    { icon: Youtube, href: 'https://youtube.com/@prayagrajcreator', label: 'YouTube' },
    { icon: Instagram, href: 'https://instagram.com/prayagrajcreator', label: 'Instagram' },
    { icon: Twitter, href: 'https://twitter.com/prayagrajcreator', label: 'Twitter' },
    { icon: Facebook, href: 'https://facebook.com/prayagrajcreator', label: 'Facebook' },
  ];

  return (
    <footer ref={sectionRef} className="bg-gray-900 text-white overflow-hidden">
      {/* Newsletter Section */}
      <div className="border-b border-gray-800">
        <div className="container-custom py-16">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                Subscribe to My Newsletter
              </h3>
              <p className="text-gray-400">
                Get the latest updates, behind-the-scenes content, and exclusive
                tips delivered to your inbox.
              </p>
            </motion.div>
            <motion.form
              onSubmit={handleSubscribe}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-6 py-4 bg-gray-800 rounded-full text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#f41d1d] transition-all"
                required
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-8 py-4 bg-[#f41d1d] text-white font-semibold rounded-full hover:bg-white hover:text-black transition-colors flex items-center justify-center gap-2"
              >
                Subscribe
                <Send className="w-4 h-4" />
              </motion.button>
            </motion.form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="container-custom py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-2"
          >
            <div className="flex items-center gap-2 mb-6">
              <div className="w-10 h-10 bg-[#f41d1d] rounded-lg flex items-center justify-center">
                <Youtube className="w-6 h-6 text-white" />
              </div>
              <span className="font-['Oswald'] font-bold text-xl">
                Prayagraj Creator
              </span>
            </div>
            <p className="text-gray-400 mb-6 max-w-sm">
              Sharing stories from Prayagraj, tech insights, and lifestyle
              content that inspires and entertains.
            </p>
            <div className="space-y-3 text-gray-400">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-[#f41d1d]" />
                <span>Prayagraj, Uttar Pradesh, India</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-[#f41d1d]" />
                <span>contact@prayagrajcreator.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-[#f41d1d]" />
                <span>+91 98765 43210</span>
              </div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <h4 className="font-semibold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#f41d1d] hover:translate-x-1 transition-all inline-flex items-center gap-1 group"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Categories */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <h4 className="font-semibold text-lg mb-6">Categories</h4>
            <ul className="space-y-3">
              {categories.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#f41d1d] hover:translate-x-1 transition-all inline-flex items-center gap-1 group"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Resources & Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <h4 className="font-semibold text-lg mb-6">Resources</h4>
            <ul className="space-y-3 mb-8">
              {resources.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#f41d1d] hover:translate-x-1 transition-all inline-flex items-center gap-1 group"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <h4 className="font-semibold text-lg mb-6">Legal</h4>
            <ul className="space-y-3">
              {legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-gray-400 hover:text-[#f41d1d] hover:translate-x-1 transition-all inline-flex items-center gap-1 group"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="text-gray-400 text-sm flex items-center gap-1"
            >
              © 2024 Prayagraj Creator. Made with
              <Heart className="w-4 h-4 text-[#f41d1d]" fill="#f41d1d" />
              in Prayagraj
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="flex items-center gap-4"
            >
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 hover:bg-[#f41d1d] hover:text-white transition-colors"
                  aria-label={social.label}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}
