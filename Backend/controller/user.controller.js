import mongoose from "mongoose";
import bcrypt from "bcrypt";
import modelsMap from "../models/modelMap.js";

async function generateAccessTokenAndRefreshToken(userId, Model) {
    try {
        const user = await Model.findById(userId);
        const accesToken = user.generateAccessToken();
        const refreshToken = user.refreshToken;

        await user.save({ validateBeforeSave: false });

        return { accesToken, refreshToken };

    } catch (error) {
        console.log("Error Occurred While Generating Access And Refresh Token", error);
    }
}

async function SignUp(req, res, next) {
    try {
        const { role, EnNumber, email, password, ...otherDetails } = req.body;

        const Model = modelsMap[role.toLowerCase()];
        console.log(Model);
        if (!Model) {
            return res.status(400).json({ message: "Invalid role" });
        }

        const isCheck = await Model.findOne({ email: email });

        if(isCheck){
            return res.status(400).json({
                message: "User Already Exists"
            });
        }

        console.log(isCheck);

        const hashPass = await bcrypt.hash(password, 10);

        

        if (!isCheck) {
            const newUser = await Model.create({
                email,
                password: hashPass,
                ...(EnNumber && { EnNumber }),
                ...otherDetails
            });
            console.log(newUser)
            const createdUser = await Model.findById(newUser._id);
            if (createdUser) {
                const accessToken = createdUser.generateAccessToken();
                const refreshToken = createdUser.generateRefreshToken();

                // Save the refresh token in the database
                createdUser.refreshToken = refreshToken;
                await createdUser.save();

                return res.status(200).json({
                    message: "Account Created Successfully",
                    accessToken: accessToken,
                    refreshToken: refreshToken
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
        const { role,email, EnNumber, password } = req.body;

        const Model = modelsMap[role.toLowerCase()];
        if (!Model) {
            return res.status(400).json({ message: "Invalid role" });
        }

        const user = await Model.findOne({
        email: email 
        });

        console.log(user)

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

async function getUser(req,res) {
    try {
        const user = req.user;
        if(!user)
        {
            return res.status(400).json({
                message: "Unauthorized User1"
            })
        }
        res.status(200).json({
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export { SignUp, LogIn, getUser };