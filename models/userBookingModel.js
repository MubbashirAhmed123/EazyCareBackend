import mongoose from "mongoose";

const bookingdata=new mongoose.Schema({
    bookingDate:{
        type:Date
    },
    bookingSlot:{
        type:Date
    },


})

const bookingSchema=new mongoose.Schema({
    booking:[
        
    ]
    
})