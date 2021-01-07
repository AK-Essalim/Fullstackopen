const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const config = require("../utils/config");

const getTokenFrom = (request) => {
  const authorization = request.get("Authorization");
  //console.log("akalaka", authorization);
  //console.log(authorization, "here in get tokenFrom");
  if (authorization && authorization.toLowerCase().startsWith("bearer ")) {
    //console.log(authorization.substring(7), "here in if statement");
    return authorization.substring(7);
  }
  return null;
};

//Get all blogs
blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({}).populate("user", {
    username: 1,
    name: 1,
  });
  res.json(blogs.map((blog) => blog.toJSON()));
});

// Get a Single Blog

blogsRouter.get("/:id", async (req, res, next) => {
  const blog = await Blog.findById(req.params.id);
  if (blog) {
    res.json(blog.toJSON());
  } else {
    res.status(404).end();
  }
});

//Create a new Blog
blogsRouter.post("/", async (req, res) => {
  const body = req.body;
  //console.log("hi", req.token);
  const token = req.headers.authorization.split(" ")[1];
  try {
    const decoded = jwt.verify(JSON.parse(token), privateKey);
    console.log(decoded);
  } catch (err) {
    console.log("err", err);
  }

  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: "token missing or not valid" });
  }
  const user = await User.findById(decodedToken.id);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    user: user._id,
  });

  const savedBlog = await blog.save();

  user.blogs = user.blogs.concat(savedBlog._id);
  await user.save();

  res.json(savedBlog.toJSON());
});

//Update a single Blog

blogsRouter.put("/:id", async (req, res) => {
  const body = req.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  };

  const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
  });
  res.status(200).json(updatedBlog.toJSON());
});

//Delete a Blog

blogsRouter.delete("/:id", async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.status(204).json();
});

module.exports = blogsRouter;
