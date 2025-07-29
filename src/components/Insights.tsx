import React, { useMemo } from "react";
import { BookOpen, Lightbulb, TrendingUp, Users, Calendar, ExternalLink } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const Insights = React.memo(() => {
  const { isDark } = useTheme();
  const [titleRef, titleVisible] = useScrollAnimation();
  const [contentRef, contentVisible] = useScrollAnimation();

  // Insights and learnings
  const insights = useMemo(
    () => [
      {
        icon: <BookOpen className="w-6 h-6" />,
        title: "UI/UX Design Principles",
        category: "Design",
        date: "Dec 2024",
        description: "Learned about user-centered design, accessibility, and creating intuitive interfaces through Figma workshops and online courses.",
        tags: ["Figma", "UX Design", "Accessibility"],
      },
      {
        icon: <Lightbulb className="w-6 h-6" />,
        title: "Frontend Development Best Practices",
        category: "Development",
        date: "Nov 2024",
        description: "Gained insights into responsive design, performance optimization, and modern CSS techniques through hands-on project work.",
        tags: ["HTML", "CSS", "JavaScript", "Performance"],
      },
      {
        icon: <TrendingUp className="w-6 h-6" />,
        title: "Version Control & Collaboration",
        category: "Tools",
        date: "Oct 2024",
        description: "Mastered Git workflows, branching strategies, and team collaboration practices through real project experience.",
        tags: ["Git", "GitHub", "Teamwork"],
      },
      {
        icon: <Users className="w-6 h-6" />,
        title: "Event Management & Communication",
        category: "Soft Skills",
        date: "Sep 2024",
        description: "Developed strong communication and project coordination skills through volunteering roles at various organizations.",
        tags: ["Leadership", "Communication", "Project Management"],
      },
    ],
    []
  );

  return (
    <section id="insights" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-500 ${
            titleVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <h2
            className={`text-4xl sm:text-5xl font-extrabold font-heading mb-4 tracking-tight ${
              isDark ? "text-heading-dark" : "text-heading-light"
            }`}
          >
            Insights & Learnings
          </h2>
          <p
            className={`text-lg max-w-2xl mx-auto ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Key takeaways from webinars, sessions, and career experiences that shape my approach to design and development
          </p>
        </div>

        {/* Insights Grid */}
        <div
          ref={contentRef}
          className={`grid md:grid-cols-2 gap-8 transition-all duration-700 ${
            contentVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          {insights.map((insight, index) => (
            <div
              key={index}
              className={`p-6 rounded-xl transition-all duration-300 hover:scale-105 hover:-translate-y-2 ${
                isDark
                  ? "bg-white/5 border border-white/10 hover:bg-white/10"
                  : "bg-gray-50 border border-gray-200 hover:bg-white"
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="space-y-4">
                {/* Header */}
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-lg ${
                        isDark ? "bg-white/10" : "bg-gray-100"
                      }`}
                    >
                      <div
                        className={`${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {insight.icon}
                      </div>
                    </div>
                    <div>
                      <h3
                        className={`font-semibold ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {insight.title}
                      </h3>
                      <div className="flex items-center space-x-2 text-sm">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            isDark
                              ? "bg-white/10 text-gray-300"
                              : "bg-gray-200 text-gray-700"
                          }`}
                        >
                          {insight.category}
                        </span>
                        <div
                          className={`flex items-center text-xs ${
                            isDark ? "text-gray-400" : "text-gray-500"
                          }`}
                        >
                          <Calendar className="w-3 h-3 mr-1" />
                          {insight.date}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p
                  className={`text-sm leading-relaxed ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {insight.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {insight.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        isDark
                          ? "bg-white/10 text-gray-300 border border-white/20"
                          : "bg-gray-100 text-gray-700 border border-gray-200"
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div
          className={`text-center mt-12 transition-all duration-500 ${
            contentVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <div className="space-y-4">
            <p
              className={`text-lg ${
                isDark ? "text-gray-400" : "text-gray-600"
              }`}
            >
              Always learning and growing through experiences
            </p>
            <a
              href="mailto:divyanshjaindpsschool@gmail.comcom"
              className={`inline-flex items-center space-x-2 px-6 py-3 rounded-lg transition-all duration-200 font-medium ${
                isDark
                  ? "bg-white text-black hover:bg-gray-100"
                  : "bg-gray-900 text-white hover:bg-gray-800"
              }`}
            >
              <ExternalLink size={20} />
              <span>Share Your Insights</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
});

Insights.displayName = "Insights";

export default Insights; 