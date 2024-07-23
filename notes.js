console.log("This is a file we need to import");

const age = 20;
module.exports = {
    age,
    addNumbers
}

function addNumbers(a,b){
    return a+b;
}