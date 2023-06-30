import React, { useEffect } from 'react'
import "./Home.css"
import Product from '../Product/Product'
import Loader from '../Loader'
import { useSelector, useDispatch } from "react-redux"
import { getProductsAction } from '../../actions/productActions'
import { useParams } from 'react-router-dom'
import Paginate from '../paginate/Paginate'

const Home = () => {

    const { keyword, pageNumber } = useParams()
    const currentpageNumber = pageNumber || 1

    const getProducts = useSelector(state => state.getProducts)
    const { products, loading, error, pageNumber: getPageNumber, pages } = getProducts

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getProductsAction(keyword, currentpageNumber))
    }, [dispatch, keyword, currentpageNumber])
    return (
        <>
            <div className='banner'>
                <img src="https://static.vecteezy.com/system/resources/previews/004/299/835/original/online-shopping-on-phone-buy-sell-business-digital-web-banner-application-money-advertising-payment-ecommerce-illustration-search-free-vector.jpg" alt="" />
            </div>
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