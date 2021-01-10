import React from 'react'

const BlogForm = ({
  handleTitleChange,
  handleAuthorChange,
  handleUrlChange,
  addBlog,
  title,
  author,
  url,
}) => {
  return (
    <>
      <h2>add new blog</h2>
      <form onSubmit={addBlog}>
        <div>
          <input
            type='text'
            value={title}
            name='title'
            onChange={handleTitleChange}
          />
          <input
            type='text'
            value={author}
            name='author'
            onChange={handleAuthorChange}
          />
          <input
            type='text'
            value={url}
            name='url'
            onChange={handleUrlChange}
          />
        </div>

        <button type='submit'>save</button>
      </form>
    </>
  )
}

export default BlogForm
