const { catchAsync } = require("../lib");
const { FollowService } = require("../services");

const followService = new FollowService();

const followByUserId = catchAsync(async (req, res) => {
  const targetUserId = req.params.id;
  const userId = req.body.userId;

  const followed = await followService.followById(userId, targetUserId);

  res.send(followed);
});

const unfollowByUserId = catchAsync(async (req, res) => {
  const targetUserId = req.params.id;
  const userId = req.body.userId;

  const unfollowed = await followService.unfollowById(userId, targetUserId);

  res.send(unfollowed);
});

module.exports = {
  followByUserId,
  unfollowByUserId,
};
