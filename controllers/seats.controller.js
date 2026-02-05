const Seat = require('../models/seat.model');

exports.getAll = async (req, res) => {
  try {
    res.json(await Seat.find({}));
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getSeatById = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if (!seat) res.status(404).json({ message: 'Not found' });
    else res.json(seat);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.createSeat = async (req, res) => {
  try {
    const { day, seat, client, email } = req.body;
    const newSeat = new Seat({
      day: day,
      seat: seat,
      client: client,
      email: email,
    });
    await newSeat.save();
    res.status(201).json({ message: 'OK' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.editSeat = async (req, res) => {
  const { day, seat, client, email } = req.body;

  try {
    const foundSeat = await Seat.findById(req.params.id);
    if (foundSeat) {
      foundSeat.day = day;
      foundSeat.seat = seat;
      foundSeat.client = client;
      foundSeat.email = email;
      await foundSeat.save();
      res.status(200).json({ message: 'OK' });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.deleteSeat = async (req, res) => {
  try {
    const seat = await Seat.findById(req.params.id);
    if (seat) {
      await Seat.deleteOne({ _id: req.params.id });
      res.json({ message: 'OK' });
    } else res.status(404).json({ message: 'Not found...' });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
