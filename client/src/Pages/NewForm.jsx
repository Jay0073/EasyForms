import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const fieldTypes = [
  { label: "Short Answer", value: "text" },
  { label: "Radio Options", value: "radio" },
  { label: "Checkbox Group", value: "checkbox" },
];

const NewForm = () => {
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [fields, setFields] = useState([]);
  const navigate = useNavigate();

  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const addField = (type) => {
    const newField = {
      id: Date.now(),
      type,
      label: "",
      options: type === "text" ? [] : [],
    };
    setFields([...fields, newField]);
  };

  const updateField = (id, key, value) => {
    setFields(fields.map((f) => (f.id === id ? { ...f, [key]: value } : f)));
  };

  const updateOptions = (id, optionText) => {
    const options = optionText.split(",").map((opt) => opt.trim());
    updateField(id, "options", options);
  };

  const deleteField = (id) => {
    setFields(fields.filter((f) => f.id !== id));
  };

  const validateForm = () => {
    if (!formTitle.trim()) return alert("Form title is required.");
    for (let field of fields) {
      if (!field.label.trim()) return alert("All questions must have a label.");
      if (
        ["radio", "checkbox"].includes(field.type) &&
        (!field.options.length || field.options.some((o) => !o))
      ) {
        return alert("Options must be non-empty for radio/checkbox fields.");
      }
    }
  };

  const renderField = (field) => {
    switch (field.type) {
      case "text":
        return (
          <input
            type="text"
            disabled
            placeholder="Short answer text"
            className="w-full border px-3 py-2 rounded"
          />
        );
      case "radio":
        return (
          <div className="space-y-1">
            {field.options.map((opt, idx) => (
              <label key={idx} className="block">
                <input
                  type="radio"
                  name={`radio-${field.id}`}
                  disabled
                  className="mr-2"
                />
                {opt}
              </label>
            ))}
          </div>
        );
      case "checkbox":
        return (
          <div className="space-y-1">
            {field.options.map((opt, idx) => (
              <label key={idx} className="block">
                <input type="checkbox" disabled className="mr-2" />
                {opt}
              </label>
            ))}
          </div>
        );
      default:
        return null;
    }
  };

  const submitForm = async () => {
    try {
      // Validate form before submission
      validateForm();
      // Frontend data structure matching the backend schema
      const formData = {
        title: formTitle,
        description: formDescription,
        fields: fields.map((f) => ({
          type: f.type,
          label: f.label,
          options: f.options || [],
        })),
      };

      const token = localStorage.getItem("token"); // If you're using auth

      const response = await axios.post("/api/forms/", formData, {
        headers: {
          Authorization: `Bearer ${token}`, // Optional, if using protected routes
        },
      });

      alert("Form saved successfully!");
      console.log(response.data);
    } catch (error) {
      console.error(
        "Error saving form:",
        error.response?.data || error.message
      );
      alert("Failed to save form.");
    } finally {
      setFormTitle("");
      setFormDescription("");
      setFields([]);
      navigate("/forms");
    }
  };

  return (
    <div className="min-h-[90vh] bg-gray-900 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-4xl font-bold text-purple-100">
            Create New Form
          </h2>
          <button
            onClick={() => setIsPreviewOpen(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-purple-700 transition"
          >
            Preview
          </button>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
          <input
            type="text"
            placeholder="Form Title"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg text-lg focus:outline-none focus:border-purple-500"
            required
          />

          <textarea
            placeholder="Form Description"
            value={formDescription}
            onChange={(e) => setFormDescription(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg mt-4 text-gray-700 focus:outline-none focus:border-purple-500"
          />
        </div>

        {/* Dropdown to add new field */}
        <div className="mb-6">
          <select
            onChange={(e) => {
              if (e.target.value) {
                addField(e.target.value);
                e.target.value = "";
              }
            }}
            className="w-[20%] px-4 py-3 border border-gray-200 rounded-lg bg-white text-gray-700 focus:outline-none focus:border-purple-500"
          >
            <option value="">➕ Add Question Type</option>
            {fieldTypes.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Dynamic Field List */}
        <div className="space-y-6">
          {fields.map((field) => (
            <div
              key={field.id}
              className="bg-white p-6 rounded-2xl shadow-md relative space-y-4 border border-purple-100 hover:border-purple-300 transition-all"
            >
              <input
                type="text"
                placeholder="Question Title"
                value={field.label}
                onChange={(e) => updateField(field.id, "label", e.target.value)}
                className="w-full border-b border-gray-200 pb-2 text-lg font-semibold text-gray-800 focus:outline-none focus:border-purple-500"
              />

              {["radio", "checkbox"].includes(field.type) && (
                <textarea
                  placeholder="Enter options (comma separated)"
                  onChange={(e) => updateOptions(field.id, e.target.value)}
                  defaultValue={field.options.join(", ")}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg text-gray-700 focus:outline-none focus:border-purple-500"
                />
              )}

              {renderField(field)}

              <button
                onClick={() => deleteField(field.id)}
                className="absolute top-4 right-4 cursor-pointer text-red-500 hover:text-red-700 transition-colors"
              >
                ❌
              </button>
            </div>
          ))}
        </div>

        <div className="mt-8 flex justify-end">
          <button
            onClick={submitForm}
            className="bg-gradient-to-r from-blue-600 to-purple-500 text-white px-8 py-3 rounded-lg font-medium shadow-md hover:from-purple-700 hover:to-purple-600 transition"
          >
            Save Form
          </button>
        </div>
      </div>

      {/* Preview Modal */}
      {isPreviewOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
        >
          <div className="bg-white p-8 rounded-2xl shadow-xl w-[95%] max-w-3xl max-h-[90vh] overflow-y-auto relative">
            <button
              className="absolute top-5 right-6 text-gray-500 cursor-pointer hover:text-gray-700 text-5xl"
              onClick={() => setIsPreviewOpen(false)}
            >
              &times;
            </button>

            <h2 className="text-3xl font-bold mb-6 text-purple-900">Preview</h2>

            <div className="bg-purple-50 rounded-lg p-6 mb-6">
              <h1 className="text-2xl font-bold text-purple-900 mb-2">
                {formTitle || "Untitled Form"}
              </h1>
              <p className="text-gray-600">
                {formDescription || "Form description goes here"}
              </p>
            </div>

            <div className="space-y-6">
              {fields.map((field, index) => (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow-md p-6 border border-gray-100"
                >
                  <label className="block text-lg font-medium text-gray-800 mb-2">
                    {field.label}
                    {field.required && (
                      <span className="text-red-600 ml-1">*</span>
                    )}
                  </label>

                  {field.type === "text" && (
                    <input
                      type="text"
                      placeholder="Your answer"
                      className="w-full border-b border-gray-300 focus:outline-none focus:border-purple-600 py-2"
                      disabled
                    />
                  )}

                  {field.type === "radio" && (
                    <div className="space-y-2">
                      {field.options.map((opt, idx) => (
                        <label
                          key={idx}
                          className="flex items-center space-x-3"
                        >
                          <input
                            type="radio"
                            disabled
                            className="accent-purple-600"
                          />
                          <span className="text-gray-700">{opt}</span>
                        </label>
                      ))}
                    </div>
                  )}

                  {field.type === "checkbox" && (
                    <div className="space-y-2">
                      {field.options.map((opt, idx) => (
                        <label
                          key={idx}
                          className="flex items-center space-x-3"
                        >
                          <input
                            type="checkbox"
                            disabled
                            className="accent-purple-600"
                          />
                          <span className="text-gray-700">{opt}</span>
                        </label>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <button className="bg-gradient-to-r from-purple-600 to-purple-500 text-white px-8 py-3 rounded-lg font-medium shadow-md hover:from-purple-700 hover:to-purple-600 transition">
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Decorative SVGs */}
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

export default NewForm;
