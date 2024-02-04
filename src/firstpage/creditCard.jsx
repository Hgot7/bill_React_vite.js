import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import '../table.css';

function CreditCard() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0); // Initialize total state
  const [payment, setPayment] = useState(0); // Initialize total state

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = () => {
    fetch('http://localhost:3000/payment')
      .then((response) => response.json())
      .then((data) => {
        setData(data);

        // Calculate the sum of Total values
        const totalSum = data.reduce((acc, item) => acc + item.Total, 0);
        setTotal(totalSum);
        const paymentSum = data.reduce((acc, item) => acc + parseInt(item.payment, 10), 0);
        setPayment(paymentSum);

      })
      .catch((error) => console.error('Error fetching data:', error));
  };

  const DeleteData = (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this item?');

    if (confirmDelete) {
      // Perform the deletion logic here
      fetch(`http://localhost:3000/payment/${id}`, {
        method: 'DELETE',
      })
        .then((response) => {
          if (response.ok) {
            alert('Item deleted successfully!');
            fetchData(); // Refresh the data after deletion
          } else {
            alert('Failed to delete item.');
            fetchData(); // Refresh the data after deletion
          }
        })
        .catch((error) => console.error('Error deleting data:', error));
    }
  };

  return (
    <div className="ceditcard">
      <div>
        <Link to={`/payment/AddData`}>CreateData</Link>
      </div>
      {data.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Payment</th>
              <th>Total</th>
              <th>Timestamp</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item) => (
              <tr key={item._id}>
                <td className='id'>{item._id.substring(0, 18)}</td>
                <td className='payment'>{item.payment}</td>
                <td className='total'>{item.Total}</td>
                <td className='timestamp'>{moment(item.timestamp).format('YYYY-MM-DD HH:mm:ss')}</td>
                <td className='action'>
                  <div>
                    <Link className='edit' to={`/payment/edit/${item._id}`}>Edit</Link>
                    <button onClick={() => DeleteData(item._id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            <tr>
              <td className='id'>Total Summary</td>
              <td className='payment'>{payment}</td>
              <td className='total'>{total}</td>
            </tr>
          </tbody>
        </table>
      ) : (
        <p>No data available.</p>
      )}
    </div>
  );
}

export default CreditCard;
