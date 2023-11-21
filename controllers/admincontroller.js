const Student = require('../models/Student');
const path=require('path');
const fs=require('fs');
const { unlinkSync } = require('fs');


module.exports.adddetails = async(req,res)=>{
    return res.render('add_details');
}

module.exports.view_details = async(req,res)=>{
    let data= await Student.find({});
    console.log(data);
    return res.render('view_details',{
        stData : data
    })
}

module.exports.deleteStudentdata = async(req,res)=>{
        let olddata=await Student.findById(req.params.id);
        if(olddata.adminImage){
            let full=path.join(__dirname,"..",olddata.adminImage);
            await fs.unlinkSync(full);
        }
        await Student.findByIdAndDelete(req.params.id);
        return res.redirect('back')
}

module.exports.updateStudentdata = async(req,res)=>{
    let record=await Student.findById(req.params.id);
    return res.render('update_details',{
        oldStudent : record
    })
}

module.exports.updatestudent = async(req,res)=>{
    if(req.file)
    {
        let oldData= await Student.findById(req.body.EditId);
        if(oldData.adminImage){
            let full=path.join(__dirname,"..",oldData.adminImage);
            await fs.unlinkSync(full);
        }
        
        var imagepath='';
        imagepath = Student.imagemodelpath+"/"+req.file.filename;
        req.body.adminImage = imagepath;
    
    await Student.findByIdAndUpdate(req.body.EditId,req.body)
    return res.redirect('/view_details')

    }
    else
    {
        let oldimage= await Student.findById(req.body.EditId);
        req.body.adminImage=oldimage.adminImage;
        await Student.findByIdAndUpdate(req.body.EditId,req.body)
        return res.redirect('/view_details')
    }
}

module.exports.addstudent = async(req,res)=>{
    var imagepath='';
    if(req.file){
        imagepath = Student.imagemodelpath+"/"+req.file.filename;
    }

    req.body.adminImage = imagepath;
    await Student.create(req.body);
    return res.redirect('back');
}