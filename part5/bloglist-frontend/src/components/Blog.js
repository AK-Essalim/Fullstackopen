import React from 'react'
const Blog = ({ blog, addLike }) => (
  <li>
    {blog.title} {blog.author}
    <button onClick={addLike}>like</button>
  </li>
)

export default Blog
