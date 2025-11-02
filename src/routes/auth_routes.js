import { Router } from "express";
import { login,registeruser ,logoutuser} from "../controllers/auth_controller.js";
import { validate } from "../middleware/validators_middlewares.js";
import { verifyjwt } from "../middleware/auth_middlewares.js";
import { userresigtervalidator ,userloginvalidator} from "../validators/index_validators.js"

const authrouter = Router()
authrouter.route("/register").post(userresigtervalidator(),validate,registeruser)
authrouter.route("/login").post(userloginvalidator(),validate,login)
authrouter.route("/logout").post(verifyjwt,logoutuser)
export default authrouter