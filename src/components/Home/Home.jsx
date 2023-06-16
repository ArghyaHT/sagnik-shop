import React from 'react'
import { products } from '../../products'
import "./Home.css"
import Product from '../Product/Product'

const Home = () => {
    return (
        <main className='home'>
            {
                products.map((product) => (
                    <div key={product._id}>
                        <Product product={product}/>
                    </div>
                ))
            }
        </main>
    )
}

export default Home