import { RequestModel } from "../models/request.model";
import { StudentModel } from "../models/student.model";


async function createRequest(req, res) {
    try {
        const user = req.user;

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

        const { EnNumber, email, name, number, department, role, reason } = req.body;

        const request = new RequestModel({
            EnNumber,
            email,
            name,
            number,
            department,
            role,
            reason
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
        const user = req.user;

        if(!user)
        {
            return res.status(400).json({
                message: "Unauthorized User"
            })
        }

        const requests = await RequestModel.find({
            EnNumber: user.EnNumber
        });

        if(!requests)
        {
            return res.status(400).json({
                message: "Request not found"
            })
        }

        return res.status(200).json({
            requests
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

async function hodApproval(req,res) {
    try {
        const user = req.user;

        if(!user)
        {
            return res.status(400).json({
                message: "Unauthorized User"
            })
        }

        if(user.role != "hod")
        {
            return res.status(400).json({
                message: "Invalid User Role"
            })
        }

        const request = await RequestModel.find({
            department: user.department
        });

        if(!request)
        {
            return res.status(400).json({
                message: "Request not found"
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal Server Error"
        })
        
    }
}