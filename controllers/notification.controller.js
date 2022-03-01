const { filterQueryGenerator } = require("../lib");
const catchAsync = require("../lib/catchAsync");
const { NotificationService } = require("../services");

const notificationService = new NotificationService();

const getNotifications = catchAsync(async (req, res) => {
  const filter = filterQueryGenerator.queryGeneratorJson(req.query.filter);
  const orderBy = filterQueryGenerator.generateOrderBy(req.query.orderBy);
  const paginate = {
    skip: parseInt(req.query.page) || 1,
    take: parseInt(req.query.limit) || 10,
  };

  const data = await notificationService.getNotifications(
    filter,
    orderBy,
    paginate
  );
  res.send(data);
});

const storeNotification = catchAsync(async (req, res) => {
  const data = await notificationService.pushNotification(req.body);
  res.send(data);
});

const markAsRead = catchAsync(async (req, res) => {
  const data = await notificationService.markAsRead(
    req.params.id,
    req.body.isRead
  );
  res.send(data);
});

const markAllAsRead = catchAsync(async (req, res) => {
  const data = await notificationService.markAllAsRead(req.user.id);
  res.send(data);
});

const deleteAllNotification = catchAsync(async (req, res) => {
  const data = await notificationService.deleteAllNotification(req.user.id);
  res.send(data);
});

const deleteNotificationById = catchAsync(async (req, res) => {
  const data = await notificationService.deleteNotificationById(req.params.id);
  res.send(data);
});

module.exports = {
  getNotifications,
  storeNotification,
  markAsRead,
  markAllAsRead,
  deleteAllNotification,
  deleteNotificationById,
};
