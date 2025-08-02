import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { HiDownload, HiEye, HiArrowDown } from 'react-icons/hi';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = [
    'https://images.unsplash.com/photo-1523961131990-5ea7c61b2107?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwxfHxBSSUyMHRlY2hub2xvZ3l8ZW58MHx8fHwxNzU0MTU4MDI3fDA&ixlib=rb-4.1.0&q=85',
    'https://images.unsplash.com/photo-1677442136019-21780ecad995?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njl8MHwxfHNlYXJjaHwyfHxBSSUyMHRlY2hub2xvZ3l8ZW58MHx8fHwxNzU0MTU4MDI3fDA&ixlib=rb-4.1.0&q=85',
    'https://images.unsplash.com/photo-1493612276216-ee3925520721?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NTY2Njd8MHwxfHNlYXJjaHwxfHxpbm5vdmF0aW9ufGVufDB8fHx8MTc1NDE1ODAzMnww&ixlib=rb-4.1.0&q=85'
  ];

  // Auto-rotate background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 8000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  const scrollToProjects = () => {
    document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownloadResume = () => {
    // This would typically link to a resume PDF
    alert('Resume download functionality will be implemented when you provide your resume PDF.');
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-2000 ${
              index === currentImageIndex ? 'opacity-30' : 'opacity-0'
            }`}
          >
            <img
              src={image}
              alt="Hero background"
              className="w-full h-full object-cover"
            />
          </div>
        ))}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-900/80 via-electric-900/70 to-lavender-900/80 dark:from-midnight-900/90 dark:via-midnight-800/80 dark:to-midnight-900/90"></div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 z-10">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            animate={{
              x: [0, 100, 0],
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 8 + i * 2,
              repeat: Infinity,
              delay: i * 1.5,
            }}
            style={{
              left: `${10 + i * 15}%`,
              top: `${20 + i * 10}%`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-20 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Profile Image Placeholder */}
          <motion.div
            className="w-32 h-32 mx-auto mb-8 rounded-full bg-gradient-to-br from-primary-400 to-electric-400 p-1 shadow-2xl"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <div className="w-full h-full rounded-full bg-gray-200 dark:bg-midnight-700 flex items-center justify-center">
              <span className="text-4xl font-bold text-gray-600 dark:text-gray-300">JK</span>
            </div>
          </motion.div>

          {/* Name */}
          <motion.h1
            className="heading-xl text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            John K Yohannan
          </motion.h1>

          {/* Tagline */}
          <motion.p
            className="text-xl md:text-2xl text-white/90 mb-8 font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Student & Passionate AI Learner
          </motion.p>

          {/* Description */}
          <motion.p
            className="text-lg text-white/80 mb-12 max-w-2xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.0 }}
          >
            Exploring the frontiers of artificial intelligence, machine learning, and creative technology. 
            Building the future through innovative projects and continuous learning.
          </motion.p>

          {/* Call-to-Action Buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.2 }}
          >
            <button
              onClick={scrollToProjects}
              className="group inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-gradient-to-r from-primary-500 to-electric-500 hover:from-primary-600 hover:to-electric-600 rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 focus-ring"
            >
              <HiEye className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              View My Work
            </button>
            <button
              onClick={handleDownloadResume}
              className="group inline-flex items-center px-8 py-4 text-lg font-semibold text-white border-2 border-white/30 hover:border-white/50 hover:bg-white/10 rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 hover:-translate-y-1 backdrop-blur-sm"
            >
              <HiDownload className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" />
              Download Resume
            </button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            className="flex justify-center space-x-6 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
          >
            {[
              { Icon: FaGithub, href: '#', label: 'GitHub' },
              { Icon: FaLinkedin, href: '#', label: 'LinkedIn' },
              { Icon: FaTwitter, href: '#', label: 'Twitter' },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                className="group p-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-full transition-all duration-300 hover:scale-110"
                aria-label={label}
              >
                <Icon className="h-6 w-6 text-white group-hover:text-electric-300 transition-colors" />
              </a>
            ))}
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            className="flex flex-col items-center text-white/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.6 }}
          >
            <span className="text-sm font-medium mb-2">Scroll to explore</span>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <HiArrowDown className="h-6 w-6" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;