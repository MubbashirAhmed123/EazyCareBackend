import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phoneNumber:{type:Number,require:false},
  address:{type:String,require:false},
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
    default: 'male',                  
},}, { timestamps: true }); 

export const User=mongoose.model('User',userSchema)


