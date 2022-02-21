const jwt = require("jsonwebtoken");
const { prisma } = require("../lib");

const verifyAuth = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).send({
      message: "Access denied. No token provided.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_TOKEN_KEY);

    const findToken = await prisma.token.findUnique({
      where: {
        token,
      },
    });

    if (!findToken) {
      return res.status(401).send({
        message:
          "Invalid token or token was expired/empty, please login again.",
      });
    }

    req.user = decoded;

    next();
  } catch (err) {
    return res.status(401).send({
      message: "Invalid token.",
    });
  }
};

module.exports = verifyAuth;
