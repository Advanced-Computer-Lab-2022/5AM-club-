const express = require ("express");
const router = express.Router(); 
const {addAdmin,addInstructor,addTrainee} = require("../../controllers/AdminController");
router.post("/add-admin", addAdmin)

router.post("/add-instructor", addInstructor)

router.post("/add-corporate-trainee", addTrainee)

module.exports=router
