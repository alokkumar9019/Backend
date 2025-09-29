const dns=require("dns").promises;

async function getIP(){
   try{
    const result=await dns.lookup("masaischool.com");
    return result.address;
   }catch (error){
    throw error;
   }
}

module.exports={getIP};