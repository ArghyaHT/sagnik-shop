import React, { useEffect } from 'react'
import './ProductCreate.css'
import { useSelector,useDispatch } from 'react-redux'
import { adminCreateProuctAction } from '../../../actions/productActions'
import { ADMIN_CREATE_PRODUCT_RESET } from '../../../constants/productConstants'
import {useNavigate} from 'react-router-dom'

const ProductCreate = () => {

  const adminCreateProduct = useSelector(state => state.adminCreateProduct)
  const { success,error } = adminCreateProduct

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if(success){
        dispatch({type:ADMIN_CREATE_PRODUCT_RESET})
        navigate("/")
       
    }
  },[dispatch,success])

  const createProductHandler = () => {
    dispatch(adminCreateProuctAction())
  }
  return (
    <>
    <main className='create-product'>
        <div>
            <label htmlFor="">Name</label>
            <input 
            type="text" 
            placeholder='Name'
            value="Sample name"
            />
        </div>

        <div>
            <label htmlFor="">Price</label>
            <input 
            type="text" 
            placeholder='Price'
            value={0}
            />
        </div>

        <div>
            <label htmlFor="">Image</label>
            <input 
            type="text" 
            placeholder='Image'
            value={"/images/sample2.jpg"}
            />
        </div>

        <div>
            <label htmlFor="">Brand</label>
            <input 
            type="text" 
            placeholder='Brand'
            value={"Sample brand"}
            />
        </div>

        <div>
            <label htmlFor="">Count-In-Stock</label>
            <input 
            type="text" 
            placeholder='Count-In-Stock'
            value={0}
            />
        </div>

        <div>
            <label htmlFor="">Category</label>
            <input 
            type="text" 
            placeholder='Category'
            value={"Sample category"}
            />
        </div>

        <div>
            <label htmlFor="">Description</label>
            <input 
            type="text" 
            placeholder='Description'
            value={"Sample description"}
            />
        </div>

        <button onClick={createProductHandler}>Create</button>

        { success && <p className='success'>Product Successfully Created...</p>}
        { error && <p className='error'>{error}</p>}
    </main>
    </>
  )
}

export default ProductCreate