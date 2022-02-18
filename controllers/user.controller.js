const { filterQueryGenerator } = require("../lib");
const catchAsync = require("../lib/catchAsync");
const UserService = require("../services/user.service");

const userService = new UserService();

const getUsers = catchAsync(async (req, res) => {
  const filter = filterQueryGenerator.queryGenerator(req.query.filter);
  const orderBy = filterQueryGenerator.generateOrderBy(req.query.orderBy);

  const data = await userService.getUsers(filter, orderBy);
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
