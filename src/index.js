import dotenv from 'dotenv'
import app from './app.js'
import connectDB from './db/dbmongo.js'


dotenv.config({
    path: "./.env",
})
const port = process.env.PORT||3000

connectDB()
.then(()=>{
  app.listen(port,()=>{
    console.log(`hey i am listening at http://localhost:${port}`)
  })
})
.catch((err)=>{
  console.log("mongodb connection error ",err)
  process.exit()
})

