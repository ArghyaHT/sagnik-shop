import bcrypt from "bcryptjs"

const users = [
    {
        name:"Sagnik",
        email:"sagnikadmin@example.com",
        password:bcrypt.hashSync("123456",10),
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMbB7HisqDFaO5DsbkFyyDaNRXw9UvWyU_bwy732gqKA&s",
        isAdmin:true
    },
    {
        name:"John doe",
        email:"john@example.com",
        password:bcrypt.hashSync("123456",10),
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMbB7HisqDFaO5DsbkFyyDaNRXw9UvWyU_bwy732gqKA&s",
        isAdmin:false

    },
    {
        name:"Henry kevil",
        email:"henry@example.com",
        password:bcrypt.hashSync("123456",10),
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMbB7HisqDFaO5DsbkFyyDaNRXw9UvWyU_bwy732gqKA&s",
        isAdmin:false
    },
    {
        name:"Paul walker",
        email:"paul@example.com",
        password:bcrypt.hashSync("123456",10),
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMbB7HisqDFaO5DsbkFyyDaNRXw9UvWyU_bwy732gqKA&s",
        isAdmin:false
    },

]

export default users