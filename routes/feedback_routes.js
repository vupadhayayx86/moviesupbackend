const express=require('express')
const { feedbacks } = require('../models/feedback_model')
const router=express.Router()

router.post("/",async (req,res)=>{
    let {username,feedback}=req.body
    try{
        const feed=await feedbacks.create({username,feedback})
        res.status(200).send({feedback:feed._id})
    } catch(error){
        res.status(400).send(error)
    }
    
})

router.get("/",async (req,res)=>{
   const username=req.query.username
   const feedList=await feedbacks.find({username:username})
   const allFeedbacks=feedList.map((item)=>{
    return {feedback:item.feedback,createAt:item.createdAt}
   })
   res.status(200).send({allFeedbacks})
})

module.exports=router
