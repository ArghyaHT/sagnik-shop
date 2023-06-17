import React, { useEffect,useState } from 'react'
import "./CartScreen.css"
import {useParams,useLocation} from "react-router-dom"
import { RiDeleteBin5Fill } from 'react-icons/ri'
import {useDispatch,useSelector} from 'react-redux'
import { addToCart, removeToCart } from '../../actions/cartAction'

const CartScreen = () => {

  // const {id:productId} = useParams()

  // const location = useLocation();
  const cart = useSelector(state => state.cart)
  const {cartItems} = cart

  // // Accessing pathname and search query parameters
  // const pathname = location.pathname;
  // const searchParams = new URLSearchParams(location.search);
  // const qty = searchParams.get('qty');

  const dispatch = useDispatch()

  // useEffect(() => {
    // if(productId){
    //   dispatch(addToCart(Number(qty),productId))
    // }
  // },[dispatch,productId,qty])

  const deleteItem = (id) => {
    dispatch(removeToCart(id))
  }
  return (
    <>
      <main className='cart-screen'>
        <h1>Shopping Cart</h1>

        <div className='cart-content-box'>
          <div className='left-cart'>
           {
            cartItems && cartItems.map((item) => (<div className='cart-content' key={item._id}>

              <div>
                <img src={item.image} alt={item.name} />
              </div>

              <p>{item.name}</p>
              <p>${item.price}</p>

              <select name="" id="" 
              style={{cursor:"pointer"}}
              value={item.qty}
              onChange={(e) => dispatch(addToCart( Number(e.target.value),item._id))}
              >
               {[...Array(item.countInStock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>

              <div onClick={() => deleteItem(item._id)}>
                <RiDeleteBin5Fill />
              </div>
            </div>
            ))
           }
            
          </div>

          <div className='right-cart'>
            <div className='total'>
                <h2>SubTotal ({cartItems.length}) items</h2>
                <p>price : {cartItems.reduce((acc,item) => acc + item.price*item.qty ,0)}</p>
                <button>Proceed To Checkout</button>
            </div>
          </div>

        </div>

      </main>
    </>
  )
}

export default CartScreen