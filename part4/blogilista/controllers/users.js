const bcrypt = require("bcrypt");
const usersRouter = require("express").Router();
const User = require("../models/user");
const Blog = require("../models/blog");

usersRouter.post("/", async (req, res) => {
  const body = req.body;
  const saltRounds = 10;
  if ((body.password.length || body.username.length) < 3) {
    return res
      .status(400)
      .json({ error: "username and/or password is too short" });
  }

  const passwordHash = await bcrypt.hash(body.password, saltRounds);
  //console.log(body);

  const user = new User({
    username: body.username,
    name: body.name,
    passwordHash,
  });
  //console.log(passwordHash);
  const savedUser = await user.save();
  res.json(savedUser);
});

usersRouter.get("/", async (req, res) => {
  const users = await User.find({}).populate("blogs");
  res.json(users);
});

module.exports = usersRouter;
