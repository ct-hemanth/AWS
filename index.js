const cookieParser = require('cookie-parser')
const express = require('express')
const mongoose = require('mongoose')
const path =require('path')
const {
     checkForAuthenticationCookie,
   } = require("./middlewares/authentication");

   const userRouter =require("./routes/user")
   const blogRouter =require("./routes/blog")
   const Blog =require("./models/blog")
const app = express()
const port = process.env.PORT || 9000;

mongoose.connect(process.env.MONGO_URI ||"mongodb+srv://saihemanth0808:Gandeev%4012@cluster0.z8autbn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(()=>console.log('mongodb connected')).catch(()=>console.log('mongodb not connected'))

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.static(path.join(__dirname, 'public')));
//middelwares
app.use(express.urlencoded({extended:false}))
app.use(cookieParser());

app.use(express.json())



app.use(checkForAuthenticationCookie("token"));

app.get("/", async (req,res,next)=>{
  const blogs = await Blog.find({})
  return res.render("home",{
    user:req.user,
    blogs
  })
})

app.use("/user",userRouter)
app.get("/profile",(req,res,next)=>{
  return res.render("profile",{
    user:req.user,
  })
})
app.use("/blogs",blogRouter)
app.listen(port,()=>console.log(`server started at port ${port}`))
