import { useState, useEffect } from "react";
import {
  Menu,
  X,
  Github,
  ExternalLink,
  Mail,
  Phone,
  MapPin,
  Code,
  Palette,
  Zap,
  Linkedin,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import emailjs from "@emailjs/browser";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [currentPage, setCurrentPage] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const projectsPerPage = 6;

  const projects = [
    {
      title: "Blog Platform",
      description:
        "A full-featured blogging platform with an integrated admin panel for managing posts, users, and categories. It supports content creation, editing, and publishing, offering a smooth experience for both readers and administrators.",
      image: "/images/scribora.vercel.app_.png",
      tech: ["Next.js"],
      liveUrl: "https://scribora.vercel.app/",
      githubUrl: "https://github.com/ABLEOFFICIAL/SCRIBORA",
    },
    {
      title: "User Dashboard",
      description:
        "A React web application with an intelligent authentication flow. New users are seamlessly guided through a registration process that captures personal details such as name, email, and location.",
      image: "/images/user-dashboard-five-dun.vercel.app_.png",
      tech: ["React"],
      liveUrl: "https://user-dashboard-five-dun.vercel.app/",
      githubUrl: "https://github.com/ABLEOFFICIAL/USER-DASHBOARD",
    },
    {
      title: "Exclusive Store",
      description:
        "A fully responsive e-commerce store designed for a seamless shopping experience, featuring a wide range of products from gadgets and electronics to home essentials and clothing.",
      image: "/images/exclusive.png",
      tech: ["React"],
      liveUrl: "https://full-ecommerce-web-flax.vercel.app/",
      githubUrl: "https://github.com/ABLEOFFICIAL/FULL-ECOMMERCE-WEB.git",
    },
    {
      title: "Todo App",
      description:
        "A productivity web application built with Next.js, featuring full CRUD functionality. Users can add, edit, and delete tasks with real-time updates powered by a connected backend and database.",
      image: "/images/todoimage.png",
      tech: ["Next.js"],
      liveUrl: "https://to-do-app-bice-three.vercel.app/",
      githubUrl: "https://github.com/ABLEOFFICIAL/TO-DO-APP",
    },
    {
      title: "E-Commerce Landing Page",
      description:
        "A modern, mobile-first landing page designed with Tailwind CSS, featuring smooth scroll navigation, interactive FAQ, testimonial section, and a bold call-to-action.",
      image: "/images/ecomerce-landing-page.png",
      tech: ["React"],
      liveUrl: "https://landing-page-umber-two-29.vercel.app/",
      githubUrl: "https://github.com/ABLEOFFICIAL/LANDING-PAGE.git",
    },
    {
      title: "Architecture Project Website",
      description:
        "A responsive React website built from a Figma design, featuring a Landing Page, Photo Gallery, and Our Projects page. Implemented with React Router for smooth navigation.",
      image: "/images/reacttasktwoimage.png",
      tech: ["React"],
      liveUrl: "https://react-task-two-rose.vercel.app/",
      githubUrl: "https://github.com/ABLEOFFICIAL/REACT-TASK-TWO.git",
    },
    {
      title: "Quiz App",
      description:
        "An interactive quiz application built with Vue that tests users' knowledge through multiple-choice questions. It features real-time feedback, score tracking, and a smooth interface.",
      image: "/images/vue-quiz-app-psi.vercel.app_Display.png",
      tech: ["Vue"],
      liveUrl: "#",
      githubUrl: "https://github.com/ABLEOFFICIAL/VUE-QUIZ-APP",
    },
    {
      title: "Newsletter & Testimonial Slider",
      description:
        "A dynamic UI component with an auto-sliding newsletter banner and scroll-activated testimonial carousel, built for seamless user engagement and enhanced storytelling.",
      image: "/images/product-listing.png",
      tech: ["React", "Javascript"],
      liveUrl: "https://testimonial-bauj.vercel.app/",
      githubUrl: "https://github.com/ABLEOFFICIAL/TESTIMONIAL.git",
    },
    {
      title: "Mini E-commerce Store",
      description:
        "A sleek e-commerce storefront with dynamic product listing, real-time cart functionality, item filtering by category, and persistent cart storage.",
      image: "/images/testimonial-slide.png",
      tech: ["React", "API Integration"],
      liveUrl: "https://testimonial-w799.vercel.app/",
      githubUrl: "https://github.com/ABLEOFFICIAL/MINI-STORE.git",
    },
    {
      title: "Weight Converter",
      description:
        "A lightweight JavaScript tool that converts between common weight units with instant, client-side calculations. Built for accuracy and responsiveness.",
      image: "/images/weight-converter-five.vercel.app_.png",
      tech: ["Javascript"],
      liveUrl: "https://weight-converter-five.vercel.app/",
      githubUrl: "https://github.com/ABLEOFFICIAL/WEIGHT-CONVERTER",
    },
  ];

  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const startIndex = (currentPage - 1) * projectsPerPage;
  const currentProjects = projects.slice(
    startIndex,
    startIndex + projectsPerPage
  );

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "projects", "contact"];
      const current = sections.find((section) => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) {
        setActiveSection(current);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
    setIsMenuOpen(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus("");

    const serviceID = "service_xw05ht7";
    const templateID = "template_vqxo8x7";
    const publicKey = "0-UL1jRHodRtq_rl7";

    emailjs.send(serviceID, templateID, formData, publicKey).then(
      () => {
        setFormStatus("Message sent successfully!");
        setFormData({ name: "", email: "", subject: "", message: "" });
        setIsSubmitting(false);
      },
      (error) => {
        setFormStatus("Failed to send message. Please try again.");
        setIsSubmitting(false);
        console.error("EmailJS error:", error);
      }
    );
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const projectsSection = document.getElementById("projects");
    if (projectsSection) {
      const offset = projectsSection.offsetTop - 100;
      window.scrollTo({ top: offset, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent">
              Ekwesi Joshua
            </div>

            <div className="hidden md:flex space-x-8">
              {["home", "about", "projects", "contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-all duration-300 relative ${
                    activeSection === item
                      ? "text-blue-700 font-medium"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {item}
                  {activeSection === item && (
                    <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-700 rounded-full"></span>
                  )}
                </button>
              ))}
            </div>

            <div className="md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md border-t border-gray-100">
            <div className="px-4 py-2 space-y-1">
              {["home", "about", "projects", "contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-blue-50 rounded-md transition-colors capitalize"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="pt-16 min-h-screen flex items-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-transparent to-purple-50 opacity-50"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
          <div className="text-center">
            <div className="mb-8 animate-fade-in">
              <div
                style={{ backgroundImage: "url('/images/josh.jpeg')" }}
                className="w-72 h-72 mx-auto mb-6 rounded-full border-4 border-blue-700 shadow-2xl transition-all duration-500 ease-out hover:scale-105 hover:rotate-3 hover:shadow-blue-300/50 relative overflow-hidden group bg-center bg-cover"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-blue-700/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="flex items-center justify-center gap-2 mb-4">
                <Sparkles className="text-blue-700 animate-pulse" size={28} />
                <h1 className="text-4xl md:text-6xl font-bold text-gray-900">
                  Hi, I'm{" "}
                  <span className="bg-gradient-to-r from-blue-700 to-purple-600 bg-clip-text text-transparent">
                    Ekwesi Joshua
                  </span>
                </h1>
              </div>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
                A creative and professional website developer passionate about
                building{" "}
                <span className="text-blue-700 font-semibold">clean</span> and{" "}
                <span className="text-blue-700 font-semibold">responsive</span>{" "}
                web experiences. I enjoy learning new technologies and turning
                ideas into interactive designs.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={() => scrollToSection("projects")}
                className="px-8 py-3 bg-gradient-to-r from-blue-700 to-blue-600 text-white rounded-lg hover:from-blue-800 hover:to-blue-700 transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105 transform"
              >
                View My Work
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="px-8 py-3 border-2 border-blue-700 text-blue-700 rounded-lg hover:bg-blue-700 hover:text-white transition-all duration-300 font-medium shadow-md hover:shadow-lg hover:scale-105 transform"
              >
                Get In Touch
              </button>
            </div>

            <div className="flex justify-center space-x-6">
              {[
                {
                  icon: Linkedin,
                  url: "https://www.linkedin.com/in/joshua-ekwesi-4920ab267/",
                },
                { icon: Github, url: "https://github.com/ABLEOFFICIAL" },
                { icon: Mail, url: "mailto:ekwesijoshua@gmail.com" },
              ].map(({ icon: Icon, url }, idx) => (
                <a
                  key={idx}
                  target="_blank"
                  href={url}
                  className="text-gray-600 hover:text-blue-700 transition-all duration-300 hover:scale-125 transform"
                >
                  <Icon size={24} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-50/30 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              About Me
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-700 to-purple-600 mx-auto rounded-full"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-6">
              I'm a passionate developer with 3+ years of experience creating
              digital solutions that combine beautiful design with robust
              functionality.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                My Story
              </h3>
              <p className="text-gray-600 mb-4 leading-relaxed">
                I started my journey as a self-taught developer and have grown
                into a passionate web developer with a love for clean design and
                smooth user experiences. I believe great websites should be
                functional, responsive, and visually engaging.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                When I'm not coding, I'm either learning new tools, working on
                personal projects, or exploring the world of blockchain and
                smart contracts as I grow in the tech space.
              </p>

              <div className="flex flex-wrap gap-2">
                {[
                  {
                    name: "HTML",
                    bg: "bg-orange-100",
                    text: "text-orange-800",
                  },
                  { name: "CSS", bg: "bg-blue-100", text: "text-blue-700" },
                  {
                    name: "Javascript",
                    bg: "bg-yellow-100",
                    text: "text-yellow-800",
                  },
                  {
                    name: "TailwindCSS",
                    bg: "bg-cyan-100",
                    text: "text-cyan-800",
                  },
                  {
                    name: "React.js",
                    bg: "bg-blue-100",
                    text: "text-blue-500",
                  },
                  { name: "Next.js", bg: "bg-neutral-100", text: "text-black" },
                  {
                    name: "Vue.js",
                    bg: "bg-green-100",
                    text: "text-green-500",
                  },
                  { name: "TypeScript", bg: "bg-blue-400", text: "text-white" },
                ].map((skill, idx) => (
                  <span
                    key={idx}
                    className={`px-3 py-1 ${skill.bg} ${skill.text} rounded-full text-sm font-medium hover:scale-110 transform transition-transform duration-200 cursor-default`}
                  >
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              {[
                {
                  icon: Code,
                  color: "blue",
                  title: "Front-End Development",
                  desc: "Crafting responsive and interactive websites using modern tools like HTML, CSS, JavaScript, and Tailwind CSS.",
                },
                {
                  icon: Palette,
                  color: "teal",
                  title: "UI Implementation",
                  desc: "Translating design ideas into clean, functional user interfaces with a focus on usability and experience.",
                },
                {
                  icon: Zap,
                  color: "orange",
                  title: "Learning & Growth",
                  desc: "Constantly exploring new technologies like React and blockchain development to build smarter, more dynamic web solutions.",
                },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  <div className="flex items-center mb-4">
                    <div
                      className={`w-12 h-12 bg-${item.color}-100 rounded-lg flex items-center justify-center mr-4`}
                    >
                      <item.icon
                        size={24}
                        className={`text-${item.color}-700`}
                      />
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-gray-600 leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section
        id="projects"
        className="py-20 bg-gradient-to-br from-slate-50 to-blue-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Projects
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-700 to-purple-600 mx-auto rounded-full"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-6">
              A selection of recent projects that showcase my skills in
              Front-end development and design.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {currentProjects.map((project, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden hover:shadow-2xl hover:scale-105 transition-all duration-300 group"
              >
                <div className="h-48 overflow-hidden relative">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, i) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs font-medium"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex space-x-4">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      className="flex items-center text-blue-700 hover:text-blue-800 transition-colors text-sm font-medium"
                    >
                      <ExternalLink size={16} className="mr-1" />
                      Live Demo
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      className="flex items-center text-gray-600 hover:text-gray-800 transition-colors text-sm font-medium"
                    >
                      <Github size={16} className="mr-1" />
                      GitHub
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="p-2 rounded-lg border border-gray-300 hover:bg-blue-700 hover:text-white hover:border-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-600"
            >
              <ChevronLeft size={20} />
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`w-10 h-10 rounded-lg font-medium transition-all duration-300 ${
                  currentPage === i + 1
                    ? "bg-blue-700 text-white shadow-lg scale-110"
                    : "border border-gray-300 hover:bg-blue-100 hover:border-blue-700"
                }`}
              >
                {i + 1}
              </button>
            ))}

            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="p-2 rounded-lg border border-gray-300 hover:bg-blue-700 hover:text-white hover:border-blue-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-gray-600"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get In Touch
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-700 to-purple-600 mx-auto rounded-full"></div>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto mt-6">
              I'm always interested in new opportunities and exciting projects.
              Let's discuss how we can work together.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Let's Connect
              </h3>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Whether you have a project in mind, want to collaborate, or just
                want to say hello, I'd love to hear from you. Drop me a message
                and I'll get back to you as soon as possible.
              </p>

              <div className="space-y-4">
                {[
                  { icon: Mail, text: "ekwesijoshua@gmail.com" },
                  { icon: Phone, text: "+234 814 475 5843" },
                  { icon: MapPin, text: "Lagos, NG" },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center group">
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4 group-hover:bg-blue-700 transition-colors duration-300">
                      <item.icon
                        size={20}
                        className="text-blue-700 group-hover:text-white transition-colors duration-300"
                      />
                    </div>
                    <span className="text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="What's this about?"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="Tell me about your project..."
                    required
                  ></textarea>
                </div>
                {formStatus && (
                  <p
                    className={`text-sm ${
                      formStatus.includes("successfully")
                        ? "text-green-600"
                        : "text-red-600"
                    }`}
                  >
                    {formStatus}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
                    isSubmitting
                      ? "bg-blue-400 text-white cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-700 to-blue-600 text-white hover:from-blue-800 hover:to-blue-700 shadow-lg hover:shadow-xl hover:scale-105"
                  }`}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-gray-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="font-bold text-xl mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Ekwesi Joshua
            </div>
            <p className="text-gray-400 mb-6">Website Engineer</p>
            <div className="flex justify-center space-x-6 mb-8">
              {[
                {
                  icon: Linkedin,
                  url: "https://www.linkedin.com/in/joshua-ekwesi-4920ab267/",
                },
                { icon: Github, url: "https://github.com/ABLEOFFICIAL" },
                { icon: Mail, url: "mailto:ekwesijoshua@gmail.com" },
              ].map(({ icon: Icon, url }, idx) => (
                <a
                  key={idx}
                  target="_blank"
                  href={url}
                  className="text-gray-400 hover:text-white transition-all duration-300 hover:scale-125 transform"
                >
                  <Icon size={24} />
                </a>
              ))}
            </div>
            <div className="border-t border-gray-700 pt-8">
              <p className="text-gray-400">
                © 2025 Ekwesi Joshua. All rights reserved. Built with React &
                TypeScript.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
