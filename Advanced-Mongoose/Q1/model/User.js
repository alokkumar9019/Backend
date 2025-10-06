const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    age:{
        type:Number,
        min:0
    },
    addresses:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Address"
    }]
});

module.exports=mongoose.model("User",userSchema);