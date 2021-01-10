import React from 'react'
import Blog from './Blog'

const BlogForm = ({
  setTitle,
  setAuthor,
  setUrl,
  addBlog,
  title,
  author,
  url,
  blogs,
  addLikeTo,
}) => {
  return (
    <>
      <h2>Blogs</h2>

      <ul>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} addLikeTo={addLikeTo} />
        ))}
      </ul>
      <h2>add new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          title:{' '}
          <input
            type='text'
            value={title}
            name='title'
            onChange={({ target }) => setTitle(target.value)}
          />
          author:{' '}
          <input
            type='text'
            value={author}
            name='author'
            onChange={({ target }) => setAuthor(target.value)}
          />
          url:{' '}
          <input
            type='text'
            value={url}
            name='url'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>

        <button type='submit'>save</button>
      </form>
    </>
  )
}

export default BlogForm
