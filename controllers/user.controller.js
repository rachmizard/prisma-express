const catchAsync = require("../lib/catchAsync");
const UserService = require("../services/user.service");

const userService = new UserService();

const getUsers = catchAsync(async (req, res) => {
  const data = await userService.getUsers({});
  res.send({ data });
});

const storeUser = catchAsync(async (req, res) => {
  const user = await userService.storeUser(req.body);
  res.send({ user });
});

const updateUser = catchAsync(async (req, res) => {
  const updatedUser = await userService.updateUser(req.params.id, req.body);
  res.send(updatedUser);
});

module.exports = {
  getUsers,
  storeUser,
  updateUser,
};
