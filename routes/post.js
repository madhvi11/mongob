const express=require('express');
const routes=express.Router();
const postcontroller=require("../controllers/postcontroller");
const Post=require("../models/Post");

routes.get("/",postcontroller.adddetails);
routes.post("/addpost",Post.uploadimage,postcontroller.addpost);
routes.get("/view_post",postcontroller.view_post);
routes.get("/deletepost/:postId",postcontroller.deletepost)


module.exports=routes;