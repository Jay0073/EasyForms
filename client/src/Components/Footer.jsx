import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-white shadow-md px-16 py-8 text-gray-700 border-t border-gray-200">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-screen-xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6"
      >
        {/* Brand & Tagline */}
        <div className="text-center md:text-left">
          <h3 className="text-4xl font-bold text-blue-600 mb-2">EasyForms</h3>
          <p className="text-sm text-gray-500">
            Create. Share. Analyze. Built to simplify your form journey.
          </p>
        </div>

        {/* Footer Links */}
        <div className="flex flex-wrap gap-6 justify-center text-[18px] font-semibold">
          <a href="/about" className="hover:text-blue-600">About</a>
          <a href="/features" className="hover:text-blue-600">Features</a>
          <a href="/contact" className="hover:text-blue-600">Contact</a>
          <a href="/privacy" className="hover:text-blue-600">Privacy</a>
        </div>

        {/* Social Icons */}
        <div className="flex gap-4 text-blue-600 text-3xl">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-800">
            <FaGithub />
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-800">
            <FaTwitter />
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-800">
            <FaLinkedin />
          </a>
        </div>
      </motion.div>

      {/* Divider & Copyright */}
      <div className="border-t border-gray-300 mt-6 pt-4 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} EasyForms. Made with 👾 by Jay0073.
      </div>
    </footer>
  );
};

export default Footer;
