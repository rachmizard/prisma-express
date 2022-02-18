const {
  object,
  string,
  refine,
  size,
  enums,
  optional,
} = require("superstruct");

const CreateUser = object({
  name: string(),
  email: refine(string(), "email", (v) => v.includes("@")),
  password: size(string(), 6, 30),
  role: enums(["USER", "ADMIN"]),
});

const UpdateUser = object({
  name: string(),
  email: optional(refine(string(), "email", (v) => v.includes("@"))),
  password: optional(size(string(), 6, 30)),
  role: enums(["USER", "ADMIN"]),
});

module.exports = {
  CreateUser,
  UpdateUser,
};
