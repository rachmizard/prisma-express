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
  .get(postController.getPostDetail)
  .post(
    requestValidator(postValidator.CreateComment),
    postController.postComment
  )
  .put(requestValidator(postValidator.UpdatePost), postController.updatePost)
  .delete(postController.deletePost);

router
  .route("/:id/comments")
  .get(postController.getPostCommentDetail)
  .post(
    requestValidator(postValidator.CreateComment),
    postController.postCommentId
  )
  .delete(postController.deletePostComment);

module.exports = router;
