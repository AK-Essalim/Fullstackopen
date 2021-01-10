//import userEvent from '@testing-library/user-event'
import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
//import Notification from './components/Notification'
import LoginForm from './components/loginForm'
import BlogForm from './components/blogForm'
import Notification from './components/Notification'
import './App.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  // const [newTitle, setNewTitle] = useState('')
  // const [newAuthor, setNewAuthor] = useState('')
  // const [newUrl, setNewUrl] = useState('')
  //const [newBlog, setNewBlog] = useState('')
  //const [newBlog, setNewBlog] = useState('')
  //const [showAll, setShowAll] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (err) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const addLikeTo = (id) => {
    const blog = blogs.find((b) => b.id === id)
    let likey = blog.likes + 1
    console.log(likey, blog)
    const updatedBlog = { ...blog, likes: likey }

    blogService
      .update(id, updatedBlog)
      .then((returnBlog) => {
        setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnBlog)))
      })
      .catch((err) => {
        setErrorMessage(`Blog ${blog.id} was already deleted from server`)
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
      })
  }

  const handleTitleChange = (e) => {
    setTitle(e.target.value)
  }
  const handleAuthorChange = (e) => {
    setTitle(e.target.value)
  }
  const handleUrlChange = (e) => {
    setUrl(e.target.value)
  }

  const addBlog = (e) => {
    e.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
      likes: 0,
    }

    blogService.create(blogObject).then((returnedBlog) => {
      setBlogs(blogs.concat(returnedBlog))
      setTitle('')
      setAuthor('')
      setUrl('')
    })
  }
  const error = 'error'

  return (
    <div>
      <h1>blogs</h1>
      <Notification message={errorMessage} className={error} />
      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      ) : (
        <div>
          <p>{user.name} logged in</p>
          <BlogForm
            handleTitleChange={handleTitleChange}
            handleAuthorChange={handleAuthorChange}
            handleUrlChange={handleUrlChange}
            addBlog={addBlog}
            title={title}
            author={author}
            url={url}
          />
        </div>
      )}

      <h2>Blogs</h2>

      <ul>
        {blogs.map((blog) => (
          <Blog key={blog.id} blog={blog} addLike={() => addLikeTo(blog.id)} />
        ))}
      </ul>
    </div>
  )
}

export default App
