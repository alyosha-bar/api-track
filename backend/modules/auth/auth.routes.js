const express = require("express");
const router = express.Router();

// require Auth controller
const AuthController = require('./auth.controller')

// routes & methods

// webhook endpoint for clerk
router.post("/signup", AuthController.SyncUser)

module.exports = router;

