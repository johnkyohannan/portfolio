import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useArtwork } from '../hooks/useApi';
import { HiX, HiPlus, HiPhotograph, HiZoomIn } from 'react-icons/hi';

const Artwork = () => {
  const [selectedArtwork, setSelectedArtwork] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const { data: artworkData, loading, error } = useArtwork();

  // Sample artwork data to show the structure
  const sampleArtwork = [
    {
      id: '1',
      title: 'Neural Network Visualization',
      description: 'Digital art representation of neural network connections and data flow.',
      image_url: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
      category: 'Digital',
      medium: 'Digital Painting',
      year_created: '2024',
    },
    {
      id: '2',
      title: 'AI Dreams',
      description: 'Abstract interpretation of artificial intelligence consciousness.',
      image_url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80',
      category: 'Digital',
      medium: '3D Render',
      year_created: '2024',
    },
    {
      id: '3',
      title: 'Data Landscape',
      description: 'Futuristic landscape inspired by data visualization concepts.',
      image_url: 'https://images.unsplash.com/photo-1516110833967-0b5716ca1387?w=800&q=80',
      category: 'Digital',
      medium: 'Digital Art',
      year_created: '2023',
    },
    {
      id: '4',
      title: 'Quantum Entanglement',
      description: 'Visual representation of quantum physics principles.',
      image_url: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&q=80',
      category: 'Abstract',
      medium: 'Digital Mixed Media',
      year_created: '2023',
    },
    {
      id: '5',
      title: 'Machine Learning Flow',
      description: 'Artistic visualization of machine learning algorithms at work.',
      image_url: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&q=80',
      category: 'Tech Art',
      medium: 'Digital Illustration',
      year_created: '2024',
    },
    {
      id: '6',
      title: 'Code Poetry',
      description: 'Beautiful visualization of programming concepts as art.',
      image_url: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&q=80',
      category: 'Tech Art',
      medium: 'Digital Design',
      year_created: '2023',
    },
  ];

  const artwork = artworkData && artworkData.length > 0 ? artworkData : sampleArtwork;
  const categories = ['all', ...new Set(artwork.map(art => art.category))];
  
  const filteredArtwork = artwork.filter(art => 
    activeCategory === 'all' || art.category === activeCategory
  );

  const handleAddArtwork = () => {
    alert('To add new artwork, you can use the backend API at /api/artwork with POST method. Check the backend documentation for the required fields.');
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
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">Loading artwork...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <section id="artwork" className="section-lg bg-gray-50 dark:bg-midnight-800">
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
              Creative <span className="text-gradient">Artwork</span>
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Where technology meets creativity. Explore my digital art, visualizations, 
              and creative interpretations of AI and technology concepts.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-500 to-electric-500 mx-auto rounded-full"></div>
          </motion.div>

          {/* Category Filter and Add Button */}
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
                  onClick={() => setActiveCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    activeCategory === category
                      ? 'bg-primary-600 text-white shadow-lg'
                      : 'bg-white dark:bg-midnight-700 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-midnight-600 border border-gray-300 dark:border-midnight-600'
                  }`}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>

            {/* Add Artwork Button */}
            <button
              onClick={handleAddArtwork}
              className="btn-secondary"
            >
              <HiPlus className="mr-2 h-5 w-5" />
              Add Artwork
            </button>
          </motion.div>

          {/* Artwork Gallery */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            layout
          >
            <AnimatePresence>
              {filteredArtwork.map((art, index) => (
                <motion.div
                  key={art.id}
                  className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  layout
                  onClick={() => setSelectedArtwork(art)}
                >
                  {/* Image */}
                  <div className="aspect-square overflow-hidden bg-gradient-to-br from-primary-100 to-electric-100 dark:from-primary-900 dark:to-electric-900">
                    <img
                      src={art.image_url}
                      alt={art.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                      <h3 className="text-lg font-bold mb-2">{art.title}</h3>
                      <p className="text-sm text-gray-200 mb-2 line-clamp-2">{art.description}</p>
                      <div className="flex items-center justify-between text-xs text-gray-300">
                        <span>{art.medium}</span>
                        <span>{art.year_created}</span>
                      </div>
                    </div>
                    
                    {/* Zoom Icon */}
                    <div className="absolute top-4 right-4 w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <HiZoomIn className="h-5 w-5 text-white" />
                    </div>
                  </div>

                  {/* Category Badge */}
                  <div className="absolute top-3 left-3 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-full text-xs text-white font-medium">
                    {art.category}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>

          {filteredArtwork.length === 0 && (
            <motion.div
              className="text-center py-16"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <HiPhotograph className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-600 dark:text-gray-300 mb-2">
                No artwork found
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Try adjusting your filters or add some new artwork!
              </p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Modal for Full-Screen View */}
      <AnimatePresence>
        {selectedArtwork && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedArtwork(null)}
          >
            <motion.div
              className="relative max-w-4xl max-h-[90vh] w-full"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedArtwork(null)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors duration-200 z-10"
              >
                <HiX className="h-8 w-8" />
              </button>

              {/* Image */}
              <div className="relative rounded-lg overflow-hidden shadow-2xl">
                <img
                  src={selectedArtwork.image_url}
                  alt={selectedArtwork.title}
                  className="w-full h-auto max-h-[80vh] object-contain"
                />
                
                {/* Info Overlay */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 text-white">
                  <h3 className="text-2xl font-bold mb-2">{selectedArtwork.title}</h3>
                  <p className="text-lg text-gray-200 mb-4">{selectedArtwork.description}</p>
                  <div className="flex items-center justify-between text-sm text-gray-300">
                    <div className="flex items-center space-x-4">
                      <span><strong>Medium:</strong> {selectedArtwork.medium}</span>
                      <span><strong>Year:</strong> {selectedArtwork.year_created}</span>
                    </div>
                    <span className="px-3 py-1 bg-primary-600 rounded-full text-white text-xs font-medium">
                      {selectedArtwork.category}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Artwork;