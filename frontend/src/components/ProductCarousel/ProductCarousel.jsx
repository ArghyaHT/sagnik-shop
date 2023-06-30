// import React, { useEffect } from 'react'
// import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
// import { Carousel } from 'react-responsive-carousel';
// import { useDispatch, useSelector } from 'react-redux';
// import { getTopProductAction } from '../../actions/productActions';
// import Loader from '../Loader';
// import "./ProductCarousel.css"


// const ProductCarousel = () => {
//     const getTopProduct = useSelector(state => state.getTopProduct)
//     const { topProducts, loading } = getTopProduct

//     const dispatch = useDispatch()

//     useEffect(() => {
//         dispatch(getTopProductAction())
//     }, [dispatch])
//     return (
//         <>
//             {
//                 loading ? <Loader /> : <Carousel
//                     width={"100%"}
//                     className='carousel-box'
//                     showThumbs={false}
//                     showArrows={false}
//                 >
//                     {
//                         topProducts && topProducts.map((product) => (
//                             <div key={product._id} className='carousel'>
//                                 <div className='img-box'>
//                                     <img src={product.image} />
//                                 </div>

//                             </div>
//                         ))
//                     }
//                 </Carousel>
//             }
//         </>
//     )
// }

// export default ProductCarousel

import React from 'react'

const ProductCarousel = () => {
  return (
    <div>ProductCarousel</div>
  )
}

export default ProductCarousel