const mongoose = require('mongoose');
const asyncHandler = require('express-async-handler');
const jwt=require('jsonwebtoken');
const bcrypt =require('bcrypt');
const usermodel = require('../models/usermodel');
const taskmodel=require('../models/taskmodel');

const createUser=asyncHandler(async(req,res)=>{
    const {name,email,password}=req.body;
    if(!name||!email||!password){
        console.log(req.body)
        res.status(400);
        throw new Error('Please add all fields');
    }
    const userExist=await usermodel.findOne({email})
    if(userExist){
        res.status(400).json({message:"user exist"});
    }
    try{
    const salt =await bcrypt.genSalt(10);
    const hashedpassword=await bcrypt.hash(password,salt);
    const user =await usermodel.create({
        name,
        email,
        password:hashedpassword,
    });
    res.cookie("token",generateJWT(user.id))
    res.status(200).json({
        _id:user.id,
        name:user.name,
        email:user.email
    });
    }
    catch(e){
        res.status(400).json({error:e.message});
    }
    

});

const loginUser=asyncHandler(async(req,res)=>{
    const{email,password}=req.body;
    if(!email||!password){
        res.status(400).json({message:"Enter all fields"});
    }
    const user= await usermodel.findOne({email});
    if(user&&(await bcrypt.compare(password,user.password))){
        res.cookie('token',generateJWT(user.id))
        res.status(200).json({
            _id:user.id,
            name:user.name,
            email:user.email
        });
    }else{
        res.status(400).json({message:"Invalid userdetails"});
    }
})

const generateJWT=(id)=>{
    return(
    jwt.sign({id},process.env.JWT_SECRETKET,{
        expiresIn:'1d',
    }))
}


const getMe=asyncHandler(async(req,res)=>{
    try{
        const user=await taskmodel.findById(req.user.id);
        res.status(200).json(user);
    }catch(e){
        res.status(400).json({
            error:e.message,
        });
    }
   
    
})
module.exports={createUser,loginUser,getMe};