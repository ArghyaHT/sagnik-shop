import React,{useState,useEffect} from 'react'
import "./Header.css"
import { Link } from 'react-router-dom'
import {useSelector,useDispatch} from 'react-redux'
import { userLogoutAction } from '../../actions/userAction'
import {FaShoppingCart} from 'react-icons/fa'
import {AiFillDelete} from "react-icons/ai"
import { removeToCart } from '../../actions/cartAction'

const Header = () => {

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const cart = useSelector(state => state.cart)
  const {cartItems} = cart

  const [dropdown, setDropdown] = useState(false)
  const [cartdropdown, setCartdropdown] = useState(false)
  const [admindropdown, setAdmindropdown] = useState(false)

  const dispatch = useDispatch()

  const logoutHandler = () => {
     dispatch(userLogoutAction())
     setDropdown(false)
  }

  const deleteHandler = (id) => {
    dispatch(removeToCart(id))
  }

  console.log(admindropdown)
  return (
    <>
    <div className='header'>
        <Link to="/" style={{fontSize:"20px",textDecoration:"none",color:"black"}}><p>Sagnik-Shop</p></Link>

        <div>
            <div className='cart'
            onMouseEnter={() => setCartdropdown(true)}
            onMouseLeave={() => setCartdropdown(false)}
            >
              <Link to="/cart" className='cart-link'>Cart ({cartItems.length})</Link>
              <div>
                <FaShoppingCart/>
              </div>
            </div>

            { cartdropdown && <div className='cart-dropdown'
            
            onMouseEnter={() => setCartdropdown(true)}
            onMouseLeave={() => setCartdropdown(false)}
            >
              {
                cartItems.length > 0 ? cartItems.map((item) => (
                  <div key={item._id} className='cart-items'>
                    <div>
                      <img src={item.image} alt={item.name} />
                    </div>
                    <p>{item.name}</p>
                    <p>${item.price}</p>
                    <div
                    onClick={() => deleteHandler(item._id)}
                    >
                      <AiFillDelete/>
                    </div>
                  </div>
                )) : (<p>No items present {": ("}</p>)
              }
            </div>}
           {
            userInfo ? (<div>
               <p className='userInfo'
               
               onClick={() => setDropdown(!dropdown)}
               >{userInfo.name}</p>

               {
                dropdown && ( <div className='dropdown' style={{right:userInfo.isAdmin ? "160px" : "30px"}}>
                <p onClick={() => logoutHandler()}>Logout</p>
                <Link to="/profile" className='link'>Profile</Link>
             </div>) 
               }
            </div>) : ( <div>
              <Link to="/signin" style={{fontSize:"16px",textDecoration:"none",color:"black"}}>Sign-In</Link>
          </div>)
           }

           {
            userInfo && userInfo.isAdmin && <div className='admin-dropdown-box'>
              
                <p onClick={() => setAdmindropdown(!admindropdown)}>Admin</p>

                {
                  admindropdown && <div className='admin-dropdown'>
                  <Link to="/admin/userlist" className='admin-link'>Users</Link>
                  <Link to="/admin/productlist" className='admin-link'>Products</Link>
                  <Link to="/admin/orderlist" className='admin-link'>Orders</Link>
                  </div>
                }
                
               
            </div>
           }
        </div>
    </div>
    </>
  )
}

export default Header