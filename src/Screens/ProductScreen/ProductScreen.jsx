import React from 'react'
import "./ProductScreen.css"
import { products } from '../../products'
import { useParams } from 'react-router-dom'

const ProductScreen = () => {

  const {id:productId} = useParams()
  
  const product = products.find((product) => product._id === Number(productId))
  return (
    <>
    <main className='product'>
        <button>Go Back</button>
        <div className='pdt-container'>
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
                <p>Status - inStock</p>
                <div>
                    <p>Qty:</p>
                    <select name="" id="" style={{cursor:"pointer"}}>
                        {[...Array(product.countInStock).keys()].map((x) => (
                            <option key={x._id} value={x + 1}>
                                {x + 1}
                            </option>
                        ))}
                    </select>
                   
                </div>
                <button>Add To Cart</button>
            </div>
        </div>
    </main>
    </>
  )
}

export default ProductScreen