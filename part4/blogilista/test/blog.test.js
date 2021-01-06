const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

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

beforeEach(async () => {
  await Blog.deleteMany({});
  let blogObject = new Blog(initialBlogs[0]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[1]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[2]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[3]);
  await blogObject.save();
  blogObject = new Blog(initialBlogs[4]);
  await blogObject.save();
});

test("notes are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all notes are returned", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(initialBlogs.length);
});

test("the first note is about staring a blog", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body[0].title).toBe("started a new blog");
});

test("specific blog blog is within returned blogs", async () => {
  const response = await api.get("/api/blogs");

  const contents = response.body.map((r) => r.title);

  expect(contents).toContain("Got a new show with hubby");
});

afterAll(() => {
  mongoose.connection.close();
});
