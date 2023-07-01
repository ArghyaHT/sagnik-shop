import React,{useEffect} from 'react'
import "./OrderList.css"
import { useSelector,useDispatch } from 'react-redux'
import { adminGetOrdersAction } from '../../../actions/orderAction'
import Loader from '../../../components/Loader'
import { ImCross } from 'react-icons/im'
import { BsCheckLg } from 'react-icons/bs'
import { Link} from 'react-router-dom'

const OrderList = () => {

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const adminGetOrders = useSelector(state => state.adminGetOrders)
  const { orders,loading,error } = adminGetOrders

  console.log(userInfo)
  const dispatch = useDispatch()

  useEffect(() => {
    if(userInfo && userInfo.isAdmin){
      dispatch(adminGetOrdersAction())
    }
   
  },[dispatch,userInfo])


  return (
    <>
    <h1 style={{marginTop:"30px"}}>ORDERS</h1>
     {
             loading ? <Loader /> : error ? <p>{error}</p> : orders && <table class="table table-bordered">
              <thead className='table-primary'>
                <tr>
                  <th>ID</th>
                  <th>USER</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                    orders && orders.map((order) => (
                        <tr key={order._id}>
                        <th>{order.user._id}</th>
                        <td>{order.user.name}</td>
                        <td>{order.createdAt.substring(0,10)}</td>
                        <td>${order.totalPrice}</td>
                        <td>{order.isPaid ? (order.paidAt.substring(0,10)) : (<ImCross style={{color:"red"}}/>)}</td>
                        <td>{order.isDelivered ? (order.deliveredAt.substring(0,10)) : (<ImCross style={{color:"red"}}/>)}</td>
                        <Link to={`/order/${order._id}`} style={{textDecoration:"none",fontWeight:"bold"}}><button className='order-btn'>Details</button></Link>
                      </tr>
                    ))
                }
              </tbody>
            </table>
          }
    </>
  )
}

export default OrderList