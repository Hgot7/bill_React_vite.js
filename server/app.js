const express = require('express')
const cors = require('cors');
// init app & middleware
const app = express();

app.use(cors());
const { connectToDb, getDb } = require("./db")
const port = 3000; // เปลี่ยนตามต้องการ

// db connection
let db;
// Connect to the database
connectToDb((err) => {
    if (err) {
        console.error('Failed to connect to the database:', err);
        return;
    }
    // If connected successfully, get the database instance
    db = getDb();
    // Start the Express app after successful database connection
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
});


// routes
app.get('/Payment', (req, res) => {
    const payments = [];
    db.collection('Payment')
        .find()
        .sort({ author: 1 })
        .forEach(payment => {
            payments.push(payment);
        })
        .then(() => {
            res.status(200).json(payments);
        })
        .catch(() => {
            res.status(500).json({ 'error': 'Could not fetch the documents' });
        });
});
app.get('/Bill', (req, res) => {
    const Bills = [];
    db.collection('Bill')
        .find()
        .sort({ author: 1 })
        .forEach(bill => {
            Bills.push(bill);
        })
        .then(() => {
            res.status(200).json(Bills);
        })
        .catch(() => {
            res.status(500).json({ 'error': 'Could not fetch the documents' });
        });
});
