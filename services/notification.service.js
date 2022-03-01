const { prisma, pagination } = require("../lib");

class NotificationService {
  constructor() {}

  async pushNotification(body) {
    try {
      const notification = await prisma.notification.create({
        data: body,
      });
      return notification;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async getNotifications(where, orderBy, { skip, take }) {
    try {
      const paginate = pagination("notification", {
        where,
        orderBy,
        skip,
        take,
        include: {
          author: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      return paginate;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async markAsRead(id, isRead) {
    try {
      const notification = await prisma.notification.update({
        where: { id: Number(id) },
        data: {
          isRead,
          readAt: new Date().toISOString(),
        },
      });
      return notification;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async markNotificationAsRead(userId) {
    try {
      const notification = await prisma.notification.updateMany({
        where: {
          userId,
          isRead: false,
        },
        data: {
          isRead: true,
        },
      });
      return notification;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteAllNotification(userId) {
    try {
      const notification = await prisma.notification.deleteMany({
        where: {
          userId,
        },
      });
      return notification;
    } catch (error) {
      throw new Error(error.message);
    }
  }

  async deleteNotificationById(id) {
    try {
      const notification = await prisma.notification.findUnique({
        where: {
          id: Number(id),
        },
      });
      return notification;
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

module.exports = NotificationService;
