const express = require('express');
const router = express.Router();
const { createForm, getAllForms, getFormById, submitFormResponse, getResponsesByFormId } = require('../controllers/formController');

router.post('/', createForm);
router.get('/allforms', getAllForms);
router.get('/:id', getFormById); 
router.post('/submit', submitFormResponse); // Route for submitting responses


router.get('/:id/responses', getResponsesByFormId); // Fetch responses for a form


module.exports = router;
