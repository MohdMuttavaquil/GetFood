import express from 'express'
import { loginUser, ragisterUser} from '../Controllers/userController.js'

const userRouter = express.Router()

userRouter.post('/login', loginUser) 
userRouter.post('/ragister', ragisterUser)

export default userRouter