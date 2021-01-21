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
      <div>
        <form onSubmit={addBlog}>
          <div>
            <div>
              title:{' '}
              <input
                type='text'
                value={title}
                name='title'
                onChange={({ target }) => setTitle(target.value)}
              />
            </div>
            <div>
              author:{' '}
              <input
                type='text'
                value={author}
                name='author'
                onChange={({ target }) => setAuthor(target.value)}
              />
            </div>
            <div>
              url:{' '}
              <input
                type='text'
                value={url}
                name='url'
                onChange={({ target }) => setUrl(target.value)}
              />
            </div>
          </div>

          <button type='submit'>save</button>
        </form>
      </div>
    </>
  )
}

export default BlogForm
