const { filterQueryGenerator } = require("../lib");
const catchAsync = require("../lib/catchAsync");
const UserService = require("../services/user.service");

const userService = new UserService();

const getUsers = catchAsync(async (req, res) => {
  const filter = filterQueryGenerator.queryGeneratorJson(req.query.filter);
  const orderBy = filterQueryGenerator.generateOrderBy(req.query.orderBy);
  const paginate = {
    skip: parseInt(req.query.page) - 1 || 0,
    take: parseInt(req.query.limit) || 10,
  };

  const data = await userService.getUsers(filter, orderBy, paginate);
  res.send({ data });
});

const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUser(req.params.id);

  res.send(user);
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
  getUser,
  storeUser,
  updateUser,
};
