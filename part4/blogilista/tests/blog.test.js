const mongoose = require("mongoose");
const supertest = require("supertest");
const app = require("../app");
const api = supertest(app);

const jwt = require("jsonwebtoken");

const helper = require("./test_helper");

const Blog = require("../models/blog");
const User = require("../models/user");

let token;
let userForToken;

beforeEach(async () => {
  // Initialized the first time
  await User.deleteMany({});
  const z = await User.insertMany(helper.initialUsers);
  await Blog.deleteMany({});
  await Blog.insertMany(helper.initialBlogs);
  const user = await User.findOne({ username: "spiderman" });
  //console.log("user for token: ", user);
  userForToken = {
    username: user.username,
    id: user._id,
  };

  token = "Bearer " + jwt.sign(userForToken, process.env.SECRET);
});

describe("Accessing and viewing the data", () => {
  test("notes are returned as json", async () => {
    await api
      .get("/api/blogs")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  // test("fails with statuscode 404 if blog does not exist", async () => {
  //   const validNonexistingId = await helper.nonExistingId();

  //   console.log(validNonexistingId);

  //   await api.get(`/api/blogs/${validNonexistingId}`).expect(404);
  // });

  test("fails with statuscode 400 id is invalid", async () => {
    const invalidId = "5a3d5da59070081a82a3445";
    await api.get(`/api/blogs/${invalidId}`).expect(400);
  });
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

describe("Posting data to the database/app", () => {
  test("A valid blog can be added", async () => {
    const newBlog = {
      title: "A world made free",
      author: "Loki",
      url: "http://freedom.com",
      likes: 999,
    };

    await api
      .post("/api/blogs")
      .set("Authorization", token)
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

    const request = await api
      .post("/api/blogs")
      .set("Authorization", token)
      .send(newBlog)
      .expect(400);
    //console.log("has auth header: ", request.headers);
    const blogsAtEnd = await helper.blogsInDb();
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length);
  });
});

describe("Deleting data from the APP correctly", () => {
  test("blog can be deleted when correctly used", async () => {
    const blogsAtStart = await helper.blogsInDb();
    const blogDelete = blogsAtStart[0];
    // Update the blogs user to one that exists in DB
    /*const blogi = Blog.findById(blogDelete.id);

    blogi.user = userForToken.id;
    await bloki.save();*/
    console.log("user for token ", userForToken);
    const blogi = await Blog.findByIdAndUpdate(
      blogDelete.id,
      {
        user: userForToken.id,
      },
      { new: true }
    );

    console.log("blogi: ", blogi);
    //console.log("user for token: ", user);
    // const userForToken = {
    //   username: user.username,
    //   id: user._id,
    // };

    let tokenDelete = "Bearer " + jwt.sign(userForToken, process.env.SECRET);

    await api
      .delete(`/api/blogs/${blogDelete.id}`)
      .set("Authorization", tokenDelete)
      .expect(204);

    const blogsAtEnd = await helper.blogsInDb();

    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length - 1);

    const contents = blogsAtEnd.map((b) => b.title);

    expect(blogsAtEnd).not.toContain(blogDelete.title);
  });
});

describe("The app is working as expected", () => {
  test("the value of likes is set to 0 if it is not specified", async () => {
    const newBlog = {
      title: "Akalaka",
      author: "Hela",
      url: "http://freedomFromSchool.com",
    };
    console.log("token: ", token);
    const responseBlog = await api
      .post("/api/blogs")
      .set("Authorization", token)
      .send(newBlog)
      .expect(200);
    //console.log(responseBlog.body);
    expect(responseBlog.body.likes).toEqual(0);
  });

  test("Expect id to be defined", async () => {
    const responseBlog = await api.get("/api/blogs").expect(200);
    // console.log(responseBlog.body);
    expect(responseBlog.body[0].id).toBeDefined();
  });

  test("Expect id to be a string", async () => {
    const responseBlog = await api.get("/api/blogs").expect(200);
    expect(typeof responseBlog.body[0].id).toEqual("string");
  });
});

afterAll(() => {
  mongoose.connection.close();
});
