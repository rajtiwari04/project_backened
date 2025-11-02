import { Router } from "express";
import { healthcheck } from "../controllers/healthcheck_controllers.js";
const healthcheck_router = Router()
healthcheck_router.route("/").get(healthcheck)
export default healthcheck_router