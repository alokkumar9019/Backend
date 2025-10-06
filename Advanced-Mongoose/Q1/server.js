const express = require("express");
const mongoose=require("mongoose");
const userRoutes=require("./routes/userRoutes");

const app=express();

app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/user-address-db",{
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>console.log("MongoDB connected"))
.catch(err=> console.log(err));

app.use("/api",userRoutes);

app.listen(8080,()=>{
    console.log("Server Running on port 8080");
})