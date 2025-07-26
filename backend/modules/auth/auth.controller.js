// import Auth Service
const { generateToken } = require('../../util/token');
const AuthService = require('./auth.service')

// controller functions
const SyncUser = async (req, res, next) => {
  try {
    console.log("Syncing user");
    const clerkUser = req.body;

    // generate token
    const token = generateToken()

    await AuthService.InsertUser(clerkUser, token);

    res.status(200).json({ message: "Synced User." });
  } catch (err) {
    console.error("Failed to sync user:", err);
    res.status(500).json({ error: "Failed to sync user." });
  }
};



module.exports = {
    SyncUser
}