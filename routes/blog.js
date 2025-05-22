const { Router } = require("express");
const User = require("../models/blog")
const multer = require("multer");
const path = require("path");

const Blog = require("../models/blog");
const router = Router()

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(`./public/uploads/`));
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

router.get('/addblog',async (req ,res)=>{
    return res.render("addBlog",{
        user:req.user,
      })
})
router.get("/:id", async (req, res) => {
  const blog = await Blog.findById(req.params.id).populate("createdById");
  // const comments = await Comment.find({ blogId: req.params.id }).populate(
  //   "createdBy"
  // );

  return res.render("blog", {
    user: req.user,
    blog,
    // comments,
  });
});
router.post("/", upload.single("coverImage"), async (req, res) => {
  const { title, body ,font} = req.body;
  const blog = await Blog.create({
    body,
    title,
    font,
    createdBy: req.user._id,
    blogImageUrl: `/uploads/${req.file.filename}`,
  });
  return res.redirect(`/blogs/${blog._id}`);
});

module.exports=router;