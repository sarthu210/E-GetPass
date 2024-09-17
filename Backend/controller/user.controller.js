import mongoose from "mongoose";
import bcrypt from "bcrypt";
import modelsMap from "../models/modelMap.js";

async function generateAccessTokenAndRefreshToken(userId, Model) {
    try {
        const user = await Model.findById(userId);
        const accesToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;

        await user.save({ validateBeforeSave: false });

        return { accesToken, refreshToken };

    } catch (error) {
        console.log("Error Occurred While Generating Access And Refresh Token", error);
    }
}

async function SignUp(req, res, next) {
    try {
        const { role, EnNumber, email, password } = req.body;

        const Model = modelsMap[role.toLowerCase()];
        if (!Model) {
            return res.status(400).json({ message: "Invalid role" });
        }

        const isCheck = await Model.findOne({ email: email });

        const hashPass = await bcrypt.hash(password, 10);

        if (!isCheck) {
            const newUser = await Model.create({
                EnNumber,
                email,
                password: hashPass
            });
            const createdUser = await Model.findById(newUser._id);
            if (createdUser) {
                return res.status(200).json({
                    message: "Account Created Successfully"
                });
            } else {
                return res.status(400).json({
                    message: "Error Occurred While Creating Account"
                });
            }
        } else {
            console.log("Sign-up Process Is Failed!");
            return res.status(400).json({
                message: "Sign-up Process Is Failed!"
            });
        }

    } catch (error) {
        console.log("Error occurred in sign-up function!");
        res.status(400).json({
            message: "Error Occurred while sign-up"
        });
    }
}

async function LogIn(req, res, next) {
    try {
        const { role, EnNumber, password } = req.body;

        const Model = modelsMap[role.toLowerCase()];
        if (!Model) {
            return res.status(400).json({ message: "Invalid role" });
        }

        const user = await Model.findOne({ EnNumber: EnNumber });

        if (!user) {
            return res.status(400).json({
                message: "User Not Found!"
            });
        }

        const checkPassword = await user.isPasswordCorrect(password);

        if (!checkPassword) {
            return res.status(400).json({
                message: "Incorrect Password"
            });
        }

        const { accesToken, refreshToken } = await generateAccessTokenAndRefreshToken(user._id, Model);

        const loggedUserId = await Model.findById(user._id).select("-password -refreshToken");

        const options = {
            httpOnly: true,
            secure: true
        };

        return res.status(200).cookie("accessToken", accesToken, options).cookie("refreshToken", refreshToken, options).json({ loggedUserId, user });

    } catch (error) {
        console.log("Error Occurred While Sign-In");
        return res.status(400).send({
            message: "Error Occurred While Sign-In"
        });
    }
}

export { SignUp, LogIn };