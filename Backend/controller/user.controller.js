import { StudModel } from "../models/student.model";
import mongoose from "mongoose";
import bcrypt from "bcrypt"


async function generateAccessTokenAndRefreshToken(userId){
    try {
        const user = await StudModel.findById(userId);
        const accesToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();
    
        user.refreshToken = refreshToken;
    
        await user.save({ validateBeforeSave: false});
    
        return {accesToken, refreshToken};

    } catch (error) {
        console.log("Error Occured While Generating Access And Refresh Token", error);
    }
}

async function SignUp(req, res, next) {
    try {
        const {EnNumber, email, password} = req.body;

        const isCheck = await StudModel.find({
            email: email,
        });

        const hashPass = bcrypt(password , 10);

        if (!isCheck) {
            const newUser = await StudModel.create({
                EnNumber,
                email,
                password: hashPass
            })
            const createdUser = await StudModel.findById(newUser._id);
            if(createdUser)
            {
                return res.status(200).json({
                    message: "Account Created Successfuly"
                })
            }
            else
            {
                return res.status(400).json({
                    message: "Error Occured While Creating Account"
                })
            }
        }
        else {
            console.log("Sign-up Process Is Faild!")
            return res.status(400).json({
                message: "Sign-up Process Is Faild!"
            })
        }

    } catch (error) {
        console.log("Error occured in sign-up function!");
        res.status(400).json({
            message: "Error Occured while sign-up"
        })
    }
}

async function LogIn(req,res,next) {
    try {
        const { EnNumber, password } = req.body;

        const checkEnNumber = await StudModel.findOne(EnNumber);

        if(!checkEnNumber)
        {
            return res.status(400).json({
                message: "User Not Found!"
            })
        }

        const user = await StudModel.findOne(EnNumber);

        const checkPassowrd = await StudModel.isPasswordCorrect(user.password);

        if(!checkPassowrd)
        {
            return res.status(400).json({
                message: "Incorrect Password"
            })
        }

        const {accesToken , refreshToken} = await generateAccessTokenAndRefreshToken(user._id);

        const loggedUserId = await StudModel.findById(user._id).select("-password -refreshToken");

        const options = {
            httpOnly: true,
            secure: true
        }

        return res.status(200).cookie("accessToken",accesToken,options).cookie("refreshToken",refreshToken,options).json(loggedUserId,user);
    
    } catch (error) {
        console.log("Error Occurd While Sign-In");
        return res.status(400).send({
            message: "Error Occurd While Sign-In"
        })
    }
}
