const express=require("express");
const app=express();
const {data} =require("./module/read");
const {sysInfo} =require("./module/systemInfo");
const {getIP} = require("./module/FindDNS");
app.get("/test",(req,res)=>{
    res.send("Test route is working!");
})

app.get("/readfile",async (req,res)=>{
    try{
        const fileContent=await data();
        res.send(fileContent);
    }catch(error){
        res.status(500).send("Failed to read file")
    }
})

app.get("/systemdetails",(req,res)=>{
    res.send(sysInfo());
})

app.get("/getip",async (req,res)=>{
    try{
        const ip=await getIP();
        res.send(`IP address of masaischool.com is :${ip}`)
    }catch{
        res.status(500).send("Failed to resolve IP.")
    }
})

app.listen(8080,()=>{
    console.log("Server is Running on PORT 8080");
})
