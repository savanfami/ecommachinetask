import { ref } from "joi";
import mongoose, { Document, Schema, Types } from "mongoose";

interface IUser extends Document{
    username:string;
    email:string;
    password:string;
    profilephoto?:string;
    blockedUsers?:Types.ObjectId[]
}



const userSchema=new Schema<IUser>(
    {
        username:{type:String,required:true},
        email:{type:String,required:true,unique:true},
        password: { type: String, required: true },
        profilephoto: { type: String },
        blockedUsers:[{
            type:mongoose.Schema.Types.ObjectId,
            ref:'user'
        }]
    },
    {timestamps:true}
)

export const userModel= mongoose.model<IUser>('user',userSchema)