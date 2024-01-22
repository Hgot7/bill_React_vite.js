import { useState } from 'react'
import Header from './components/header'
import Sidebar from './components/sidebar'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const storedIndex = localStorage.getItem('activeNavItem');   //ใช้ Local Storage เพื่อเก็บค่า Index ที่เลือกไว้ล่าสุดได้
  const initialIndex = storedIndex ? parseInt(storedIndex, 10) : 1;
  const [activeNavItem, setActiveNavItem] = useState(initialIndex);

  const handleNavItemClick = (index) => {
    setActiveNavItem(index);
    localStorage.setItem('activeNavItem', index.toString());
  };
  return (
    <>
      <Header />
      <Sidebar />
      <section className="home">
        <div className="paymentBox">
          <p>Select Payment method</p>
          <ul className='payment-link'>
            {['Credit card', 'Paypal', 'Promptpay', 'Debit card', 'Cash'].map((item, index) => (
              <li
                key={index}
                className={`nav-payment ${index === activeNavItem ? 'active' : ''}`}
                onClick={() => handleNavItemClick(index)}
              >
                <a href="#">{item}</a>
              </li>
            ))}
          </ul>
          <div className="detail-payment">
            <div className="creditcard">creditcard</div>
            <div className="detail">detail</div>
          </div>
        </div>
        <div className="summary">Order Summary</div>
      </section>


      {/* <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button> */}

    </>

  )
}

export default App
