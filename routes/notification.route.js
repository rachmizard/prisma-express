const router = require("express").Router();

const { notificationController } = require("../controllers");
const { requestValidator } = require("../lib");
const { notificationValidator } = require("../validators");

router
  .route("/")
  .get(notificationController.getNotifications)
  .post(
    requestValidator(notificationValidator.CreateNotification),
    notificationController.storeNotification
  );

router.put("/mark-all-as-read", notificationController.markAllAsRead);
router.put(
  "/:id/mark-as-read",
  requestValidator(notificationValidator.MarkAsRead),
  notificationController.markAsRead
);

router.delete("/delete-all", notificationController.deleteAllNotification);
router.delete("/:id/delete", notificationController.deleteNotificationById);

module.exports = router;
