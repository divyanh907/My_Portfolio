import React, { useMemo } from "react";
import { Heart, Github, Linkedin, Mail } from "lucide-react";
import { SiReact, SiTypescript, SiTailwindcss, SiVite } from "react-icons/si";
import { useTheme } from "../contexts/ThemeContext";

const Footer = React.memo(() => {
  const { isDark } = useTheme();

  const majorTech = useMemo(
    () => [
      { icon: SiReact },
      { icon: SiTypescript },
      { icon: SiVite },
      { icon: SiTailwindcss },
    ],
    []
  );

  const currentYear = new Date().getFullYear();

  return (
    <footer
      className={`pt-16 transition-colors duration-500 ${
        isDark
          // ? "bg-gradient-to-b from-gray-900 via-gray-950 to-black text-white"
          // : "bg-gradient-to-b from-blue-100 via-white to-purple-100 text-gray-900"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Major Technologies Section */}
        <div className="mb-16">
        <h3
  className={`text-2xl font-semibold text-center mb-8 ${
    isDark ? "text-white" : "text-gray-900"
  }`}
>
  Major Technologies Used
</h3>

          <div className="flex flex-wrap justify-center gap-6">
            {majorTech.map(({ icon: Icon }, index) => (
              <div
                key={index}
                className={`w-16 h-16 flex items-center justify-center rounded-full transition-all duration-300 transform hover:scale-110 hover:rotate-3 ${
                  isDark
                    ? "bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40"
                    : "bg-white hover:bg-gray-100 border border-gray-200 hover:border-gray-300 shadow-md hover:shadow-lg"
                }`}
              >
                <Icon
                  className={`w-7 h-7 ${
                    isDark ? "text-white" : "text-gray-700"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 mb-12">
          {/* Brand Section */}
          <div>
          <h3
  className={`text-2xl font-semibold text-center mb-8 ${
    isDark ? "text-white" : "text-gray-900"
  }`}
>
  Divyansh
</h3>

            <p className={`leading-relaxed ${isDark ? "text-gray-300" : "text-gray-600"}`}>
              Frontend Developer & UI/UX Enthusiast passionate about creating
              beautiful, functional web experiences and contributing to open
              source projects.
            </p>
          </div>

          {/* Quick Links */}
          <div>
          <h4
  className={`text-2xl font-semibold text-center mb-8 ${
    isDark ? "text-white" : "text-gray-900"
  }`}
>
  Quick Links
</h4>

            <ul className="space-y-2 text-lg text-center">
              {["about", "projects", "experience", "contact"].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item}`}
                    className="text-gray-400 hover:text-teal-400 dark:hover:text-teal-300 transition-colors duration-300"
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Section */}
          <div>
          <h4
  className={`text-2xl font-semibold text-center mb-8 ${
    isDark ? "text-white" : "text-gray-900"
  }`}
>
  Connect
</h4>

            <div className="flex space-x-4 justify-center">
              {[{
                href: "https://github.com/divyanh907",
                icon: <Github size={20} className={isDark ? "text-white" : "text-gray-800"} />,
                title: "GitHub"
              }, {
                href: "https://www.linkedin.com/in/DivyanshJain0907",
                icon: <Linkedin size={20} className={isDark ? "text-white" : "text-gray-800"} />,
                title: "LinkedIn"
              }, {
                href: "mailto:divyanshjaindpsschool@gmail.com",
                icon: <Mail size={20} className={isDark ? "text-white" : "text-gray-800"} />,
                title: "Email"
              }].map(({ href, icon, title }, idx) => (
                <a
                  key={idx}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={title}
                  className={`p-3 rounded-lg transition-all duration-300 transform hover:scale-110 ${
                    isDark
                      ? "bg-white/10 hover:bg-white/20"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-gray-300/20 dark:border-white/10 pt-8 flex flex-col md:flex-row md:justify-between items-center text-center gap-2">
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2 md:mb-0">
            © {currentYear} Divyansh. All rights reserved.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center justify-center">
            Made with <Heart size={16} className="text-red-500 mx-1" /> using React & Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  );
});

Footer.displayName = "Footer";

export default Footer;
