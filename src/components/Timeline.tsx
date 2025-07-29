import React, { useEffect, useRef, useState, useMemo } from "react";
import { Calendar, MapPin, Building, GraduationCap, Users } from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import {
  useScrollAnimation,
  useSequentialAnimation,
} from "../hooks/useScrollAnimation";

const Timeline = React.memo(() => {
  const { isDark } = useTheme();
  const [titleRef, titleVisible] = useScrollAnimation();
  const [progressHeight, setProgressHeight] = useState(0);
  const progressRef = useRef<SVGPathElement>(null);

  /* Work and Education Timeline */
  const timelineItems = useMemo(
    () => [
      {
        type: "work",
        title: "Data Analytics Intern",
        organization: "Imarticus",
        organizationLogo: "/images/experience/intern.webp",
        location: "Remote",
        period: "Jun 2025 - Jul 2025",
        description: [
          "Applied data analysis using Excel, SQL, Python for actionable business insights",
          "Created visualizations using Tableau/Power BI and derived KPIs for business decisions",
          "Conducted statistical analysis and presented insights through dashboards and reports",
        ],
      },
      {
        type: "volunteering",
        title: "PR & Management Team Member",
        organization: "Converge 3.0 Alumni Meet",
        organizationLogo: "/images/experience/uni.webp",
        location: "On-site",
        period: "March 2025",
        description: [
          "Oversaw the boys' room allocation process, ensuring proper organization and accommodation.",
          "Managed promotional campaigns, logistics, and alumni engagement activities to boost participation.",
          "Handled the calling system, assigning calls to team members for efficient communication.",
          "Coordinated with various teams to ensure seamless event planning and execution.",
        ],
      },
      {
        type: "education",
        title: "B.Tech Computer Science",
        organization: "Bennett University",
        organizationLogo: "/images/experience/uni.webp",
        location: "India",
        period: "2023-2027",
        description: ["CGPA: 9.49 | Dean’s List Awardee"],
      },
      {
        type: "education",
        title: "CBSE (Class XII)",
        organization: "Shridi Sai Public School, Moradabad",
        organizationLogo: "/images/experience/ssps.webp",
        location: "Moradabad",
        period: "2022-2023",
        description: [],
      },
      {
        type: "education",
        title: "CBSE (Class X)",
        organization: "Delhi Public School, Moradabad",
        organizationLogo: "/images/experience/dps.webp",
        location: "Moradabad",
        period: "2020-2021",
        description: [],
      },
    ],
    []
  );

  const [timelineRef, visibleItems] = useSequentialAnimation(timelineItems.length);

  /* Optional: Animated scroll progress for the wave timeline (works as before) */
  useEffect(() => {
    let ticking = false;

    const updateProgress = () => {
      if (!progressRef.current) return;
      const container = progressRef.current.parentElement?.parentElement;
      if (!container) return;

      const rect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      if (rect.top < windowHeight && rect.bottom > 0) {
        const progress = Math.min(
          1,
          Math.max(0, (windowHeight - rect.top) / rect.height)
        );
        const pathLength = progressRef.current.getTotalLength();
        const drawLength = pathLength * progress;

        progressRef.current.style.strokeDasharray = pathLength.toString();
        progressRef.current.style.strokeDashoffset = (pathLength - drawLength).toString();

        setProgressHeight(progress * 100);
      }

      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateProgress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    updateProgress();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const getIcon = (type: string) => {
    switch (type) {
      case "work":
        return Building;
      case "volunteering":
        return Users;
      case "education":
        return GraduationCap;
      default:
        return Building;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "work":
        return isDark ? "text-blue-400" : "text-blue-600";
      case "volunteering":
        return isDark ? "text-purple-400" : "text-purple-600";
      case "education":
        return isDark ? "text-green-400" : "text-green-600";
      default:
        return isDark ? "text-blue-400" : "text-blue-600";
    }
  };

  const getTypeBgColor = (type: string) => {
    switch (type) {
      case "work":
        return isDark
          ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
          : "bg-blue-100 text-blue-700 border-blue-200";
      case "volunteering":
        return isDark
          ? "bg-purple-500/20 text-purple-400 border-purple-500/30"
          : "bg-purple-100 text-purple-700 border-purple-200";
      case "education":
        return isDark
          ? "bg-green-500/20 text-green-400 border-green-500/30"
          : "bg-green-100 text-green-700 border-green-200";
      default:
        return isDark
          ? "bg-blue-500/20 text-blue-400 border-blue-500/30"
          : "bg-blue-100 text-blue-700 border-blue-200";
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case "work":
        return "Work";
      case "volunteering":
        return "Volunteering";
      case "education":
        return "Education";
      default:
        return "Experience";
    }
  };

  return (
    <section id="experience" className="py-20 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-300 ease-out ${
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2
            className={`text-4xl sm:text-5xl font-extrabold font-heading mb-4 tracking-tight ${
              isDark ? "text-heading-dark" : "text-heading-light"
            }`}
          >
            Experience & Volunteering
          </h2>
          <p
            className={`text-lg max-w-2xl mx-auto ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            My professional journey, volunteering experience, and contributions to various organizations.
          </p>
        </div>

        {/* Timeline Container */}
        <div ref={timelineRef} className="relative">
          {/* Wavy Vertical Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-full pointer-events-none">
            <svg
              width="24"
              height="100%"
              viewBox="0 0 24 1200"
              preserveAspectRatio="none"
              className="w-full h-full"
            >
              <path
                ref={progressRef}
                d="M12 0
                  Q24 50 12 100
                  Q0 150 12 200
                  Q24 250 12 300
                  Q0 350 12 400
                  Q24 450 12 500
                  Q0 550 12 600
                  Q24 650 12 700
                  Q0 750 12 800
                  Q24 850 12 900
                  Q0 950 12 1000
                  Q24 1050 12 1100
                  Q0 1150 12 1200"
                fill="none"
                stroke={isDark ? "white" : "black"}
                strokeWidth="2"
                strokeDasharray="0"
                strokeDashoffset="0"
              />
            </svg>
          </div>

          {/* Timeline Cards */}
          <div className="space-y-12">
            {timelineItems.map((item, index) => {
              const Icon = getIcon(item.type);
              const isVisible = visibleItems[index];
              const alignRight = index % 2 !== 0;

              return (
                <div
                  key={index}
                  className={`relative flex items-center transition-all duration-300 ease-out group ${
                    isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                  } ${alignRight ? "lg:flex-row-reverse" : "lg:flex-row"}`}
                >
                  {/* Timeline Dot */}
                  <div
                    className={`absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full border-2 z-10 flex items-center justify-center group-hover:scale-125 group-hover:shadow-md transition-all duration-200 ${
                      isDark ? "bg-black border-white" : "bg-white border-gray-900"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        item.type === "work"
                          ? isDark
                            ? "bg-blue-400"
                            : "bg-blue-600"
                          : item.type === "volunteering"
                          ? isDark
                            ? "bg-purple-400"
                            : "bg-purple-600"
                          : isDark
                          ? "bg-green-400"
                          : "bg-green-600"
                      }`}
                    />
                  </div>

                  {/* Timeline Content Box */}
                  <div
                    className={`w-full lg:w-5/12 ${
                      alignRight ? "lg:pl-8" : "lg:pr-8"
                    }`}
                  >
                    <div
                      className={`p-6 rounded-xl group-hover:scale-[1.03] group-hover:-translate-y-1 transition-all duration-300 ${
                        isDark
                          ? "bg-white/5 border border-white/10 group-hover:bg-white/10"
                          : "bg-gray-50 border border-gray-200 group-hover:bg-white"
                      }`}
                    >
                      {/* Icon & Type */}
                      <div className="flex items-center space-x-2 mb-3">
                        <Icon
                          className={`w-5 h-5 group-hover:scale-110 group-hover:rotate-6 transition-transform ${getTypeColor(
                            item.type
                          )}`}
                        />
                        <span
                          className={`text-xs px-3 py-1 rounded-full font-medium border group-hover:scale-105 transition-transform ${getTypeBgColor(
                            item.type
                          )}`}
                        >
                          {getTypeLabel(item.type)}
                        </span>
                      </div>

                      {/* Title */}
                      <h3
                        className={`text-xl font-semibold mb-4 ${
                          isDark ? "text-white" : "text-gray-900"
                        }`}
                      >
                        {item.title}
                      </h3>

                      {/* Organization, Logo, Location, and Date */}
                      <div className="space-y-3 mb-4">
                        <div
                          className={`flex items-center space-x-3 text-sm ${
                            isDark ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          {/* Logo */}
                          <div className="relative w-8 h-8 rounded-full overflow-hidden border-2 group-hover:scale-110 transition-transform">
                            <img
                              src={item.organizationLogo}
                              alt={`${item.organization} Logo`}
                              className="w-full h-full object-cover"
                            />
                            <div
                              className={`absolute inset-0 ${
                                isDark ? "bg-white/5" : "bg-black/5"
                              }`}
                            />
                          </div>
                          {/* Name */}
                          <span className="font-medium">{item.organization}</span>
                        </div>
                        {/* Location */}
                        <div
                          className={`flex items-center text-sm ${
                            isDark ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          <MapPin className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                          <span>{item.location}</span>
                        </div>

                        <div
                          className={`flex items-center text-sm ${
                            isDark ? "text-gray-400" : "text-gray-600"
                          }`}
                        >
                          <Calendar className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-200" />
                          <span>{item.period}</span>
                        </div>
                      </div>

                      {/* Description Bullets */}
                      <ul className="space-y-2">
                        {item.description.map((desc, i) => (
                          <li key={i} className="flex items-start">
                            <span
                              className={`w-1.5 h-1.5 mt-2 mr-3 rounded-full ${
                                isDark ? "bg-white" : "bg-gray-900"
                              }`}
                            />
                            <span
                              className={`text-sm ${
                                isDark ? "text-gray-400" : "text-gray-600"
                              }`}
                            >
                              {desc}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
});

Timeline.displayName = "Timeline";
export default Timeline;
