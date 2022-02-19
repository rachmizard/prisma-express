const { object, number } = require("superstruct");

const Follow = object({
  userId: number(),
});

const Unfollow = object({
  userId: number(),
});

module.exports = {
  Follow,
  Unfollow,
};
