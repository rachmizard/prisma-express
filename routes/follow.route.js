const router = require("express").Router();

const { followController } = require("../controllers");

router
  .route("/:id")
  .post(followController.followByUserId)
  .delete(followController.unfollowByUserId);

module.exports = router;
