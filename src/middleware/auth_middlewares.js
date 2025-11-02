import jwt from "jsonwebtoken";
import { user } from "../model/user_model.js";
import { asynchandler } from "../utils/async_handlers.js";
import { apierror } from "../utils/apierror.js";

export const verifyjwt = asynchandler(async (req, res, next) => {
    console.log("Incoming cookies:", req.cookies);
    console.log("Authorization header:", req.header("Authorization"));

    const token =
        req.cookies?.accessToken ||
        req.header("Authorization")?.replace("Bearer", "").trim();

    console.log("Access token used:", token);  

    if (!token) throw new apierror(401, "Unauthorized error");

    try {
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log("Decoded token payload:", decodedToken); 

        const foundUser = await user
            .findById(decodedToken._id)
            .select("-password -refreshToken -emailverificationtoken -emailverificationexpiry");

        if (!foundUser) throw new apierror(401, "Invalid access token");

        req.user = foundUser;
        next();
    } catch (err) {
        console.error("JWT verification failed:", err.message);  
        throw new apierror(401, "Invalid access token");
    }
});
