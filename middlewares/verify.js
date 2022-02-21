const jwt = require("jsonwebtoken");

const verifyAuth = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({
      message: "Access denied. No token provided.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN_KEY);
    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).send({
      message: "Invalid token.",
    });
  }
};

module.exports = verifyAuth;
