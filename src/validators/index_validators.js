import { body } from "express-validator";
const userresigtervalidator =() =>{
    return[
        body("email")
          .trim()
          .notEmpty()
          .withMessage("email is required")
          .isEmail()
          .withMessage("not a valid email"),
        body("username")
          .trim()
          .notEmpty()
          .withMessage("username is requiered")
          .isLowercase()
          .withMessage("username must be in lowercase")
          .isLength({min:3})
          .withMessage("username must be of min 3 lenegth"),
        body("password")
           .trim()
           .notEmpty()
           .withMessage("password should not be empty"),
        body("fullname")
         .trim()
          

    ]
}
const userloginvalidator = ()=>{
    return[
        body("email").optional().isEmail().withMessage("email is invalid"),
        body("password").notEmpty().withMessage("password should not be empty")
    ]

}
export{
    userresigtervalidator,userloginvalidator
}