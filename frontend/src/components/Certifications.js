import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useCertifications } from '../hooks/useApi';
import { HiExternalLink, HiBadgeCheck, HiCalendar, HiPlus, HiAcademicCap } from 'react-icons/hi';
import { SiCoursera, SiUdemy, SiGooglecloud, SiAmazonaws, SiMicrosoft } from 'react-icons/si';

const Certifications = () => {
  const { data: certificationsData, loading, error } = useCertifications();

  // Sample certifications data to show the structure
  const sampleCertifications = [
    {
      id: '1',
      title: 'Machine Learning Specialization',
      issuer: 'Coursera - Stanford University',
      date_earned: '2024',
      credential_id: 'COURSERA_ML_2024',
      credential_url: '#',
      badge_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    },
    {
      id: '2',
      title: 'Deep Learning Specialization',
      issuer: 'Coursera - DeepLearning.AI',
      date_earned: '2024',
      credential_id: 'DL_AI_2024',
      credential_url: '#',
      badge_url: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=100&q=80',
    },
    {
      id: '3',
      title: 'Python for Data Science and AI',
      issuer: 'IBM - Coursera',
      date_earned: '2023',
      credential_id: 'IBM_PYTHON_2023',
      credential_url: '#',
      badge_url: 'https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=100&q=80',
    },
    {
      id: '4',
      title: 'Google AI Fundamentals',
      issuer: 'Google Cloud',
      date_earned: '2023',
      credential_id: 'GOOGLE_AI_2023',
      credential_url: '#',
      badge_url: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=100&q=80',
    },
    {
      id: '5',
      title: 'Complete Web Development Bootcamp',
      issuer: 'Udemy',
      date_earned: '2023',
      credential_id: 'UDEMY_WEB_2023',
      credential_url: '#',
      badge_url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=100&q=80',
    },
    {
      id: '6',
      title: 'Neural Networks and Deep Learning',
      issuer: 'Coursera',
      date_earned: '2023',
      credential_id: 'COURSERA_NN_2023',
      credential_url: '#',
      badge_url: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=100&q=80',
    },
  ];

  const certifications = certificationsData && certificationsData.length > 0 ? certificationsData : sampleCertifications;

  const getIssuerIcon = (issuer) => {
    const lowerIssuer = issuer.toLowerCase();
    if (lowerIssuer.includes('coursera')) return SiCoursera;
    if (lowerIssuer.includes('udemy')) return SiUdemy;
    if (lowerIssuer.includes('google')) return SiGooglecloud;
    if (lowerIssuer.includes('aws') || lowerIssuer.includes('amazon')) return SiAmazonaws;
    if (lowerIssuer.includes('microsoft')) return SiMicrosoft;
    return HiAcademicCap;
  };

  const handleAddCertification = () => {
    alert('To add a new certification, you can use the backend API at /api/certifications with POST method. Check the backend documentation for the required fields.');
  };

  if (loading) {
    return (
      <div className="section-lg bg-white dark:bg-midnight-900">
        <div className="container text-center">
          <div className="loading-dots">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Loading certifications...</p>
        </div>
      </div>
    );
  }

  return (
    <section id="certifications" className="section-lg bg-white dark:bg-midnight-900">
      <div className="container">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="heading-lg text-gray-900 dark:text-white mb-6">
            Certifications & <span className="text-gradient">Learning</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            My commitment to continuous learning through structured courses and certifications 
            from leading educational platforms and technology companies.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-electric-500 mx-auto rounded-full"></div>
        </motion.div>

        {/* Add Certification Button */}
        <motion.div
          className="flex justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <button
            onClick={handleAddCertification}
            className="btn-secondary"
          >
            <HiPlus className="mr-2 h-5 w-5" />
            Add New Certification
          </button>
        </motion.div>

        {/* Certifications Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((cert, index) => {
            const IssuerIcon = getIssuerIcon(cert.issuer);
            
            return (
              <motion.div
                key={cert.id}
                className="card overflow-hidden hover:shadow-2xl group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.02 }}
              >
                {/* Badge/Header */}
                <div className="relative p-6 bg-gradient-to-br from-primary-50 to-electric-50 dark:from-primary-900/20 dark:to-electric-900/20">
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-electric-500 rounded-xl flex items-center justify-center shadow-lg">
                      <IssuerIcon className="h-6 w-6 text-white" />
                    </div>
                    <div className="flex items-center text-sm text-gray-600 dark:text-gray-300">
                      <HiCalendar className="mr-1 h-4 w-4" />
                      {cert.date_earned}
                    </div>
                  </div>
                  
                  {cert.badge_url && (
                    <div className="absolute -bottom-6 right-6 w-12 h-12 rounded-full overflow-hidden shadow-lg border-4 border-white dark:border-midnight-800 group-hover:scale-110 transition-transform duration-300">
                      <img
                        src={cert.badge_url}
                        alt="Certification badge"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 pt-8">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                    {cert.title}
                  </h3>
                  
                  <div className="flex items-center mb-4">
                    <HiBadgeCheck className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                    <p className="text-gray-600 dark:text-gray-300 font-medium">
                      {cert.issuer}
                    </p>
                  </div>

                  {cert.credential_id && (
                    <div className="mb-4">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Credential ID: 
                        <span className="font-mono ml-1 text-gray-700 dark:text-gray-300">
                          {cert.credential_id}
                        </span>
                      </p>
                    </div>
                  )}

                  {/* Action Button */}
                  {cert.credential_url && (
                    <div className="pt-4 border-t border-gray-200 dark:border-midnight-700">
                      <a
                        href={cert.credential_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-primary-600 hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300 font-medium transition-colors duration-200 group-hover:translate-x-1 transform"
                      >
                        View Credential
                        <HiExternalLink className="ml-2 h-4 w-4 group-hover:scale-110 transition-transform" />
                      </a>
                    </div>
                  )}
                </div>

                {/* Hover Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-electric-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </motion.div>
            );
          })}
        </div>

        {certifications.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <HiAcademicCap className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
              No certifications found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Add your certifications to showcase your learning journey!
            </p>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16 pt-16 border-t border-gray-200 dark:border-midnight-700"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Resume & Complete Profile
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-8">
              Want to see my complete educational background and professional experience? 
              Download my full resume for detailed information.
            </p>
            <button
              onClick={() => alert('Resume download will be available when you provide your resume PDF.')}
              className="btn-primary"
            >
              Download Full Resume
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certifications;