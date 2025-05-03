import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ResponsesPage = () => {
  const { id } = useParams(); // Form ID from the URL
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
        console.error('Error fetching responses:', error);
        setLoading(false);
      }
    };

    fetchResponses();
  }, [id]);

  if (loading) {
    return <div className="text-center text-purple-700">Loading responses...</div>;
  }

  if (!form) {
    return <div className="text-center text-red-600">Form not found</div>;
  }

  if (responses.length === 0) {
    return <div className="text-center text-gray-600">No responses available for this form.</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-3xl font-bold text-purple-900 mb-4">{form.title}</h2>
        <p className="text-[17px] text-gray-600 mb-6">{form.description}</p>

        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Responses ({responses.length})</h3>
        <div className="space-y-6">
          {responses.map((response, index) => (
            <div key={index} className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <h4 className="text-lg font-medium text-gray-700 mb-2">
                Response {index + 1} (Submitted at: {new Date(response.submittedAt).toLocaleString()})
              </h4>
              <ul className="list-disc pl-6 space-y-2">
                {Object.entries(response.answers).map(([questionIndex, answer]) => (
                  <li key={questionIndex}>
                    <strong>{form.fields[questionIndex]?.label || `Question ${+questionIndex + 1}`}: </strong>
                    {Array.isArray(answer) ? answer.join(', ') : answer}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResponsesPage;