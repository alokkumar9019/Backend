const express=require("express");
const dotenv=require("dotenv");
const connectDB=require("./config/db");
const taskRoute=require("./routes/task.routes");

dotenv.config();
connectDB();

const app=express();
app.use(express.json());

app.use("/tasks",taskRoute);

app.use((req,res)=>{
    res.status(404).json({error:"Route not found"});
});

const PORT =process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(`server running at port ${PORT}`)
})