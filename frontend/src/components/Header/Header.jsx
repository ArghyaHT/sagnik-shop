import React, { useState, useEffect } from 'react'
import "./Header.css"
import { Link} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { userLogoutAction } from '../../actions/userAction'
import { FaShoppingCart } from 'react-icons/fa'
import { AiFillDelete } from "react-icons/ai"
import { removeToCart } from '../../actions/cartAction'
import SearchBox from '../SearchBox/SearchBox'

const Header = () => {

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const cart = useSelector(state => state.cart)
  const { cartItems } = cart

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

  return (
    <>
      <div className='header'>
        <Link to="/" style={{ fontSize: "20px", textDecoration: "none", color: "black"}}><img  width ="80px" src='https://t3.ftcdn.net/jpg/02/45/84/16/360_F_245841615_d7QzRv937jfiC176rmKK60ckNXU9V76z.jpg' style={{mixBlendMode:"darken"}}/></Link>
        <SearchBox/>
        <div>

          <div className='cart'
            onMouseEnter={() => setCartdropdown(true)}
            onMouseLeave={() => setCartdropdown(false)}
          >
            <Link to="/cart" className='cart-link'>Cart ({cartItems.length})</Link>
            <div>
              <FaShoppingCart />
            </div>
          </div>

          {cartdropdown && <div className='cart-dropdown'

            onMouseEnter={() => setCartdropdown(true)}
            onMouseLeave={() => setCartdropdown(false)}
          >
            {
              cartItems.length > 0 ? cartItems.map((item) => (
                <div key={item._id} className='cart-items'>
                  <div>
                    <img src={item.image} alt={item.name} />
                  </div>
                  <p>{item.name.slice(0,5)}...</p>
                  <p>${item.price}</p>
                  <div
                    onClick={() => deleteHandler(item._id)}
                  >
                    <AiFillDelete />
                  </div>
                </div>
              )) : (<p>No items present {": ("}</p>)
            }
          </div>}
          {
            userInfo ? (<div style={{ display: 'flex', gap: "1rem", alignItems: "center" }}>
              <div>
                <img src={userInfo.image} alt="profile-image" height="50" width="50" style={{ borderRadius: "50%" }} />
              </div>
              <p className='userInfo'

                onClick={() => setDropdown(!dropdown)}
              >{userInfo.name}</p>

              {
                dropdown && (<div className='dropdown' style={{ right: userInfo.isAdmin ? "160px" : "30px" }}>
                  <p onClick={() => logoutHandler()}>Logout</p>
                  <Link to="/profile" className='link'>Profile</Link>
                </div>)
              }
            </div>) : (<div>
              <Link to="/signin" style={{ fontSize: "16px", textDecoration: "none", color: "black" }}>Sign-In</Link>
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