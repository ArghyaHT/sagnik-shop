import React,{useEffect} from 'react'
import "./ProductList.css"
import { useSelector,useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import Loader from '../../../components/Loader'
import { MdDelete } from 'react-icons/md'
import { FaRegEdit } from 'react-icons/fa'
import { adminDeleteProuctAction, adminGetProuctsAction } from '../../../actions/productActions'

const ProductList = () => {

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const adminGetProducts = useSelector(state => state.adminGetProducts)
  const { products, loading, error } = adminGetProducts 

  const adminDeleteProduct = useSelector(state => state.adminDeleteProduct)
  const { success:successdelete} = adminDeleteProduct

  const dispatch = useDispatch()

  useEffect(() => {
    if(userInfo && userInfo.isAdmin){
      dispatch(adminGetProuctsAction())
    }
   
  },[dispatch,userInfo,successdelete])

  const deleteUser = (id) => {
    if(window.confirm("Are you Sure")){
      dispatch(adminDeleteProuctAction(id))
    }
  }
  return (
    <>
    <h1 style={{marginTop:"30px"}}>PRODUCTS</h1>
    <Link to="/admin/productlist/create"><button className='pdct-btn'>Create</button></Link>
     {
             loading ? <Loader /> : error ? <p>{error}</p> : products && <table className="table table-bordered">
              <thead className='table-primary'>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>PRICE</th>
                  <th>CATEGORY</th>
                  <th>BRAND</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                    products && products.map((product) => (
                        <tr key={product._id}>
                        <th>{product._id}</th>
                        <td>{product.name}</td>
                        <td>${product.price}</td>
                        <td>{product.category}</td>
                        <td>{product.brand}</td>
                        <td><div onClick={() => deleteUser(product._id)} style={{cursor:"pointer"}}><MdDelete style={{color:"red"}}/></div></td>
                        <td><Link to={`${product._id}/edit`}><FaRegEdit style={{color:"blue"}}/></Link></td>
                      </tr>
                    ))
                }
              </tbody>
            </table>
          }
    </>
  )
}

export default ProductList