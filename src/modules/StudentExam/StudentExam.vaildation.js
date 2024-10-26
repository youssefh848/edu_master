import joi from "joi";
import { generalFields } from "../../middleware/vaildation.js";


// Start exam validation
export const startExamVal = joi.object({
  examId: generalFields.objectId.required(),
});

// Submit exam validation
export const submitExamVal = joi.object({
  examId: generalFields.objectId.required(),
  answers: generalFields.answers.required(),
});


export const getStudentScoreVal = joi.object({
  examId: generalFields.objectId.required()
});

export const getRemainingTimeVal = joi.object({
  examId: generalFields.objectId.required()
});