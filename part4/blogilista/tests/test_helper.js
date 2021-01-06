const Blog = require("../models/blog");

const initialBlogs = [
  {
    title: "started a new blog",
    author: "Abdelkarim",
    url: "http://AK-Essalim.com",
    likes: 11,
  },
  {
    title: "Work in progress",
    author: "Osama",
    url: "HTTP://localohost:2222",
    likes: 4,
  },
  {
    title: "Jaffa on Hyvää",
    author: "Juice",
    url: "www.jaffa.fi",
    likes: 543,
  },
  {
    title: "Got a new show with hubby",
    author: "Wanda Maximoff",
    url: "http://marvel.com",
    likes: 5,
  },
  {
    title: "Pizza, that's the title",
    author: "Peter Parker",
    url: "http://www.google.fi",
    likes: 87,
  },
];

const nonExistingId = async () => {
  const blog = new Blog({
    title: "willremovethissoon",
    url: "http://delete.com",
  });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogsInDb = async () => {
  const blogs = await Blog.find({});
  return blogs.map((blog) => blog.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogsInDb,
};
