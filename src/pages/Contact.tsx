import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  MapPin,
  Mail,
  Phone,
  Send,
  Youtube,
  Instagram,
  Twitter,
  Facebook,
} from 'lucide-react';
import { toast } from 'sonner';

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    document.title = 'Contact - Prayagraj Creator';
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    toast.success('Message sent successfully! We\'ll get back to you soon.');
    setFormData({ name: '', email: '', subject: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Location',
      content: 'Prayagraj, Uttar Pradesh, India',
      href: '#',
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'contact@prayagrajcreator.com',
      href: 'mailto:contact@prayagrajcreator.com',
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+91 98765 43210',
      href: 'tel:+919876543210',
    },
  ];

  const socialLinks = [
    { icon: Youtube, href: 'https://youtube.com/@prayagrajcreator', label: 'YouTube' },
    { icon: Instagram, href: 'https://instagram.com/prayagrajcreator', label: 'Instagram' },
    { icon: Twitter, href: 'https://twitter.com/prayagrajcreator', label: 'Twitter' },
    { icon: Facebook, href: 'https://facebook.com/prayagrajcreator', label: 'Facebook' },
  ];

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
              <span className="section-label mb-4 block">Get in Touch</span>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Contact <span className="text-[#f41d1d]">Us</span>
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                Have a question, collaboration idea, or just want to say hi?
                We&apos;d love to hear from you!
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <section ref={sectionRef} className="py-16">
          <div className="container-custom">
            <div className="grid lg:grid-cols-2 gap-16">
              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-3xl font-bold mb-6">
                  Let&apos;s <span className="text-[#f41d1d]">Connect</span>
                </h2>
                <p className="text-gray-600 dark:text-gray-300 mb-8">
                  Whether you&apos;re interested in collaborations, have questions
                  about my content, or just want to chat about Prayagraj, feel
                  free to reach out. I try to respond to all messages within 24-48
                  hours.
                </p>

                {/* Contact Cards */}
                <div className="space-y-4 mb-8">
                  {contactInfo.map((item, index) => (
                    <motion.a
                      key={item.title}
                      href={item.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : {}}
                      transition={{ delay: 0.2 + index * 0.1 }}
                      whileHover={{ x: 5 }}
                      className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl group"
                    >
                      <div className="w-12 h-12 bg-[#f41d1d]/10 rounded-full flex items-center justify-center group-hover:bg-[#f41d1d] transition-colors">
                        <item.icon className="w-6 h-6 text-[#f41d1d] group-hover:text-white transition-colors" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">{item.title}</p>
                        <p className="font-semibold">{item.content}</p>
                      </div>
                    </motion.a>
                  ))}
                </div>

                {/* Social Links */}
                <div>
                  <p className="text-sm text-gray-500 mb-4">Follow me on:</p>
                  <div className="flex gap-4">
                    {socialLinks.map((social, index) => (
                      <motion.a
                        key={social.label}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        initial={{ opacity: 0, scale: 0 }}
                        animate={isInView ? { opacity: 1, scale: 1 } : {}}
                        transition={{ delay: 0.5 + index * 0.1, type: 'spring' }}
                        whileHover={{ scale: 1.1, y: -2 }}
                        whileTap={{ scale: 0.9 }}
                        className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center text-gray-600 dark:text-gray-300 hover:bg-[#f41d1d] hover:text-white transition-colors"
                        aria-label={social.label}
                      >
                        <social.icon className="w-5 h-5" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="bg-gray-50 dark:bg-gray-800 rounded-3xl p-8"
              >
                <h3 className="text-2xl font-bold mb-6">Send a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Your Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="w-full px-4 py-3 bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f41d1d] transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Your Email
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f41d1d] transition-all"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f41d1d] transition-all"
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="collaboration">Collaboration</option>
                      <option value="question">General Question</option>
                      <option value="feedback">Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Your message..."
                      rows={5}
                      className="w-full px-4 py-3 bg-white dark:bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f41d1d] transition-all resize-none"
                      required
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#f41d1d] text-white font-semibold rounded-lg hover:bg-black transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Send Message
                      </>
                    )}
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="container-custom">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl overflow-hidden"
            >
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d115408.23982810194!2d81.7234629!3d25.4021975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x398534c9b20bd49f%3A0xa2237856ad4041a!2sPrayagraj%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1704067200000!5m2!1sen!2sin"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Prayagraj Location"
              />
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
