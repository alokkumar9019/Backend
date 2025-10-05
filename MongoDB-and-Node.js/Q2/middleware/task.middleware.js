module.exports.validateTaskInput=(req,res,next)=>{
    const {title,description,priority}=req.body;

    if(!title || !description || !priority){
        return res.status(400).json({error:"Incomplete Date Received"});
    }

    const allowedPriorities=["low","medium","high"];
    if(!allowedPriorities.includes(priority)){
        return res.status(400).json({error:"Priority must be low, medium or high"});
 
    }

    next();
}