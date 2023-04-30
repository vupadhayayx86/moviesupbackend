const mongoose=require('mongoose')
const Joi=require('joi')
const bcrypt=require('bcrypt')

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        minlength:3,
        maxlength:30
    },
    email:{
        type:String,
        required:true,
        minlength:6,
        maxlength:30,
        
    },
    password:{
        type:String,
        required:true,
        minlength:6,
        maxlength:1024
    },

},{timestamps:true})


function userValidator(users){
   const userValidateRes= Joi.object({
        username:Joi.string().min(3).max(30).required(),
        email:Joi.string().min(6).max(30).email().required(),
        password:Joi.string().min(6).max(30).required()
    })

    return userValidateRes.validate(users)
}

userSchema.pre('save',async function(next){
    const salt=await bcrypt.genSalt();
    this.password=await bcrypt.hash(this.password,salt)
    next();
})

userSchema.statics.login=async function(email,password){
    const user=await this.findOne({email})
    if(user){
        const auth=await bcrypt.compare(password,user.password)
        if(auth){
            return user
        }
        throw Error("Incorrect Password")
    }
    throw Error("Incorrect Email")
        
}

const users=mongoose.model("users",userSchema)

exports.users=users
exports.userValidator=userValidator