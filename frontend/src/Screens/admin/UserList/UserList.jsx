import React,{useEffect} from 'react'
import "./UserList.css"
import { useSelector,useDispatch } from 'react-redux'
import { adminUseristAction,adminUserdeleteAction } from '../../../actions/userAction'
import Loader from '../../../components/Loader'
import { ImCross } from 'react-icons/im'
import { BsCheckLg } from 'react-icons/bs'
import { MdDelete } from 'react-icons/md'
import { FaRegEdit } from 'react-icons/fa'
import { Link} from 'react-router-dom'

const UserList = () => {

  const userLogin = useSelector(state => state.userLogin)
  const { userInfo } = userLogin

  const adminUserList = useSelector(state => state.adminUserList)
  const { users, loading, error} = adminUserList

  const adminUserDelete = useSelector(state => state.adminUserDelete)
  const { user,  error:errordelete,success:successdelete} = adminUserDelete

  console.log(userInfo)
  const dispatch = useDispatch()

  useEffect(() => {
    if(userInfo && userInfo.isAdmin){
      dispatch(adminUseristAction())
    }
   
  },[dispatch,successdelete,userInfo])

  const deleteUser = (id) => {
    if(window.confirm('Are you Sure')){
        dispatch(adminUserdeleteAction(id))    
    }
    
  }
  return (
    <>
    <h1 style={{marginTop:"30px"}}>USERS</h1>
     {
             loading ? <Loader /> : error ? <p>{error}</p> : users && <table class="table table-bordered">
              <thead className='table-primary'>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>ADMIN</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                    users && users.map((user) => (
                        <tr key={user._id}>
                        <th>{user._id}</th>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.isAdmin ? <BsCheckLg style={{fontWeight:"bolder",fontSize:"28px",color:"green"}}/> : <ImCross style={{color:"red"}}/>}</td>
                        <td><div onClick={() => deleteUser(user._id)} style={{cursor:"pointer"}}><MdDelete style={{color:"red"}}/></div></td>
                        <td><Link to={`${user._id}`}><FaRegEdit style={{color:"blue"}}/></Link></td>
                      </tr>
                    ))
                }
              </tbody>
            </table>
          }
    </>
  )
}

export default UserList