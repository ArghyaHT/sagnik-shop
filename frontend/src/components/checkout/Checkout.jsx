import React from 'react';
import "./Checkout.css";
import { Link } from 'react-router-dom';

const Checkout = ({ step1, step2, step3 }) => {
  return (
    <>
      <main className='checkout'>
        {
          step1 ? (
            <Link to="/shipping" className='button'>Shipping</Link>
          ) : (
            <Link  disabled className='button' style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}>
              Shipping
            </Link>
          )
        }
        {
          step2 ? (
            <Link to="/payment" className='button'>Payment</Link>
          ) : (
            <Link disabled className='button' style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}>
              Payment disabled
            </Link>
          )
        }
        {
          step3 ? (
            <Link to="/placeorder" className='button'>Place Order</Link>
          ) : (
            <Link disabled className='button' style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}>
              Place Order
            </Link>
          )
        }
      </main>
    </>
  );
};

export default Checkout;
