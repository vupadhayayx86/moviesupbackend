const expreess=require('express')
const cors=require('cors')
const { default: mongoose } = require('mongoose')
const app =expreess()
const user_routes=require("./routes/user_routes")
const login_routes=require("./routes/login_routes")
const feedback_routes=require("./routes/feedback_routes")
const cookieParser=require('cookie-parser')
const {requireAuth} =require("./middleware/middleware")

app.use(cookieParser())
app.use(cors({ origin: 'http://localhost:5173', credentials: true, exposedHeaders: ['Set-Cookie', 'Date', 'ETag'] }))
app.use(expreess.json())
app.use(function(req, res, next) {
    res.header('Content-Type', 'application/json;charset=UTF-8')
    res.header('Access-Control-Allow-Credentials', true)
    res.header(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
  })
app.use("/users",user_routes)
app.use("/login",login_routes)
app.use("/feedback",requireAuth,feedback_routes)


mongoose.connect("mongodb+srv://testuser:testuser123@cluster0.ynlelsn.mongodb.net/feedback-data")
    .then(()=>{app.listen(5000,()=>console.log("MongoDB connection Successfull & Server started on port 5000...."))})
    .catch((error)=>console.log("Server start failed ",error))
