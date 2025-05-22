const cookieParser = require('cookie-parser')
const express = require('express')
const mongoose = require('mongoose')
const path =require('path')
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const {
     checkForAuthenticationCookie,
   } = require("./middlewares/authentication");

   const userRouter =require("./routes/user")
   const blogRouter =require("./routes/blog")
   const Blog =require("./models/blog")
const app = express()
const port =9000;
const swaggerDocument = YAML.load(path.join(__dirname, 'swagger.yaml'));
mongoose.connect("mongodb://localhost:27017/blogs").then(()=>console.log('mongodb connected')).catch(()=>console.log('mongodb not connected'))

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.static(path.join(__dirname, 'public')));
//middelwares
app.use(express.urlencoded({extended:false}))
app.use(cookieParser());
app.use(express.json())


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
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