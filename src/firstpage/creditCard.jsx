import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import '../table.css';
import axios from 'axios';

function CreditCard() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0);
  const [payment, setPayment] = useState(0);
  const [latestData, setLatestData] = useState(null);
  const [count, setCount] = useState(1); // เพิ่ม state สำหรับเก็บลำดับ

  useEffect(() => {
    fetchData();
    showAlert(); // Call showAlert after fetching data
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:80/api/Payment/');
      // Check for successful response status code
      if (response.status !== 200) {
        throw new Error(`API request failed with status code: ${response.status}`);
      }
      const data = response.data;
      console.log(data)

      const sortedData = response.data.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setData(sortedData);
    

      const totalSum = sortedData.reduce((acc, item) => acc + item.Total, 0);
      setTotal(totalSum);

      const paymentSum = sortedData.reduce((acc, item) => acc + parseInt(item.payment, 10), 0);
      setPayment(paymentSum);

      // Set the latest data
      if (sortedData.length > 0) {
        setLatestData(sortedData[0]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };


  const DeleteData = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this item?');

    if (confirmDelete) {
      try {
        const response = await fetch(`http://localhost:80/api/Payment/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          alert('Item deleted successfully!');
          await fetchData();
        } else {
          alert('Failed to delete item.');
          await fetchData();
        }
      } catch (error) {
        console.error('Error deleting data:', error);
      }
    }
  };


  const showAlert = () => {
    if (latestData) {
      alert(`Latest data: ID - ${latestData._id.substring(0, 18)}, Payment - ${latestData.payment}, Total - ${latestData.Total}, Timestamp - ${moment(latestData.timestamp).format('YYYY-MM-DD HH:mm:ss')}`);
    }
  };

  return (
    <div className="ceditcard">
      <div>
        <Link to={`/payment/AddData`}>CreateData</Link>
        <button onClick={showAlert}>Show Latest Data</button>
        <button>Payment {payment} Bath</button>
        <button>Total {total} Bath</button>
      </div>
      {data.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>ID</th>
              <th>Payment</th>
              <th>Total</th>
              <th>Timestamp</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={item._id}>
                <td className='index'>{count + index}</td>
                <td className='id'>{item._id && item._id.substring(12, 25)}</td>
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
              <td className='index'></td>
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
