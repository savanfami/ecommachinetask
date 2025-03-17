import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document{
    username:string;
    email:string;
    password:string;
    profileImage?:string;
}



const userSchema=new Schema<IUser>(
    {
        username:{type:String,required:true},
        email:{type:String,required:true,unique:true},
        password: { type: String, required: true },
        profileImage: { type: String },
    },
    {timestamps:true}
)

export const userModel= mongoose.model<IUser>('user',userSchema)