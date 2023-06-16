import React,{useState,useEffect} from 'react'
import "./Home.css"
import Product from '../Product/Product'
import axios from "axios"

const Home = () => {
    const [products, setProduct] = useState([])

    useEffect(() => {
        const getProducts = async () => {
            const {data} = await axios.get("http://localhost:3000/api/product")
            setProduct(data)
        }

        getProducts()
    },[])

    console.log(products)

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