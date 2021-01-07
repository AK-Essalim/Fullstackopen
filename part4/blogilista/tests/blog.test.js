const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

const helper = require("./test_helper");

const Blog = require("../models/blog");

beforeEach(async () => {
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
});

test("notes are returned as json", async () => {
  await api
    .get("/api/blogs")
    .expect(200)
    .expect("Content-Type", /application\/json/);
});

test("all notes are returned", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body).toHaveLength(helper.initialBlogs.length);
});

test("the first note is about staring a blog", async () => {
  const response = await api.get("/api/blogs");

  expect(response.body[0].title).toBe("started a new blog");
});

test("specific blog is within returned blogs", async () => {
  const response = await api.get("/api/blogs");

  const contents = response.body.map((r) => r.title);

  expect(contents).toContain("Got a new show with hubby");
});

test("A valid blog can be added", async () => {
  const newBlog = {
    title: "A world made free",
    author: "Loki",
    url: "http://freedom.com",
    likes: 999,
  };

  await api
    .post("/api/blogs")
    .send(newBlog)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1);

  const contents = blogsAtEnd.map((r) => r.title);

  expect(contents).toContain("A world made free");
});

test("blog without title is not added", async () => {
  const newBlog = {
    author: "Hela",
  };

  await api.post("/api/blogs").send(newBlog).expect(400);
  const blogsAtEnd = await helper.blogsInDb();
  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
});

test("Specific Blog can be viewed", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogToView = blogsAtStart[0];

  const resultBlog = await api
    .get(`/api/blogs/${blogToView.id}`)
    .expect(200)
    .expect("Content-Type", /application\/json/);

  const processedBlogToView = JSON.parse(JSON.stringify(blogToView));
  expect(resultBlog.body).toEqual(processedBlogToView);
});

test("blog can be deleted", async () => {
  const blogsAtStart = await helper.blogsInDb();
  const blogDelete = blogsAtStart[0];

  await api.delete(`/api/blogs/${blogDelete.id}`).expect(204);

  const blogsAtEnd = await helper.blogsInDb();

  expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);
});

test("the value of likes is set to 0 if it is not specified", async () => {
  const newBlog = {
    title: "Akalaka",
    author: "Hela",
    url: "http://freedomFromSchool.com",
  };

  const responseBlog = await api.post("/api/blogs").send(newBlog).expect(200);
  console.log(responseBlog.body);
  expect(responseBlog.body.likes).toEqual(0);
});

afterAll(() => {
  mongoose.connection.close();
});
