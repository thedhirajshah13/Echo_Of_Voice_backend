import mongoose from "mongoose";


const likeSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'user',
      require: true,
    },
    blog: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'blogModel',
      require: true,
    },
  },
  { timeStamps: true }
);

const likeModel = mongoose.model('likes', likeSchema);
export default likeModel;
