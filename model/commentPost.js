import mongoose from "mongoose";

const commentSchema = mongoose.Schema(
  {
    message: {
      type: String,
      required: true,
    },
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "blogModel",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    scoreSummary: {
      toxicity: { type: Number, default: 0 },
      insult: { type: Number, default: 0 },
      threat: { type: Number, default: 0 },
      profanity: { type: Number, default: 0 },
      identityAttack: { type: Number, default: 0 },
      sexuallyExplicit: { type: Number, default: 0 },
    },
    isFlagged:{
        type:Boolean,
        default:false
    }
  },
  { timestamps: true }
);

const commentModel = mongoose.model("comments", commentSchema);
export default commentModel;
