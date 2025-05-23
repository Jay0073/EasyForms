import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const FormsPage = () => {
  const [forms, setForms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.get("/api/forms/allforms");
        setForms(response.data);
        console.log(response.data)
      } catch (error) {
        console.error("Error fetching forms:", error);
      }
    };
    fetchForms();
  }, []);

  const handleViewForm = (form) => {
    navigate(`/form/${form._id}`, { state: { form } });
  };

  const copyLink = (formId) => {
    const link = `${window.location.origin}/form/${formId}`;
    navigator.clipboard
      .writeText(link)
      .then(() => {
        alert("Link copied to clipboard!");
      })
      .catch((err) => {
        console.error("Failed to copy link:", err);
      });
  };

  return (
    <div className="min-h-[90vh] bg-gray-900 py-10 px-4">
      <h2 className="text-4xl font-bold text-center text-purple-100 mb-12">
        All Forms
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {forms.map((form) => (
          <div
            key={form._id}
            className="bg-white p-5 rounded-2xl shadow-md hover:shadow-2xl transition-transform transform hover:scale-[1.03] cursor-pointer border border-purple-100 hover:border-purple-300"
            onClick={() => handleViewForm(form)}
          >
            <h3 className="text-3xl font-bold text-purple-900 mb-3 tracking-tight">
              {form.title}
            </h3>

            <p className="text-m text-gray-700 mb-5 line-clamp-3 leading-relaxed">
              {form.description || "No description available."}
            </p>

            <div className="flex justify-between items-center text-s text-gray-500 mb-4">
              <span className="italic">
                Created: {new Date(form.createdAt).toLocaleString()}
              </span>
            </div>

            <div className="flex justify-between items-center gap-4">
              <button
                className="flex-1 bg-gradient-to-r from-purple-600 to-purple-500 text-white py-2 px-4 rounded-lg font-medium shadow-md hover:from-purple-700 hover:to-purple-600 transition"
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/form/${form._id}/responses`);
                }}
              >
                View Responses
              </button>

              <button
                className="flex-1 bg-gray-100 text-gray-800 py-2 px-4 rounded-lg font-medium border border-gray-300 hover:bg-gray-200 transition"
                onClick={(e) => {
                  e.stopPropagation();
                  copyLink(form._id);
                }}
              >
                Copy Link
              </button>
            </div>
          </div>
        ))}
      </div>

       <svg
        className="fixed bottom-[50%] left-0 w-full opacity-10 pointer-events-none"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#6366f1"
          d="M0,192L48,197.3C96,203,192,213,288,202.7C384,192,480,160,576,133.3C672,107,768,85,864,101.3C960,117,1056,171,1152,165.3C1248,160,1344,96,1392,64L1440,32V320H1392C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320H0Z"
        ></path>
      </svg>
      <svg
        className="fixed top-[50%] left-0 w-full opacity-10 pointer-events-none"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#6366f1"
          d="M0,128L48,144C96,160,192,192,288,202.7C384,213,480,203,576,170.7C672,139,768,85,864,64C960,43,1056,53,1152,74.7C1248,96,1344,128,1392,144L1440,160V0H1392C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0H0Z"
        ></path>
      </svg> 
    </div>
  );
};

export default FormsPage;
