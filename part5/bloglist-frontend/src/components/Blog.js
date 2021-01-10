import React from 'react'

const Blog = ({ blog, addLikeTo }) => {
  return (
    <li>
      {blog.title} {blog.author} {blog.likes}
      <button onClick={() => addLikeTo(blog.id)}>like</button>
    </li>
  )
}

export default Blog
