import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    score: {
      type: Number,
      required: true,
    },
    strengths: [String],
    weaknesses: [String],
    missing_sections: [String],
    tips: [String],
  },
  { timestamps: true },
);

export default mongoose.model("Analysis", analysisSchema);
