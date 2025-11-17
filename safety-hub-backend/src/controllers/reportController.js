import Report from "../models/Report.js";

export const createReport = async(req,res)=> {
  const report = await Report.create({...req.body, user:req.user});
  res.json(report);
};

export const getReports = async(req,res)=> {
  res.json(await Report.find().populate("user"));
};