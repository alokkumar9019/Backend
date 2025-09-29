const EventEmitter=require("events");
const emitter=new EventEmitter();

emitter.on("log",(message)=>{
    const timestamp=new Date().toISOString();
    console.log(`[${timestamp}] ${message}`);

})

module.exports= emitter;