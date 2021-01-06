const blog = require("../models/blog");
const _ = require("lodash");

const dummy = (array) => {
  return 1;
};

const totalLikes = (arrayReceived) => {
  return arrayReceived.length === 0
    ? 0
    : arrayReceived.reduce((sum, cur) => sum + cur.likes, 0);
};

const favoriteBlog = (blogs) => {
  const a = _.sortBy(blogs, ["likes"]);
  if (!blogs.length) {
    return null;
  }
  if (blogs[0].likes === undefined) {
    return null;
  }
  if (blogs.length === 1)
    return {
      title: blogs[0].title,
      author: blogs[0].author,
      likes: blogs[0].likes,
    };

  let max = 0;
  let index = 0;
  let favorite = [];
  let i = 0;

  for (i; i < blogs.length; i++) {
    if (blogs[i].likes > max) {
      max = blogs[i].likes;
      index = i;
    }
  }

  const theOne = {
    title: blogs[index].title,
    author: blogs[index].author,
    likes: blogs[index].likes,
  };
  return theOne;

  //Works by lodash but unwanted
  //return _.maxBy(blogs, "likes");
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
