import React, { useState, useEffect } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Certifications from './components/Certifications';
import Artwork from './components/Artwork';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ThemeProvider from './components/ThemeProvider';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-electric-50 dark:from-midnight-900 dark:to-midnight-800 flex items-center justify-center">
        <div className="text-center">
          <div className="loading-dots">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <p className="mt-4 text-lg font-medium text-gray-700 dark:text-gray-300">
            Loading Portfolio...
          </p>
        </div>
      </div>
    );
  }

  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gradient-to-br from-primary-50 to-electric-50 dark:from-midnight-900 dark:to-midnight-800">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Projects />
          <Certifications />
          <Artwork />
          <Contact />
        </main>
        <Footer />
      </div>
    </ThemeProvider>
  );
}

export default App;