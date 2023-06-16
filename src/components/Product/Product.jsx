import React from 'react'
import "./Product.css"
import { Link } from 'react-router-dom'

const Product = ({product}) => {
  return (
    <>
      <div className='card'>
        <div>
          <Link to={`/product/${product._id}`}><img src={product.image} alt={product.name} /></Link>
        </div>
        <div>
        <Link to={`/product/${product._id}`}><p>{product.name}</p></Link>
          <p>{product.rating}</p>
          <p>{product.numReviews} reviews</p>
          <h2>${product.price}</h2>
        </div>
      </div>
    </>
  )
}

export default Product