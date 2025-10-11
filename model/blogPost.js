import mongoose from "mongoose";


const blogSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    catergories: {
      type: String,
      required: true,
    },
    blog: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "comments" }],
    like: [{ type: mongoose.Schema.Types.ObjectId, ref: "likes" }],
  },
 { timestamps: true }
);

const blogModel = mongoose.model("blogModel", blogSchema);
export default blogModel;
