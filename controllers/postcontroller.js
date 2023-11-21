const Post=require("../models/Post");
const path=require('path');
const fs=require('fs');

module.exports.adddetails = async(req,res)=>{
    return res.render("add_post")
}
module.exports.addpost =async(req,res)=>{
    console.log(req.file);
    console.log(req.body);
    var imagepath='';
    if(req.file){
        imagepath = Post.imagemodelpath+"/"+req.file.filename;
    }

    req.body.postImage = imagepath;
    await Post.create(req.body);
    return res.redirect('back');
}

module.exports.view_post = async (req,res)=>{

    let data= await Post.find({})
    console.log(data);
    return res.render("view_post",{
        stdata : data
    })
}

module.exports.deletepost=async(req,res)=>{
    // console.log(req.params.postId);
    try
    {
        let oldData = await Post.findById(req.params.postId);
        if(oldData)
        {
            var oldImage = oldData.postImage;
            if(oldImage){
                let fullpath = path.join(__dirname,"..",oldImage);
                let dImage = await fs.unlinkSync(fullpath);

                let deleteRecord = await Post.findByIdAndDelete(req.params.postId);
                if(deleteRecord){
                    console.log("record & Image deleted successfully");
                    return res.redirect('back');
                }
                else{
                    console.log("record deleted succesfully");
                    return res.redirect('back')
                }
            }
            else{

                let deleteRecord =  await Post.findByIdAndDelete(req.params.postId);
                if(deleteRecord){
                    console.log("record & Image deleted successfully");
                    return res.redirect('back');
                }
                else
                {
                    console.log("record not found");
                    return res.redirect('back')
                }
        }
       
    }
   
}
catch(err)
{
    console.log(err);
    return res.redirect('back')
}
}
