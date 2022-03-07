const router = require("express").Router();

const { followController } = require("../controllers");

router.route("/").get(followController.getFollows);

router
  .route("/:id")
  .post(followController.followByUserId)
  .delete(followController.unfollowByUserId);

module.exports = router;
