import React, { useState, useEffect } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';

function CreditCard() {
  const [data, setData] = useState([]);
  const [total, setTotal] = useState(0); // Initialize total state

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
      })
      .catch((error) => console.error('Error fetching data:', error));
  };


  const handleUpdate = (id) => {
    fetch(`http://localhost:3000/payment/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        Total: parseInt(inputValues[id]),
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return fetch('http://localhost:3000/payment');
      })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        setData(data);
        setInputValues({});
      })
      .catch((error) => console.error('Error updating data:', error));
  };

  return (
    <div className="ceditcard">
      <div>
        <Link to={`/payment/AddData`}>CreateData</Link>
      </div>
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
              <td>{item._id}</td>      
              <td>{item.payment}</td>
              <td>{item.Total}</td>
              <td>{moment(item.timestamp).format('YYYY-MM-DD HH:mm:ss')}</td>
              <td>
                <div>
                  <Link to={`/payment/edit/${item._id}`}>Edit</Link>
                  <button onClick={() => handleUpdate(item._id)}>Delete</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="showTotal">
        <p>Total Sum: {total} Bath</p>
      </div>
    </div>
  );
}

export default CreditCard;
