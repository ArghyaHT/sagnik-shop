import React,{useState} from 'react'
import "./Payment.css"
import Checkout from '../../components/checkout/Checkout'
import { useDispatch} from 'react-redux'
import { paymentMethodToCart } from '../../actions/cartAction'
import { useNavigate } from 'react-router-dom'

const Payment = () => {

  const [paypal, setPaypal] = useState('PayPal')
  console.log(paypal)

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(paymentMethodToCart(paypal))
    navigate('/placeorder')
  }
  return (
    <>
    <main className='payment'>
    <Checkout step1 step2 />
    <form action="">
          <h1>Payment Method</h1>
          <div>
            <label htmlFor="">Paypal</label>
            <input 
            type="checkbox" 
            value={paypal}
            checked
            onChange={(e) => setPaypal(e.target.value)}
            />
          </div>

          <button onClick={submitHandler}>Continue</button>
        </form>
    </main>
    </>
  )
}

export default Payment