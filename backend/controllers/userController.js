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
            image: loginUser.image,
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
    const { name, email, password,image } = req.body

    const existUser = await User.findOne({ email })

    if (existUser) {
        res.status(400)
        throw new Error("User already Exist")
    }

    const createdUser = await User.create({ name, email, password,image })
    if (createdUser) {
        res.status(200)
        res.json({
            _id: createdUser._id,
            name: createdUser.name,
            email: createdUser.email,
            isAdmin: createdUser.isAdmin,
            token: generateToken(createdUser._id),
            image: createdUser.image
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

// @desc: userProfile route
// @route: GET
// @access: private

const profileUpdateUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.image = req.body.image || user.image
        if (req.body.password) {
            user.password = req.body.password
        }

        const updatedUser = await user.save()

        res.status(200).json({
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            isAdmin: updatedUser.isAdmin,
            image: updatedUser.image,
            token: generateToken(updatedUser._id)
        })
    } else {
        throw new Error("Failed to Update User")
    }
})

// @desc: getAllUsers route
// @route: GET
// @access: private
// @role: Admin


const getAllUsers = asyncHandler(async (req, res) => {
    const users = await User.find({})

    if (users) {
        res.status(201).json(users)
    } else {
        throw new Error("No users")
    }
})

// @desc: deleteUser route
// @route: DELETE
// @access: private
// @role: Admin


const deleteUser = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id)

    if (user) {
        if (user.isAdmin) {
            res.status(400).json("Admin User cannot be deleted")
        } else {
            await user.deleteOne({ _id: user._id })

            res.json({ message: 'User removed' });
        }
    } else {
        res.status(404);
        throw new Error('User not found');
    }

})

// @desc: updateUser route
// @route: UPDATE
// @access: private
// @role: Admin

const updateUser = asyncHandler(async(req,res) => {
    const user = await User.findById(req.params.id).select('-password')

    if(user){
        user.name = req.body.name || user.name
        user.email = req.body.email || user.email
        user.isAdmin = Boolean(req.body.isAdmin)

        const updatedUser = await user.save()

        res.status(201).json({
            _id:updatedUser._id,
            name:updatedUser.name,
            email:updatedUser.email,
            isAdmin:updatedUser.isAdmin
        })
    }else{
        throw new Error("User not found")
    }
})

// @desc: getUserId route
// @route: GET
// @access: private
// @role: Admin

const getUserById = asyncHandler(async(req,res) => {
    const user = await User.findById(req.params.id).select('-password')

    if(user){
        res.status(201).json(user)
    }else{
        throw new Error("User is not present")
    }
})

export { loginUser, registerUser, profileUser, profileUpdateUser, getAllUsers, deleteUser ,updateUser,getUserById}