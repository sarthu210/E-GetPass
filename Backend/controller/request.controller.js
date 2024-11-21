import { RequestModel } from "../models/request.model.js";
import { StudModel } from "../models/student.model.js";
import jwt from "jsonwebtoken";
import modelsMap from "../models/modelMap.js";

async function createRequest(req, res) {
    try {

        const token = req.cookies?.accessToken || req.body?.accessToken;

        console.log(token);

        if(!token){
            res.status(400).json({
                message: "Inavlid Access Token"
            })
        }

        const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await StudModel.findById(decodeToken?._id);

        if(!user)
        {
            return res.status(400).json({
                message: "Unauthorized User"
            })
        }

        if(user.role != "student")
        {
            return res.status(400).json({
                message: "Invalid User Role"
            })
        }

        const { EnNumber, email, name, number, tg_batch, department, reason } = req.body;

        const request = new RequestModel({
            EnNumber,
            email,
            name,
            number,
            department,
            reason,
            tg_batch
        });

        await request.save();

        return res.status(200).json({
            message: "Request Created Successfully",
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

async function getAllRequest(req,res) {
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
            const data = await RequestModel.find({
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
            const data = await RequestModel.find({
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


        const data = await RequestModel.find({
            hodApproval: true,
            teacherApproval: true,
        })

        res.status(200).json({data});

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

async function RequestApproval(req,res) {
    try {
        const requestId = req.body.requestId;
        const role = req.body.role;

        const request = await RequestModel.findById(requestId);

        if(!request)
        {
            return res.status(400).json({
                message: "Request not found"
            })
        }

        if(role == "hod")
        {
            request.hodApproval = true;
            await request.save();

            return res.status(200).json({
                message: "Request Approved Successfully"
            })  
            
        }

        if(role == "teacher")
        {
            request.teacherApproval = true;
            await request.save();

            return res.status(200).json({
                message: "Request Approved Successfully"
            }) 
        }

        if(role == "securityguard")
        {
            request.securityApproval = true;
            await request.save();

            return res.status(200).json({
                message: "Request Approved Successfully"
            }) 
        }

        if(role === "hostel")
        {
            request.hostelApproval = true;
            await request.save();

            return res.status(200).json({
                message: "Request Approved Successfully"
            }) 
        }
   

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        })
        
    }
}

async function RequestUnapproved(req,res) {
    try {
        const requestId = req.body.requestId;
        const role = req.body.role;

        const request = await RequestModel.findById(requestId);

        if(!request)
        {
            return res.status(400).json({
                message: "Request not found"
            })
        }

        if(role == "hod")
        {
            request.hodApproval = false;
            await request.save();

            return res.status(200).json({
                message: "Request Unpproved Successfully"
            })  
            
        }

        if(role == "teacher")
        {
            request.teacherApproval = false;
            await request.save();

            return res.status(200).json({
                message: "Request Unapproved Successfully"
            }) 
        }

        if(role == "securityguard")
        {
            request.securityApproval = false;
            await request.save();

            return res.status(200).json({
                message: "Request Unapproved Successfully"
            }) 
        }

        if(role === "hostel")
        {
            request.hostelApproval = false;
            await request.save();

            return res.status(200).json({
                message: "Request Unapproved Successfully"
            }) 
        }
   

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        })
        
    }
    
}

async function RequestPerStud(req,res){
    try {
        const EnNumber = req.body.EnNumber;
        const data = await RequestModel.find({
            EnNumber: EnNumber
        })

        if(!data)
        {
            return res.status(200).json({
                message: "No Request Found"
            })
        }

        return res.status(200).json({data});

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        })
        
    }
}

export { createRequest, getAllRequest, RequestApproval, RequestUnapproved, RequestPerStud };