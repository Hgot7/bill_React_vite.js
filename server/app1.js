const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
app.use(cors());
app.use(express.json()); // ใช้ express.json() แทน body-parser

const PORT = process.env.PORT || 3000;

mongoose.connect("mongodb://127.0.0.1:27017/Record")
    .then(() => {
        console.log("Connected to DB");
        app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
    })
    .catch((err) => console.log(err));

// routes
app.get('/Payment', (req, res) => {
    const payments = [];
    mongoose.connection.collection('Payment')  // ใช้ mongoose.connection.collection แทน db.collection
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

app.put('/Payment/:id', async (req, res) => {
    try {
        const total = req.body.Total;
        const paymentId = req.params.id;

        // ตรวจสอบว่า req.body ถูกกำหนดค่าหรือไม่
        if (!req.body) {
            return res.status(400).json({ error: 'Invalid request body' });
        }
        // Handle the logic to update the total in the MongoDB collection
        const updatedData = await mongoose.connection.collection('Payment')
            .findOneAndUpdate(
                { _id: new mongoose.Types.ObjectId(paymentId) },
                { $set: { Total: total } },  // ให้ Total เท่ากับ req.body โดยตรง
                { returnDocument: 'after' }
            );
        res.json({ success: true, message: 'Data update successfully', updatedData: updatedData });

    } catch (error) {
        console.error('Error updating data:', error);
        res.status(500).json({ error: 'Could not update the total.' });
    }
});




