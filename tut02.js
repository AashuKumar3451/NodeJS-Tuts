// let obj = {
//     name:"Aashu",
//     age:20
// }
// let objString = '{"name":"Aashu", "Age":20}';
// let json = JSON.stringify(obj);
// console.log(json);
// let jsonString = JSON.parse(objString);
// console.log(jsonString);

const express = require('express');
const app = express();

app.get('/',(req,res)=>{
    res.send("Hello sir, how can I help you?");
});
app.get('/chicken',(req,res)=>{
    res.send("Sure sir, You order for chicken is placed");
});
app.get('/idli',(req,res)=>{
    res.send("Sure sir, You order for idli is placed");
});

app.listen(3000,()=>{
    console.log("Server is live on port:3000"); 
});