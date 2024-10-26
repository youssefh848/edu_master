import bcrypt from 'bcrypt'
import { messages } from "../../utils/constant/messages.js";
import { User } from '../../../db/index.js';
import { roles } from '../../utils/constant/enums.js';
import { AppError } from '../../utils/appError.js';

// create admin 
export const createAdmin = async (req, res, next) => {
    // get data from req
    const { fullName, email, password, phoneNumber } = req.body;
    // check email existance or phone 
    const existingUser = await User.findOne({ $or: [{ email }, { phoneNumber }] });
    if (existingUser) {
        return next(new AppError(messages.user.alreadyExist, 400));
    }
    // hash password
    const hashedPassword = bcrypt.hashSync(password, 8)
    // create admin
    const admin = new User({
        fullName,
        email,
        password: hashedPassword,
        phoneNumber,
        role: roles.ADMIN,
        isVerified: true
    })
    // add to db 
    const adminCreated = await admin.save()
    // handel fail
    if (!adminCreated) {
        return next(new AppError(messages.user.failToCreate, 500));
    }
    // send res
    res.status(201).json({
        message: messages.user.created,
        success: true,
        data: adminCreated
    })
}

// get all admin 
export const getAllAdmin = async (req, res, next) => {
    // get all admin from db
    const allAdmin = await User.find({ role: roles.ADMIN }) // [{}],[]
    // check exist 
    if (!allAdmin.length) {
        return next(new AppError(messages.admin.notExist, 404));
    }
    // send res
    return res.status(200).json({
        message: messages.admin.fetchedSuccessfully,
        success: true,
        data: allAdmin
    })
}

// get All User
export const getAllUser = async (req, res, next) => {
    // get all user 
    const allUser = await User.find({ role: roles.USER })
    // check existance
    if (!allUser.length) {
        return next(new AppError(messages.user.notExist, 404));
    }
    // send res
    return res.status(200).json({
        message: messages.user.fetchedSuccessfully,
        success: true,
        data: allUser
    })
}
