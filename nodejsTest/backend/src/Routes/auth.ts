import { Router } from "express";
import { , loginUser, RegisterUser } from "../Controllers/auth";



const authrouter =Router()

authrouter.post('/register',RegisterUser)
authrouter.post('/login', loginUser)

export default authrouter