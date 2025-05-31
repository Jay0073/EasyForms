import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const ResponsesPage = () => {
  const { id } = useParams();
  const [responses, setResponses] = useState([]);
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const formResponse = await axios.get(`/api/forms/${id}`);
        setForm(formResponse.data.form);

        const response = await axios.get(`/api/forms/${id}/responses`);
        setResponses(response.data.responses);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching responses:", error);
        setLoading(false);
      }
    };

    fetchResponses();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-[90vh] bg-gray-900 flex items-center justify-center">
        <div className="text-2xl font-semibold text-purple-100">
          Loading responses...
        </div>
      </div>
    );
  }

  if (!form) {
    return (
      <div className="min-h-[90vh] bg-gray-900 flex items-center justify-center">
        <div className="text-2xl font-semibold text-red-400">
          Form not found
        </div>
      </div>
    );
  }

  if (responses.length === 0) {
    return (
      <div className="min-h-[90vh] bg-gray-900 flex items-center justify-center">
        <div className="text-2xl font-semibold text-purple-100">
          No responses available for this form.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[90vh] bg-gray-900 py-10 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-baseline justify-between mb-8">
          <h2 className="text-4xl font-bold text-purple-100">Form Responses</h2>
          <div className="text-xl text-purple-200">
            Total:{" "}
            <span className="text-blue-400 font-semibold">
              {responses.length}
            </span>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-md mb-6">
          <h3 className="text-2xl font-bold text-purple-900 mb-2">
            {form.title}
          </h3>
          <p className="text-gray-600">{form.description}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {responses.map((response, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-xl shadow-md border border-purple-100 hover:border-purple-300 transition-all"
            >
              <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-100">
                <h4 className="text-lg font-semibold text-purple-900">
                  Response {index + 1}
                </h4>
                <span className="text-sm text-gray-500">
                  {new Date(response.submittedAt).toLocaleDateString()}
                </span>
              </div>

              <div className="space-y-2">
                {Object.entries(response.answers).map(
                  ([questionIndex, answer]) => (
                    <div key={questionIndex} className="flex items-start gap-2">
                      <span className="text-sm font-medium text-gray-700 min-w-[100px]">
                        {form.fields[questionIndex]?.label ||
                          `Q${+questionIndex + 1}`}
                        :
                      </span>
                      <span className="text-sm text-gray-600">
                        {Array.isArray(answer) ? answer.join(", ") : answer}
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

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

export default ResponsesPage;
