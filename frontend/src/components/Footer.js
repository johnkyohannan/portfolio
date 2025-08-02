import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaTwitter, FaHeart } from 'react-icons/fa';
import { HiArrowUp, HiMail } from 'react-icons/hi';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: FaGithub, href: '#', label: 'GitHub' },
    { icon: FaLinkedin, href: '#', label: 'LinkedIn' },
    { icon: FaTwitter, href: '#', label: 'Twitter' },
  ];

  const quickLinks = [
    { href: '#about', label: 'About' },
    { href: '#projects', label: 'Projects' },
    { href: '#certifications', label: 'Certifications' },
    { href: '#artwork', label: 'Artwork' },
    { href: '#contact', label: 'Contact' },
  ];

  const scrollToSection = (href) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-midnight-900 text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500 to-electric-500" />
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="relative">
        {/* Main Footer Content */}
        <div className="container py-16">
          <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
            {/* Brand Section */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="mb-6">
                <h3 className="text-3xl font-bold font-display gradient-text-electric mb-4">
                  John K Yohannan
                </h3>
                <p className="text-xl text-gray-300 font-light mb-4">
                  Student & Passionate AI Learner
                </p>
                <p className="text-gray-400 leading-relaxed max-w-md">
                  Building the future through artificial intelligence, machine learning, 
                  and creative technology. Always learning, always creating, always innovating.
                </p>
              </div>

              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    className="group p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all duration-300 hover:scale-110"
                    aria-label={social.label}
                    whileHover={{ y: -2 }}
                  >
                    <social.icon className="h-5 w-5 text-gray-300 group-hover:text-electric-300 transition-colors" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-6 text-white">Quick Links</h4>
              <nav className="space-y-3">
                {quickLinks.map((link) => (
                  <button
                    key={link.href}
                    onClick={() => scrollToSection(link.href)}
                    className="block text-gray-300 hover:text-electric-300 transition-colors duration-200 hover:translate-x-1 transform"
                  >
                    {link.label}
                  </button>
                ))}
              </nav>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-6 text-white">Get In Touch</h4>
              <div className="space-y-4">
                <a
                  href="mailto:john.yohannan@email.com"
                  className="flex items-center text-gray-300 hover:text-electric-300 transition-colors duration-200 group"
                >
                  <HiMail className="h-5 w-5 mr-3 group-hover:scale-110 transition-transform" />
                  john.yohannan@email.com
                </a>
                <p className="text-gray-400 text-sm">
                  Available for remote collaborations and exciting AI projects.
                </p>
                <button
                  onClick={() => scrollToSection('#contact')}
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary-500 to-electric-500 hover:from-primary-600 hover:to-electric-600 rounded-lg text-white font-medium transition-all duration-200 hover:scale-105"
                >
                  Let's Connect
                </button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10">
          <div className="container py-6">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <motion.div
                className="flex items-center space-x-2 text-gray-400 text-sm"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                viewport={{ once: true }}
              >
                <span>© {currentYear} John K Yohannan. Made with</span>
                <FaHeart className="h-4 w-4 text-red-400 animate-pulse" />
                <span>and lots of ☕</span>
              </motion.div>

              <motion.div
                className="flex items-center space-x-6 text-sm"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.8 }}
                viewport={{ once: true }}
              >
                <span className="text-gray-400">
                  Built with React, FastAPI & MongoDB
                </span>
                <button
                  onClick={scrollToTop}
                  className="group flex items-center space-x-2 text-gray-300 hover:text-electric-300 transition-colors duration-200"
                  aria-label="Back to top"
                >
                  <span className="group-hover:translate-y-[-2px] transition-transform">
                    Back to top
                  </span>
                  <HiArrowUp className="h-4 w-4 group-hover:scale-110 transition-transform" />
                </button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Scroll to Top Button (Mobile) */}
        <motion.button
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 md:hidden w-12 h-12 bg-gradient-to-r from-primary-500 to-electric-500 hover:from-primary-600 hover:to-electric-600 text-white rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all duration-300 hover:scale-110 z-40"
          aria-label="Scroll to top"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <HiArrowUp className="h-6 w-6" />
        </motion.button>
      </div>
    </footer>
  );
};

export default Footer;