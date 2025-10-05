const express=require("express");
const router=express.Router();
const taskController=require("../controllers/task.controller");
const {validateTaskInput}=require("../middleware/task.middleware");

router.post("/",validateTaskInput,taskController.createTask);
router.get("/",taskController.getTasks);
router.patch("/:id",validateTaskInput,taskController.updateTask);
router.delete("/",taskController.deleteTasksByPriority);

module.exports=router;