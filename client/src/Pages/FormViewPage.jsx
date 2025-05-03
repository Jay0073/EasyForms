import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useParams, useNavigate } from "react-router-dom";

const FormViewPage = () => {
  const location = useLocation();
  const { id } = useParams();
  const [form, setForm] = useState(location.state?.form || null);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(!form);

  const navigate = useNavigate();

  useEffect(() => {
    if (!form) {
      const fetchForm = async () => {
        try {
          const response = await axios.get(`/api/forms/${id}`);
          setForm(response.data.form);
          setLoading(false);
        } catch (error) {
          console.error("Error fetching form:", error);
          setLoading(false);
        }
      };
      fetchForm();
    }
  }, [form, id]);

  const handleChange = (index, value) => {
    setAnswers({ ...answers, [index]: value });
  };

  const handleCheckboxChange = (index, value) => {
    const current = answers[index] || [];
    if (current.includes(value)) {
      setAnswers({ ...answers, [index]: current.filter((v) => v !== value) });
    } else {
      setAnswers({ ...answers, [index]: [...current, value] });
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await axios.post("/api/forms/submit", {
        formId: form._id,
        answers,
      });

      alert("Form submitted successfully!");
      console.log("Response:", response.data);
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit the form. Please try again.");
    }
    finally {
      setAnswers({});
      navigate("/");
    }
  };

  if (loading) {
    return <div className="text-center text-purple-700">Loading form...</div>;
  }

  if (!form) {
    return <div className="text-center text-red-600">Form not found</div>;
  }

  return (
    <div className="bg-[#f3e8ff] min-h-screen py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-md shadow-md">
        <h2 className="text-2xl font-bold text-purple-900 mb-1">
          {form.title}
        </h2>
        <p className="text-sm text-gray-600 mb-4">{form.description}</p>
        <p className="text-red-600 text-sm mb-6 font-medium">* Required</p>

        {form.fields.map((field, index) => (
          <div key={index} className="mb-6">
            <label className="block text-md font-medium text-gray-800 mb-1">
              {field.label}{" "}
              {field.required && <span className="text-red-600">*</span>}
            </label>

            {field.description && (
              <p className="text-sm text-gray-500 mb-2">{field.description}</p>
            )}

            {field.type === "text" && (
              <input
                type="text"
                className="w-full border-b border-gray-300 focus:outline-none focus:border-purple-600 py-1"
                onChange={(e) => handleChange(index, e.target.value)}
              />
            )}

            {field.type === "radio" && (
              <div className="space-y-2 mt-1">
                {field.options.map((opt, idx) => (
                  <label key={idx} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={`radio-${index}`}
                      value={opt}
                      className="accent-purple-600"
                      onChange={() => handleChange(index, opt)}
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
                      value={opt}
                      className="accent-purple-600"
                      onChange={() => handleCheckboxChange(index, opt)}
                    />
                    <span>{opt}</span>
                  </label>
                ))}
              </div>
            )}
          </div>
        ))}

        <button
          onClick={handleSubmit}
          className="bg-purple-700 text-white px-6 py-2 rounded hover:bg-purple-800"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default FormViewPage;
