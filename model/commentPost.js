import mongoose from 'mongoose'


const commentSchema=mongoose.Schema({
    message:{
        type:String,
        require:true
    },
    blog:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'blogModel',
        require:true,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"user",
        require:true
    }
},{timestamps:true})

const commentModel =mongoose.model('comments',commentSchema);
export default commentModel


