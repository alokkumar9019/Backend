const Task=require("../models/task.model");

exports.createTask=async (req,res)=>{
    try{
        const task=await Task.create(req.body);
        res.status(201).json(task);
    }catch (err){
        res.status(400).json({error:err.message})
    }
};

exports.getTasks=async(req,res)=>{
    try{
        const filter={};
        if(req.query.priority) filter.priority=req.query.priority;
        if(req.query.status ==="completed") filter.isCompleted=true;
        if(req.query.status ==="pending") filter.isCompleted=false;

        const tasks=await Task.find(filter);
        res.json(tasks);
    }catch(err){
        res.status(500).json({error:err.message});
    }
}

exports.updateTask=async (req,res)=>{
    try{
        const updates=req.body;
        if(updates.isCompleted===true){
            updates.completionDate=new Date();
        }
        const task=await Task.findByIdAndUpdate(req.params.id,updates,{new:true});
        if(!task) return res.status(404).json({error:"Task not found"});

        res.json(task);
    }catch(err){
        res.status(400).json({error:err.message});
    }
}

exports.deleteTasksByPriority=async(req,res)=>{
    try{
        const {priority}=req.query;

        if(!priority) return res.status(400).json({error:"Priority query param requied"});

        const result=await Task.deleteMany({priority});
        res.json({deleted:result.deletedCount});
    }catch(err){
        res.status(500).json({error:err.message});
    }
}