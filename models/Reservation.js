// const { Double } = require("mongodb");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let ReservationSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  destination: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  passengers: {
    type: String,
    required: true,
  },
  member: {
    type: String,
    required: false,
  },
  discount: {
    type: String,
    required: true,
  },
  total: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Reservation", ReservationSchema);
