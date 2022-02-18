const router = require("express").Router();

const { userController } = require("../controllers");
const { requestValidator } = require("../lib");
const { userValidator } = require("../validators");

router
  .route("/")
  .get(userController.getUsers)
  .post(requestValidator(userValidator.CreateUser), userController.storeUser);

router
  .route("/:id")
  .put(requestValidator(userValidator.UpdateUser), userController.updateUser);

module.exports = router;
