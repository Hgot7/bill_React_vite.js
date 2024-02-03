import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function AddData() {
  const [payment, setPayment] = useState('');
  const history = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:3000/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payment: payment,
        }),
      });

      if (response.ok) {
        // หากสำเร็จ, ทำการเปลี่ยนเส้นทางไปยังหน้า CreditCard (หรือหน้าที่คุณต้องการ)
        history.push('/payment/credit-card');
      } else {
        console.error('Failed to create data');
      }
    } catch (error) {
      console.error('Error creating data:', error);
    }
  };

  return (
    <div className="create-data">
      <h2>Create Data</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="payment">Payment:</label>
        <input
          type="text"
          id="payment"
          value={payment}
          onChange={(e) => setPayment(e.target.value)}
        />

        <button type="submit">Create</button>
      </form>
      <Link to="/payment/credit-card">Back to CreditCard</Link>
    </div>
  );
}

export default AddData;
