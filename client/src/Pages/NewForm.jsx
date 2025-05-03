import React, { useState } from "react";
import axios from "axios";

const fieldTypes = [
  { label: "Short Answer", value: "text" },
  { label: "Radio Options", value: "radio" },
  { label: "Checkbox Group", value: "checkbox" },
];

const NewForm = () => {
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [fields, setFields] = useState([]);

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
    alert("Form validated successfully!");
    // Submit logic here
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
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-3xl font-bold mb-3">Create New Form</h2>
        <button
          onClick={() => setIsPreviewOpen(true)}
          className="bg-gray-200 px-4 py-1 rounded hover:bg-gray-300"
        >
          Preview
        </button>
      </div>

      <input
        type="text"
        placeholder="Form Title"
        value={formTitle}
        onChange={(e) => setFormTitle(e.target.value)}
        className="w-full px-4 py-2 border rounded"
        required
      />

      <textarea
        placeholder="Form Description"
        value={formDescription}
        onChange={(e) => setFormDescription(e.target.value)}
        className="w-full px-4 py-2 border rounded"
      />

      {/* Dropdown to add new field */}
      <div>
        <select
          onChange={(e) => {
            if (e.target.value) {
              addField(e.target.value);
              e.target.value = "";
            }
          }}
          className="border px-4 py-2 rounded"
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
      {fields.map((field) => (
        <div
          key={field.id}
          className="bg-white border p-4 rounded shadow-sm relative space-y-3"
        >
          <input
            type="text"
            placeholder="Question Title"
            value={field.label}
            onChange={(e) => updateField(field.id, "label", e.target.value)}
            className="w-full border-b pb-1 text-lg font-semibold"
          />

          {["radio", "checkbox"].includes(field.type) && (
            <textarea
              placeholder="Enter options (comma separated)"
              onChange={(e) => updateOptions(field.id, e.target.value)}
              defaultValue={field.options.join(", ")}
              className="w-full border px-3 py-2 rounded"
            />
          )}

          {renderField(field)}

          <button
            onClick={() => deleteField(field.id)}
            className="absolute top-2 right-[-40px] text-red-500 hover:text-red-700 text-m cursor-pointer"
          >
            ❌
          </button>
        </div>
      ))}

      <button
        onClick={submitForm}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Save Form
      </button>
      {isPreviewOpen && (
  <div
    className="fixed inset-0 z-50 flex items-center justify-center"
    style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
  >
    <div className="bg-[#f3e8ff] p-6 rounded-lg shadow-xl w-[95%] max-w-3xl max-h-[90vh] overflow-y-auto relative">
      <button
        className="absolute top-4 right-6 text-gray-500 hover:text-gray-700 text-5xl"
        onClick={() => setIsPreviewOpen(false)}
      >
        &times;
      </button>

      {/* Added Preview Title */}
      <h2 className="text-3xl font-bold mb-4 pl-1">Preview</h2>

      <div className="bg-white rounded-md shadow-md px-6 py-4">
        <h1 className="text-2xl font-bold text-purple-900 mb-1">
          {formTitle || "Untitled Form"}
        </h1>
        <p className="text-sm text-gray-600 mb-4">
          {formDescription || "Form description goes here"}
        </p>
        <p className="text-red-600 text-sm mb-4 font-medium">* Required</p>
      </div>

      <div className="mt-4 space-y-6">
        {fields.map((field, index) => (
          <div key={index} className="bg-white rounded-md shadow-md p-6">
            <label className="block text-md font-medium text-gray-800 mb-1">
              {field.label}{" "}
              {field.required && <span className="text-red-600">*</span>}
            </label>

            {field.description && (
              <p className="text-sm text-gray-500 mb-2">
                {field.description}
              </p>
            )}

            {field.type === "text" && (
              <input
                type="text"
                placeholder="Your answer"
                className="w-full border-b border-gray-300 focus:outline-none focus:border-purple-600 py-1"
                disabled
              />
            )}

            {field.type === "radio" && (
              <div className="space-y-2 mt-1">
                {field.options.map((opt, idx) => (
                  <label key={idx} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      disabled
                      className="accent-purple-600"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            )}

            {field.type === "checkbox" && (
              <div className="space-y-2 mt-1">
                {field.options.map((opt, idx) => (
                  <label key={idx} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      disabled
                      className="accent-purple-600"
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}

        <button className="bg-purple-700 text-white px-6 py-2 rounded hover:bg-purple-800">
          Submit
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};

export default NewForm;
