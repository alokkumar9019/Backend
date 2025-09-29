const path=require("path");

const filePath=path.join(__dirname,"../sampleFile/Data.txt");

function getFileInfo(){
    return{
        fileName:path.basename(filePath),
        fileExtension:path.extname(filePath),
        directoryName:path.dirname(filePath)
    };
}

module.exports={getFileInfo}