const router = require("express").Router();

const { requestValidator } = require("../lib");
const { authController } = require("../controllers");
const { authValidator } = require("../validators");
const { verifyAuth } = require("../middlewares");

router
  .get("/profile", verifyAuth, authController.getProfile)
  .post("/login", requestValidator(authValidator.Login), authController.login)
  .post(
    "/register",
    requestValidator(authValidator.Register),
    authController.register
  )
  .post("/logout", verifyAuth, authController.logout);

module.exports = router;
