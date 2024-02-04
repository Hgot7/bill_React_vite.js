import React, { useState, useEffect } from 'react';
import { useParams, useNavigate,Link } from 'react-router-dom';

function EditPayment() {
  const { id } = useParams();
  const [paymentData, setPaymentData] = useState({});
  const [updatedTotal, setUpdatedTotal] = useState('');
  const [updatedPayment, setUpdatedPayment] = useState(''); // เพิ่ม state สำหรับ Payment
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = () => {
    fetch(`http://localhost:3000/payment/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setPaymentData(data);
        setUpdatedTotal(data.Total.toString()); // กำหนดค่าเริ่มต้นให้ updatedTotal
        setUpdatedPayment(data.payment); // กำหนดค่าเริ่มต้นให้ updatedPayment
      })
      .catch((error) => console.error('Error fetching payment data:', error));
  };

  const handleUpdate = () => {
    fetch(`http://localhost:3000/payment/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Total: parseInt(updatedTotal),
        payment: updatedPayment, // เพิ่มการส่งค่า updatedPayment
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        navigate('/payment/credit-card');
      })
      .catch((error) => console.error('Error updating data:', error));
  };

  return (
    <div className="edit-payment">
      <h2>Edit Payment</h2>
      <p>ID : {paymentData._id}</p>
      <p>Payment : {paymentData.payment} Bath</p>
      <p>Total : {paymentData.Total} Bath  [Payment+631(ค่าเน็ต)]</p>
    
      <label htmlFor="updatedPayment">Update Payment :</label>
      <input
        type="text"
        id="updatedPayment"
        value={updatedPayment}
        onChange={(e) => setUpdatedPayment(e.target.value)}
      />

      <button onClick={handleUpdate}>Update Payment</button>
      <div>
        <Link to="/payment/credit-card">Back to CreditCard</Link>
      </div>
    </div>
  );
}

export default EditPayment;
