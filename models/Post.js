const mongoose=require('mongoose');
const multer=require('multer');
const imagepath="/uploads/post_image";
const path=require('path');

const postSchema=mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    content : {
        type : String,
        required : true
    },
    postImage : {
        type : String,
        required : true
    }
})

const imagestorage=multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,path.join(__dirname,"..",imagepath))
    },
    filename : function(req,file,cb){
        cb(null,file.fieldname+"-"+Date.now())
    }
})

postSchema.statics.imagemodelpath=imagepath;
postSchema.statics.uploadimage=multer({storage : imagestorage}).single('postImage');

const Post =mongoose.model('post',postSchema);
module.exports=Post;