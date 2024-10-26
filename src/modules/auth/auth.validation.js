import joi from 'joi';
import { generalFields } from '../../middleware/vaildation.js';

// sign up
export const signupVal = joi.object({
    fullName: generalFields.fullName.required(),
    email: generalFields.email.required(),
    phoneNumber: generalFields.phoneNumber.required(),
    password: generalFields.password.required(),
    cpassword: generalFields.cpassword.required(),
    classLevel: generalFields.classLevel.required()
});

// log in
export const loginVal = joi.object({
    email: generalFields.email.when('phoneNumber', {
        is: joi.exist(),
        then: joi.optional(),
        otherwise: joi.required()
    }),
    phoneNumber: generalFields.phoneNumber,
    password: generalFields.password.required()
});