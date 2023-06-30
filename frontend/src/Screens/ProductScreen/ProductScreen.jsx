import React, { useEffect, useState } from 'react'
import "./ProductScreen.css"
import { Link, useParams, useNavigate } from 'react-router-dom'
import Loader from '../../components/Loader'
import { useSelector, useDispatch } from 'react-redux'
import { getProductDetailAction } from '../../actions/productActions'
import { addToCart } from '../../actions/cartAction'
import Rating from "../../components/Rating"
import { createProductReviewAction } from '../../actions/productActions'

const ProductScreen = () => {

  const { id: productId } = useParams()
  const [qty, setQty] = useState(1)

  const [rating, setRating] = useState("")
  const [comment, setComment] = useState("")

  const getProductDetail = useSelector(state => state.getProductDetail)
  const { product, loading, error } = getProductDetail

  const createProductReview = useSelector(state => state.createProductReview)
  const { review ,error:reviewError , loading:reviewLoading} = createProductReview

  console.log(reviewError)

  const dispatch = useDispatch()

  useEffect(() => {
    if(review){
      dispatch(getProductDetailAction(productId))
    }else{
      dispatch(getProductDetailAction(productId))
    } 
  }, [dispatch,review])

  const navigate = useNavigate()
  // console.log(qty)

  const addToCartHandler = () => {
    if (productId) {
      dispatch(addToCart(Number(qty), productId))
    }
    navigate(`/cart`)
  }

  const submitRating = () => {
    const review = {
      rating,
      comment
    }

    dispatch(createProductReviewAction(productId,review))
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
              <p>Overall Rating <Rating value={product.rating}/></p>
              <p>Total Reviews {product.numReviews}</p>
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

      <main>
        <h2>Reviews</h2>
        <div style={{display:"flex",gap:"1rem",alignItems:"center",flexWrap:"wrap"}}>
        {
           reviewLoading ? <Loader/> : product && product.reviews && product.reviews.length > 0 ? product.reviews.map((review) => {
            return (
              <div key={review._id} className='review'>
                <p>Name: {review.name}</p>
                <Rating value={review.rating} />
                <p>{review.comment}</p>
                <p style={{ marginTop: "10px" }}>{review.createdAt.slice(0, 10)}</p>
              </div>
            )
          }) : (<p className='no-review'>No reviews</p>)
        }
        </div>
       
        <div className='sale'>
        <div className='review-form'>
          <p>Write a Customer Review</p>

            <div>
              <label htmlFor="">Rating</label>
              <select 
              name="ratings"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
              >
                <option value="1">1-Poor</option>
                <option value="2">2-Average</option>
                <option value="3">3-Good</option>
                <option value="4">4-Very Good</option>
                <option value="5">5-Excellent</option>
              </select>
            </div>

            <div>
              <label htmlFor="">Comment</label>
              <input 
              type="text" 
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder='Please give a Comment'
              />
            </div>

            <button 
            onClick={submitRating}
            disabled={reviewError}
            >Submit</button>

        </div>

        <div className='sale-box'>
          <img src="https://img.freepik.com/premium-vector/mega-sale-discount-banner-set-promotion-with-yellow-background_497837-702.jpg?w=2000"  alt="" />
        </div>
        </div>
       

        
      </main>
    </>
  )
}

export default ProductScreen