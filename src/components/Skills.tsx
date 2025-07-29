import React, { useMemo } from "react";
import { useTheme } from "../contexts/ThemeContext";
import {
  useScrollAnimation,
  useStaggeredAnimation,
} from "../hooks/useScrollAnimation";
import { motion } from "framer-motion";

const Skills = React.memo(() => {
  const { isDark } = useTheme();

  const [titleRef, titleVisible] = useScrollAnimation();

  const skillCategories = useMemo(
    () => [
      {
        title: "Programming Languages",
        skills: [
          { name: "C++", level: 85 },
          { name: "Python", level: 80 },
          { name: "Java", level: 75 },
        ],
      },
      {
        title: "Frontend & UI/UX",
        skills: [
          { name: "HTML", level: 90 },
          { name: "CSS", level: 85 },
          { name: "JavaScript", level: 80 },
          { name: "React.js", level: 75 },
          { name: "Figma", level: 90 },
        ],
      },
      {
        title: "Databases & Tools",
        skills: [
          { name: "SQL", level: 75 },
          { name: "MySQL", level: 70 },
          { name: "Microsoft Excel", level: 90 },
        ],
      },
      {
        title: "Version Control & Collaboration",
        skills: [
          { name: "Git", level: 80 },
          { name: "GitHub", level: 80 },
        ],
      },
    ],
    []
  );

  const [categoriesRef, visibleCategories] = useStaggeredAnimation(
    skillCategories.length
  );

  return (
    <section
      id="skills"
      className={`py-20 relative transition-colors duration-700 ${
        isDark
          // ? "bg-gradient-to-b from-gray-950 via-gray-900 to-black text-white"
          // : "bg-gradient-to-b from-blue-100 via-white to-blue-50 text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ease-out ${
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2
            className={`text-4xl sm:text-5xl font-extrabold mb-4 tracking-tight ${
              isDark ? "text-white" : "text-gray-900"
            }`}
          >
            Technical Skills
          </h2>
          <p className={`text-lg max-w-2xl mx-auto ${
            isDark ? "text-gray-400" : "text-gray-600"
          }`}>
            Technologies and tools I use to create beautiful, user-friendly interfaces
          </p>
        </div>

        <div
          ref={categoriesRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              initial={{ opacity: 0, y: 40 }}
              animate={visibleCategories[categoryIndex] ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: categoryIndex * 0.15, duration: 0.6 }}
              className={`group ${
                isDark
                  ? "bg-white/5 border border-white/10"
                  : "bg-white border border-gray-200"
              } backdrop-blur-xl rounded-2xl p-6 shadow-lg hover:scale-105 transition-transform duration-300 hover:shadow-2xl hover:border-teal-400`}
            >
              <div className="text-center mb-6">
                <h3 className={`text-xl font-semibold ${
                  isDark ? "text-heading-dark" : "text-heading-light"
                } font-heading group-hover:text-teal-400 transition-colors`}>
                  {category.title}
                </h3>
              </div>
              <div className="grid gap-6">
                {category.skills.map((skill, skillIndex) => (
                  <div
                    key={skillIndex}
                    className="flex flex-col items-center hover:scale-105 transition-transform duration-300"
                  >
                    <div className="relative w-20 h-20">
                      <svg className="absolute top-0 left-0 w-full h-full" viewBox="0 0 36 36">
                        <path
                          className={`${isDark ? "text-gray-800" : "text-gray-300"}`}
                          stroke="currentColor"
                          strokeWidth="3"
                          fill="none"
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                        <path
                          className="stroke-current "
                          strokeWidth="3"
                          fill="none"
                          strokeDasharray={`${skill.level}, 100`}
                          d="M18 2.0845
                            a 15.9155 15.9155 0 0 1 0 31.831
                            a 15.9155 15.9155 0 0 1 0 -31.831"
                        />
                      </svg>
                      <span
                        className={`absolute inset-0 flex items-center justify-center text-sm font-bold ${
                          isDark ? "text-white" : "text-gray-800"
                        }`}
                      >
                        {skill.level}%
                      </span>
                    </div>
                    <p className={`mt-2 text-sm ${
                      isDark ? "text-gray-300" : "text-gray-700"
                    } group-hover:text-teal-500 transition-colors`}>
                      {skill.name}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
});

Skills.displayName = "Skills";

export default Skills;