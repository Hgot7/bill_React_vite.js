import { useState } from 'react'
import Header from './components/header'
import Sidebar from './components/sidebar'
import './App.css'

function App() {

  const [count, setCount] = useState(0)
  return (
    <>
      <Header />
      <Sidebar />
      <section className="home">
        <div className="paymentBox">
          <p>Select Payment method</p>
          <ul className='payment-link'>
            <li className='nav-payment'><a href="#">Credit card</a></li>
            <li className='nav-payment'><a href="#">Paypal</a></li>
            <li className='nav-payment'><a href="#">Promptpay</a></li>
            <li className='nav-payment'><a href="#">Debit card</a></li>
            <li className='nav-payment'><a href="#">Cash</a></li>
          </ul>
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
