import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProjects } from '../hooks/useApi';
import { HiExternalLink, HiCode, HiStar, HiPlus } from 'react-icons/hi';
import { FaPython, FaReact, FaNodeJs, FaGithub } from 'react-icons/fa';
import { SiTensorflow, SiPytorch, SiOpenai, SiJupyter } from 'react-icons/si';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [showFeaturedOnly, setShowFeaturedOnly] = useState(false);
  const { data: projectsData, loading, error } = useProjects();

  // Sample project data to show the structure
  const sampleProjects = [
    {
      id: '1',
      title: 'AI-Powered Image Classifier',
      description: 'Deep learning model for classifying images using convolutional neural networks. Built with TensorFlow and deployed using Flask.',
      technologies: ['Python', 'TensorFlow', 'Flask', 'CNN'],
      github_url: '#',
      demo_url: '#',
      image_url: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=500&q=80',
      category: 'AI/ML',
      featured: true,
    },
    {
      id: '2',
      title: 'Natural Language Processing Chatbot',
      description: 'Intelligent chatbot using transformer models and OpenAI API for natural conversation and task assistance.',
      technologies: ['Python', 'OpenAI API', 'Transformers', 'FastAPI'],
      github_url: '#',
      demo_url: '#',
      image_url: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=500&q=80',
      category: 'AI/ML',
      featured: true,
    },
    {
      id: '3',
      title: 'Data Visualization Dashboard',
      description: 'Interactive dashboard for analyzing and visualizing complex datasets using React and D3.js.',
      technologies: ['React', 'D3.js', 'Python', 'Pandas'],
      github_url: '#',
      demo_url: '#',
      image_url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&q=80',
      category: 'Web',
      featured: false,
    },
  ];

  const projects = projectsData && projectsData.length > 0 ? projectsData : sampleProjects;
  const categories = ['all', ...new Set(projects.map(p => p.category))];

  const filteredProjects = projects.filter(project => {
    const matchesFilter = activeFilter === 'all' || project.category === activeFilter;
    const matchesFeatured = !showFeaturedOnly || project.featured;
    return matchesFilter && matchesFeatured;
  });

  const getTechIcon = (tech) => {
    const icons = {
      'Python': FaPython,
      'React': FaReact,
      'Node.js': FaNodeJs,
      'TensorFlow': SiTensorflow,
      'PyTorch': SiPytorch,
      'OpenAI API': SiOpenai,
      'Jupyter': SiJupyter,
    };
    return icons[tech] || HiCode;
  };

  const handleAddProject = () => {
    alert('To add a new project, you can use the backend API at /api/projects with POST method. Check the backend documentation for the required fields.');
  };

  if (loading) {
    return (
      <div className="section-lg bg-gray-50 dark:bg-midnight-800">
        <div className="container text-center">
          <div className="loading-dots">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Loading projects...</p>
        </div>
      </div>
    );
  }

  return (
    <section id="projects" className="section-lg bg-gray-50 dark:bg-midnight-800">
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
            My <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
            Explore my AI/ML experiments, web applications, and creative coding projects. 
            Each project represents a step in my learning journey.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-electric-500 mx-auto rounded-full"></div>
        </motion.div>

        {/* Filters and Controls */}
        <motion.div
          className="flex flex-col md:flex-row justify-between items-center mb-12 gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          {/* Category Filters */}
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  activeFilter === category
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'bg-white dark:bg-midnight-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-midnight-600 border border-gray-300 dark:border-midnight-600'
                }`}
              >
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex items-center gap-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={showFeaturedOnly}
                onChange={(e) => setShowFeaturedOnly(e.target.checked)}
                className="sr-only"
              />
              <div className={`relative w-12 h-6 rounded-full transition-colors duration-200 ${
                showFeaturedOnly ? 'bg-primary-600' : 'bg-gray-300 dark:bg-midnight-600'
              }`}>
                <div className={`absolute top-1 left-1 w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                  showFeaturedOnly ? 'transform translate-x-6' : ''
                }`}></div>
              </div>
              <span className="ml-2 text-sm text-gray-700 dark:text-gray-300 flex items-center">
                <HiStar className="mr-1 h-4 w-4" />
                Featured Only
              </span>
            </label>

            <button
              onClick={handleAddProject}
              className="btn-secondary text-sm py-2 px-4"
            >
              <HiPlus className="mr-2 h-4 w-4" />
              Add Project
            </button>
          </div>
        </motion.div>

        {/* Projects Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          layout
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                className="card overflow-hidden"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                layout
              >
                {/* Project Image */}
                <div className="relative overflow-hidden h-48 bg-gradient-to-br from-primary-100 to-electric-100 dark:from-primary-900 dark:to-electric-900">
                  {project.image_url ? (
                    <img
                      src={project.image_url}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <HiCode className="h-16 w-16 text-primary-600 dark:text-primary-400" />
                    </div>
                  )}
                  
                  {project.featured && (
                    <div className="absolute top-3 right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium flex items-center">
                      <HiStar className="mr-1 h-3 w-3" />
                      Featured
                    </div>
                  )}

                  {/* Overlay with Links */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center space-x-4">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-200"
                        aria-label="View on GitHub"
                      >
                        <FaGithub className="h-5 w-5" />
                      </a>
                    )}
                    {project.demo_url && (
                      <a
                        href={project.demo_url}
                        className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-200"
                        aria-label="View live demo"
                      >
                        <HiExternalLink className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Project Content */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 dark:bg-primary-900 text-primary-800 dark:text-primary-200">
                      {project.category}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {project.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.slice(0, 4).map((tech) => {
                      const IconComponent = getTechIcon(tech);
                      return (
                        <div
                          key={tech}
                          className="flex items-center px-2 py-1 bg-gray-100 dark:bg-midnight-700 rounded-md text-xs text-gray-700 dark:text-gray-300"
                        >
                          <IconComponent className="mr-1 h-3 w-3" />
                          {tech}
                        </div>
                      );
                    })}
                    {project.technologies.length > 4 && (
                      <span className="px-2 py-1 bg-gray-100 dark:bg-midnight-700 rounded-md text-xs text-gray-500 dark:text-gray-400">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex space-x-3">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        className="flex-1 btn-ghost text-center py-2"
                      >
                        <FaGithub className="mr-2 h-4 w-4" />
                        Code
                      </a>
                    )}
                    {project.demo_url && (
                      <a
                        href={project.demo_url}
                        className="flex-1 btn-primary text-center py-2"
                      >
                        <HiExternalLink className="mr-2 h-4 w-4" />
                        Demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <HiCode className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
              No projects found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try adjusting your filters or add some new projects!
            </p>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Projects;