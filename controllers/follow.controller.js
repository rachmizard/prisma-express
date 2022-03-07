const { catchAsync, filterQueryGenerator } = require("../lib");
const { FollowService, NotificationService } = require("../services");

const followService = new FollowService();
const notificationService = new NotificationService();

const getFollows = catchAsync(async (req, res) => {
  const filter = filterQueryGenerator.queryGeneratorJson(req.query.filter);
  const orderBy = filterQueryGenerator.generateOrderBy(req.query.orderBy);
  const paginate = {
    skip: parseInt(req.query.page) || 1,
    take: parseInt(req.query.limit) || 10,
  };

  const follows = await followService.getFollows(filter, orderBy, paginate);
  res.status(200).json(follows);
});

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
  getFollows,
  followByUserId,
  unfollowByUserId,
};
