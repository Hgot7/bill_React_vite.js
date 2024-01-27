import React, { useState, useEffect } from 'react';
import moment from 'moment';
function paypal() {

  const [data, setData] = useState([]);

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

  return (
    <div className="paypal">Paypal
      {/* <h5 style={{ margin: 'initial' }}>Data from MongoDB</h5> */}
      <ul>
        {data.map((item) => (
          <li key={item._id}>
            <p>ID: {item._id}</p>
            <p>Total: {item.Total}</p>
            {/* สามารถแสดง properties อื่น ๆ ได้ตามต้องการ */}
            <p>Payment: {item.payment}</p>
            <p>Timestamp: {moment(item.timestamp).format('YYYY-MM-DD HH:mm:ss')}</p>
            <p>Timestamp: {moment(data.timestamp).add(543, 'years').format('YYYY-MM-DD HH:mm:ss')} (พ.ศ.)</p>
          </li>
        ))}
      </ul>
    </div>
  );

}

export default paypal