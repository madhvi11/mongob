const express=require('express');
const routes=express.Router();
const admincontroller=require("../controllers/admincontroller");
const Student = require('../models/Student');

routes.get("/",admincontroller.adddetails);

routes.get("/view_details",admincontroller.view_details);

routes.post("/addstudent",Student.uploadImage,admincontroller.addstudent)

routes.get("/deleteStudentdata/:id",admincontroller.deleteStudentdata)

routes.get("/updateStudentdata/:id",admincontroller.updateStudentdata)

routes.post("/updatestudent", Student.uploadImage ,admincontroller.updatestudent)

module.exports=routes;
