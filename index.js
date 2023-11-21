const express=require('express');
const port=8002;
const path=require('path');
const fs=require('fs');
const app=express();


// const db=require("./config/mongoose");
const mongoose=require('mongoose');

mongoose.connect("mongodb+srv://mdhvkanani:madhviK123@cluster0.xsr7zkg.mongodb.net/node-madhvi", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log("MongoDB Connected…")
  })
  .catch(err => console.log(err));
  
const Student = require('./models/Student');
const { unlinkSync } = require('fs');

app.use(express.urlencoded());
app.use("/uploads",express.static(path.join(__dirname,"uploads")));

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use("/",require("./routes"))
app.use("/post",require("./routes/post"))

app.listen(port,function(err){
    if(err)
    {
        console.log("something is wrong");

    }
    console.log("connected successfully",port);
})