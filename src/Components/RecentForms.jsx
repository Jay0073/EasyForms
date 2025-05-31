import { useEffect, useState, useRef } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import FormCard from "./FormCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const RecentForms = () => {
  const [forms, setForms] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.get("/api/forms/allforms");
        // Sort forms by creation date and take the most recent ones
        const recentForms = response.data
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 6); // Show only 6 most recent forms
        setForms(recentForms);
      } catch (error) {
        console.error("Error fetching forms:", error);
      }
    };
    fetchForms();
  }, []);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < forms.length - 3) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  return (
    <div className="relative py-15 bg-gray-50 dark:bg-gray-900">
      {/* Decorative SVG Curve */}
      <svg
        className="absolute top-0 left-0 w-full opacity-10 pointer-events-none"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#6366f1"
          d="M0,128L48,144C96,160,192,192,288,202.7C384,213,480,203,576,170.7C672,139,768,85,864,64C960,43,1056,53,1152,74.7C1248,96,1344,128,1392,144L1440,160V0H1392C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0H0Z"
        ></path>
      </svg>

      {/* Heading */}
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl sm:text-5xl flex justify-center items-baseline font-bold text-center text-gray-800 dark:text-white mb-16"
      >
        Recently <p className="text-blue-600 mx-4 text-[55px]">Created</p> Forms
      </motion.h2>

      <div className="relative max-w-7xl mx-auto px-4">
        {/* Navigation Buttons */}
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors ${
            currentIndex === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <FaChevronLeft className="text-gray-600 text-4xl" />
        </button>

        <button
          onClick={handleNext}
          disabled={currentIndex >= forms.length - 3}
          className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors ${
            currentIndex >= forms.length - 3
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
        >
          <FaChevronRight className="text-gray-600 text-4xl" />
        </button>

        {/* Slider Container */}
        <motion.div
          ref={sliderRef}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="overflow-hidden px-20"
        >
          <motion.div
            className="flex gap-6 transition-transform duration-500 ease-out"
            style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
          >
            {forms.map((form) => (
              <motion.div
                key={form._id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                className="min-w-[300px]"
              >
                <FormCard form={form} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Dots Navigation */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: Math.ceil(forms.length / 3) }).map(
            (_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-colors ${
                  currentIndex === index ? "bg-purple-600" : "bg-gray-300"
                }`}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default RecentForms;
