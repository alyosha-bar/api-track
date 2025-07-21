const { getAuth } = require("@clerk/express")

const getSessionClaims = (req, res, next) => {
  const { sessionClaims } = getAuth(req);

  if (!sessionClaims || !sessionClaims.userID) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  req.user = {
    id: sessionClaims.userID,
    fullName: sessionClaims.fullname,
  };

  next();
};

module.exports = { getSessionClaims };