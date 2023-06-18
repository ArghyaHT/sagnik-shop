import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import "./RegisterScreen.css"
import { useSelector, useDispatch } from 'react-redux'
import { userRegisterAction } from '../../actions/userAction'
import Loader from "../../components/Loader"

const RegisterScreen = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [Message, setMessage] = useState("")

    const userRegister = useSelector(state => state.userRegister)
    const { userInfo, loading, error } = userRegister
    const navigate = useNavigate()
    
    useEffect(() => {
        if (userInfo) {
          navigate("/");
        }
      }, [navigate, userInfo]);

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        if (name && email && password && confirmPassword) {
            if (password !== confirmPassword) {
                setMessage("Password Donot Match")
            } else {
                dispatch(userRegisterAction(name, email, password))
            }
        } else {
            setMessage("Please Fill all the Fields")
        }
    }

    return (
        <>
            <main className='register-container'>
                {loading && <Loader />}
                <h2>Sign Up</h2>
                <div>
                    <div>
                        <label htmlFor="">Name</label>
                        <input
                            type="text"
                            placeholder='Enter Your Name'
                            value={name}
                            onChange={(e) => { setName(e.target.value), setMessage("") }}
                        />
                    </div>
                    <div>
                        <label htmlFor="">Email</label>
                        <input
                            type="email"
                            placeholder='Enter Your Enail'
                            value={email}
                            onChange={(e) => { setEmail(e.target.value), setMessage("") }}
                        />
                    </div>

                    <div>
                        <label htmlFor="">Password</label>
                        <input
                            type="password"
                            placeholder='Enter Your Pasword'
                            value={password}
                            onChange={(e) => { setPassword(e.target.value), setMessage("") }}
                        />
                    </div>

                    <div>
                        <label htmlFor="">Confirm Password</label>
                        <input
                            type="password"
                            placeholder='Enter Your ConfirmPassword'
                            value={confirmPassword}
                            onChange={(e) => { setConfirmPassword(e.target.value), setMessage("") }}
                        />
                    </div>

                    <button onClick={submitHandler}>Sign In</button>
                    <p>Already have and account ? <Link to="/signin">
                        Login
                    </Link></p>

                </div>
                {Message && <p className='error'>{Message}</p>}
                {error && <p className='error'>{error}</p>}
            </main>
        </>
    )
}



export default RegisterScreen