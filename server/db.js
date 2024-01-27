const { MongoClient } = require('mongodb');

let dbConnection;

module.exports = {
    connectToDb: (cb) => {
        if (dbConnection) {
            // ถ้ามีการเชื่อมต่ออยู่แล้ว ให้เรียก callback ทันที
            return cb();
        }
        MongoClient.connect('mongodb://127.0.0.1:27017/Record')
            .then((client) => {
                dbConnection = client.db();
                cb(); // เรียก callback เมื่อการเชื่อมต่อเสร็จสมบูรณ์
            })
            .catch((err) => {
                console.error(err);
                cb(err); // เรียก callback พร้อม error ถ้ามีข้อผิดพลาด
            });
    },
    getDb: () => {
        if (!dbConnection) {
            // ถ้ายังไม่ได้เชื่อมต่อ ให้สร้าง error และ throw ขึ้นมา
            throw new Error('Database connection has not been established.');
        }
        return dbConnection;
    },
};
