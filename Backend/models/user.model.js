import mongoose from "mongoose";


const StudentSchema = new mongoose.Schema({
    studentId: {
        type: String,
        require: true
    },
    name:{
        type: String,
        require: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: function(v) {
                var re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
                return re.test(v);
            },
            message: 'Provided email is invalid.'
        }
    },
    phoneNo: {
        type: Number,
        require: true,
        unique: true,
        validate: {
            validator: function(v) {
                var re = /^\d{10}$/;
                return (!v || !v.trim().length) || re.test(v)
            },
            message: 'Provided phone number is invalid.'
        }
    },
    password: {
        type: String,
        require: true
    },
    gender: {
        type: String,
        require: true,
    },
    dob: {
        type: Date,
        require: true
    },
    branch: {
        type: String,
        require: true
    },
    year: {
        type: String,
        require: true
    },
    disability: {
        type: Boolean,
        require: true
    },
    lastseen: {
        type: String,
        require: true
    },
    parentsNo: {
        type: Number,
        require: true,
        validate: {
            validator: function(v) {
                var re = /^\d{10}$/;
                return (!v || !v.trim().length) || re.test(v)
            },
            message: 'Provided phone number is invalid.'
        }
    },
    address: {
        type: String,
        require: true,
    },
    city: {
        type: String,
        require: true
    },
    state: {
        type: String,
        require: true
    },
    country: {
        type: String,
        require: true
    }
})

const StudModel = mongoose.model('StudModel', StudentSchema);
export {StudModel};