require("dotenv").config();
const express = require('express');
const mongoose = require('mongoose'); // Import mongoose
const app = express();
const http = require('http').Server(app);
const paymentRoute = require('./routes/paymentRoute');

// Middleware to parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set the view engine to EJS
app.set('view engine', 'ejs');

// Serve static files (like CSS, JS)
app.use(express.static('public'));

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
})
.then(() => {
    console.log('Connected to MongoDB');
})
.catch(err => {
    console.error('MongoDB connection error:', err);
});

// Create a payment schema
const paymentSchema = new mongoose.Schema({
    razorpay_payment_id: String,
    userName: String,
    userEmail: String,
    userContact: String,
    amount: Number,
    playlistName: String,
    createdAt: { type: Date, default: Date.now }
});

// Create a payment model
const Payment = mongoose.model('Payment', paymentSchema);

// Set up the payment route
app.use('/', paymentRoute);

// Route to render the main page
app.get('/', (req, res) => {
    res.render('index'); // Render the index.ejs file
});
app.get('/b', (req, res) => {
    res.render('password'); // Render a form to input the password
});

app.post('/b', async (req, res) => {
    const enteredPassword = req.body.password;
    
    // Simple password check
    if (enteredPassword === '1234') {
        try {
            // Fetch payment data from the database
            const payments = await Payment.find({});
            
            // Render the 'b.ejs' with the payments data if the password is correct
            res.render('b', { payments: payments });
        } catch (error) {
            console.error('Error fetching payment data:', error);
            res.status(500).send('Error fetching payment data');
        }
    } else {
        res.render('password', { error: 'Incorrect password' }); // If password is wrong, show an error
    }
});

app.post('/api/payment', async (req, res) => {
    try {
        console.log(req.body); // Check what data is received

        // Save the payment data to MongoDB
        const paymentData = new Payment(req.body);
        await paymentData.save();

        res.json({ message: 'Payment data received successfully' });
    } catch (error) {
        console.error('Error saving payment data:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Start the server
http.listen(3000, function() {
    console.log('Server is running on port 3000');
});
