import { motion } from "framer-motion";
import { FaPenFancy, FaPaperPlane, FaChartBar } from "react-icons/fa";
import { MdArrowForward } from "react-icons/md";

const featureVariants = {
  hidden: { opacity: 0, y: 30 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.5 },
  }),
};

const Hero = () => {
  return (
    <div className="relative bg-white dark:bg-gray-900 py-24 px-6 sm:px-12 text-gray-800 dark:text-white">
      {/* Main Heading */}
      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-5xl sm:text-6xl font-extrabold flex justify-center items-baseline max-w-3xl leading-tight mx-auto text-center"
      >
        <p className="text-blue-600 mx-4">Design, Share,</p> Analyze
      </motion.h1>

      <motion.h1
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="text-4xl sm:text-5xl flex items-baseline justify-center font-extrabold max-w-3xl leading-tight mx-auto text-center mt-2"
      >
        Your Forms, <p className="text-blue-600 mx-4">Your Way</p>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="mt-4 max-w-xl mx-auto text-lg text-gray-600 dark:text-gray-300 text-center"
      >
        Powerful form creation meets seamless sharing and deep analytics in one intuitive platform.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="mt-8 flex justify-center gap-4"
      >
        <button className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold flex items-center gap-2 shadow-lg hover:bg-blue-700 transition">
          <MdArrowForward /> Get Started
        </button>
        <button className="border border-blue-600 text-blue-600 px-6 py-3 rounded-xl flex items-center gap-2 hover:bg-blue-600 hover:text-white transition shadow-md">
          Learn More
        </button>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        initial="hidden"
        animate="show"
        className="mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-6xl mx-auto"
      >
        {[
          { icon: FaPenFancy, title: "Create Forms", desc: "Build your perfect forms easily.", color: "text-blue-600" },
          { icon: FaPaperPlane, title: "Share Easily", desc: "Send forms with a single click.", color: "text-purple-600" },
          { icon: FaChartBar, title: "Analyze", desc: "Gain insights from smart charts.", color: "text-red-500" },
        ].map(({ icon: Icon, title, desc, color }, i) => (
          <motion.div
            key={i}
            custom={i}
            variants={featureVariants}
            className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-lg"
          >
            <div className="flex items-center justify-center mb-4">
              <Icon className={`text-3xl ${color}`} />
            </div>
            <h3 className="text-xl font-bold text-center mb-2">{title}</h3>
            <p className="text-gray-600 dark:text-gray-300 text-center text-sm">{desc}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* Decorative SVG Curve */}
      <svg
        className="absolute bottom-0 left-0 w-full opacity-10 pointer-events-none"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#6366f1"
          d="M0,192L48,197.3C96,203,192,213,288,202.7C384,192,480,160,576,133.3C672,107,768,85,864,101.3C960,117,1056,171,1152,165.3C1248,160,1344,96,1392,64L1440,32V320H1392C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320H0Z"
        ></path>
      </svg>
    </div>
  );
};

export default Hero;
