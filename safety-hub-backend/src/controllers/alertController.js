import Alert from "../models/Alert.js";

export const createAlert = async(req,res)=> res.json(await Alert.create(req.body));
export const getAlerts = async(req,res)=> res.json(await Alert.find());