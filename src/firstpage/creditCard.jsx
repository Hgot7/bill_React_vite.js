import React, { useState, useEffect } from 'react';
import moment from 'moment';

function Paypal() {
  const [data, setData] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    // Fetch data from your API endpoint
    fetch('http://localhost:3000/payment')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleUpdate = (id) => {
    // ส่งข้อมูลไปยัง API เพื่อทำการอัปเดต Total สำหรับ ID ที่กำหนด
    fetch(`http://localhost:3000/payment/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Total: parseInt(inputValue),
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        // ทำการ fetch ข้อมูลใหม่หลังจากที่ทำการ update เสร็จ
        return fetch('http://localhost:3000/payment');
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        // อัปเดตข้อมูลใน state
        setData(data);
        // เคลียร์ค่าใน input
        setInputValue('');
      })
      .catch((error) => console.error('Error updating data:', error));
  };
  

  return (
    <div className="paypal">
      <h5>Paypal</h5>
      <ul>
        {data.map((item) => (
          <li key={item._id}>
            <p>ID: {item._id}</p>
            <p>Total: {item.Total}</p>
            {/* สามารถแสดง properties อื่น ๆ ได้ตามต้องการ */}
            <p>Payment: {item.payment}</p>
            <p>Timestamp: {moment(item.timestamp).format('YYYY-MM-DD HH:mm:ss')}</p>
            {/* ใส่ input และปุ่ม Update */}
            <div>
              <input
                type="number"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Enter new total"
              />
              <button onClick={() => handleUpdate(item._id)}>Update</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Paypal;
