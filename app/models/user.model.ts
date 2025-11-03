import mongoose from 'mongoose';
import { type } from 'os';

const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    todos:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Todo'
    }],
    revisions:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Revision'
    }],
    forgotpasswordtoken:{
        type:String
    },
    forgotpasswordexpiry:{
        type:Date
    },
    verifytoken:{
        type:String
    },
    verifytokenexpiry:{
        type:Date
    }
},{timestamps:true})

const User=mongoose.models.user||mongoose.model('user',userSchema)
export default User;