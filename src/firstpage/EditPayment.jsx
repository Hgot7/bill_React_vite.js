import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

function EditPayment() {
  const { id } = useParams();
  const [paymentData, setPaymentData] = useState({});
  const [updatedTotal, setUpdatedTotal] = useState('');
  const [updatedPayment, setUpdatedPayment] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:80/api/Payment/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch payment data');
      }
      const data = await response.json();
      setPaymentData(data);
      setUpdatedTotal(data.Total.toString());
      setUpdatedPayment(data.payment);
    } catch (error) {
      console.error('Error fetching payment data:', error);
    }
  };

  const handleUpdate = async () => {
    try {
      const response = await fetch(`http://localhost:80/api/Payment/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Total: parseInt(updatedTotal),
          payment: updatedPayment,
        }),
      });
      if (!response.ok) {
        throw new Error('Failed to update payment data');
      }
      navigate('/payment/credit-card');
    } catch (error) {
      console.error('Error updating data:', error);
    }
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
