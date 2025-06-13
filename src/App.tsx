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
} from "lucide-react";
import emailjs from "@emailjs/browser";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  // State for form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  // Handle form input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus("");

    // Replace with your EmailJS Service ID, Template ID, and Public Key
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

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="font-bold text-xl text-gray-900">Ekwesi Joshua</div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex space-x-8">
              {["home", "about", "projects", "contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className={`capitalize transition-colors duration-200 ${
                    activeSection === item
                      ? "text-blue-700 font-medium"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile menu button */}
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

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-100">
            <div className="px-4 py-2 space-y-1">
              {["home", "about", "projects", "contact"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item)}
                  className="block w-full text-left px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-md transition-colors capitalize"
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <div className="mb-8">
              <div className="w-72 bg-[url('./assets/josh.jpeg')] bg-cover bg-center h-72 mx-auto rounded-full flex items-center justify-center mb-6">
                <img src="" alt="" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-4">
                Hi, I'm <span className="text-blue-700">Ekwesi Joshua</span>
              </h1>
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
                A creative front-end developer passionate about building clean
                and responsive web experiences. I enjoy learning new
                technologies and turning ideas into interactive designs.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <button
                onClick={() => scrollToSection("projects")}
                className="px-8 py-3 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors duration-200 font-medium"
              >
                View My Work
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-200 font-medium"
              >
                Get In Touch
              </button>
            </div>

            <div className="flex justify-center space-x-6">
              <a
                target="_blank"
                href="https://github.com/ABLEOFFICIAL"
                className="text-gray-600 hover:text-blue-700 transition-colors"
              >
                <Github size={24} />
              </a>
              <a
                href="mailto:ekwesijoshua@gmail.com"
                className="text-gray-600 hover:text-blue-700 transition-colors"
              >
                <Mail size={24} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              About Me
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
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
              <p className="text-gray-600 mb-4">
                My Story I started my journey as a self-taught developer and
                have grown into a passionate front-end developer with a love for
                clean design and smooth user experiences. I believe great
                websites should be functional, responsive, and visually
                engaging.
              </p>
              <p className="text-gray-600 mb-6">
                When I'm not coding, I'm either learning new tools, working on
                personal projects, or exploring the world of blockchain and
                smart contracts as I grow in the tech space.
              </p>

              <div className="flex flex-wrap gap-2">
                {[
                  "HTML",
                  "CSS",
                  "Javascript",
                  "TailwindCSS",
                  "React",
                  "TypeScript",
                  "Node.js",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                    <Code size={24} className="text-blue-700" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    Front-End Development
                  </h4>
                </div>
                <p className="text-gray-600">
                  Crafting responsive and interactive websites using modern
                  tools like HTML, CSS, JavaScript, and Tailwind CSS.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mr-4">
                    <Palette size={24} className="text-teal-700" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    UI Implementation
                  </h4>
                </div>
                <p className="text-gray-600">
                  Translating design ideas into clean, functional user
                  interfaces with a focus on usability and experience.
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mr-4">
                    <Zap size={24} className="text-orange-700" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900">
                    Learning & Growth
                  </h4>
                </div>
                <p className="text-gray-600">
                  Constantly exploring new technologies like React and
                  blockchain development to build smarter, more dynamic web
                  solutions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Projects
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              A selection of recent projects that showcase my skills in
              Front-end development and design.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project 1 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-200">
              <div className="h-48 bg-[url('./assets/ecomerce-landing-page.png')] bg-cover bg-top"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  E-Commerce Landing Page
                </h3>
                <p className="text-gray-600 mb-4">
                  A modern, mobile-first landing page designed with Tailwind
                  CSS, featuring smooth scroll navigation, interactive FAQ,
                  testimonial section, and a bold call-to-action for product or
                  service promotion.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                    React
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                    Node.js
                  </span>
                </div>
                <div className="flex space-x-4">
                  <a
                    href="https://landing-page-umber-two-29.vercel.app/"
                    target="_blank"
                    className="flex items-center text-blue-700 hover:text-blue-800 transition-colors"
                  >
                    <ExternalLink size={16} className="mr-1" />
                    Live Demo
                  </a>
                  <a
                    href="https://github.com/ABLEOFFICIAL/LANDING-PAGE.git"
                    target="_blank"
                    className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <Github size={16} className="mr-1" />
                    GitHub
                  </a>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-200">
              <div className="h-48 bg-[url('./assets/product-listing.png')] bg-cover bg-top"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Newsletter & Testimonial Slider{" "}
                </h3>
                <p className="text-gray-600 mb-4">
                  A dynamic UI component with an auto-sliding newsletter banner
                  and scroll-activated testimonial carousel, built for seamless
                  user engagement and enhanced storytelling.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                    React
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                    Javascript
                  </span>
                </div>
                <div className="flex space-x-4">
                  <a
                    href="https://testimonial-bauj.vercel.app/"
                    target="_blank"
                    className="flex items-center text-blue-700 hover:text-blue-800 transition-colors"
                  >
                    <ExternalLink size={16} className="mr-1" />
                    Live Demo
                  </a>
                  <a
                    href="https://github.com/ABLEOFFICIAL/TESTIMONIAL.git"
                    target="_blank"
                    className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <Github size={16} className="mr-1" />
                    GitHub
                  </a>
                </div>
              </div>
            </div>

            {/* Project 3 */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden hover:shadow-lg transition-shadow duration-200">
              <div className="h-48 bg-[url('./assets/testimonial-slide.png')] bg-cover bg-top"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Mini E-commerce Store{" "}
                </h3>
                <p className="text-gray-600 mb-4">
                  A sleek e-commerce storefront with dynamic product listing,
                  real-time cart functionality, item filtering by category, and
                  persistent cart storage using localStorage.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                    React
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-sm">
                    API Integration
                  </span>
                </div>
                <div className="flex space-x-4">
                  <a
                    href="https://testimonial-w799.vercel.app/"
                    target="_blank"
                    className="flex items-center text-blue-700 hover:text-blue-800 transition-colors"
                  >
                    <ExternalLink size={16} className="mr-1" />
                    Live Demo
                  </a>
                  <a
                    href="https://github.com/ABLEOFFICIAL/MINI-STORE.git"
                    target="_blank"
                    className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
                  >
                    <Github size={16} className="mr-1" />
                    GitHub
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Get In Touch
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              I'm always interested in new opportunities and exciting projects.
              Let's discuss how we can work together.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Let's Connect
              </h3>
              <p className="text-gray-600 mb-8">
                Whether you have a project in mind, want to collaborate, or just
                want to say hello, I'd love to hear from you. Drop me a message
                and I'll get back to you as soon as possible.
              </p>

              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail size={20} className="text-blue-700 mr-3" />
                  <span className="text-gray-700">ekwesijoshua@gmail.com</span>
                </div>
                <div className="flex items-center">
                  <Phone size={20} className="text-blue-700 mr-3" />
                  <span className="text-gray-700">+234 814 475 5843</span>
                </div>
                <div className="flex items-center">
                  <MapPin size={20} className="text-blue-700 mr-3" />
                  <span className="text-gray-700">Lagos, NG</span>
                </div>
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
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
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
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
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
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
                  className={`w-full px-6 py-3 rounded-lg font-medium transition-colors duration-200 ${
                    isSubmitting
                      ? "bg-blue-400 text-white cursor-not-allowed"
                      : "bg-blue-700 text-white hover:bg-blue-800"
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
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="font-bold text-xl mb-4">Ekwesi Joshua</div>
            <p className="text-gray-400 mb-6">Front-end Engineer</p>
            <div className="flex justify-center space-x-6 mb-8">
              <a
                href="https://github.com/ABLEOFFICIAL"
                target="_blank"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Github size={24} />
              </a>
              <a
                href="mailto:ekwesijoshua@gmail.com"
                target="_blank"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Mail size={24} />
              </a>
            </div>
            <div className="border-t border-gray-800 pt-8">
              <p className="text-gray-400">
                © 2025 Ekwesi Joshua. All rights reserved. Built with React &
                Tailwind CSS.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
