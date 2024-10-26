import { model, Schema } from "mongoose";
import { highSchool, roles } from "../../src/utils/constant/enums.js";

// schema
const userSchema = new Schema({
    fullName: {
        type: String,
        trim: true,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true,
        unique: true,
    },
    classLevel: {
        type: String,
        // required: true,
        enum: Object.values(highSchool)
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    role: {
        type: String,
        enum: Object.values(roles),
        default: roles.USER
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    otp: String,
    otpExpires: String
}, { timestamps: true });

// Model
export const User = model('User', userSchema);