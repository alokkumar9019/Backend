const express=require("express");
const app=express();

app.use(express.json());


let books=[];
let idCounter=1;

app.post("/books",(req,res)=>{
    const {title,author,years}=req.body;


    if(!title || !author|| years===undefined || years===null){
        return res.status(400).json({message:"Title, author  and years are required"});
    }

    const newBook={id: idCounter++,title,author,years};
    books.push(newBook);
    res.status(201).json(newBook);
})

app.get("/books",(req,res)=>{
    res.json(books);
})

app.get("/books/:id",(req,res)=>{
    const book=books.find(b=>b.id===parseInt(req.params.id));
    if(!book) return res.status(404).json({message:"Book not found"});
    res.json(book);
})

app.put("/books/:id",(req,res)=>{
    const {title,author}=req.body;
    const book=books.find(b=>b.id=== parseInt(req.params.id));

    if(!book) return res.status(404).json({message:"Book not found"});
    
    if(title) book.title=title;
    if(author) book.author=author;
    res.json(book)
})


app.delete("/books/:id",(req,res)=>{
    const bookIndex=books.findIndex(b=>b.id===parseInt(req.params.id));
    if(bookIndex===-1) return res.status(404).json({message:"Book not found"});

    const deleteBook=books.splice(bookIndex,1);
    res.json(deleteBook[0])
})

app.get("/books/search",(req,res)=>{
    const {author,title}=req.query;

    if(!author && !title){
        return res.status(400).json({message:"Author or title query parameter required"});
    }

    const filterBooks=books.filter(book=>{
        return(
            (author && book.author.toLowerCase().includes(author.toLowerCase())) ||
            (title && book.title.toLowerCase().includes(title.toLowerCase()))
        );
    });

    if(filterBooks.length===0){
        return res.status(404).json({message:"No books found"});
    }

    res.json(filterBooks);
})

app.use((req,res)=>{
    res.status(404).json({message:"404 Not Found"});
})

app.listen(8000,()=>{
    console.log("Server running at 8000...")
})