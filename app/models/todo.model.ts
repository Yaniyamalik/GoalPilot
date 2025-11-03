import mongoose from 'mongoose';

const todoSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    },
    task:{
        type:String,
        required:true,
    },
    
    deadline:{
        type:Date,  
    },
    status:{
        type:Boolean,
        default:false,
    }
},{timestamps:true})

const Todo=mongoose.models.Todo||mongoose.model('Todo',todoSchema)
export default Todo;