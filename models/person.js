const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    enum: ["chef", "manager", "owner"],
    required: true,
  },
  mobile: {
    type: String,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  address: {
    type: String,
  },
  salary: {
    type: Number,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

personSchema.pre("save", async function (next) {
    const person = this;
    // if anything other than password is changed we'll move from this function
    if(!person.isModified('password')) return next();
  try {
    // brcypting the password
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(person.password,salt);
    person.password = hashedPass;
    next();
  } catch (error) {
    return next(error);
  }
});

personSchema.methods.comparePass = async function(candidatePass){
    try {
        const isMatch = await bcrypt.compare(candidatePass,this.password);
        return isMatch;
    } catch (error) {
        throw error;
    }
} 

const Person = mongoose.model("Person", personSchema);
module.exports = Person;
