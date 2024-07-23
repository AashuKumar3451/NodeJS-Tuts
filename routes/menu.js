const express = require("express");
const router = express.Router();
const menuItem = require("../models/menu");

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenuItem = new menuItem(data);
    const response = await newMenuItem.save();
    console.log("Data saved successfully!", response);
    res.status(200).send("Data saved.");
  } catch (err) {
    console.log("Error Occured", err);
    res.status(500).send("Error Occured", err);
  }
});
router.get("/", async (req, res) => {
  try {
    const data = await menu.find();
    res.status(200).json(data);
  } catch (err) {
    res.status(500).send("Error occured");
  }
});
router.get("/:ingredients", async(req,res)=>{
  try{
    const ingredients = req.params.ingredients;
    if(ingredients=="chicken" || ingredients=="fish" || ingredients=="veg"){
      const response = await menuItem.find({ingredients:ingredients});
      console.log("Response fetched");
      res.status(200).send(response);
    }
    else
    {
      res.status(404).send("Invalid Work Type");
    }

  }catch(err){
    res.status(500).send("Error occured");
  }
});

module.exports = router;