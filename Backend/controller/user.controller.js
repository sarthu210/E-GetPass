import mongoose from "mongoose";
import bcrypt from "bcrypt";
import modelsMap from "../models/modelMap.js";
import jwt from "jsonwebtoken";
import { OTPModel } from "../models/otp.model.js";
import { sendOTPEmail } from "../middleware/mail.middleware.js";
import { StudModel } from "../models/student.model.js";0

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

        if (!Model) {
            return res.status(400).json({ message: "Invalid role" });
        }

        const isCheck = await Model.findOne({ email: email });

        if(role === "student"){
            const isEnNumber = await Model.findOne({ EnNumber: EnNumber });
            if(isEnNumber){
                return res.status(400).json({
                    message: "Enrollment Number Already Exists"
                });
            }
        }

        if(isCheck){
            return res.status(400).json({
                message: "User Already Exists"
            });
        }

        const hashPass = await bcrypt.hash(password, 10);

        if (!isCheck) {
            const newUser = await Model.create({
                email,
                password: hashPass,
                ...(EnNumber && { EnNumber }),
                ...otherDetails
            });

            const createdUser = await Model.findById(newUser._id);

            if (createdUser) {
                const accessToken = createdUser.generateAccessToken();
                const refreshToken = createdUser.generateRefreshToken();

                // Save the refresh token in the database
                createdUser.refreshToken = refreshToken;
                await createdUser.save();

                const options = {
                    httpOnly: true,
                    secure: true
                };

                const user = createdUser;

                return res.status(200).cookie("accessToken", accessToken, options).cookie("refreshToken", refreshToken, options).json({ user, accessToken: accessToken, refreshToken: refreshToken });
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

        return res.status(200).cookie("accessToken", accesToken, options).cookie("refreshToken", refreshToken, options).json({ user, accessToken: accesToken, refreshToken: refreshToken });

    } catch (error) {
        console.log("Error Occurred While Sign-In");
        return res.status(400).send({
            message: "Error Occurred While Sign-In"
        });
    }
}

async function getUser(req,res) {
    try {
        const token =  req.body?.accessToken;

        console.log(token);

        if(!token){
            req.status(400).json({
                message: "Unauthorized User"
            })
        }

        const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const role = decodeToken.role;

        const User = modelsMap[role.toLowerCase()];

        const user = await User.findById(decodeToken?._id);
        
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
async function refreshAccessToke (req, res) {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken


    if (!incomingRefreshToken) {
        res.status(400).json({
            message: "Refresh token is required"
        })
    }

    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        console.log("decoded: ", decodedToken);

        const role = decodedToken.role;
        const User = modelsMap[role.toLowerCase()];
    
        const user = await User.findById(decodedToken?._id)

        console.log("redess: ",user);
    
        if (!user) {
            res.status(400).json({
                message: "Inavlid refresh token"
            })
        }
    
        if (incomingRefreshToken !== user?.refreshToken) {
            res.status(400).json({
                message: "Invalid refresh token"
            })  
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessToken, newRefreshToken} = await generateAccessTokenAndRefreshToken(user._id,User)
        console.log(accessToken, newRefreshToken);
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json( {accessToken, refreshToken: newRefreshToken , message: "Access token refreshed"})
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }

}

async function getStudents(req,res) {
    try {
        const department = req.body.department;
        const role = req.body.role;
        
        if(role === "teacher")   
        {
            if(!department)
                {
                    res.status(400).json({
                        message: "Unable to fetch department"
                    })
                }
            const tg_batch = req?.body?.tg_batch;
            if(!tg_batch)
            {
                return res.status(400).json({
                    message: "Unable to fetch tg_batch"
                })
            }
            const data = await StudModel.find({
                tg_batch: tg_batch
            });

            if(!data)
            {
                return res.status(200).json({
                    message: "No Request Found"
                })
            }

            return res.status(200).json({data});            
        }

        if(role === "hod")
        {
            if(!department)
            {
                res.status(400).json({
                    message: "Unable to fetch department"
                })
            }
            const data = await StudModel.find({
                department: department,
            });

            if(!data)
            {
                return res.status(200).json({
                    message: "No Request Found"
                })
            }

            return res.status(200).json({data});            
        }


        const data = await StudModel.find({
            role: "student"
        })

        res.status(200).json({data});

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

async function SendOtp(req, res){
    try {
        const { email } = req.body;

        const user = await StudModel.findOne({ email: email });

        if(user){
            return res.status(400).json({
                message: "User Already Exists"
            });
        }

        const otp = await OTPModel.findOne({ email: email });

        if(!otp){
            const Newotp = await sendOTPEmail(email);
            await OTPModel.create({
                email: email,
                otp: Newotp,
                createdAt: Date.now()
            });
       
            return res.status(200).json({
                message: "OTP Sent Successfully"
            });
        }

        if (otp) {
            const otpTime = new Date(otp.createdAt).getTime(); // Convert createdAt to timestamp
            const currentTime = Date.now(); // Get current timestamp

            // Check if 10 minutes (600,000 milliseconds) have passed
            if (currentTime - otpTime < 600000) { // 10 minutes
                return res.status(200).json({
                    message: "OTP Already Sent. Please wait for 10 minutes before requesting a new one.",
                });
            }
        }


        const Newotp = await sendOTPEmail(email);
        otp.otp = Newotp;
        otp.createdAt = Date.now();
        await otp.save();

        return res.status(200).json({
            message: "OTP Sent Successfully"
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        })
        
    }
}

async function VerifyOtp(req, res){
    try {
        const { email, otp } = req.body;

        const otpData = await OTPModel.findOne({ email: email });

        if(!otpData){
            return res.status(400).json({
                message: "OTP Not Found"
            });
        }

        if(otpData.otp !== otp){
            return res.status(400).json({
                message: "Invalid OTP"
            });
        }

        return res.status(200).json({
            message: "OTP Verified Successfully"
        });

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

export { SignUp, LogIn, getUser, refreshAccessToke, getStudents, SendOtp, VerifyOtp };