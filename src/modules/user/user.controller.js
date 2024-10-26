import bcrypt from "bcrypt";
import { User } from "../../../db/index.js";
import { messages } from "../../utils/constant/messages.js";
import { generateOTP, sendOTP } from "../../utils/OTP.js";
import { AppError } from "../../utils/appError.js";

// forget password
export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError(messages.user.invalidCredntiols, 401));
  }
  const otp = generateOTP(); // Function to generate OTP
  await sendOTP(user.email, otp); // Send OTP via email
  user.otp = otp; // Save OTP to user record
  user.otpExpires = Date.now() + 3600000; // OTP expires in 1 hour
  await user.save();
  return res.status(200).json({ message: 'OTP sent to your email', success: true });
};

// reset password
export const resetPassword = async (req, res, next) => {
  const { email, otp, newPassword } = req.body;

  // Check if the user exists
  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError(messages.user.notExist, 404));
  }

  // Check if the OTP is valid
  if (user.otp !== otp || Date.now() > user.otpExpires) {
    return next(new AppError(messages.user.invalidOTP, 400));
  }

  // Hash the new password
  const hashedPassword = bcrypt.hashSync(newPassword, 8);

  // Update the user's password
  user.password = hashedPassword;

  // Clear the OTP and its expiration
  user.otp = undefined;
  user.otpExpires = undefined;

  // Save the user with the updated password
  const updatedUser = await user.save();

  if (!updatedUser) {
    return next(new AppError(messages.user.failToUpdatePassword, 500));
  }

  // Send response
  return res.status(200).json({
    message: messages.user.passwordUpdated,
    success: true,
  });
};

// update user 
export const updateUser = async (req, res, next) => {
  // get data from req
  const { userId } = req.params;
  const { email, phoneNumber, fullName, classLevel } = req.body;
  const authUserId = req.authUser._id;
  // check user exist 
  const userExist = await User.findById(userId);
  if (!userExist) {
    return next(new AppError(messages.user.notExist, 404));
  }
  // check only the owner of the account can update his account data
  if (authUserId.toString() !== userId.toString()) {
    return next(new AppError(messages.user.unauthorized, 401));
  }
  // Check if email, mobile numbe already exists for another user
  const existingUser = await User.findOne({
    $or: [
      { email: email },
      { phoneNumber: phoneNumber }
    ],
    _id: { $ne: authUserId }
  });

  if (existingUser) {
    return next(new AppError(messages.user.alreadyExist, 409));
  }

  // prepare data
  userExist.email = email || userExist.email
  userExist.phoneNumber = phoneNumber || userExist.phoneNumber
  userExist.fullName = fullName || userExist.fullName
  userExist.classLevel = classLevel || userExist.classLevel
  // add to db
  const userUpdated = await userExist.save();
  // handel fail
  if (!userUpdated) {
    return next(new AppError(messages.user.failToUpdate, 500))
  }
  // send res 
  return res.status(200).json({
    message: messages.user.updated,
    success: true,
    data: userUpdated
  })
}

// delete user
export const deleteUser = async (req, res, next) => {
  // get data from req 
  const user = req.authUser._id;
  // cheke exist and delete 
  const userExist = await User.findById(user)
  if (!userExist) {
    return next(new AppError(messages.user.notExist, 404))
  }
  // delete user
  const userdeleted = await User.findByIdAndDelete(user)
  // handel fail
  if (!userdeleted) {
    return next(new AppError(messages.user.failToDelete, 500))
  }
  // send res 
  return res.status(200).json({
    message: messages.user.deleted,
    success: true
  })
}

export const getProfile = async (req, res, next) => {
  // get data from req
  const user = req.authUser._id;
  // check existence
  const userExist = await User.findById(user)
  if (!userExist) {
    return next(new AppError(messages.user.notExist, 404))
  }
  // send res 
  return res.status(200).json({
    message: messages.user.fetchedSuccessfully,
    success: true,
    data: userExist
  })
}

// updatePassword
export const updatePassword = async (req, res, next) => {
  // get data from req
  const user = req.authUser._id;
  const { oldPassword, newPassword } = req.body;
  // check existence
  const userExist = await User.findById(user)
  if (!userExist) {
    return next(new AppError(messages.user.notExist, 404))
  }
  // check old password
  const isMatch = bcrypt.compareSync(oldPassword, userExist.password)
  if (!isMatch) {
    return next(new AppError(messages.user.invalidPassword, 401))
  }
  // prepare date
  const hashedNewPassword = bcrypt.hashSync(newPassword, 10); // Hash the new password
  userExist.password = hashedNewPassword;
  // save data
  const userUpdated = await userExist.save()
  // handel fail
  if (!userUpdated) {
    return next(new AppError(messages.user.updateFailed, 500))
  }
  // send res
  return res.status(200).json({
    message: messages.user.passwordUpdated,
    success: true
  })
}