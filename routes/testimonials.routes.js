const express = require('express');
const router = express.Router();
const TestimonialController = require('../controllers/testimonials.controller');

router.get('/testimonials', TestimonialController.getAll);
router.get('/testimonials/:id', TestimonialController.getTestimonialById);
router.post('/testimonials', TestimonialController.createTestimonial);
router.put('/testimonials/:id', TestimonialController.editTestimonial);
router.delete('/testimonials/:id', TestimonialController.deleteTestimonial);

module.exports = router;
