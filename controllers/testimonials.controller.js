const Testimonial = require('../models/testimonial.model');
const sanitize = require('mongo-sanitize');

exports.getAll = async (req, res) => {
  try {
    res.json(await Testimonial.find({}));
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getTestimonialById = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (!testimonial) res.status(404).json({ message: 'Not found' });
    else res.json(testimonial);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.createTestimonial = async (req, res) => {
  try {
    const cleanBody = sanitize(req.body);

    const newTestimonial = new Testimonial({
      author: cleanBody.author,
      text: cleanBody.text,
    });

    await newTestimonial.save();
    res.status(201).json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.editTestimonial = async (req, res) => {
  const cleanBody = sanitize(req.body);
  const { author, text } = cleanBody;
  
  try {
    const foundTestimonial = await Testimonial.findById(req.params.id);
    if (foundTestimonial) {
      foundTestimonial.author = author;
      foundTestimonial.text = text;
      await foundTestimonial.save();
      res.status(200).json({ message: 'OK' });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteTestimonial = async (req, res) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    if (testimonial) {
      await Testimonial.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
