const express = require("express");
const router = express.Router();

// require Auth controller
const ApiController = require('./apis.controller')

// routes & methods

// webhook endpoint for clerk
router.post("/test", ApiController.TestAPI)

module.exports = router;

