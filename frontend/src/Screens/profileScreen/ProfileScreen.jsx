import React, { useState, useEffect } from 'react'
import "./ProfileScreen.css"
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { userDetailsAction, userUpdateAction } from '../../actions/userAction'
import Loader from '../../components/Loader'
import { getAllOrdersAction } from '../../actions/orderAction'
import { ImCross } from 'react-icons/im'
import { Link } from 'react-router-dom'
import axios from 'axios'

const ProfileScreen = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmpassword, setConfirmpassword] = useState("")
  const [message, setMessage] = useState("")

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const userDetails = useSelector(state => state.userDetails)
  const { user, loading, error } = userDetails

  const userUpdate = useSelector(state => state.userUpdate)
  const { success: successUpdate, error: errorUpdate, userUpdate: userUpdateid } = userUpdate

  const getAllOrders = useSelector(state => state.getAllOrders)
  const { loading: userOrderloading, error: userOrdererror, orders } = getAllOrders

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (!userInfo) {
      navigate("/signin")
    } else {
      if (!user) {
        dispatch(userDetailsAction())
      } else {
        setName(user.name)
        setEmail(user.email)
        dispatch(getAllOrdersAction())
      }
    }

  }, [dispatch, userInfo, navigate, user])

  const [uploading, setUploading] = useState(false)
  const [image, setImage] = useState("")

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

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmpassword) {
      setMessage("Password donot Match")
    } else {
      dispatch(userUpdateAction({ _id: user._id, name, image, email, password }))
    }
  }

  return (
    <>
      <main className='user-profile'>
        <div className='user-profile-data'>
          {loading && <Loader />}
          <form action="">
            <div>
              <label htmlFor="">Name:</label>
              <input
                type="text"
                placeholder='Enter Your Name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="">Email:</label>
              <input
                type="email"
                placeholder='Enter Your Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
            </div>
              <input
                type="file"
                name="choose file"
                id=""
                onChange={uploadFileHandler}
              />

            <div>
              <label htmlFor="">Password:</label>
              <input
                type="password"
                placeholder='Enter Your Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div>
              <label htmlFor="">Confirm Password:</label>
              <input
                type="password"
                placeholder='Enter Your Confirm Password'
                value={confirmpassword}
                onChange={(e) => setConfirmpassword(e.target.value)}
              />
            </div>

            <button onClick={submitHandler}>Update Profile</button>

            {error && <p className='error'>{error}</p>}
            {message && <p className='error'>{message}</p>}

            {successUpdate && <p className='success'>User has been successfully updated...</p>}
            {errorUpdate && <p className='error'>{errorUpdate}</p>}
          </form>
        </div>

        <div className='user-order-list'>
          <h2>My Orders:</h2>


          {
            userOrderloading ? <Loader /> : userOrdererror ? <p>{userOrdererror}</p> : orders && <table class="table table-bordered">
              <thead className='table-primary'>
                <tr>
                  <th>ID</th>
                  <th>DATE</th>
                  <th>TOTAL</th>
                  <th>PAID</th>
                  <th>DELIVERED</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                  orders.map((order) => {
                    return (
                      <tr key={order._id}>
                        <th>{order._id}</th>
                        <td>{`${order.createdAt}`.substring(0, 10)}</td>
                        <td>${order.totalPrice}</td>
                        <td>{order.paidAt ? `${order.paidAt}`.substring(0, 10) : <ImCross style={{ color: "red", marginLeft: "10px" }} />}</td>
                        <td>{order.deliveredAt ? `${order.deliveredAt}`.substring(0, 10) : <ImCross style={{ color: "red", marginLeft: "15px" }} />}</td>
                        <Link to={`/order/${order._id}`}><button className='order-btn'>Details</button></Link>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          }
        </div>
      </main>
    </>
  )
}

export default ProfileScreen