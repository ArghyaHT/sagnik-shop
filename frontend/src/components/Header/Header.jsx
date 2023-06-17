import React from 'react'
import "./Header.css"
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <>
    <div className='header'>
        <Link to="/" style={{fontSize:"20px",textDecoration:"none",color:"black"}}><p>Sagnik-Shop</p></Link>

        <div>
            <Link to="/cart" style={{fontSize:"16px",textDecoration:"none",color:"black"}}><p>Cart</p></Link>
            <div>
                <Link to="" style={{fontSize:"16px",textDecoration:"none",color:"black"}}><p>Sign-In</p></Link>
            </div>
        </div>
    </div>
    </>
  )
}

export default Header