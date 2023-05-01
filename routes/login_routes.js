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

router.post("/",async (req,res)=>{
    
    const {email,password}=req.body
    try{
        const user=await users.login(email,password)
        const token=createToken(user._id)
         console.log(token)
        res.cookie('jwtcookie',token,{httpOnly:false,maxAge:maxAge*1000})
        res.status(201).send({useremail:email})
        
       } catch(error){
        console.log(error)
        res.status(400).json({error})
       }
    
})

router.post("/logout",(req,res)=>{
    res.cookie('jwtcookie','',{maxAge:1})
})

router.get("/",(req,res)=>{
    res.status(200).send("Login Get route")
})

module.exports=router