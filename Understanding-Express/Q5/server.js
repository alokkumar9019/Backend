const express=require("express");
const app=express();

app.use(express.json());

let students=[];
let idCounter=1;


app.post("/students",(req,res)=>{
    const {name,batch,course}=req.body;
    if(!name || !batch || !course){
        return res.status(400).json({message:"name, batch and course are not found"});
    }
    const newStudent={id: idCounter++,name,course,batch};
    students.push(newStudent);
    res.status(201).json(newStudent);
})

app.get("/students",(req,res)=>{
    res.json(students)
})

app.get("/students/:id",(req,res)=>{
    const student=students.find(s=>s.id === parseInt(req.params.id));
    if(!student) return res.status(404).json({message:"Student not Found"});
    res.json(student);
})

app.put("/sudents/:id",(req,res)=>{
    const {name,course,batch}=res.body;
    const student=students.find(s=>s.id===parseInt(req.params.id));
    if(!student) return res.status(404).json({message:"Student not Found"});

    if(name) student.name=name;
    if(course) student.course=course;
    if(batch) student.batch=batch;

    res.json(student);
})

app.delete("/students/:id",(req,res)=>{
    const index=students.findIndex(s=>s.id===parseInt(req.params.id));
    if(index===-1)
        return res.status(404).json({message:"Student not Found"});

    const deleted=students.splice(index,1);
    res.json(deleted[0]);
})

app.get("/student/search",(req,res)=>{
    const {course}=req.query;

    if(!course){
        return res.status(400).json({message:"Course query is required"})
    }

    const filtered=students.filter(s=>
        s.course.toLowerCase().includes(course.toLowerCase())
    );

    if(filtered.length===0){
        return res.status(404).json({message:"No students Found"});
    }

    res.json(filtered);
    
})

app.use((req,res)=>{
    res.status(404).json({message:"404 Not Found"});
});

app.listen(8080,()=>{
    console.log("Server running on 8080 Ports...")
})