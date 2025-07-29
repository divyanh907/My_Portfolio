import React, { useEffect, useState, useMemo, useCallback } from "react";
import {
  Download,
  ChevronDown,
  Mail,
  Github,
  Linkedin,
  Figma,
  Sparkles,
  Code,
  Palette,
  BookOpen,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";

const Hero = React.memo(() => {
  const { isDark } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentTitleIndex, setCurrentTitleIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showArrow, setShowArrow] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const titles = useMemo(
    () => [
      "Frontend Developer",
      "UI/UX Designer",
      "CS Student",
      "Open Source Learner",
    ],
    []
  );

  const titleIcons = useMemo(
    () => [Code, Palette, BookOpen, Sparkles],
    []
  );

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const aboutSection = document.querySelector("#about");
          if (aboutSection) {
            const aboutTop = (aboutSection as HTMLElement).offsetTop;
            setShowArrow(window.scrollY < aboutTop - 200);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const currentTitle = titles[currentTitleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (isTyping) {
      if (displayText.length < currentTitle.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentTitle.slice(0, displayText.length + 1));
        }, 100);
      } else {
        timeout = setTimeout(() => setIsTyping(false), 1500);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, 40);
      } else {
        setCurrentTitleIndex((prev) => (prev + 1) % titles.length);
        setIsTyping(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isTyping, currentTitleIndex, titles]);

  const scrollToProjects = useCallback(() => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const scrollToAbout = useCallback(() => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const socialLinks = useMemo(
    () => [
      {
        name: "Email",
        icon: Mail,
        href: "mailto:divyanshjaindpsschool@gmail.com",
        color: isDark ? "hover:text-red-400" : "hover:text-red-600",
        bgColor: isDark ? "hover:bg-red-500/20" : "hover:bg-red-500/10",
      },
      {
        name: "GitHub",
        icon: Github,
        href: "https://github.com/divyanh907",
        color: isDark ? "hover:text-gray-300" : "hover:text-gray-700",
        bgColor: isDark ? "hover:bg-gray-500/20" : "hover:bg-gray-500/10",
      },
      {
        name: "LinkedIn",
        icon: Linkedin,
        href: "https://www.linkedin.com/in/DivyanshJain0907",
        color: isDark ? "hover:text-blue-400" : "hover:text-blue-600",
        bgColor: isDark ? "hover:bg-blue-500/20" : "hover:bg-blue-500/10",
      },
      {
        name: "Figma",
        icon: Figma,
        href: "https://www.behance.net/divyanshjain0907",
        color: isDark ? "hover:text-purple-400" : "hover:text-purple-600",
        bgColor: isDark ? "hover:bg-purple-500/20" : "hover:bg-purple-500/10",
      },
    ],
    [isDark]
  );

  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16 relative overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-transparent">
        <div 
          className={`absolute inset-0 opacity-20 transition-all duration-1000 ${
            isDark 
              ? "bg-gradient-to-br from-blue-500/20 via-purple-500/20 to-pink-500/20" 
              : "bg-gradient-to-br from-blue-100/50 via-purple-100/50 to-pink-100/50"
          }`}
          style={{
            transform: `translate(${(mousePosition.x - window.innerWidth / 2) * 0.02}px, ${(mousePosition.y - window.innerHeight / 2) * 0.02}px)`
          }}
        />
      </div>

      {/* Floating elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 rounded-full opacity-30 animate-pulse ${
              isDark ? "bg-blue-400" : "bg-blue-600"
            }`}
            style={{
              left: `${20 + (i * 15)}%`,
              top: `${30 + (i * 10)}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + i}s`
            }}
          />
        ))}
      </div>

      <div className="max-w-5xl mx-auto px-4 text-center space-y-8 relative z-10">
        {/* Greeting with enhanced animation */}
        <div className="space-y-2">
          <p className={`text-lg font-medium tracking-wide transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          } ${isDark ? "text-blue-400" : "text-blue-600"}`}>
            <span className="inline-block animate-bounce mr-2">👋</span>
            Hello, I'm
          </p>
          
          {/* Name with enhanced styling */}
          <h1 className={`text-6xl md:text-8xl font-bold font-heading transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
          } ${isDark ? "text-heading-dark" : "text-heading-light"} relative`}>
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Divyansh Jain
            </span>
            <div className={`absolute -inset-1 blur-xl opacity-20 ${
              isDark ? "bg-gradient-to-r from-blue-500 to-purple-500" : "bg-gradient-to-r from-blue-400 to-purple-400"
            }`} />
          </h1>
        </div>

        {/* Role with icon */}
        <div className={`text-2xl font-light h-16 flex justify-center items-center transition-all duration-1000 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        } ${isDark ? "text-gray-300" : "text-gray-600"}`}>
          <span className="mr-3">I'm a</span>
          <div className="relative inline-flex items-center">
            <span className="font-semibold mr-2">{displayText}</span>
            <span className="ml-1 animate-pulse text-blue-500">|</span>
            {(() => {
              const IconComponent = titleIcons[currentTitleIndex];
              return IconComponent ? (
                <div className="ml-3 p-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                  <IconComponent size={20} />
                </div>
              ) : null;
            })()}
          </div>
        </div>

        {/* Enhanced description */}
        <p className={`max-w-3xl mx-auto text-xl leading-relaxed transition-all duration-1000 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        } ${isDark ? "text-gray-400" : "text-gray-600"}`}>
          Enthusiastic and detail-oriented Computer Science student with hands-on experience in 
          <span className="font-semibold text-blue-500"> frontend development</span>, 
          <span className="font-semibold text-purple-500"> UI/UX design</span>, and 
          <span className="font-semibold text-pink-500"> team-based project execution</span>.
        </p>

        {/* Enhanced CTA buttons */}
        <div className="flex justify-center gap-6 flex-wrap pt-4">
          <a
            href="mailto:divyanshjaindpsschool@gmail.com"
            className={`px-8 py-4 rounded-full flex items-center gap-3 shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl ${
              isDark 
                ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600" 
                : "bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:from-blue-700 hover:to-purple-700"
            }`}
          >
            <Mail size={20} /> 
            <span className="font-semibold">Email Me</span>
          </a>
          <button
            onClick={scrollToProjects}
            className={`px-8 py-4 rounded-full font-semibold shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl border-2 ${
              isDark 
                ? "border-white/30 text-white hover:bg-white/10 hover:border-white/50" 
                : "border-gray-900/30 text-gray-900 hover:bg-gray-900/10 hover:border-gray-900/50"
            }`}
          >
            View My Work
          </button>
        </div>

        {/* Enhanced social links */}
        <div className="flex justify-center gap-6 pt-8">
          {socialLinks.map((social, index) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`p-4 rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-12 ${
                isDark
                  ? "bg-white/10 border border-white/20 text-gray-300 hover:bg-white/20"
                  : "bg-gray-100/80 border border-gray-200 text-gray-600 hover:bg-gray-200/80"
              } ${social.color} ${social.bgColor}`}
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              <social.icon size={24} />
            </a>
          ))}
        </div>
      </div>

      {/* Enhanced scroll arrow */}
      <div
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-500 ${
          showArrow ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {/* <button
          onClick={scrollToAbout}
          className={`p-0.5 rounded-full animate-bounce transition-all duration-300 hover:scale-110 hover:animate-none ${
            isDark
              ? "bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40"
              : "bg-gray-100/80 hover:bg-gray-200/80 text-gray-900 border border-gray-200 hover:border-gray-300"
          }`}
        >
          <ChevronDown size={20} />
        </button> */}
      </div>
    </section>
  );
});

Hero.displayName = "Hero";
export default Hero;
