import {User} from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
     try{
        const {fullname, email, password, role, phoneNumber}  = req.body;
        if(!fullname || !email || !password || !role || !phoneNumber){
            return res.status(400).json({message: "All fields are required", success:false});
        }
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message: "User already exists", success:false});
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({fullname, email, password: hashedPassword, role, phoneNumber}).save();
        return res.status(201).json({message: "User registered successfully", success:true});
     } catch (error) {
     }
}

export const login = async (req, res) => {
    try{
        const {email, password, role} = req.body;
        if(!email || !password || !role){
            return res.status(400).json({message: "All fields are required", success:false});
        }
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: "User does not exist", success:false});
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid){
            return res.status(400).json({message: "Invalid password", success:false});
        }
        if(user.role !== role){
            return res.status(400).json({message: "Invalid role", success:false});
        }
        const tokenData =  {
            userId : user._id,
        }
        const token = await jwt.sign(tokenData, process.env.SECRET_KEY, {expiresIn: "1d"});

        user = {
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            role:user.role,
            phoneNumber:user.phoneNumber,
            profile:user.profile
        }

        return res.status(200).cookie("token", token, {maxAge:1*24*60*60*1000, httpOnly: true, sameSite:'strict'}).json({message: `Welcome Back ${user.fullname} `, success:true});
    } catch (error) {
    }
}
export const logout = async (req, res) => {
    try{
        return res.status(200).cookie("token", "", {maxAge:0}).json({message: "Logged out successfully", success:true});
    } catch (error) {
    }
}