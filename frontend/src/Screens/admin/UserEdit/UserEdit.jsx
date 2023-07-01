import React,{useState,useEffect} from 'react'
import "./UserEdit.css"
import { useParams } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import { adminGetUserIDAction ,adminUserUpdateAction} from '../../../actions/userAction'

const UserEdit = () => {
    const { id:userId } = useParams()

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [isAdmin, setisAdmin] = useState(false)

    const adminGetUserID = useSelector(state => state.adminGetUserID)
    const { user , success, loading } = adminGetUserID

    const adminUserUpdate = useSelector(state => state.adminUserUpdate)
    const { success:successEdit } = adminUserUpdate

    const dispatch = useDispatch()

    useEffect(() => {
        // if(!user && !user.name){
        //     dispatch(adminGetUserIDAction(userId))
        // }

        if ( !user || user._id !== userId) {
            dispatch(adminGetUserIDAction(userId))
          } else {
            setName(user.name)
            setEmail(user.email)
            setisAdmin(user.isAdmin)
          }
        
    },[dispatch,user,userId])

    const editHandler = () => {
        const userData = {
            name,
            email,
            isAdmin
        }
        dispatch(adminUserUpdateAction(userId,userData))

    }
    
    return (
        <>
            <div className='admin-edit'>
                <h2>Edit User</h2>
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
                <div className='check'>
                    <label htmlFor="">Admin</label>
                    <input
                    type='checkbox'
                    checked={isAdmin}
                    onChange={(e) => setisAdmin(e.target.checked)}
                    />
                </div>

                <button onClick={editHandler}>Update</button>
                { successEdit && <p className='edit-scess'>User is Successfully Edited :)</p>}
            </div>
        </>
    )
}

export default UserEdit