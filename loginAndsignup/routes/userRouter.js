const express = require("express");
const userRouter = express.Router();
const {signupUser,loginUser,getUser,protectRoute,forgetpassword,resetpassword,logout} = require('../controller/userController.js');



userRouter
.route('/signup')
.post(signupUser)


userRouter
.route('/login')
.post(loginUser)


userRouter.use(protectRoute)
userRouter
.route('/userProfile')
.get(getUser)



userRouter
.route('/forgetpassword')
.post(forgetpassword)


userRouter
.route('/resetpassword/:token')
.post(resetpassword)


userRouter
.route('/logout')
.get(logout)



module.exports = userRouter;