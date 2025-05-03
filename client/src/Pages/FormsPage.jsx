// src/pages/FormsPage.js

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
      } catch (error) {
        console.error("Error fetching forms:", error);
      }
    };
    fetchForms();
  }, []);

  const handleViewForm = (form) => {
    navigate(`/form/${form._id}`, {state: { form }});
  }

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
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <h2 className="text-3xl font-bold text-center text-purple-800 mb-8">
        All Forms
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {forms.map((form) => (
          <div
            key={form._id}
            className="bg-white p-5 rounded-2xl shadow-md hover:shadow-2xl transition-transform transform hover:scale-[1.03] cursor-pointer border border-purple-100 hover:border-purple-300"
            onClick={() => navigate(`/form/${form._id}`)}
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
                onClick={() => handleViewForm(form)}
              >
                View Form
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
    </div>
  );
};

export default FormsPage;
