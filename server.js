const express = require('express');
const { randomUUID } = require('crypto');
var cors = require('cors');

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(express.json());

app.use(cors());

const db = [
  { id: 1, author: 'John Doe', text: 'This company is worth every coin!' },
  {
    id: 2,
    author: 'Amanda Doe',
    text: 'They really know how to make you happy.',
  },
];

app.get('/testimonials', (req, res) => {
  res.json(db);
});

app.get('/testimonials/random', (req, res) => {
  const randomIndex = Math.floor(Math.random() * db.length);
  res.json(db[randomIndex]);
});

app.get('/testimonials/:id', (req, res) => {
  res.json(db.filter((e) => e.id === Number(req.params.id)));
});

app.post('/testimonials', (req, res) => {
  const { author, text } = req.body;

  if (!author || !text) {
    return res.status(400).json({ message: 'author and text are required' });
  }

  const newTestimonial = {
    id: randomUUID(),
    author,
    text,
  };

  db.push(newTestimonial);

  res.status(201).json({ message: 'OK' });
});

app.put('/testimonials/:id', (req, res) => {
  const { author, text } = req.body;
  const id = Number(req.params.id);

  if (!author || !text) {
    return res.status(400).json({ message: 'author and text are required' });
  }

  const index = db.findIndex((e) => e.id === id);
  if (index === -1) {
    return res.status(404).json({ message: 'Not found' });
  }

  db[index] = {
    id,
    author,
    text,
  };

  res.status(201).json({ message: 'OK' });
});

app.delete('/testimonials/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = db.findIndex((e) => e.id === id);

  if (index === -1) {
    return res.status(404).json({ message: 'Not found' });
  }

  db.splice(index, 1);

  return res.json({ message: 'OK' });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Not found...' });
});

app.listen(8000, () => {
  console.log('Server is running on port: 8000');
});
