const catchAsync = require("../lib/catchAsync");
const PostService = require("../services/post.service");

const postService = new PostService();

const getPosts = catchAsync(async (req, res) => {
  const data = await postService.getPosts();

  res.send({ data });
});

const storePost = catchAsync(async (req, res) => {
  const post = await postService.storePost(req.body);
  res.send({ post });
});

module.exports = {
  storePost,
  getPosts,
};
