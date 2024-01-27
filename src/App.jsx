import { useState, useRef, useEffect } from 'react';
import Header from './components/header';
import Sidebar from './components/sidebar';

import CreditCard from './firstpage/creditCard';
import Paypal from './firstpage/paypal';
import Promptpay from './firstpage/promptpay';
import DebitCard from './firstpage/debitCard';
import Cash from './firstpage/cash';
import './App.css';

function App() {
  const storedIndex = localStorage.getItem('activeNavItem');
  const initialIndex = storedIndex ? parseInt(storedIndex, 10) : 1;
  const [activeNavItem, setActiveNavItem] = useState(initialIndex);

  // สร้าง Refs สำหรับ marker และ item
  const markerRef = useRef(null);
  const itemRefs = useRef([]);
  useEffect(() => {
    // อัปเดตตำแหน่งของ marker เมื่อ activeNavItem เปลี่ยน
    updateMarkerPosition(itemRefs.current[activeNavItem]);

    // เซฟค่า activeNavItem ลง Local Storage เมื่อมีการเปลี่ยนแปลง
    localStorage.setItem('activeNavItem', activeNavItem.toString());
  }, [activeNavItem]); // ให้ useEffect ทำงานเมื่อ activeNavItem เปลี่ยน

  // ฟังก์ชันเมื่อมีการคลิกที่ nav item
  const handleNavItemClick = (index, e) => {
    setActiveNavItem(index);
    localStorage.setItem('activeNavItem', index.toString());
    updateMarkerPosition(e.target);
  };

  // ฟังก์ชันในการอัปเดตตำแหน่งของ marker
  const updateMarkerPosition = (target) => {
    if (markerRef.current) {
      markerRef.current.style.left = target.offsetLeft + 'px';
      markerRef.current.style.width = target.offsetWidth + 'px';
    }
  };
  return (
    <>
      <Header />
      <Sidebar />
      <section className="home">
        <div className="paymentBox">
          <p>Select Payment method</p>
          <ul className="payment-link">
            <div ref={markerRef} id="marker"></div>
            {['Credit card', 'Paypal', 'Promptpay', 'Debit card', 'Cash'].map((item, index) => (
              <li
                key={index}
                className={`nav-payment`}
                ref={(el) => (itemRefs.current[index] = el)} // บันทึก Refs ของแต่ละ nav item
                onClick={(e) => handleNavItemClick(index, e)}
              >
                <a href="#">{item}</a>
              </li>
            ))}
          </ul>
          <div className="detail-payment">
            {activeNavItem === 0 && <CreditCard />}
            {activeNavItem === 1 && <Paypal />}
            {activeNavItem === 2 && <Promptpay />}
            {activeNavItem === 3 && <DebitCard />}
            {activeNavItem === 4 && <Cash />}
            <div className="detail">detail</div>
          </div>
        </div>
        <div className="summary">Order Summary</div>
      </section>
    </>
  );
}

export default App;
