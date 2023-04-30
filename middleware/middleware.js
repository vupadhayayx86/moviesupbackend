const jwt=require('jsonwebtoken');

const requireAuth= (req,res,next)=>{
    const token=req.cookies.jwtcookie;
    console.log(token + "Require Auth")
    if(token){
        jwt.verify(token,"yoyohoneysingh",(err,decodedToken)=>{
            if(err){
                console.log(err.message)
                res.redirect("http://localhost:5000/login")
            } else {
                console.log(decodedToken)
                next()
            }
        })
    } else {
        res.redirect("http://localhost:5000/login")
    }
}

// const checkUser=(req,res,next)=>{
//     const token=req.cookies.jwtcookie
//     if(token){
//         jwt.verify(token,"secretmessagetext",async (err,decodedToken)=>{
//             if(err){
//                 res.locals.user=null
//                 next()
//             } else {
                
//                 let user=await Users.findById(decodedToken.id)
//                 console.log(user)
//                 res.locals.user=user
//                 next()
//             }
//         })
       
//     } else {
//     res.locals.user=null
//     next()
//     }
    
// }

module.exports={requireAuth}