const mongoose = require('mongoose');

// สร้าง schema
const paymentSchema = new mongoose.Schema({
    total: Number,
    payment: Number,
    timestamp: Date
    // เพิ่ม properties อื่น ๆ ตามต้องการ
});

// สร้าง model จาก schema
const Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
