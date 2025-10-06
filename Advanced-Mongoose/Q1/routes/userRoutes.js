const express=require("express");
const router=express.Router();
const userController=require("../controllers/userController");
const User = require("../model/User");

router.post("/users",userController.createUser);
router.post("/users/:userId/address",userController.addAddress);
router.get("/users/summary",userController.getSummary);
router.get("/users/:userId",userController.getUserWithAddresses);

module.exports=router;