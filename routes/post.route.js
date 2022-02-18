const router = require("express").Router();

const { postController } = require("../controllers");
const { requestValidator } = require("../lib");
const { postValidator } = require("../validators");

router
  .route("/")
  .get(postController.getPosts)
  .post(requestValidator(postValidator.CreatePost), postController.storePost);

router
  .route("/:id")
  .put(requestValidator(postValidator.UpdatePost), postController.updatePost)
  .delete(postController.deletePost);

module.exports = router;
