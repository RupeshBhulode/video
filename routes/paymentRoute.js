const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const axios = require('axios'); // Import axios for making HTTP requests

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,  // Your Razorpay key id
    key_secret: process.env.RAZORPAY_KEY_SECRET  // Your Razorpay key secret
});

// Route to create an order
router.post('/createOrder', (req, res) => {
    const { name, amount, description, email, phoneNumber } = req.body; // Accept user details

    const options = {
        amount: amount * 100, // Convert to paise
        currency: "INR",
        receipt: name,
        notes: {
            description
        }
    };

    razorpay.orders.create(options, (err, order) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({
            success: true,
            key_id: process.env.RAZORPAY_KEY_ID,
            order_id: order.id,
            amount: options.amount,
            product_name: name,
            description: description,
            contact: phoneNumber, // Optional: populate with user contact
            user_name: name, // Optional: populate with user name
            email: email // Optional: populate with user email
        });
    });
});



module.exports = router;
