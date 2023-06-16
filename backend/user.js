import bcrypt from "bcryptjs"

const users = [
    {
        name:"Sagnik",
        email:"sagnikadmin@example.com",
        password:bcrypt.hashSync("123456",10),
        isAdmin:true
    },
    {
        name:"John doe",
        email:"john@example.com",
        password:bcrypt.hashSync("123456",10),
        isAdmin:false

    },
    {
        name:"Henry kevil",
        email:"henry@example.com",
        password:bcrypt.hashSync("123456",10),
        isAdmin:false
    },
    {
        name:"Paul walker",
        email:"paul@example.com",
        password:bcrypt.hashSync("123456",10),
        isAdmin:false
    },

]

export default users