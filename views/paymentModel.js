// models/paymentModel.js
const mongoose = require('mongoose');

// Define the schema for your collection
const paymentSchema = new mongoose.Schema({
    razorpay_payment_id: String,
    userName: String,
    userEmail: String,
    userContact: String,
    amount: Number,
    playlistName: String,
    createdAt: { type: Date, default: Date.now }
});

// Create the model
const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
