import { StudModel } from "../models/student.model";
import mongoose from "mongoose";
import bcrypt from "bcrypt"

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