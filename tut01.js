const express = require('express');
const fs = require('fs');
const os = require('os');

let user = os.userInfo();
// console.log(user);
// console.log(user.username);



// fs.appendFile('greetings.txt',`\nHello ${user.username}`,()=>{console.log("File is created");})
// fs.appendFileSync('greetings.txt',`\nHello ${user.username}`,()=>{console.log("File is created");})



const notes = require('./notes');
const age = notes.age;
// console.log(age);
const addition = notes.addNumbers(age,10);
// console.log(addition);


const lodash = require('lodash');
let arr = ['aashu','wasay','nakeeb', 'aashu', 'nakeeb'];
let filter = lodash.uniq(arr);
// console.log(arr);
// console.log(filter);