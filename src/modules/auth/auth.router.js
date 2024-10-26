import { Router } from "express";
import { loginVal, signupVal } from "./auth.validation.js";
import { login, signup, verifyAccount } from "./auth.controller.js";
import { isValid } from "../../middleware/vaildation.js";
import { asyncHandler } from "../../middleware/asyncHandler.js";


const authRouter = Router();

// sign up 
authRouter.post('/signup', isValid(signupVal), asyncHandler(signup))
// verify token  
authRouter.get('/verify/:token',asyncHandler(verifyAccount))
// log in
authRouter.post('/login', isValid(loginVal),asyncHandler(login));

export default authRouter;