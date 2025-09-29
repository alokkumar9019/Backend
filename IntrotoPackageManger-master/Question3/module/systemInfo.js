const os=require("os");
const osType=os.type();

//Total Memory
const totalMemory=os.totalmem();
const totalMemoryInGB=(totalMemory/(1024**3)).toFixed(2);

//Free Memory
const freeMemory=os.freemem()
const freeMemoryGB=(freeMemory/(1024**3)).toFixed(2);

//CPU Model
const cpus=os.cpus();
const CPUModel=cpus[0].model;

function sysInfo(){
    return{
        osType,
        totalMemoryInGB,
        freeMemoryGB,
        CPUModel,

    }
}

module.exports={sysInfo};

// System Platform (e.g., Windows, Linux, macOS)
// Total Memory (in GB)
// Free Memory (in GB)
// CPU Model