const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");

//Get all blogs

blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
  res.json(blogs.map((blog) => blog.toJSON()));
});

//Post a Blog
blogsRouter.post("/", async (req, res, next) => {
  const body = req.body;
  const token = req.token;

  const decodedToken = jwt.verify(token, process.env.SECRET);
  console.log("decoded token: ", decodedToken);

  if (!token || !decodedToken.id) {
    console.log("token missing: ", body);

    return res.status(401).json({ error: "token missing or invalid" });
  }

  if (!(body.title && body.url)) {
    res.status(400).end();
    return;
  }

  const addedUser = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: addedUser._id,
  });

  const savedBlog = await blog.save();
  addedUser.blogs = addedUser.blogs.concat(savedBlog._id);
  await addedUser.save();
  res.json(savedBlog.toJSON());
});

blogsRouter.delete("/:id", async (req, res, next) => {
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  if (!req.token || !decodedToken.id) {
    return res.status(401).json({ error: "token missing or invalid" });
  }

  const currentBlog = await Blog.findById(req.params.id);
  if (decodedToken.id.toString() !== currentBlog.user.toString()) {
    return res.status(401).json({ error: "not authorized" });
  }

  await Blog.findByIdAndRemove(req.params.id);
  console.log("Blog deleted");
  res.status(204).end();
});

blogsRouter.put("/:id", async (req, res, next) => {
  const body = req.body;
  const decodedToken = jwt.verify(req.token, process.env.SECRET);
  console.log("req params: ", req);
  const currentBlog = await Blog.findById(req.params.id);
  if (decodedToken.id.toString() !== currentBlog.user.toString()) {
    return res.status(401).json({ error: "not authorized" });
  }

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  await Blog.findByIdAndUpdate(req.params.id, blog, { new: true });

  res.status(200).end();
});

module.exports = blogsRouter;
