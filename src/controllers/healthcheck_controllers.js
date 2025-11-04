import { apiresponse } from "../utils/apiresponse.js";
import { asynchandler } from "../utils/async_handlers.js";
// const healthcheck = async (req,res,next)=>{
//     try {
//         const user = await getUserFromDB()
//       res.status(200).json(
//         new apiresponse(200,{message:"server is running"})
//       )
        
//     } catch (error) {
//         next(err)
        
//     }
// }
const healthcheck = asynchandler(async (req,res)=>{
    res.status(200).json(
        new apiresponse(200,{message:"server is running"})
    )
})
export {healthcheck}