const router = require("express").Router();

const { postController } = require("../controllers");
const { requestValidator } = require("../lib");
const { postValidator } = require("../validators");

router
  .route("/")
  .get(postController.getPosts)
  .post(requestValidator(postValidator.CreatePost), postController.storePost);

module.exports = router;
