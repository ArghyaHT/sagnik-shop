import React,{useState} from 'react'
import "./ShippingScreen.css"
import Checkout from '../../components/checkout/Checkout'
import {useSelector, useDispatch} from 'react-redux'
import { shippingToCart } from '../../actions/cartAction'
import { useNavigate } from 'react-router-dom'

const ShippingScreen = () => {

  const cart = useSelector(state => state.cart)
  const { shippingAddress } = cart

  const [address, setAddress] = useState(shippingAddress.address)
  const [city, setCity] = useState(shippingAddress.city)
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
  const [country, setCountry] = useState(shippingAddress.country)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(shippingToCart({address,city,postalCode,country}))
    navigate('/payment')
  }
  return (
    <>
    <main className='shipping'>
    <Checkout step1 />
    <form action="">
          <h1>Shipping Address</h1>
          <div>
            <label htmlFor="">Address:</label>
            <input 
            type="text" 
            placeholder='Enter Your Address'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="">City:</label>
            <input 
            type="text" 
            placeholder='Enter Your City'
            value={city}
            onChange={(e) => setCity(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="">Postal Code</label>
            <input 
            type="text" 
            placeholder='Enter Your Postal Code'
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="">Country:</label>
            <input 
            type="text" 
            placeholder='Enter Your Country'
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            />
          </div>

          <button onClick={submitHandler}>Continue</button>
        </form>
    </main>
    </>
  )
}

export default ShippingScreen