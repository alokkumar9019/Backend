const express=require("express");
const router=express.Router();
const Task=require("../models/Task");

router.post("/",async(req,res)=>{
     console.log("Received POST request:", req.body);
    try{
        const task=await Task.create(req.body);
        res.status(201).json(task);
    }catch(err){
         console.error("Error creating task:", err); 
        res.status(400).json({error:err.message});
    }
});

router.get("/",async (req,res)=>{
    try{
        const filter={};
        if(req.query.status) filter.status=req.query.status;
        if(req.query.dueDate) filter.dueDate={$lte: new Date(req.query.dueDate)};
        
        const tasks=await Task.find(filter);
        res.json(tasks);
    
    }catch(err){
        res.status(500).json({error:err.message});
    }
});

router.patch("/:id",async(req,res)=>{
    try{
        const task=await Task.findByIdAndUpdate(req.params.id,req.body,{new:true});
        if(!task) return res.status(404).json({error:"Task not found"});
        res.json(task);
    }catch(err){
        res.status(400).json({error:err.message});
    }
});

router.delete("/:id",async (req,res)=>{
    try{
        const task=await Task.findByIdAndDelete(req.params.id);
        if(!task) return res.status(404).json({error:"Task not found"});
        res.json({message:"Task deleted successfully"});
    }catch(err){
        res.status(500).json({error:err.message});
    }
})

module.exports=router;