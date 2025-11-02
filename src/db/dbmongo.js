import mongoose from "mongoose";
const connectDB  = async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI)
         console.log("mongodb connection")
        
    } catch (error) {
        console.log("mongodb conection  error",error)
        process.exit(1)
        
    }

}
export default connectDB