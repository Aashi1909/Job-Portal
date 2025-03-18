import {User} from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

export const register = async (req, res) => {
     try{
        const {fullname, email, password, role, phoneNumber}  = req.body;
        if(!fullname || !email || !password || !role || !phoneNumber){
            return res.status(400).json({message: "All fields are required", success:false});
        }
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content)
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({message: "User already exists", success:false});
        }
        const hashedPassword = await bcrypt.hash(String(password), 10);
        await User.create({fullname, email, password: hashedPassword, role, phoneNumber, profile:{
            profilePhoto: cloudResponse.secure_url
        }});
        return res.status(201).json({message: "User registered successfully", success:true});
     } catch (error) {
        console.log(error, "msg");
        return res.status(500).json({ message: "Internal server error", success: false });

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

        const isPasswordValid = await bcrypt.compare(String(password), String(user.password));
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

        return res.status(200).cookie("token", token, {maxAge:1*24*60*60*1000, httpOnly: true, sameSite:'strict'}).json({message: `Welcome Back ${user.fullname} `, user, success:true});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error", success: false });
    }
}
export const logout = async (req, res) => {
    try{
        return res.status(200).cookie("token", "", {maxAge:0}).json({message: "Logged out successfully", success:true});
    } catch (error) {
    }
}

export const updateProfile = async (req, res) => {
    try{
        const {fullname, email, phoneNumber, bio, skills} = req.body;
        const file = req.file;
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content)
        let skillsArray;
        if(skills){
            skillsArray = skills.split(",");
        }
          const userId = req.id;
          let user = await User.findById(userId);

          if(!user){
            return res.status(400).json({message: "User does not exist", success:false});
          }
         //updating data
         if(fullname) user.fullname = fullname;
         if(email) user.email = email;
         if(phoneNumber) user.phoneNumber = phoneNumber;
         if(bio) user.profile.bio = bio;
         if(skills) user.profile.skills = skillsArray;     
         
         if(cloudResponse){
            user.profile.resume = cloudResponse.secure_url //save cloudinary url
            user.profile.resumeOriginalName = file.originalname // save original filename
         }

          await user.save();

          user = {
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            role:user.role,
            phoneNumber:user.phoneNumber,
            profile:user.profile
        }
        return res.status(200).json({message: "Profile updated successfully", success:true, user});

    }catch(error){
        console.log(error);
    }

}

