const express=require("express");
const app=express();
const fs=require("fs");


app.use(express.json());

const DB_file='./db.json';


function readDB(){
    return JSON.parse(fs.readFileSync(DB_file,"utf-8"));
}

function writeDB(data){
    fs.writeFileSync(DB_file,JSON.stringify(data,null,2));
}

app.post('/dishes',(req,res)=>{
   const {name,price,category}=req.body;
   if(!name || !price || !category){
    return res.status(400).json({message:"All filelds (name,price,category) are required"});

   }
   const dishes=readDB();
   const newDish={id:Date.now(),name,price,category};
    dishes.push(newDish);
    writeDB(dishes);
    res.status(201).json(newDish);
})

app.get("/dishes",(req,res)=>{
     const dishes=readDB();
     res.json(dishes);   
})

app.get('/dishes/:id',(req,res)=>{
    const dishes=readDB();
    const dish=dishes.find(d=>d.id==Number( req.params.id));
    if(dish) res.json(dish);
    else res.status(404).json({message:"Dish not found"});
})

app.put('/dishes/:id',(req,res)=>{
    const dishes=readDB();
    const index=dishes.findIndex(d=>d.id == Number(req.params.id));
    if(index===-1) return res.status(404).json({message:"Dish not found"});

    dishes[index]={...dishes[index],...req.body};
    writeDB(dishes);
    res.json(dishes[index]);
})

app.delete('/dishes/:id',(req,res)=>{
    const dishes=readDB();
    const filtered=dishes.filter(d=>d.id!=req.params.id);
    if(filtered.length===dishes.length)
            return res.status(404).json({message:"Dish not found"});

    writeDB(filtered);
    res.json({message:"Dish deleted"});
})

app.get("/dishes/get",(req,res)=>{
    const {name}=req.query;
    if(!name) return res.status(400).json({message:"Name query required"})

    const dishes=readDB();
    const matches=dishes.filter(d=> d.name.toLowerCase().includes(name.toLowerCase()));

    if(matches.length===0)
      return res.status(404).json({message:"No dishes found"});
    
    res.json(matches);
})

app.use((req,res)=>{
    res.status(404).json({error:"404 Not Found"});
})

app.listen(8080,()=>{
    console.log("Server is running on 8080...")
})