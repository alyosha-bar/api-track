const express = require("express");
const router = express.Router();

// require Auth controller
const ApiController = require('./apis.controller')

// routes & methods


// CRUD for API
// Register API

// Delete API

// Update Token

// Update API Information

// Fetch Analytics DATA --> QuestDB and NeonDB
router.get("/analytics/:apiID", ApiController.GetAnalytics)


module.exports = router;

