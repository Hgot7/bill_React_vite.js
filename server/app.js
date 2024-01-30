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


app.put('/payment/:id', async (req, res) => {
    try {
        const total = req.body ? req.body.total : undefined;
        const paymentId = req.params.id;
        
        // ตรวจสอบว่า req.body ถูกกำหนดค่าหรือไม่
        if (!req.body) {
            return res.status(400).json({ error: 'Invalid request body' });
        }

        // ตรวจสอบว่า req.body.total ถูกกำหนดค่าหรือไม่
        if (req.body.total === undefined) {
            return res.status(400).json({ error: 'Total is required' });
        }

        // Handle the logic to update the total in the MongoDB collection
        await db.collection('Payment').updateOne({ _id: paymentId }, { $set: { Total: total } });

        // Fetch the updated data and send it as the response
        const updatedData = await db.collection('Payment').find({ _id: paymentId }).toArray();
        res.json(updatedData);
    } catch (error) {
        console.error('Error updating data:', error);
        res.status(500).json({ error: 'Could not update the total.' });
    }
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