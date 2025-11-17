import mongoose from "mongoose";

const reportSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref:"User" },
  title: String, description: String, location: String, status: String
},{ timestamps:true });

export default mongoose.model("Report", reportSchema);