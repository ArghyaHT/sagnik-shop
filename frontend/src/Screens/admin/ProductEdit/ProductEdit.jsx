import React, { useEffect, useState } from 'react'
import './ProductEdit.css'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { adminEditProductAction } from '../../../actions/productActions'
import { ADMIN_EDIT_PRODUCT_RESET } from '../../../constants/productConstants'
import axios from 'axios'

const ProductEdit = () => {

    const { id: productID } = useParams()

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [image, setImage] = useState("")
    const [brand, setBrand] = useState("")
    const [countInStock, setCountInStock] = useState("")
    const [category, setCategory] = useState("")
    const [description, setDescription] = useState("")
    const [message, setMessage] = useState("")
    const [uploading, setUploading] = useState(false)

    const adminEditProduct = useSelector(state => state.adminEditProduct)
    const { success } = adminEditProduct

    const dispatch = useDispatch()

    useEffect(() => {
        if (success) {
            dispatch({ type: ADMIN_EDIT_PRODUCT_RESET })
        }
    }, [success])

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)
        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }

            const { data } = await axios.post('http://localhost:3000/api/upload', formData, config)

            setImage(data)
            setUploading(false)
        } catch (error) {
            console.log(error)
            setUploading(false)
        }
    }

    const editProductHandler = () => {
        if (name || price || image || brand || countInStock || category || description) {
            dispatch(adminEditProductAction(productID, {
                name,
                price,
                image,
                brand,
                countInStock,
                category,
                description
            }))
            setMessage("Product is Successfully Updated...")
        } else {
            alert("Please Enter atleast One field")
        }

    }
    return (
        <>
            <main className='edit-product'>
                <h1>Edit Product</h1>
                <div>
                    <label htmlFor="">Name</label>
                    <input
                        type="text"
                        placeholder='Name'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="">Price</label>
                    <input
                        type="text"
                        placeholder='Price'
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="">Image</label>
                    <input
                        type="text"
                        placeholder='Image'
                        value={image}
                        onChange={(e) => setImage(e.target.value)}
                    />
                    <input
                        type="file"
                        name="choose file"
                        id=""
                        onChange={uploadFileHandler}
                    />

                </div>

                <div>
                    <label htmlFor="">Brand</label>
                    <input
                        type="text"
                        placeholder='Brand'
                        value={brand}
                        onChange={(e) => setBrand(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="">Count-In-Stock</label>
                    <input
                        type="text"
                        placeholder='Count-In-Stock'
                        value={countInStock}
                        onChange={(e) => setCountInStock(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="">Category</label>
                    <input
                        type="text"
                        placeholder='Category'
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                </div>

                <div>
                    <label htmlFor="">Description</label>
                    <input
                        type="text"
                        placeholder='Description'
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>

                <button onClick={editProductHandler}>Update</button>
                {message && <p className='success'>{message}</p>}
            </main>
        </>
    )
}

export default ProductEdit