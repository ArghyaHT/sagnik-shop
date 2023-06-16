import React, { useEffect,useState } from 'react'
import "./ProductScreen.css"
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'

const ProductScreen = () => {

  const {id:productId} = useParams()

  const [product, setProduct] = useState([])
  
  useEffect(() => {
    const getproduct = async() => {
        const {data} = await axios.get(`http://localhost:3000/api/product/${productId}`)
        setProduct(data)
    }
    getproduct()
  },[])

  console.log(product)


  const addToCart = () => {

  }
  return (
    <>
    <main className='product'>
        <Link to="/" ><button>Go Back</button></Link>
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
                <p>Status - {product.countInStock > 0 ? "InStock" : "Out of Stock"}</p>
                <div>
                    <p>Qty:</p>
                    <select name="" id="" style={{cursor:"pointer"}}>
                        {[...Array(product.countInStock).keys()].map((x) => (<div key={x + 1}>
                            <option  value={x + 1}>
                                {x + 1}
                            </option>
                            </div>
                        ))}
                    </select>
                   
                </div>
                <button 
                onClick={addToCart}
                disabled={product.countInStock === 0}
                >Add To Cart</button>
            </div>
        </div>
    </main>
    </>
  )
}

export default ProductScreen