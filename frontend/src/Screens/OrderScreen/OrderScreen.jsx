import React, { useEffect, useState } from 'react'
import "./OrderScreen.css"
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { adminDeliverOrderAction, getOrderAction, payOrder } from '../../actions/orderAction'
import Loader from '../../components/Loader'
import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import axios from 'axios'


const OrderScreen = () => {
    const { id: orderId } = useParams()

    const getOrder = useSelector(state => state.getOrder)
    const { loading, success, error, order } = getOrder


    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, error: errorPay, success: successPay } = orderPay

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const adminDeliverOrder = useSelector(state => state.adminDeliverOrder)
    const { success: successDeliver } = adminDeliverOrder

    const dispatch = useDispatch()

    const [clientID, setClientID] = useState(null)

    console.log(successDeliver)

    useEffect(() => {

        const clientid = async () => {
            try {
                const { data: client_data } = await axios.get('http://localhost:3000/api/config/paypal')
                setClientID(client_data)
            } catch (error) {
                console.log('Error fetching client data:', error);
            }

        }

        clientid()

        if (successPay) {
            dispatch(getOrderAction(orderId))
        }else if(successDeliver){
            dispatch(getOrderAction(orderId))
        }else {
            dispatch(getOrderAction(orderId))
        }
        

    }, [dispatch, orderId, successPay,successDeliver])


    const  deliverHandler = () => {
        if(window.confirm("Are You Sure ? ")){
            dispatch(adminDeliverOrderAction(orderId))
        }  
    }

    return (
        <>
            {
                loading ? <Loader /> : error ? <p>{error}</p> : <main className='order'>
                    <div className='left'>
                        <h1>Order {orderId} </h1>
                        {
                            order && order.user && <div>
                                <h1>Shipping</h1>
                                <p><strong>Name: </strong>{order.user.name}</p>
                                <p><strong>Email: </strong><a href={`mailto:${order.user.email}`}>{order.user.email}</a></p>
                                <p><strong>Address: </strong>{order.shippingAddress.address}</p>
                            </div>
                        }

                        <div>
                            <h1>Payment Method</h1>
                            <p><strong>Method: </strong>{order && order.paymentMethod}</p>

                            {!order.isPaid ? <p className='order-err'>Order is not Paid</p> : <p className='order-sces'>Order has been Paid {order.paidAt}</p>}
                        </div>

                        <div>
                            <h3>Order Items</h3>
                            {!order.isDelivered ? <p className='order-err'>Order is not Delivered</p> : <p className='order-sces'>Order has been delivered</p>}
                            {
                                order && order.orderItems && (
                                    order.orderItems.map((item) => {
                                        return (
                                            <div key={item._id}>
                                                <div>
                                                    <div>
                                                        <img src={item.image} alt={item.name} />
                                                    </div>
                                                    <p>{item.name}</p>
                                                </div>

                                                <p>{item.qty} x ${item.price} = ${item.qty*item.price}</p>
                                            </div>
                                        )
                                    }))
                            }
                        </div>
                    </div>

                    <div className='right'>
                        <h1>Order Summary</h1>

                        {
                            order && order.orderItems &&<div>
                            <p>Items</p>
                            <p>${order && order.orderItems.reduce((acc,item) => item.qty*item.price + acc, 0)}</p>
                        </div>
                        }

                        <div>
                            <p>Shipping</p>
                            <p>${order.shippingPrice}</p>
                        </div>

                        <div>
                            <p>Tax</p>
                            <p>${order.taxPrice}</p>
                        </div>

                        <div>
                            <p>Total</p>
                            <p>${order.totalPrice}</p>
                        </div>

                        {
                            !order.isPaid && <PayPalScriptProvider options={{ clientId: clientID }}>
                                <PayPalButtons
                                    createOrder={(data, actions) => {
                                        // Create an order with the total price
                                        return actions.order.create({
                                            purchase_units: [
                                                {
                                                    amount: {
                                                        currency_code: 'USD',
                                                        value: order.totalPrice.toFixed(2), // Pass the total price here
                                                    },
                                                },
                                            ],
                                        });
                                    }}
                                    onApprove={(data, actions) => {
                                        // Capture the payment on approval
                                        return actions.order.capture().then(function (details) {

                                            console.log(details)
                                            const paypal = {
                                                paymentResult: {
                                                    id: details.id,
                                                    status: details.status,
                                                    update_time: details.update_time,
                                                    email_address: details.payer.email_address
                                                }
                                            }
                                            if (details) {
                                                dispatch(payOrder(orderId, paypal))
                                            }

                                        });
                                    }}
                                />
                            </PayPalScriptProvider>
                        }

                        {
                            userInfo && userInfo.isAdmin && <button 
                            onClick={deliverHandler}
                            disabled={successDeliver}
                            style={{cursor: successDeliver && "none" }}
                            >Mark As Delivered</button>
                        }
                    </div>
                </main>
            }

        </>
    )
}

export default OrderScreen





