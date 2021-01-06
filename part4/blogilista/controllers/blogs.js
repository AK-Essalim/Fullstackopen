const blogsRouter = require("express").Router();
const Blog = require("../models/blog");

//Get all blogs
blogsRouter.get("/", (req, res) => {
  Blog.find({}).then((blogs) => {
    res.json(blogs);
  });
});

// Get a Single Blog

blogsRouter.get("/:id", (req, res, next) => {
  Blog.findById(req.params.id)
    .then((blog) => {
      if (blog) {
        res.json(blog);
        console.log(
          `Received a request for the details a blog titled : ${blog.title}`
        );
      }
    })
    .catch((err) => next(err));
});

//Create a new Blog
blogsRouter.post("/", (req, res, next) => {
  const body = req.body;

  const blog = new Blog({
    title: body.title,
    author: body.author || 0,
    url: body.url,
    likes: body.likes,
  });

  blog
    .save()
    .then((savedBlog) => {
      res.json(savedBlog.toJSON());
    })
    .catch((err) => next(err));
});

//Update a single Blog

blogsRouter.put("/:id", (req, res, next) => {
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

blogsRouter.delete("/:id", (req, res, next) => {
  Blog.findByIdAndDelete(req.params.id)
    .then((blog) => {
      res.json(204).end();
      console.log(`Removed a blog titled: ${blog.title}`);
    })
    .catch((err) => next(err));
});

module.exports = blogsRouter;
