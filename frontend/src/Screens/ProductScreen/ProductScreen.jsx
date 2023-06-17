import React, { useEffect, useState } from 'react'
import "./ProductScreen.css"
import { Link, useParams, useNavigate } from 'react-router-dom'
import Loader from '../../components/Loader'
import { useSelector, useDispatch } from 'react-redux'
import { getProductDetailAction } from '../../actions/productActions'
import { addToCart } from '../../actions/cartAction'

const ProductScreen = () => {

  const { id: productId } = useParams()
  const [qty, setQty] = useState(1)

  const getProductDetail = useSelector(state => state.getProductDetail)
  const { product, loading, error } = getProductDetail

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getProductDetailAction(productId))
  }, [dispatch])

  const navigate = useNavigate()
  console.log(qty)

  const addToCartHandler = () => {
    if(productId){
      dispatch(addToCart(Number(qty),productId))
    }
    navigate(`/cart`)
  }
  return (
    <>
      <main className='product'>
        {loading && <Loader />}
        {error && <h1>{error}</h1>}
        <Link to="/" ><button>Go Back</button></Link>
        {
          product && <div className='pdt-container'>
            <div>
              <img src={product.image} alt="product_image" />
            </div>

            <div>
              <p>{product.name}</p>
              <p>{product.rating}</p>
              <p>{product.numReviews} reviews</p>
              <h4>Price : {product.price}</h4>
              <p>{product.description}</p>
            </div>

            <div>
              <p>price: ${product.price}</p>
              <p>Status - {product.countInStock > 0 ? "InStock" : "Out of Stock"}</p>
              <div>
              <p>Qty:</p>
              <select name="" id="" style={{ cursor: "pointer" }}
              value={qty}
              onChange={(e) => setQty(e.target.value)}
              >
                {[...Array(product.countInStock).keys()].map((x) => (
                  <option key={x + 1} value={x + 1}>
                    {x + 1}
                  </option>
                ))}
              </select>

            </div>
            <button
              onClick={addToCartHandler}
              disabled={product.countInStock === 0}
            >Add To Cart</button>
          </div>
          </div>
        }
      </main>
    </>
  )
}

export default ProductScreen