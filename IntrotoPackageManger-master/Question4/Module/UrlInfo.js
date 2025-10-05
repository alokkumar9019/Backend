const {URL}=require("url");

function parseURL(){
    const fullURL="https://expressjs.com/en/guide/using-middleware.html";

    const urlObj=new URL(fullURL);

    const queryParams={};
    for(const [key,value] of urlObj.searchParams.entries()){
        queryParams[key]=value;
    }

    return{
        hostname:urlObj.hostname,
        pathname:urlObj.pathname,
        queryParams:queryParams
    }
}

module.exports={parseURL}