import asyncHandler from "express-async-handler";
import User from "../Models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @desc: login route
// @route: POST
// @access: public

const loginUser = asyncHandler(async (req, res) => {
    const email = req.body.email
    const password = req.body.password

    const loginUser = await User.findOne({ email })

    if (loginUser && (await loginUser.matchPassword(password))) {
        res.status(200)
        res.json({
            _id: loginUser._id,
            name: loginUser.name,
            email: loginUser.email,
            isAdmin: loginUser.isAdmin,
            token: generateToken(loginUser._id)
        })
    } else {
        res.status(401)
        throw new Error("Invalid Email or Password")
    }
})


// @desc: register route
// @route: POST
// @access: public

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body

    const existUser = await User.findOne({ email })

    if (existUser) {
        res.status(400)
        throw new Error("User already Exist")
    }
    
    const createdUser = await User.create({ name, email, password })
    if (createdUser) {
        res.status(200)
        res.json({
            _id: createdUser._id,
            name: createdUser.name,
            email: createdUser.email,
            isAdmin: createdUser.isAdmin,
            token: generateToken(createdUser._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid user data')
    }

})

// @desc: userProfile route
// @route: GET
// @access: private

const profileUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            isAdmin: user.isAdmin,
        })
    } else {
        res.status(404)
        throw new Error('User not found')
    }

})

export { loginUser, registerUser, profileUser }