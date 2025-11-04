class apiresponse{
    constructor(statusCode,data,message = "sucess"){
        this.statusCode= statusCode
        this.data = data 
        this.message=message
        this.sucuess = statusCode <400
    }
}
export {apiresponse}