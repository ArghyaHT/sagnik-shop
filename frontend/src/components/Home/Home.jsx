import React,{useEffect} from 'react'
import "./Home.css"
import Product from '../Product/Product'
import Loader from '../Loader'
import {useSelector,useDispatch} from "react-redux"
import { getProductsAction } from '../../actions/productActions'

const Home = () => {
 
    const getProducts = useSelector(state => state.getProducts)
    const {products,loading,error} = getProducts

    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getProductsAction())
    },[dispatch])
    return (
        <main className='home'>
            {loading && <Loader/>}
            {error && <h1>{error}</h1>}
            {
                products?.map((product) => (
                    <div key={product._id}>
                        <Product product={product}/>
                    </div>
                ))
            }
        </main>
    )
}

export default Home