const jwt = require("jsonwebtoken");


module.exports = {
  validateRegistrationDetails: (req, res, next) => {
    //transfer to client, including repeat password field
    const { email, password } = req.body;
    const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
    if (!email || !emailPattern.test(email)) {
      return res.status(400).send("Invalid email");
    }
    // password min 6 chars
    if (!password || password.length < 6) {
      return res.status(400).send("Please enter a password with min. 6 chars");
    }
    next();
  },
  validateToken: (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, "SECRETKEY");
      req.userData = decoded;
      next();
    } catch (err) {
      return res.status(401).send( "Your session is not valid!");
    }
  }
};
