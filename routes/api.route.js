const router = require("express").Router();

router.get("/", async (req, res, next) => {
  res.send({ message: "Ok api is working 🚀" });
});

router.use("/users", require("./users.route"));
router.use("/posts", require("./post.route"));
router.use("/follows", require("./follow.route"));

module.exports = router;
