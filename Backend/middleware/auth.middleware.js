import jwt from "jsonwebtoken";
import { StudModel } from "../models/student.model";

async function verifyHandler(req,res,next) {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
    
        if(!token)
        {
            return res.status(400).json({
                message: "Unauthorized User"
            })
        }
    
        const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    
        const user = await StudModel.findOne(decodeToken?._id).select("-password -accessToken");
    
        if(!user)
        {
            return res.status(400).json({
                message: "User not found"
            })
        }
    
        req.user = user;
        
        next();
    } catch (error) {
        console.log("Invalid Access Token");
        return res.status(400).json({
            message: "Invalid Access Token"
        })
    }
}

export default verifyHandler;