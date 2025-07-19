const express = require("express");
const router = express.Router();

// require Auth controller
const AuthController = require('./auth.controller')

// routes & methods
// webhook endpoint for clerk - user created
router.post("/signup", AuthController.SyncUser)

// webhookd endpoint for clerk - delete account
router.delete("/delete", )

module.exports = router;

