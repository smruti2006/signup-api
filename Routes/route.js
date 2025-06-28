const express=require('express');
const bcrypt=require('bcrypt');
const router=express.Router();
const Users=require('../Model/model');
const jwt=require('jsonwebtoken');
const cookieParser=require('cookie-parser');
router.use(cookieParser());
// Middleware to parse JSON bodies
router.use(express.json());
// Middleware to check authentication
const authenticate=async (req,res,next)=>{
    const token=req.cookies.token;
    if(!token){
        return res.status(401).json({message:"Unauthorized"});
    }
    try {
        const verified=jwt.verify(token,'secretkey');
        req.user=verified;
        console.log(req.user);
        next();
    }
    catch (error) {
        return res.status(400).json({message:"Invalid token"});
    }
}
router.post('/Signup',async (req,res)=>{
    let {Name,Email,Password}=req.body;
    const existingUser=await Users.findOne({ Email });
    if (existingUser) {
        return res.status(400).json({message: "User already exists"});
    }
    if (!Name || !Email || !Password) {
        return res.status(400).json({message: "Please fill all the fields"});
    }
    if (Password.length < 6) {
        return res.status(400).json({message: "Password must be at least 6 characters long"});
    }
    Password=await bcrypt.hash(Password,10);
    try {
        const user=await Users.create({
            Name,
            Email,
            Password
        });

        await user.save();
        res.status(201).json({user});
    } catch (error) {
        res.status(500).json({message:error.message});
    }
});
router.post('/Login',authenticate,async(req,res)=>{
   
    let {Email,Password}=req.body

    if(!Email || !Password){
        return res.status(400).json({message:"Please fill all the fields"});
    }
    const user=await Users.findOne({Email});
    if(!user){
        return res.status(400).json({message:"User does not exist"});
    }
    const isMatch=await bcrypt.compare(Password,user.Password);
    if(!isMatch){
        return res.status(400).json({message:"Invalid credentials"});
    }
    var token=jwt.sign({Email:Email},'secretkey',)
    res.cookie('token',token)
    res.status(200).json({message:"Login successful",user});
})
module.exports=router;
