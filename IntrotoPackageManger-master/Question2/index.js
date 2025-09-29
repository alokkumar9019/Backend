const express=require("express");

const app=express();

app.get("/home",(req,res)=>{
    res.send("This is Homepage")
})

app.get("/contactus",(req,res)=>{
    res.send("contact us at contact@hello.com")
})

app.listen(3000,()=>{
    console.log("server is running on port 3000");
})