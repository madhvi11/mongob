const mongoose=require('mongoose');

const imagePath ="/uploads";

const multer=require('multer')

const path=require('path');

const studentSchema=mongoose.Schema({
    name :{
        type : String,
        required : true
    },
    age :{
        type : Number,
        required : true
    },
    gender :{
        type : String,
        required : true
    },
    hobby :{
        type : Array,
        required : true
    },
    city :{
        type : String,
        required : true
    },
    message :{
        type : String,
        required : true
    },
    adminImage : {
        type : String,
        required : true
    }
})



const imagestorage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,path.join(__dirname,"..",imagePath))
    },
    filename : function(req,file,cb){
        cb(null,file.fieldname+"-"+Date.now())
    }
})

studentSchema.statics.imagemodelpath=imagePath;
studentSchema.statics.uploadImage=multer({storage :imagestorage }).single("adminImage");

const Student=mongoose.model('Student',studentSchema);

module.exports=Student;