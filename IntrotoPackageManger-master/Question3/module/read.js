// const { rejects } = require("assert");
const fs=require("fs");
// const { resolve } = require("path");

// fs.writeFile("./Data.txt","This is some sample text inside Data.txt",(err)=>{
//         if(err){
//             console.log("Error",err);
//         }else{
//             console.log("File Written Successfully")
//         }
//     });
function data(){
    return new Promise((res,rej)=>{
        fs.readFile("./Data.txt","utf-8",(err,result)=>{
            if(err){
                rej(err);
            }else{
                res(result);
            }
        });
    });
    
}
// data()
module.exports={data}