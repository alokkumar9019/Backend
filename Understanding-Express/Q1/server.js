const express=require("express");
const app=express();

app.get("/home",(req,res)=>{
    res.send("Welcome to HomePage");
})

app.get("/about-us",(req,res)=>{
    res.send({"message":"Welcome to AboutUs"})
})

app.get("/contact-us",(req,res)=>{
    res.send({"Name:":"Shaktiman"},{"place":"delhi"});
})

app.use((req,res,next)=>{
    res.status(404).json({
        error:"404 Not Found..."
    })
})

app.listen(8080,()=>{
    console.log("Server Running on 8080")
})