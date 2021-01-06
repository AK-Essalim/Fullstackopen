const blog = require("../models/blog");
const _ = require("lodash")

const dummy = (array) => {
  return 1;
};

const totalLikes = (arrayReceived) => {
  return arrayReceived.length === 0
    ? 0
    : arrayReceived.reduce((sum, cur) => sum + cur.likes, 0);
};

const favoriteBlog = (blogs) => {
    const a = _.sortBy(blogs, ["likes"])

    return a[blogs.length -1]

}


  const reducer = blogs.reduce(
    (fav, cur) => (cur.likes >= fav.likes ? cur : fav),
    { likes: 0 }
  );
  console.log(reducer);
  return reducer.length === 1 ? blogs[0] : reducer;
};
const mostBlogs = (blogs) => {
  return blogs.length === 0 ? 0 : 0;
};
const mostLikes = (blogs) => {
  return blogs.length === 0 ? 0 : 0;
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
};
