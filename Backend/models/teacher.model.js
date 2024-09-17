import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const TeacherSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    number: {
        type: String,
        require: true
    },
    department: {
        type: String,
        require: true
    },
    role: {
        type: String,
        default: "teacher"
    },
    batch: {
        type: String,
        require: true
    },
    refreshToken: {
        type: String
    }
});

const TeacherModel = mongoose.model('TeacherModel', TeacherSchema);
export { TeacherModel };

TeacherModel.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

TeacherModel.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.EXPIRE_ACCESS_TOKEN
        }
    )
}

TeacherModel.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.EXPIRE_REFRESH_TOKEN
        }
    )
}