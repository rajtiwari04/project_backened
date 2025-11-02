const asynchandler = (requesthandler)=>{
    return(req,res,next)=>{
        Promise
        .resolve(requesthandler(req,res))
        .catch((err)=>next(err))
    }
}
export {asynchandler}