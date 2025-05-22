const {Schema,model} =require('mongoose')

const blogSchema = new Schema({
    title :{
        type :String,
        required :true,
    },
    blogImageUrl :{
        type :String,
        required:true,
    },
    body:{
        type :String,
        required:true,
    },
    font:{
        type :String,
        required:true,
    },
    createdById:{
        type :Schema.Types.ObjectId,
        ref: "user",
    },
},{timestamp:true})

const Blog = model("blog", blogSchema);

module.exports = Blog;
