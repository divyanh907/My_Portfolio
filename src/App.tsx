import React, { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import SpaceBackground from './components/SpaceBackground';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import OpenSource from './components/OpenSource';
import Timeline from './components/Timeline';
import Insights from './components/Insights';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Certifications from './components/Certifications';
import LoadingScreen from './components/LoadingScreen';

const App = React.memo(() => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Show loading screen for 3 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
      <div className="min-h-screen relative">
        {isLoading && <LoadingScreen />}
        <div className={`transition-opacity duration-1000 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
          <SpaceBackground />
          <div className="relative z-10">
            <Header />
            <Hero />
            <About />
            <Skills />
            <Projects />
            <OpenSource />
            <Timeline />
            <Insights />
            <Certifications />
            <Contact />
            <Footer />
          </div>
        </div>
      </div>
    </ThemeProvider>
  );
});

App.displayName = 'App';

export default App;