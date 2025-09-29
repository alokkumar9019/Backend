function delay(message,millisecond){
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(message);
        },millisecond)
    })
}

module.exports={delay};