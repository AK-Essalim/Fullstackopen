const _ = require("lodash");

const blogs = [
  {
    _id: "5a422a851b54a676234d17f7",
    title: "React patterns",
    author: "Michael Chan",
    url: "https://reactpatterns.com/",
    likes: 7,
    __v: 0,
  },
  {
    _id: "5a422aa71b54a676234d17f8",
    title: "Go To Statement Considered Harmful",
    author: "Edsger W. Dijkstra",
    url:
      "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
    likes: 5,
    __v: 0,
  },
  {
    _id: "5a422b3a1b54a676234d17f9",
    title: "Canonical string reduction",
    author: "Edsger W. Dijkstra",
    url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
    likes: 12,
    __v: 0,
  },
  {
    _id: "5a422b891b54a676234d17fa",
    title: "First class tests",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
    likes: 10,
    __v: 0,
  },
  {
    _id: "5a422ba71b54a676234d17fb",
    title: "TDD harms architecture",
    author: "Robert C. Martin",
    url:
      "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
    likes: 0,
    __v: 0,
  },
  {
    _id: "5a422bc61b54a676234d17fc",
    title: "Type wars",
    author: "Robert C. Martin",
    url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
    likes: 2,
    __v: 0,
  },
];

/* console.log(blogs);
console.log("väliä");
console.log(_.sortBy(blogs, ["likes"])); */
let v = _.sortBy(blogs, (a) => a.author);
let authorLikes = [];

let q = _.groupBy(blogs, (blog) => blog.author);
// let s = q.map((item) => {
//   let a = {
//     name: item.author,
//   };
//   authorLikes.concat(a);
// });
let z = _.forEach(q, (value, key) => authorLikes.push(value));

console.log(z);
//Object.entries(v).map((a) => console.log(a).length);

const byAuthor = _.groupBy(blogs, (blog) => blog.author);
const authors = _.map(byAuthor, (auth) => {
  const likes = auth.reduce((total, blog) => total + blog.likes, 0);
  //return { author: auth[0].author, likes: likes };
});
/* console.log(
  authors.reduce((max, auth) => (max.likes > auth.likes ? max : auth), {})
); */

/* 
const authorCount = _.reduce(
  blogs,
  (total, next) => {
    total[next.author] = (total[next.author] || 0) + 1;
    return total;
  },
  {}
);

const counts = blogs.reduce((s, v) => {
  s[v.author] = (s[v.author] || 0) + 1;
  return s;
}, {});
console.log(
  _.reduce(
    counts,
    (s, v, i) => (!s || v > s.blogs ? { author: i, blogs: v } : s),
    null
  )
);
 */
