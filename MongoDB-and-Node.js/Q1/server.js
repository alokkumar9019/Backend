const express=require("express");
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const taskRoutes=require("./routes/taskRoutes");

dotenv.config();

const app=express();
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
})
.then(()=>console.log("Connected to MongoDB"))
.catch((err)=>console.log("MongoDB Connection error:",err));

//Routes
app.use("/api/tasks",taskRoutes);

app.use((req,res)=>{
    res.status(404).json({error:"Route not found"});
});

const PORT=process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
})