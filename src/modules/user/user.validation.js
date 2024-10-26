import joi from "joi"
import { generalFields } from "../../middleware/vaildation.js"

export const forgotPasswordVal = joi.object({
  email: generalFields.email.required(),
});

export const resetPasswordVal = joi.object({
  email: generalFields.email.required(),
  otp: generalFields.otp.required(),
  newPassword: generalFields.password.required(),
  cpassword: generalFields.confirmPassword.required(),
});

export const updateUserVal = joi.object({
  userId: generalFields.objectId.required(),
  fullName: generalFields.fullName.optional(),
  email: generalFields.email.optional(),
  phoneNumber: generalFields.phoneNumber.optional(),
  classLevel: generalFields.classLevel.optional()
})

export const updatePasswordVal = joi.object({
  oldPassword: generalFields.password.required(),
  newPassword: generalFields.password.required().not(joi.ref('oldPassword')),
  cpassword: generalFields.password.required().valid(joi.ref('newPassword'))
})