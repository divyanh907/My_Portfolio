import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { motion, AnimatePresence } from "framer-motion";

const Header = React.memo(() => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { isDark, toggleTheme } = useTheme();

  const navItems = useMemo(
    () => [
      { name: "About", href: "#about" },
      { name: "Skills", href: "#skills" },
      { name: "Projects", href: "#projects" },
      { name: "Open Source", href: "#open-source" },
      { name: "Experience", href: "#experience" },
      { name: "Insights", href: "#insights" },
      { name: "Certifications", href: "#certifications" },
      { name: "Contact", href: "#contact" },
    ],
    []
  );

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = useCallback((href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    setIsMenuOpen(false);
  }, []);

  const scrollToHome = useCallback(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const headerStyles = useMemo(() => {
    return scrolled
      ? isDark
        ? "bg-gradient-to-br from-black via-[#0f0f0f] to-black/80 backdrop-blur-lg shadow-xl border-b border-white/10"
        : "bg-gradient-to-br from-white via-[#f9f9f9] to-white/80 backdrop-blur-lg shadow-xl border-b border-gray-200"
      : "bg-transparent";
  }, [scrolled, isDark]);

  const textColor = isDark ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-black";

  return (
    <motion.header
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 ${headerStyles} transition-all duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <button onClick={scrollToHome} className="flex items-center space-x-2">
            <img src="/images/others/logo.png" alt="Logo" className="h-9 w-auto hover:scale-105 transition-transform duration-200" />
            
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item, index) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                whileHover={{ scale: 1.08 }}
                className={`${textColor} relative group font-medium transition-all`}
              >
                {item.name}
                <motion.span
                  className={`absolute -bottom-1 left-0 w-0 h-0.5 ${isDark ? "bg-cyan-400" : "bg-pink-600"} rounded-full group-hover:w-full transition-all duration-300`}
                />
              </motion.button>
            ))}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`ml-4 p-2 rounded-full border transition-all duration-300 ${
                isDark
                  ? "border-white/10 bg-white/10 hover:bg-white/20 text-white"
                  : "border-gray-300 bg-white hover:bg-gray-100 text-gray-800"
              }`}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
          </nav>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full border transition-all duration-300 ${
                isDark
                  ? "border-white/10 bg-white/10 hover:bg-white/20 text-white"
                  : "border-gray-300 bg-white hover:bg-gray-100 text-gray-800"
              }`}
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <button
              className={`p-2 ${isDark ? "text-white" : "text-gray-900"}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Nav */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.nav
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className={`md:hidden rounded-xl overflow-hidden shadow-lg mt-2 ${
                isDark ? "bg-black/90" : "bg-white/90"
              } backdrop-blur-lg`}
            >
              <div className="flex flex-col p-4 space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.name}
                    onClick={() => scrollToSection(item.href)}
                    className={`text-left text-sm font-medium px-2 py-2 rounded-md ${
                      isDark ? "text-gray-300 hover:text-white" : "text-gray-700 hover:text-black"
                    } transition-all`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </motion.header>
  );
});

Header.displayName = "Header";

export default Header;
