import React, { useState, useEffect } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import "./LoginScreen.css"
import { useSelector, useDispatch } from 'react-redux'
import { userLoginAction } from '../../actions/userAction'
import Loader from "../../components/Loader"

const LoginScreen = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [Message, setMessage] = useState("")

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo, loading, error } = userLogin

    const navigate = useNavigate()
    const dispatch = useDispatch()

    console.log(userInfo)

    useEffect(() => {
        if (userInfo) {
            navigate("/")
        }
    }, [userInfo, navigate])

    const submitHandler = (e) => {
        e.preventDefault()
        if(email && password){
            dispatch(userLoginAction(email, password))
        }else{
            setMessage("Please Fill All the Fields")
        }
        
    }
    return (
        <>
            <main className='login-container'>
                {loading && <Loader />}
                <h2>Sign In</h2>
                <div>
                    <div>
                        <label htmlFor="">Email</label>
                        <input
                            type="email"
                            placeholder='Enter Your Email'
                            value={email}
                            onChange={(e) => {setEmail(e.target.value),setMessage("")}}
                        />
                    </div>

                    <div>
                        <label htmlFor="">Password</label>
                        <input
                            type="password"
                            placeholder='Enter Your Pasword'
                            value={password}
                            onChange={(e) => {setPassword(e.target.value),setMessage("")}}
                        />
                    </div>

                    <button onClick={submitHandler}>Sign In</button>
                    <p>Dont have and account ?  <Link to="/signup">
                        Register
                    </Link></p>

                </div>
                {error && <p className='error'>{error}</p>}
                {Message && <p className='error'>{Message}</p>}
            </main>
        </>
    )
}

export default LoginScreen