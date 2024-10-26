import { model, Schema, Types } from "mongoose";
import { highSchool } from "../../src/utils/constant/enums.js";

// schema
const examSchema = new Schema(
  {
    title: {
      type: String,
      trim: true,
      required: true,
      minlength: 5,
    },
    description: {
      type: String,
      trim: true,
      maxlength: 1000,
    },
    duration: {
      type: Number,
      required: true,
      min: 10,
    },
    questions: [
      {
        type: Types.ObjectId,
        ref: "Question",
        required: true,
      },
    ],
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    classLevel: {
      type: String,
      enum: Object.values(highSchool),
      default: highSchool.G_1_SECONDARY,
      required: true,
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
  }, { timestamps: true, });

// virtual
examSchema.virtual('Question',{
  localField:'_id',
  foreignField:'Exam',
  ref:'Question'
})

// model
export const Exam = model("Exam", examSchema);
