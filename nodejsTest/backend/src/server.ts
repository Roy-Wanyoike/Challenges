import express, { json } from 'express'
import authrouter from './Router/auth'
import cors from 'cors'
import router from './Routes'
const app= express()

//Register some Middlewares
app.use(cors())
app.use(json()) //adds a body to the Request


app.use('/users', router)
app.use('/auth',authrouter)


app.listen(4000,()=>{
console.log("Running ...");

})