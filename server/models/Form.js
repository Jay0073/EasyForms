const mongoose = require('mongoose');

const FieldSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['text', 'radio', 'checkbox'],
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  options: {
    type: [String], // Only for radio/checkbox
    default: [],
  },
});

const FormSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  fields: [FieldSchema],
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // If you have user auth
    required: false,
  },
}, { timestamps: true });

module.exports = mongoose.model('Form', FormSchema);
