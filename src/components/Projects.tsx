import React, { useState, useMemo, useCallback } from "react";
import { ExternalLink, Github, Calendar } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import {
  useScrollAnimation,
  useStaggeredAnimation,
} from "../hooks/useScrollAnimation";

const Projects = React.memo(() => {
  const { isDark } = useTheme();
  const [activeFilter, setActiveFilter] = useState("All");

  // Animation triggers for scroll-based effects
  const [titleRef, titleVisible] = useScrollAnimation();
  const [buttonRef, buttonVisible] = useScrollAnimation();

  // Project categories for filter buttons
  const categories = useMemo(
    () => ["All", "Frontend", "UI/UX", "Open Source"],
    []
  );

  // Project list (can be expanded as needed)
  const projects = useMemo(
    () => [
      {
        title: "Wheel-o-Rent",
        description:
          "Designed and developed a responsive vehicle rental web platform as part of a 4-member team, focused on user-friendly UI/UX and seamless booking flow. Created the frontend using HTML, CSS, and JavaScript; led UI design using Figma. Collaborated with backend team to integrate booking logic, availability tracking, and real-time updates.",
        image:"https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=800",
        technologies: ["HTML", "CSS", "JavaScript", "Figma", "Teamwork"],
        liveUrl: "#",
        githubUrl:
          "#",
        date: "2025",
        category: "Frontend",
      },
      {
        title: "Resume Insight - AI Resume Analyzer",
        description:
          "Analysed resumes using data-driven insights to identify strengths and improvement areas. Built a recommendation system for personalized improvements based on job descriptions.",
        image: "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg?auto=compress&cs=tinysrgb&w=800",
        technologies: ["Python", "Data Analysis", "AI", "Recommendations"],
        liveUrl: "https://resume-insight.onrender.com/",
        githubUrl: "https://github.com/divyanh907/AI-Powered-Resume-Analyzer",
        date: "2024",
        category: "AI/UX",
      },
      {
  title: "BarberHub-Salon Booking UI",
  description:
    "Designed a modern and intuitive salon booking user interface using Figma. The project focuses on delivering a smooth user experience with clean layouts for booking appointments, viewing services, and managing profiles.",
  image: "https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=800", // Optional: Replace with your own Figma screenshot if available
  technologies: ["Figma", "UI/UX Design", "Prototyping"],
  liveUrl: "https://www.figma.com/design/mlu0evtlTx5JdbG9YfllsP/BARBER-HUB?node-id=0-1&t=tL2jirshvAde8juJ-1", // Replace with your actual Figma file/view link
  date: "2024",
  category: "UI/UX Design",
}

    ],
    []
  );

  // Filter logic based on selected category
  const filteredProjects = useMemo(
    () =>
      activeFilter === "All"
        ? projects.slice(0, 6)
        : projects.filter((project) => project.category === activeFilter),
    [activeFilter, projects]
  );

  const [projectsRef, visibleProjects] = useStaggeredAnimation(
    filteredProjects.length
  );

  const handleFilterChange = useCallback((category: string) => {
    setActiveFilter(category);
  }, []);

  return (
    <section id="projects" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
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
            Featured Projects
          </h2>
          <p
            className={`text-lg max-w-2xl mx-auto ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            A showcase of my recent work and personal projects
          </p>
        </div>

        {/* Filter Buttons */}
        <div
          className={`flex flex-wrap justify-center gap-4 mb-12 transition-all duration-500 ${
            titleVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => handleFilterChange(category)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-100 ${
                activeFilter === category
                  ? isDark
                    ? "bg-white text-black"
                    : "bg-gray-900 text-white"
                  : isDark
                  ? "bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Project Grid */}
        <div
          ref={projectsRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProjects.map((project, index) => (
            <div
              key={`${project.title}-${activeFilter}`}
              className={`group rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 ${
                visibleProjects[index]
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              } ${
                isDark
                  ? "bg-white/5 border border-white/10"
                  : "bg-white border border-gray-200 shadow-lg"
              }`}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-56 object-cover"
                  loading="lazy"
                />

                {/* Category Tag */}
                <div className="absolute top-4 left-4">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      isDark
                        ? "bg-white/20 text-white backdrop-blur-sm"
                        : "bg-black/20 text-white backdrop-blur-sm"
                    }`}
                  >
                    {project.category}
                  </span>
                </div>

                {/* Top Hover Icons */}
                <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-full transition-all duration-100 ${
                      isDark
                        ? "bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
                        : "bg-black/20 hover:bg-black/30 text-white backdrop-blur-sm"
                    }`}
                  >
                    <ExternalLink size={16} />
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-2 rounded-full transition-all duration-100 ${
                      isDark
                        ? "bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm"
                        : "bg-black/20 hover:bg-black/30 text-white backdrop-blur-sm"
                    }`}
                  >
                    <Github size={16} />
                  </a>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3
                    className={`text-xl font-semibold ${
                      isDark ? "text-white" : "text-gray-900"
                    }`}
                  >
                    {project.title}
                  </h3>
                  <div
                    className={`flex items-center text-sm ${
                      isDark ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    <Calendar className="w-4 h-4 mr-1" />
                    {project.date}
                  </div>
                </div>

                <p
                  className={`text-sm mb-4 leading-relaxed ${
                    isDark ? "text-gray-400" : "text-gray-600"
                  }`}
                >
                  {project.description}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className={`px-3 py-1 rounded-full text-xs font-medium ${
                        isDark
                          ? "bg-white/10 text-gray-300 border border-white/20"
                          : "bg-gray-100 text-gray-700 border border-gray-200"
                      }`}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Buttons */}
                <div className="flex space-x-3">
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 py-2 px-4 rounded-lg text-center text-sm font-medium transition-all duration-100 flex items-center justify-center space-x-2 ${
                      isDark
                        ? "bg-white text-black hover:bg-gray-100"
                        : "bg-gray-900 text-white hover:bg-gray-800"
                    }`}
                  >
                    <ExternalLink size={14} />
                    <span>Live Demo</span>
                  </a>
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 py-2 px-4 rounded-lg text-center text-sm font-medium transition-all duration-100 flex items-center justify-center space-x-2 border ${
                      isDark
                        ? "border-white/20 text-white hover:bg-white/10"
                        : "border-gray-300 text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <Github size={14} />
                    <span>Code</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div
          ref={buttonRef}
          className={`text-center mt-12 transition-all duration-500 ${
            buttonVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-8"
          }`}
        >
          <a
            href="https://github.com/divyanh907"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center space-x-2 px-8 py-4 rounded-full transition-all duration-100 border ${
              isDark
                ? "border-white/20 text-white hover:bg-white/10"
                : "border-gray-300 text-gray-700 hover:bg-gray-50"
            }`}
          >
            <Github size={20} />
            <span className="font-medium">View All Projects</span>
          </a>
        </div>
      </div>
    </section>
  );
});

Projects.displayName = "Projects";

export default Projects;

