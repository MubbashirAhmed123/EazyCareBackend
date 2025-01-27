import mongoose from "mongoose";


export const connectToDb= async()=>{
  try {
    const conn = await mongoose.connect('mongodb://127.0.0.1:27017/eazycare', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
  })
  console.log('connectd to db')
  } catch (error) {
    console.log('error while connecting to db')
  }

}

