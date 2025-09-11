const express = require("express");
const router = express.Router();

// require Auth controller
const ApiController = require('./apis.controller')

// routes & methods


// CRUD for API
// Register API
router.post("/register", ApiController.RegisterAPI)

// GET ALL APIs
router.get("/all", ApiController.GetAPIs)

// Delete API
// --> Delete API from NeonDB & Associated QuestDB entries
router.delete("/delete/:apiID", ApiController.DeleteAPI)

// Update / Reset API Token

// Update / Reset User Token

// Update API Information
router.patch("/update/:apiID", ApiController.UpdateAPI)

// Fetch Analytics DATA --> QuestDB and NeonDB
router.get("/analytics/:apiID", ApiController.GetAnalytics)


module.exports = router;

