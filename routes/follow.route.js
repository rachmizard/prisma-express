const router = require("express").Router();

const { requestValidator } = require("../lib");
const { followController } = require("../controllers");
const { followValidator } = require("../validators");

router
  .route("/:id")
  .post(
    requestValidator(followValidator.Follow),
    followController.followByUserId
  )
  .delete(
    requestValidator(followValidator.Unfollow),
    followController.unfollowByUserId
  );

module.exports = router;
