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
  authorId: number(),
});

const UpdatePost = object({
  title: size(string(), 10, Infinity),
  content: string(),
  published: boolean(),
  authorId: number(),
});

const CreateComment = object({
  content: string(),
  postId: optional(number()),
  authorId: number(),
});

module.exports = {
  CreatePost,
  UpdatePost,
  CreateComment,
};
