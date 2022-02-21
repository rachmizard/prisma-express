const verifyAuth = require("../middlewares/verify");

const router = require("express").Router();

router.get("/", async (req, res, next) => {
  res.send({ message: "Ok api is working 🚀" });
});

router.use("/auth", require("./auth.route"));
router.use("/users", verifyAuth, require("./users.route"));
router.use("/posts", verifyAuth, require("./post.route"));
router.use("/follows", verifyAuth, require("./follow.route"));

module.exports = router;
