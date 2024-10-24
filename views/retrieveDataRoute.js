const express = require('express');
const router = express.Router();
const Payment = require('../models/paymentModel'); // Adjust path as necessary

// Route to fetch all payments
router.get('/api/payments', async (req, res) => {
    try {
        const payments = await Payment.find(); // Fetch all records from the collection
        res.json(payments); // Send the data as JSON response
    } catch (error) {
        console.error('Error retrieving payment data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
