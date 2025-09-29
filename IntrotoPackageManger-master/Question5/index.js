const express=require("express");
const app=express();
const logger=require("./Module/EventLogger");
const {delay} = require("./Module/delay");

app.get("/test",(req,res)=>{
    res.send("Test route is working");
})

app.get("/emit",(req,res)=>{
    const message=req.query.message;

    if(!message){
        return res.status(400).json({error:"Query param 'message' is required"});
    }
    
    logger.emit("log",message);

    res.json({status: "Logged",message});
})

app.get("/delay",async(req,res)=>{
    const message=req.query.message || "Default message";
    const time=parseInt(req.query.time) || 1000;

    try{
        const result=await delay(message, time);
        res.json({status:"Delayed",message:result});
    }catch(error){
        res.status(500).json({error:"Somethings went wrong"});
    }
})


app.listen(8000,()=>{
    console.log("Server is Running on 8000 Port");
})