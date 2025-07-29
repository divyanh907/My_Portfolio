import React, { useState, useMemo, useCallback, useEffect } from "react";
import {
  Award,
  Calendar,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useTheme } from "../contexts/ThemeContext";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

interface Certification {
  title: string;
  issuer: string;
  date: string;
  credentialId: string;
  verifyUrl: string;
  description: string;
  image: string;
}

const Certifications = React.memo(() => {
  const { isDark } = useTheme();
  const [titleRef, titleVisible] = useScrollAnimation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(3);

  const certifications: Certification[] = [
    {
      title: "Google UX Design Certificate",
      issuer: "Google",
      date: "June 2024",
      credentialId: "UU91OBX189K7",
      verifyUrl:
        "https://www.coursera.org/account/accomplishments/professional-cert/UU91OBX189K7",
      description: "A comprehensive UX design certificate by Google through Coursera.",
      image: "/images/certifications/ux.jpg",
    },
    {
      title: "Programming in C++ Specialization",
      issuer: "Coursera/University",
      date: "May 2024",
      credentialId: "E8MJNFAP4N9V",
      verifyUrl:
        "https://www.coursera.org/account/accomplishments/specialization/E8MJNFAP4N9V",
      description:
        "Covers object-oriented and modern C++ programming techniques.",
      image: "/images/certifications/cpp.jpg",
    },
    {
      title: "AWS Certified Cloud Practitioner",
      issuer: "AWS",
      date: "April 2024",
      credentialId: "GUEGAFI50RIM",
      verifyUrl:
        "https://www.coursera.org/account/accomplishments/verify/GUEGAFI50RIM",
      description:
        "Foundational knowledge of AWS services and cloud concepts.",
      image: "/images/certifications/cloud.jpg",
    },
    
  ];

  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth < 768) setCardsPerView(1);
      else if (window.innerWidth < 1024) setCardsPerView(2);
      else setCardsPerView(3);
    };
    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  const displayItems = useMemo<(Certification | null)[]>(() => {
    const items = [...certifications];
    const totalPages = Math.ceil(items.length / cardsPerView);
    const totalSlots = totalPages * cardsPerView;
    while (items.length < totalSlots) items.push(null);
    return items;
  }, [certifications, cardsPerView]);

  const totalPages = Math.ceil(displayItems.length / cardsPerView);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => Math.min(prev + 1, totalPages - 1));
  }, [totalPages]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => Math.max(prev - 1, 0));
  }, []);

  useEffect(() => {
    setCurrentIndex(0);
  }, [cardsPerView]);

  const EmptyCard = () => <div className="min-h-[400px]" />;

  return (
    <section id="certifications" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-500 ${
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2
            className={`text-4xl sm:text-5xl font-extrabold font-heading mb-4 tracking-tight ${
              isDark ? "text-heading-dark" : "text-heading-light"
            }`}
          >
            Certifications
          </h2>
          <p
            className={`text-base md:text-lg max-w-2xl mx-auto ${
              isDark ? "text-gray-400" : "text-gray-600"
            }`}
          >
            Professional certifications and achievements that validate my expertise
          </p>
        </div>

        <div className={`relative transition-all duration-500 ${titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <div className="relative overflow-hidden">
            <div
              className="flex transition-transform duration-700 ease-out"
              style={{
                transform: `translateX(-${currentIndex * (100 / totalPages)}%)`,
                width: `${totalPages * 100}%`,
              }}
            >
              {Array.from({ length: totalPages }).map((_, pageIndex) => (
                <div
                  key={pageIndex}
                  className="flex-shrink-0 grid gap-4 md:gap-6 px-2"
                  style={{
                    width: `${100 / totalPages}%`,
                    gridTemplateColumns: `repeat(${cardsPerView}, 1fr)`,
                  }}
                >
                  {displayItems.slice(
                    pageIndex * cardsPerView,
                    (pageIndex + 1) * cardsPerView
                  ).map((cert, index) => (
                    <div key={`${pageIndex}-${index}`} className="w-full" style={{ transitionDelay: `${index * 100}ms` }}>
                      {cert ? (
                        <div className={`rounded-2xl overflow-hidden transition-all duration-300 hover:scale-105 h-full ${
                          isDark ? "bg-white/5 border border-white/10 hover:bg-white/10" : "bg-white border border-gray-200 hover:shadow-xl shadow-lg"
                        }`}>
                          <div className="relative h-48 sm:h-56 md:h-64 overflow-hidden">
                            <img
                              src={cert.image}
                              alt={cert.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute top-4 right-4">
                              <div className={`p-2 rounded-full ${isDark ? "bg-white/20" : "bg-black/20"}`}>
                                <Award className="w-5 h-5 text-yellow-400" />
                              </div>
                            </div>
                          </div>
                          <div className="p-4 md:p-6">
                            <h3 className={`text-lg md:text-xl font-semibold mb-2 ${isDark ? "text-white" : "text-gray-900"}`}>
                              {cert.title}
                            </h3>
                            <p className={`text-sm font-medium mb-3 ${isDark ? "text-gray-300" : "text-gray-700"}`}>
                              {cert.issuer}
                            </p>
                            <div className={`flex items-center text-sm mb-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                              <Calendar className="w-4 h-4 mr-2" />
                              <span>{cert.date}</span>
                            </div>
                            <p className={`text-sm leading-relaxed mb-4 ${isDark ? "text-gray-400" : "text-gray-600"}`}>
                              {cert.description}
                            </p>
                            <div className="space-y-3">
                              <div className={`text-xs px-3 py-2 rounded-full inline-block ${isDark ? "bg-white/10 text-gray-300 border border-white/20" : "bg-gray-100 text-gray-700 border border-gray-200"}`}>
                                ID: {cert.credentialId}
                              </div>
                              <div>
                                <a
                                  href={cert.verifyUrl}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className={`inline-flex items-center space-x-2 text-sm font-medium transition-all duration-200 hover:scale-105 ${isDark ? "text-white hover:text-gray-300" : "text-gray-900 hover:text-gray-700"}`}
                                >
                                  <ExternalLink className="w-4 h-4" />
                                  <span>Verify</span>
                                </a>
                              </div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <EmptyCard />
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {totalPages > 1 && (
            <>
              <button
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className={`absolute left-0 top-1/2 transform -translate-y-1/2 p-2 md:p-3 rounded-full ${
                  currentIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:scale-110"
                } ${
                  isDark ? "bg-white/10 hover:bg-white/20 text-white" : "bg-white hover:bg-gray-50 text-gray-900"
                }`}
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <button
                onClick={nextSlide}
                disabled={currentIndex >= totalPages - 1}
                className={`absolute right-0 top-1/2 transform -translate-y-1/2 p-2 md:p-3 rounded-full ${
                  currentIndex >= totalPages - 1 ? "opacity-50 cursor-not-allowed" : "hover:scale-110"
                } ${
                  isDark ? "bg-white/10 hover:bg-white/20 text-white" : "bg-white hover:bg-gray-50 text-gray-900"
                }`}
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>
            </>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center space-x-2 mt-8">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  index === currentIndex
                    ? isDark
                      ? "bg-white"
                      : "bg-gray-900"
                    : isDark
                    ? "bg-white/30"
                    : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
});

Certifications.displayName = "Certifications";
export default Certifications;
