const express=require('express');
const serverConfig=require('./configs/server.config');
const app=express();

app.listen(serverConfig.PORT,()=>{
    console.log(`Appliction started on the port no:${serverConfig.PORT}`);
})