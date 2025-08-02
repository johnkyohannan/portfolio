import React from 'react';
import { motion } from 'framer-motion';
import { useAbout } from '../hooks/useApi';
import { HiAcademicCap, HiLightBulb, HiCode, HiHeart } from 'react-icons/hi';
import { FaPython, FaReact, FaNodeJs, FaDocker, FaGitAlt, FaDatabase } from 'react-icons/fa';
import { SiTensorflow, SiPytorch, SiOpenai, SiJupyter, SiPandas, SiNumpy } from 'react-icons/si';

const About = () => {
  const { data: aboutData, loading, error } = useAbout();

  const defaultSkills = [
    { name: 'Python', icon: FaPython, category: 'Languages' },
    { name: 'JavaScript', icon: FaReact, category: 'Languages' },
    { name: 'React', icon: FaReact, category: 'Frontend' },
    { name: 'Node.js', icon: FaNodeJs, category: 'Backend' },
    { name: 'TensorFlow', icon: SiTensorflow, category: 'AI/ML' },
    { name: 'PyTorch', icon: SiPytorch, category: 'AI/ML' },
    { name: 'OpenAI API', icon: SiOpenai, category: 'AI/ML' },
    { name: 'Jupyter', icon: SiJupyter, category: 'Tools' },
    { name: 'Pandas', icon: SiPandas, category: 'Data Science' },
    { name: 'NumPy', icon: SiNumpy, category: 'Data Science' },
    { name: 'Docker', icon: FaDocker, category: 'DevOps' },
    { name: 'Git', icon: FaGitAlt, category: 'Tools' },
  ];

  const interests = [
    {
      icon: HiAcademicCap,
      title: 'Continuous Learning',
      description: 'Always exploring new technologies and methodologies in AI and software development.',
    },
    {
      icon: HiLightBulb,
      title: 'Innovation',
      description: 'Passionate about creating solutions that push the boundaries of what\'s possible.',
    },
    {
      icon: HiCode,
      title: 'Problem Solving',
      description: 'Enjoy tackling complex challenges and finding elegant solutions through code.',
    },
    {
      icon: HiHeart,
      title: 'Creative Expression',
      description: 'Combining technology with creativity through digital art and interactive projects.',
    },
  ];

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
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Loading about information...</p>
        </div>
      </div>
    );
  }

  return (
    <section id="about" className="section-lg bg-white dark:bg-midnight-900">
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
            About <span className="text-gradient">Me</span>
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-electric-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Column - Bio and Image */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            {/* Profile Image Placeholder */}
            <div className="w-64 h-64 mx-auto lg:mx-0 mb-8 rounded-2xl bg-gradient-to-br from-primary-100 to-electric-100 dark:from-primary-900 dark:to-electric-900 p-6 shadow-lg">
              <div className="w-full h-full rounded-xl bg-gradient-to-br from-primary-500 to-electric-500 flex items-center justify-center">
                <span className="text-6xl font-bold text-white">JK</span>
              </div>
            </div>

            {/* Bio */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                {aboutData?.bio || 
                  "Hello! I'm John K Yohannan, a dedicated student and passionate AI learner on an exciting journey through the world of artificial intelligence and machine learning. My curiosity drives me to explore cutting-edge technologies and push the boundaries of what's possible."
                }
              </p>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                When I'm not diving deep into neural networks or experimenting with new algorithms, you'll find me creating digital artwork, contributing to open-source projects, and sharing my learning journey with the community.
              </p>
            </div>
          </motion.div>

          {/* Right Column - Interests */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-8">What I'm Passionate About</h3>
            <div className="space-y-6">
              {interests.map((interest, index) => (
                <motion.div
                  key={interest.title}
                  className="flex items-start space-x-4 p-6 rounded-xl bg-gray-50 dark:bg-midnight-800 hover:shadow-lg transition-shadow duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.1 * index }}
                  viewport={{ once: true }}
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-primary-500 to-electric-500 rounded-lg flex items-center justify-center">
                    <interest.icon className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                      {interest.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                      {interest.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Skills Section */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-12">
            Technical Skills & Tools
          </h3>
          
          {/* Skills Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {defaultSkills.map((skill, index) => (
              <motion.div
                key={skill.name}
                className="group bg-white dark:bg-midnight-800 p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-200 dark:border-midnight-700"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 * index }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05 }}
              >
                <div className="text-center">
                  <skill.icon className="h-10 w-10 mx-auto mb-3 text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform duration-300" />
                  <h4 className="font-semibold text-gray-900 dark:text-white mb-1">{skill.name}</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{skill.category}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
            Interested in collaborating or learning more about my journey?
          </p>
          <button
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="btn-primary"
          >
            Let's Connect
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default About;