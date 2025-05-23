import { motion } from "framer-motion";
import { FaUserShield, FaWpforms, FaShareAlt, FaChartBar, FaRegEye, FaFileExport } from "react-icons/fa";

const features = [
  {
    title: "Secure Login",
    description: "Users can sign up, log in, and manage their own accounts securely.",
    icon: <FaUserShield className="text-3xl text-blue-600" />,
  },
  {
    title: "Create Forms",
    description: "Design forms with a variety of input fields to collect data efficiently.",
    icon: <FaWpforms className="text-3xl text-green-600" />,
  },
  {
    title: "Share Easily",
    description: "Send your forms via shareable links or directly through email.",
    icon: <FaShareAlt className="text-3xl text-purple-600" />,
  },
  {
    title: "View Submissions",
    description: "All responses are collected instantly and can be viewed anytime.",
    icon: <FaRegEye className="text-3xl text-yellow-500" />,
  },
  {
    title: "Analyze with Graphs",
    description: "Visualize response data using charts and graphs for better insights.",
    icon: <FaChartBar className="text-3xl text-red-500" />,
  },
  {
    title: "Export Data with Ease",
    description: "Export your form data to CSV, Excel, or PDF files for easy sharing and analysis.",
    icon: <FaFileExport className="text-3xl text-red-500" />,
  },
];

const FeaturesSection = () => {
  return (
    <div className="relative bg-white dark:bg-gray-900 py-20 px-6 sm:px-12">
      {/* Section Title */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl sm:text-5xl flex justify-center items-baseline font-bold text-center text-gray-800 dark:text-white mb-16"
      >
       Streamline Your <p className="text-blue-600 mx-4 text-[55px]">Workflow</p> with
      </motion.h2>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl p-6 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <div className="flex items-center justify-center mb-4">
              {feature.icon}
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-2 text-center">
              {feature.title}
            </h3>
            <p className="text-gray-600 dark:text-gray-300 text-center text-sm">
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Decorative Curve */}

      <svg
        className="absolute top-0 left-0 w-full opacity-10 pointer-events-none"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#6366f1"
          d="M0,128L48,144C96,160,192,192,288,202.7C384,213,480,203,576,170.7C672,139,768,85,864,64C960,43,1056,53,1152,74.7C1248,96,1344,128,1392,144L1440,160V0H1392C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0H0Z"
        ></path>
      </svg>
      
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

export default FeaturesSection;
