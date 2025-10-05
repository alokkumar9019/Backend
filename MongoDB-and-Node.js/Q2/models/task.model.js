const mongoose=require("mongoose");
const taskSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true,
        trim:true
    },
    description:{
        type: String,
        required:true,
        trim:true
    },
    priority:{
        type:String,
        enum:["low","medium","high"],
    },
    isCompleted:{
        type:Boolean,
        default:false,
    },
    completionDate:Date,
    dueDate:Date,
},{timestamps:true});

module.exports=mongoose.model("Task",taskSchema);