import express from "express"
import { deleteUser, getAllUsers, getUserById, loginUser, profileUpdateUser, profileUser, registerUser, updateUser } from "../controllers/userController.js"
import { admin, protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route("/login").post(loginUser)
router.route("/register").post(registerUser)
router.route("/profile").get(protect,profileUser)
router.route("/profile").put(protect,profileUpdateUser)

//admin 
router.route("/").get( protect,admin,getAllUsers)
router.route("/:id").delete(protect, admin, deleteUser)
router.route("/:id").put(protect, admin, updateUser)
router.route("/:id").get(protect,admin,getUserById)

export default router
