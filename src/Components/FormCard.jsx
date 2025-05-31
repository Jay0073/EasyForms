import React from "react";
import { useNavigate } from "react-router-dom";

const FormCard = ({ form }) => {
  const navigate = useNavigate();

  const handleViewForm = () => {
    navigate(`/form/${form._id}`, { state: { form } });
  };

  const copyLink = (e) => {
    e.stopPropagation();
    const link = `${window.location.origin}/form/${form._id}`;
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
    <div
      className="bg-white p-5 rounded-2xl shadow-md hover:shadow-2xl transition-transform transform hover:scale-[1.03] cursor-pointer border border-purple-100 hover:border-purple-300"
      onClick={handleViewForm}
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

      <div className="flex justify-between items-center gap-2">
        <button
          className=" bg-gradient-to-r from-blue-600 to-purple-500 text-white py-2 px-4 rounded-lg font-medium shadow-md hover:from-purple-700 hover:to-purple-600 transition"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/form/${form._id}/responses`);
          }}
        >
          View Responses
        </button>

        <button
          className=" bg-gray-100 text-gray-800 py-2 px-4 rounded-lg font-medium border border-gray-300 hover:bg-gray-200 transition"
          onClick={copyLink}
        >
          Copy Link
        </button>
      </div>
    </div>
  );
};

export default FormCard;
