import React,{useEffect} from 'react'
import "./Home.css"
import Product from '../Product/Product'
import Loader from '../Loader'
import {useSelector,useDispatch} from "react-redux"
import { getProductsAction } from '../../actions/productActions'
import { useParams } from 'react-router-dom'

const Home = () => {
    
    const { keyword } = useParams()
    console.log(keyword)

    const getProducts = useSelector(state => state.getProducts)
    const {products,loading,error} = getProducts

    const dispatch = useDispatch()
    
    useEffect(() => {
        dispatch(getProductsAction(keyword))
    },[dispatch,keyword])
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