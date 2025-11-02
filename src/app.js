import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from "dotenv";
dotenv.config();

const app = express()
app.use(express.json({limit :'16kb'}))
app.use(express.urlencoded({extended :'true',limit :'16kb'}))
app.use(express.static('public'))
app.use(cookieParser())
app.use(cors(
    {
      origin: process.env.CORS_ORIGIN?.split(",")||"http://localhost:5173",
      credentials:true,
      methods:["GET","PUT","PUT","PATCH","DELETE","OPTIONS"],
      allowedHeaders:["content-type","Authorization"],
    }))

  //import routes
  import healthcheck_router from './routes/healthcheck_routes.js'
  import authrouter from './routes/auth_routes.js'
  
 
  app.use("/api/v1/healthcheck",healthcheck_router)
  app.use("/api/v1/auth",authrouter)
  
app.get('/',(req,res)=>{
    res.send("heyy_welcome")
})
console.log("ACCESS_TOKEN_SECRET:", process.env.ACCESS_TOKEN_SECRET);
console.log("REFRESH_TOKEN_SECRET:", process.env.REFRESH_TOKEN_SECRET);

export default app