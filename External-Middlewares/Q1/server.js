const express=require("express");
const app=express();
const apiRoute=require("./routes/api");

app.use(express.json());

app.use('/api',apiRoute);

app.use((req,res)=>{
    res.status(404).json({error:"404 Not Found"});
})

app.listen(8080,()=>{
    console.log("Server running on 8080")
})