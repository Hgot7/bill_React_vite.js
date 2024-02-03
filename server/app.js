const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const { ObjectId } = require('mongoose').Types;
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

//endpoint Update ข้อมูลตาม ID
app.put('/Payment/:id', async (req, res) => {
    const Net = 631;
    try {
        const payment = req.body.payment;
        const total = parseFloat(payment) + Net;
        const paymentId = req.params.id;

        // ตรวจสอบว่า req.body ถูกกำหนดค่าหรือไม่
        if (!req.body) {
            return res.status(400).json({ error: 'Invalid request body' });
        }

        // จะใช้ $set ในการอัปเดตหลายๆ ฟิลด์ใน collection
        const updatedData = await mongoose.connection.collection('Payment')
            .findOneAndUpdate(
                { _id: new mongoose.Types.ObjectId(paymentId) },
                { $set: { Total: total, payment: payment }, $currentDate: { timestamp: true } },
            );

        res.json({ success: true, message: 'Data update successfully', updatedData: updatedData });

    } catch (error) {
        console.error('Error updating data:', error);
        res.status(500).json({ error: 'Could not update the data.' });
    }
});

//endpoint search ข้อมูลตาม ID
app.get('/payment/:id', (req, res) => {
    const paymentId = req.params.id;
    if (!ObjectId.isValid(paymentId)) {
        return res.status(400).json({ error: 'Invalid payment ID' });
    }
    mongoose.connection.collection('Payment')
        .find({ _id: new mongoose.Types.ObjectId(paymentId) })
        .toArray()  // แปลง Cursor เป็น Array
        .then((payment) => {
            if (!payment || payment.length === 0) {
                return res.status(404).json({ error: 'Payment not found' });
            }

            res.status(200).json(payment[0]);  // จะให้ response เป็น Object ที่ index 0
        })
        .catch((error) => {
            console.error('Error fetching payment:', error);
            res.status(500).json({ error: 'Could not fetch the document' });
        });
});

/////////////////////////////////////////////////////// Endpoint สำหรับเพิ่มข้อมูล
const paymentSchema = new mongoose.Schema({
    payment: {
        type: String, // or the appropriate data type for payment
        required: true,
    },
    Total: {
        type: Number,
        default: 0,
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
});

const Payment = mongoose.model('Payment', paymentSchema);

// Endpoint สำหรับเพิ่มข้อมูล
app.post('/payment', async (req, res) => {
    try {
        const { payment } = req.body.payment;

        // ตรวจสอบความถูกต้องของข้อมูลที่รับมา
        if (!payment || !Total) {
            return res.status(400).json({ error: 'Invalid request body' });
        }

        const newPayment = new Payment({
            payment: payment
        });

        await newPayment.save();

        res.status(201).json(newPayment);
    } catch (error) {
        console.error('Error creating data:', error);
        res.status(500).json({ error: 'Could not create the data.' });
    }
});



