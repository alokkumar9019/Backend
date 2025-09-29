const express=require("express");
const {getFileInfo} =require("./Module/FileInfo");
const {parseURL}=require("./Module/UrlInfo");
const app=express();



app.get("/test",(req,res)=>{
    res.send("Test route is working");
})

app.get("/fileinfo",(req,res)=>{
    try{
        let fileInfo=getFileInfo();
        res.send(fileInfo);
    }catch (error){
        console.log(error)
    }
})

app.get("/parseurl",(req,res)=>{
    try{
        let urlPath=parseURL();
        res.send(urlPath)
    }catch(error){
        console.log(error);
    }
})


app.listen(8000,()=>{
    console.log("Server is running on port 8080");
})