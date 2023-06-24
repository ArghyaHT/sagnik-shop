import express from "express"
import { loginUser, profileUpdateUser, profileUser, registerUser } from "../controllers/userController.js"
import { protect } from "../middleware/authMiddleware.js"

const router = express.Router()

router.route("/login").post(loginUser)
router.route("/register").post(registerUser)
router.route("/profile").get(protect,profileUser)
router.route("/profile").put(protect,profileUpdateUser)

export default router
