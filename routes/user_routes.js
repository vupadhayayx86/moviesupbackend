const express=require('express')
const router=express.Router()
const {users}=require("../models/user_model")
const jwt=require('jsonwebtoken')
const maxAge=60*60*3*24

const createToken=(id)=>{
    return jwt.sign({id},'yoyohoneysingh',{
        expiresIn:maxAge
    })
}


router.get("/",(req,res)=>{
   
    res.cookie("sample","Hello Cokie",{maxAge:maxAge})
    res.send("user router get...")
})

router.post("/",async (req,res)=>{
    let {username,email,password}=req.body
    try{
        const user=await users.create({username,email,password})
        const token=createToken(user._id)
        res.cookie('jwtcookie',token,{httpOnly:false,maxAge:maxAge*1000})
        res.status(201).send({useremail:email})
    } catch(error){
        res.status(400).send(error)
    }
    
    
})

module.exports=router



