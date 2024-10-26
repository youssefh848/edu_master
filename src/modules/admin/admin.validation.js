import joi from "joi";
import { generalFields } from "../../middleware/vaildation.js";

export const createAdminVal = joi.object({
    fullName: generalFields.fullName.required(),
    email: generalFields.email.required(),
    phoneNumber: generalFields.phoneNumber.required(),
    password: generalFields.password.required(),
    cpassword: generalFields.cpassword.required()
})