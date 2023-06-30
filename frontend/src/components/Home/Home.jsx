import React, { useEffect } from 'react'
import "./Home.css"
import Product from '../Product/Product'
import Loader from '../Loader'
import { useSelector, useDispatch } from "react-redux"
import { getProductsAction} from '../../actions/productActions'
import { useParams } from 'react-router-dom'
import Paginate from '../paginate/Paginate'
import ProductCarousel from '../ProductCarousel/ProductCarousel'

const Home = () => {

    const { keyword, pageNumber } = useParams()
    const currentpageNumber = pageNumber || 1

    const getProducts = useSelector(state => state.getProducts)
    const { products, loading, error, pageNumber:getPageNumber, pages} = getProducts

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProductsAction(keyword, currentpageNumber))
    }, [dispatch, keyword, currentpageNumber])
    return (
        <>
        {/* <ProductCarousel/> */}
            <main className='home'>
                {loading && <Loader />}
                {error && <h1>{error}</h1>}
                {
                    products?.map((product) => (
                        <div key={product._id}>
                            <Product product={product} />
                        </div>
                    ))
                }
            </main>
            <Paginate 
            pages={pages} 
            pageNumber={getPageNumber}
            keyword={keyword ? keyword : ''}
            />
        </>
    )
}

export default Home