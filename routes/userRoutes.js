import express from 'express'
import { userRegister,userLogin } from '../controllers/userController.js'

const userRouter = express.Router()

//API Routes For User
userRouter.post("/userregister",userRegister) //new user register API
userRouter.post("/userlogin",userLogin) // user login API

export default userRouter; 