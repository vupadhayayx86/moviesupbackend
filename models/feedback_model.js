const mongoose=require('mongoose')
const Joi=require('joi')

const FeedbackSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        minlength:3,
        maxlength:30
    },
    subject:{
        type:String,
        required:true,
        minlength:10,
        maxlength:50
    },
    feedback:{
        type:String,
        required:true,
        minlength:5,
        maxlength:400
    }
},{timestamps:true})

function feedbackValidator(feedback){
    const feedbackValidateRes= Joi.object({
         username:Joi.string().min(3).max(30).required(),
         subject:Joi.string().min(10).max(30).required(),
         feedback:Joi.string().min(5).max(400).required()
     })
 
     return feedbackValidateRes.validate(feedback)
 }

 const feedback=mongoose.model('feedback',FeedbackSchema)

 exports.feedbacks=feedback
 exports.feedbackValidator=feedbackValidator

