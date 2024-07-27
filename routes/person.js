const express = require("express");
const router = express.Router();
const person = require('../models/person');

// JWT Token Authorization
const {jwtAuthMiddleware, generateJWT} = require('./../tut06JWT');

router.post("/", async (req, res) => {
  try {
    const data = req.body; //Data is saved to req.body by body-parser
    const newPerson = new person(data);

    const response = await newPerson.save();
    console.log("Data saved successfully", response);
    res.status(200).send("Data saved successfully");

    // CONVENTION NO LONGER USED

    // newPerson.name = data.name;
    // newPerson.mobile = data.mobile;
    // newPerson.work = data.work;
    // newPerson.email = data.email;
    // newPerson.salary = data.salary;
    // newPerson.age = data.age;
    // newPerson.address = data.address;

    // newPerson.save((error, person) => {
    //   if (error) {
    //     console.log("Error Saving Person Data, ", error);
    //     res.status(500).send("An error occured");
    //   } else {
    //     console.log("Data Saved Successfully!");
    //     res.status(200).send("Data saved");
    //   }
    // });
  } catch (err) {
    console.log("Error Occured", err);
    res.status(404).send("Error Occured", err);
  }
});
router.post("/signup", async (req, res) => {
  try {
    const data = req.body; //Data is saved to req.body by body-parser
    const newPerson = new person(data);

    const response = await newPerson.save();
    const payload = {
      id: response.id,
      username: response.username,
      email: response.email
    };
    const token = generateJWT(payload);
    console.log({response: response, token:token});
    res.status(200).json({response: response, token:token});

    // CONVENTION NO LONGER USED

    // newPerson.name = data.name;
    // newPerson.mobile = data.mobile;
    // newPerson.work = data.work;
    // newPerson.email = data.email;
    // newPerson.salary = data.salary;
    // newPerson.age = data.age;
    // newPerson.address = data.address;

    // newPerson.save((error, person) => {
    //   if (error) {
    //     console.log("Error Saving Person Data, ", error);
    //     res.status(500).send("An error occured");
    //   } else {
    //     console.log("Data Saved Successfully!");
    //     res.status(200).send("Data saved");
    //   }
    // });
  } catch (err) {
    console.log("Error Occured", err);
    res.status(404).send("Error Occured", err);
  }
});
router.post("/login", async(req,res) => {
  try {
    // Extract username and password
    const {username,password} = req.body;
    // Find user in the database
    const user = await person.findOne({username:username});
    if(!user || !(await user.comparePass(password))){
      console.log("Username or password is wrong.");
      return res.status(401).json("Username or password is wrong.");
    }

    // If user is present in db
    const payload = {
      id: user.id,
      username: user.username,
      email: user.email
    };
    const token = generateJWT(payload);
    res.json(token);
  } catch (error) {
      console.log(error);
      res.status(500).json("Internal server error", error); 
  }
});
router.get("/",jwtAuthMiddleware, async (req, res) => {
  try {
    const data = await person.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send("Error occured");
  }
});
router.get("/profile", jwtAuthMiddleware, async(req,res) =>{
    try {
      const userData = req.userPayload;
      console.log(userData);
      const user = await person.findById(userData.id);
      console.log(user);
      res.status(200).json({user});
    } catch (error) {
      res.status(500).send("Error occured");
    }
});
router.get("/:workType", async (req, res) => {
  try {
    const workType = req.params.workType;
    if (workType == "chef" || workType == "manager" || workType == "owner") {
      const response = await person.find({ work: workType });
      console.log("Response fetched");
      res.status(200).send(response);
    } else {
      res.status(404).send("Invalid Work Type");
    }
  } catch (err) {
    res.status(500).send("Error occured");
  }
});
router.put("/:id",async(req,res)=>{
  try{
    const id = req.params.id;
    const updatedData = req.body;
    const response = await person.findByIdAndUpdate(id,updatedData,{
      new:true,
      runValidators:true
    });
    if(!response){
      res.status(404).send("Person Not Found");
    }
    console.log("Data updated");
    res.status(200).send(response);
  }catch(err){
    res.status(500).send("Error occured");
  }
});
router.delete("/:id",async(req,res)=>{
  try{
    const id = req.params.id;
    const response = await person.findByIdAndDelete(id);
    if(!response){
      res.status(404).send("Person Not Found");
    }
    console.log("Data Deleted");
    res.status(200).send("Data Deleted");
  }catch(err){
    res.status(500).send("Error occured");
  }
});

module.exports = router;
