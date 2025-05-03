const express = require('express');
const router = express.Router();
const { createForm, getAllForms, getFormById, submitFormResponse } = require('../controllers/formController');

router.post('/', createForm);
router.get('/allforms', getAllForms);
router.get('/:id', getFormById); 
router.post('/submit', submitFormResponse); // Route for submitting responses


module.exports = router;
