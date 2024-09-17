import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const AdminSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            require: true
        },
        password: {
            type: String,
            require: true
        },
        role: {
            type: String,
            default: "admin"
        },
        refreshToken: {
            type: String
        },

    }
)

const AdminModel = mongoose.model('AdminModel', AdminSchema);
export { AdminModel };

AdminModel.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
}

AdminModel.methods.generateAccessToken = function () {
    return jwt.sign(
        {
            _id: this._id,
            EnNumber: this.EnNumber,
            email: this.email
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.EXPIRE_ACCESS_TOKEN
        }
    )
}

AdminModel.methods.generateRefreshToken = function(){
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