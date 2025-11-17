import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";

const gen = (id)=>jwt.sign({id},process.env.JWT_SECRET);

export const register = async(req,res)=> {
  const {name,email,password}=req.body;
  const hashed = await bcrypt.hash(password,10);
  const user = await User.create({name,email,password:hashed});
  res.json({user, token: gen(user._id)});
};

export const login = async(req,res)=> {
  const {email,password}=req.body;
  const user = await User.findOne({email});
  if(!user) return res.status(400).json({msg:"Invalid"});
  const ok = await bcrypt.compare(password,user.password);
  if(!ok) return res.status(400).json({msg:"Invalid"});
  res.json({user, token: gen(user._id)});
};