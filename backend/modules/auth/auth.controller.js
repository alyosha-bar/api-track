// import Auth Service
const AuthService = require('./auth.service')

// controller functions
const SyncUser = async (req, res, next) => {
  try {
    console.log("Syncing user");
    const clerkUser = req.body;

    await AuthService.InsertUser(clerkUser);

    res.status(200).json({ message: "Synced User." });
  } catch (err) {
    console.error("Failed to sync user:", err);
    res.status(500).json({ error: "Failed to sync user." });
  }
};



module.exports = {
    SyncUser
}