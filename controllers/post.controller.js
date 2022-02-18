const { filterQueryGenerator } = require("../lib");
const catchAsync = require("../lib/catchAsync");
const PostService = require("../services/post.service");

const postService = new PostService();

const getPosts = catchAsync(async (req, res) => {
  const filter = filterQueryGenerator.queryGenerator(req.query.filter);
  const orderBy = filterQueryGenerator.generateOrderBy(req.query.orderBy);

  const data = await postService.getPosts(filter, orderBy);
  res.send({ data });
});

const storePost = catchAsync(async (req, res) => {
  const post = await postService.storePost(req.body);
  res.send({ post });
});

const updatePost = catchAsync(async (req, res) => {
  const updatedPost = await postService.updatePost(req.params.id, req.body);
  res.send({ updatedPost });
});

const deletePost = catchAsync(async (req, res) => {
  const deletedPost = await postService.deletePost(req.params.id);

  res.send({ deletedPost });
});

module.exports = {
  storePost,
  getPosts,
  updatePost,
  deletePost,
};
