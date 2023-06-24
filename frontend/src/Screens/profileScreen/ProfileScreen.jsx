import React,{useState,useEffect} from 'react'
import "./ProfileScreen.css"
import {useSelector,useDispatch} from 'react-redux'
import {useNavigate} from 'react-router-dom'
import {userDetailsAction , userUpdateAction} from '../../actions/userAction'
import Loader from '../../components/Loader'

const ProfileScreen = () => {

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmpassword, setConfirmpassword] = useState("")
  const [message, setMessage] = useState("")

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const userDetails = useSelector(state => state.userDetails)
  const { user ,loading, error } = userDetails

  const userUpdate = useSelector(state => state.userUpdate)
  const { success:successUpdate , error:errorUpdate ,userUpdate:userUpdateid} = userUpdate

  const dispatch = useDispatch()
  const navigate = useNavigate()
  
  useEffect(() => {
   if(!userInfo){
      navigate("/signin")
   }else{
    if(!user){
      dispatch(userDetailsAction())
    }else{
      setName(user.name)
      setEmail(user.email)
    }
   }
   
  },[dispatch,userInfo,navigate,user])

  const submitHandler = (e) => {
    e.preventDefault()
    if(password !== confirmpassword){
      setMessage("Password donot Match")
    }else{
      dispatch(userUpdateAction({_id: user._id,name,email,password}))
    }
  }

  return (
    <>
    <main className='user-profile'>
      <div className='user-profile-data'>
        {loading && <Loader/>}
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
        <h2>User Orders List:</h2>
      </div>
    </main>
    </>
  )
}

export default ProfileScreen