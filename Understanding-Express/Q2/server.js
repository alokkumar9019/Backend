const express=require("express");
const app=express();

const user = {
  id: 1,
  name: "John Doe",
  email: "john@example.com"
};

const usersList = [
  { id: 1, name: "Alice", email: "alice@example.com" },
  { id: 2, name: "Bob", email: "bob@example.com" },
  { id: 3, name: "Charlie", email: "charlie@example.com" }
];

app.get("/users/get",(req,res)=>{
    res.send(user);
})

app.get("/users/list",(req,res)=>{
    res.send(usersList);
})

app.use((req,res)=>{
    res.status(404).json({error:"404 Not Found..."});
});

app.listen(3000,()=>{
    console.log("Server is Running on 3000...")
})