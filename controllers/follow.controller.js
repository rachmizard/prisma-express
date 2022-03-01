const { catchAsync } = require("../lib");
const { FollowService, NotificationService } = require("../services");

const followService = new FollowService();
const notificationService = new NotificationService();

const followByUserId = catchAsync(async (req, res) => {
  const targetUserId = req.params.id;
  const userId = req.user.userId;

  const followed = await followService.followById(userId, targetUserId);

  await notificationService.pushNotification({
    content: "started following you",
    authorId: Number(targetUserId),
    metaData: {
      type: "follow",
      userId: Number(userId),
      user: followed.following.name,
    },
  });

  res.send(followed);
});

const unfollowByUserId = catchAsync(async (req, res) => {
  const targetUserId = req.params.id;
  const userId = req.user.userId;

  const unfollowed = await followService.unfollowById(userId, targetUserId);

  res.send(unfollowed);
});

module.exports = {
  followByUserId,
  unfollowByUserId,
};
