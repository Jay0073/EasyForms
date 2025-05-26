const Form = require("../models/form");
const Response = require("../models/Response");

exports.createForm = async (req, res) => {
  try {
    const { title, description, fields } = req.body;

    if (!title || !fields || !fields.length) {
      return res
        .status(400)
        .json({ message: "Title and at least one field are required." });
    }

    const newForm = new Form({
      title,
      description,
      fields,
      createdBy: req.user?._id, // optional: if using auth middleware
    });

    await newForm.save();
    res
      .status(201)
      .json({ message: "Form created successfully", form: newForm });
  } catch (error) {
    console.error("Create form error:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getAllForms = async (req, res) => {
  try {
    const forms = await Form.find().sort({ createdAt: -1 });
    res.status(200).json(forms);
  } catch (error) {
    console.error("Error fetching forms:", error);
    res.status(500).json({ message: "Server error while fetching forms" });
  }
};

exports.getFormById = async (req, res) => {
  try {
    const form = await Form.findById(req.params.id);
    if (!form) {
      return res.status(404).json({ message: "Form not found" });
    }
    res.status(200).json({ form });
  } catch (error) {
    console.error("Error fetching form:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.submitFormResponse = async (req, res) => {
  try {
    const { formId, answers } = req.body;

    if (!formId || !answers) {
      return res
        .status(400)
        .json({ message: "Form ID and answers are required." });
    }

    const newResponse = new Response({
      formId,
      answers,
    });

    await newResponse.save();

    res.status(201).json({
      message: "Response submitted successfully",
      response: newResponse,
    });
  } catch (error) {
    console.error("Error submitting response:", error);
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getResponsesByFormId = async (req, res) => {
  try {
    const { id } = req.params; // Form ID
    const responses = await Response.find({ formId: id }).sort({
      submittedAt: -1,
    });

    if (!responses || responses.length === 0) {
      return res
        .status(404)
        .json({ message: "No responses found for this form." });
    }

    res.status(200).json({ responses });
  } catch (error) {
    console.error("Error fetching responses:", error);
    res.status(500).json({ message: "Server error", error });
  }
};
