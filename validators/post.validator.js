const {
  object,
  string,
  refine,
  size,
  enums,
  optional,
  boolean,
  number,
} = require("superstruct");

const CreatePost = object({
  title: size(string(), 10, Infinity),
  content: string(),
  published: boolean(),
});

const UpdatePost = object({
  title: size(string(), 10, Infinity),
  content: string(),
  published: boolean(),
});

const CreateComment = object({
  content: string(),
  postId: optional(number()),
});

module.exports = {
  CreatePost,
  UpdatePost,
  CreateComment,
};
