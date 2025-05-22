const { Router } = require("express");
const User = require("../models/user")
const router = Router()
router.get('/signup',async (req ,res)=>{
    return res.status(200).render('signup')
})
router.get('/login',async (req ,res)=>{
    return res.status(200).render('login')
})
router.post('/signup',async (req ,res)=>{
    const {fullName,email,password} =req.body;
    const result = User.create({
        fullName,
        email,
        password
    })
    return res.redirect('/')
})
router.post('/signin',async (req ,res)=>{
    const {email,password} = req.body;
    try {
        const token = await User.matchPasswordAndGenerateToken(email, password);
    
        return res.status(200).cookie("token", token).redirect("/");
      } catch (error) {
        return res.status(401).render("login", {
          error: "Incorrect Email or Password",
        });
      }
})
router.get('/logout',(req,res)=>{
    res.clearCookie("token").redirect("/");
})


module.exports=router