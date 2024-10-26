import { model, Schema, Types } from "mongoose";

const studentExamSchema = new Schema(
  {
    student: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    exam: {
      type: Types.ObjectId,
      ref: "Exam",
      required: true,
    },
    startTime: {
      type: Date,
      required: true,
      default: Date.now, 
    },
    endTime: {
      type: Date,
    },
    isSubmitted: {
      type: Boolean,
      default: false,
    },
    answers: [
      {
        question: {
          type: Types.ObjectId,
          ref: "Question",
          required: true,
        },
        selectedAnswer: {
          type: String,
          required: true,
        },
        isCorrect: {
          type: Boolean,
        },
      },
    ],
    score: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

export const StudentExam = model("StudentExam", studentExamSchema);
