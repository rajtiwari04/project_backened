import { validationResult } from "express-validator";
import { apierror } from "../utils/apierror.js";
export const validate = (req,res,next)=>{
   const errors =  validationResult(req)
   if(errors.isEmpty){
    return next()
   }
   const extractederrors = []
   errors.array().map((err)=>extractederrors.push(
    {[err.path]:err.msg}))
    throw new apierror(422,"recieved data  is not valid",extractederrors)
}
