import React,{useEffect} from 'react'
import "./PlaceOrder.css"
import {useNavigate} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { createOrderAction } from '../../actions/orderAction'
import Loader from '../../components/Loader'
import Checkout from '../../components/checkout/Checkout'
import { CREATE_ORDER_RESET } from '../../constants/orderConstants'

const PlaceOrder = () => {

    const cart = useSelector(state => state.cart)
    const { paymentMethod, shippingAddress, cartItems } = cart

    const createOrder = useSelector(state => state.createOrder)
    const {error,loading,success,order} = createOrder

    const navigate = useNavigate()

    useEffect(() => {
        if (!cart.shippingAddress.address) {
          navigate('/shipping');
        } else if (!cart.paymentMethod) {
          navigate('/payment');
        }
      }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

    //   Calculate prices
    const addDecimals = (num) => {
        return (Math.round(num * 100) / 100).toFixed(2)
    }

    cart.itemsPrice = addDecimals(
        cart.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    )
    cart.shippingPrice = addDecimals(cart.itemsPrice > 100 ? 0 : 100)
    cart.taxPrice = addDecimals(Number((0.15 * cart.itemsPrice).toFixed(2)))
    cart.totalPrice = (
        Number(cart.itemsPrice) +
        Number(cart.shippingPrice) +
        Number(cart.taxPrice)
    ).toFixed(2)

    useEffect(() => {
         if(success){
            navigate(`/order/${order._id}`)
            dispatch({type:CREATE_ORDER_RESET})
         }
    },[navigate,success])

    const dispatch = useDispatch()

    const submitHandler = () => {
        dispatch(createOrderAction({
            orderItems: cart.cartItems,
            shippingAddress: cart.shippingAddress,
            paymentMethod: cart.paymentMethod,
            itemsPrice: cart.itemsPrice,
            shippingPrice: cart.shippingPrice,
            taxPrice: cart.taxPrice,
            totalPrice: cart.totalPrice
        }))
    }

    return (
        <>
            {loading ? <Loader/> : error ? <p>{error}</p> :<><Checkout step1 step2 step3 className="checkout"/><main className='placeorder'>
                
                <div>
                    <div>
                        <h2>Shipping</h2>
                        <p><strong>Address</strong> {shippingAddress.address}</p>
                    </div>

                    <div>
                        <h2>Payment Method</h2>
                        <p><strong>Method</strong> {paymentMethod}</p>
                    </div>

                    <div>
                        <h2>Order Items</h2>

                        {
                            cartItems.map((item) => {
                                
                                return (
                                    <div key={item._id} className='item'>
                                        <div>
                                            <div>
                                                <img src={item.image} alt={item.name} />
                                            </div>
                                            <p>{item.name}</p>
                                        </div>
                                        <p>{item.qty} * ${item.price} = ${item.qty * item.price}</p>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>

                <div>
                    <h2>Order Summary</h2>

                    <div>
                        <p>ItemsPrice</p>
                        <p>${cart.itemsPrice}</p>
                    </div>

                    <div>
                        <p>TaxPrice</p>
                        <p>${cart.taxPrice}</p>
                    </div>

                    <div>
                        <p>ShippingPrice</p>
                        <p>${cart.shippingPrice}</p>
                    </div>

                    <div>
                        <p>TotalPrice</p>
                        <p>${cart.totalPrice}</p>
                    </div>

                    <button onClick={submitHandler}>Place Order</button>
                </div>

            </main></>}
        </>
    )
}

export default PlaceOrder