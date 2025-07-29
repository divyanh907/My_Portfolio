import React, { useEffect, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";

const fullName = "Divyansh Jain";

const LoadingScreen = React.memo(() => {
  const { isDark } = useTheme();
  const [isVisible, setIsVisible] = useState(true);
  const [textIndex, setTextIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    if (isTyping && textIndex < fullName.length) {
      const timer = setTimeout(() => {
        setDisplayText(fullName.slice(0, textIndex + 1));
        setTextIndex(textIndex + 1);
      }, 120);
      return () => clearTimeout(timer);
    } else if (isTyping && textIndex >= fullName.length) {
      const timer = setTimeout(() => {
        setIsTyping(false);
      }, 800);
      return () => clearTimeout(timer);
    } else if (!isTyping) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, [textIndex, isTyping]);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorTimer);
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-all duration-1000 ${
      isDark 
        ? "bg-gradient-to-b from-gray-900 to-gray-800" 
        : "bg-gradient-to-b from-white to-gray-50"
    }`}>
      {/* Simple background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, ${isDark ? '#3b82f6' : '#1e40af'} 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="text-center relative z-10">
        <div className="relative">
          {/* Subtle glow effect */}
          <div className={`absolute inset-0 blur-xl opacity-20 ${
            isDark ? "bg-blue-400" : "bg-blue-600"
          }`} style={{
            transform: "translate(-50%, -50%)",
            left: "50%",
            top: "50%",
            width: "150%",
            height: "150%"
          }} />
          
          <h1 className={`text-5xl md:text-7xl font-bold tracking-wide transition-all duration-500 relative z-10 ${
            isDark ? "text-white" : "text-gray-900"
          }`}>
            {displayText}
            <span className={`ml-1 transition-opacity duration-200 ${
              showCursor ? "opacity-100" : "opacity-0"
            } ${isDark ? "text-blue-400" : "text-blue-600"}`}>
              |
            </span>
          </h1>
          
          {/* Simple progress indicator */}
          <div className="flex justify-center mt-8 space-x-2">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  textIndex >= fullName.length 
                    ? (isDark ? "bg-blue-400" : "bg-blue-600")
                    : (isDark ? "bg-gray-600" : "bg-gray-300")
                }`}
                style={{ 
                  animationDelay: `${i * 200}ms`,
                  animation: textIndex >= fullName.length ? "pulse 1.5s infinite" : "none"
                }}
              />
            ))}
          </div>
        </div>

        {/* Loading text */}
        <div className={`mt-6 transition-all duration-700 delay-500 ${
          textIndex >= fullName.length ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
        }`}>
          <p className={`text-sm font-medium ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}>
            Loading...
          </p>
        </div>
      </div>
    </div>
  );
});

LoadingScreen.displayName = "LoadingScreen";
export default LoadingScreen; 