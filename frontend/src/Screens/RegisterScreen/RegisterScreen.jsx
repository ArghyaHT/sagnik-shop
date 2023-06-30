import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import "./RegisterScreen.css"
import { useSelector, useDispatch } from 'react-redux'
import { userRegisterAction } from '../../actions/userAction'
import Loader from "../../components/Loader"
import axios from 'axios'

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

    const dispatch = useDispatch()

    const submitHandler = (e) => {
        e.preventDefault()
        if (name && email && password && confirmPassword && image) {
            if (password !== confirmPassword) {
                setMessage("Password Donot Match")
            } else {
                dispatch(userRegisterAction(name, email, password, image))
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

                    <button onClick={submitHandler}>Sign Up</button>
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