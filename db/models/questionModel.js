import { model, Schema, Types } from "mongoose";
import { questionTypes } from "../../src/utils/constant/enums.js";

// schema
const questionSchema = new Schema(
  {
    text: {
      type: String,
      trim: true,
      required: true,
    },
    type: {
      type: String,
      enum: Object.values(questionTypes),
      required: true,
    },
    options: [
      {
        type: String,
      },
    ],
    correctAnswer: {
      type: String,
      required: true,
    },
    exam: {
      type: Types.ObjectId,
      ref: "Exam",
      required: true,
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    points: {
      type: Number,
      required: true,
      min: 1,
    },
  },
  { timestamps: true }
);

// model
export const Question = model("Question", questionSchema);
