const blogsRouter = require("express").Router();
const Blog = require("../models/blog");
const test = require("../utils/for_testing");

//Get all blogs
blogsRouter.get("/", async (req, res) => {
  const blogs = await Blog.find({});
  res.json(blogs.map((blog) => blog.toJSON()));
});

// Get a Single Blog

blogsRouter.get("/:id", async (req, res, next) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (blog) {
      res.json(blog.toJSON());
    } else {
      res.status(404).end();
    }
  } catch (err) {
    next(err);
  }
});

//Create a new Blog
blogsRouter.post("/", async (req, res, next) => {
  const body = req.body;

  const blog = new Blog({
    title: body.title,
    author: body.author || 0,
    url: body.url,
    likes: body.likes,
  });

  try {
    const savedBlog = await blog.save();
    res.json(savedBlog.toJSON());
  } catch (err) {
    next(err);
  }
});

//Update a single Blog

blogsRouter.put("/:id", async (req, res, next) => {
  const body = req.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  };

  Blog.findByIdAndUpdate(req.params.id, blog, {
    new: true,
    runValidators: true,
    context: "query",
  })
    .then((updatedBlog) => {
      res.json(updatedBlog.toJSON());
    })
    .catch((err) => next(err));
});

//Delete a Blog

blogsRouter.delete("/:id", async (req, res, next) => {
  try {
    const prom = await Blog.findByIdAndDelete(req.params.id);
    res.status(204).json();
  } catch (err) {
    next(err);
  }
});

module.exports = blogsRouter;
