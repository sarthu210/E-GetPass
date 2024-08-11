import { StudModel } from "../models/user.model";
import mongoose from "mongoose";
import bcrypt from "bcrypt"

async function SignUp(req, res, next) {
    try {
        const user = req.body;

        const isCheck = await StudModel.find({
            email: user.email,
            phoneNo: user.number
        });

        const hashPass = bcrypt(user.password , 10);

        if (!isCheck) {
            const newUser = {
                user,
                password: hashPass
            }

            await newUser.save();

            res.status(200).json({
                message: "Sign up is done successfuly"
            })
        }
        else {
            console.log("Sign-up Process Is Faild!")
            res.status(400).json({
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