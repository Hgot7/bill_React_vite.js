import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function AddData() {
  const [payment, setPayment] = useState('');
  const [selectedDateTime, setSelectedDateTime] = useState(''); // Add state for selectedDateTime
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Convert selectedDateTime to JavaScript Date object
      const timestamp = selectedDateTime ? new Date(selectedDateTime) : new Date();

      const response = await fetch('http://localhost:3000/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          payment: payment,
          timestamp: timestamp,
        }),
      });

      if (response.ok) {
        navigate('/payment/credit-card');
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
        <label htmlFor="payment">Payment :</label>
        <input
          type="number"
          id="payment"
          value={payment}
          onChange={(e) => setPayment(e.target.value)}
        />

        {/* Input for selecting date and time */}
        
        <label htmlFor="selectedDateTime">Select Date and Time:</label>
        <input
          type="datetime-local"
          id="selectedDateTime"
          value={selectedDateTime}
          onChange={(e) => setSelectedDateTime(e.target.value)}
        />
        <br />
        <button type="submit">Create</button>
      </form>
      <Link to="/payment/credit-card">Back to CreditCard</Link>
    </div>
  );
}

export default AddData;
