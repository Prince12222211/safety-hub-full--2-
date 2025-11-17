import mongoose from "mongoose";

const alertSchema = new mongoose.Schema({
  title:String, message:String, level:String
},{ timestamps:true });

export default mongoose.model("Alert", alertSchema);