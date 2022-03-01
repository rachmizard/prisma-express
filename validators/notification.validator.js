const { object, string, number, optional, boolean } = require("superstruct");

const CreateNotification = object({
  content: string(),
  authorId: number(),
  metaData: object({
    type: optional(string()),
    userId: optional(number()),
    user: optional(string()),
  }),
});

const MarkAsRead = object({
  isRead: boolean(),
});

module.exports = {
  CreateNotification,
  MarkAsRead,
};
