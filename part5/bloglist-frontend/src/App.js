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
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  //const [newBlog, setNewBlog] = useState('')
  //const [newBlog, setNewBlog] = useState('')
  //const [showAll, setShowAll] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUser) {
      const userData = JSON.parse(loggedUser)
      setUser(userData)
      blogService.setToken(userData.token)
    }
  }, [])
  useEffect(() => {
    setTimeout(() => {
      setErrorMessage(null)
      setError(null)
    }, 5000)
  }, [errorMessage])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username,
        password,
      })
      console.log('error: ', user)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (err) {
      setError('error')
      setErrorMessage(err.response.data.error)
    }
  }

  const addLikeTo = (id) => {
    const blog = blogs.find((b) => b.id === id)
    let likey = blog.likes + 1
    //console.log('problem here', likey, blog)
    const updatedBlog = { ...blog, likes: likey }

    //console.log(updatedBlog)
    blogService
      .like(id, updatedBlog)
      .then((returnBlog) => {
        console.log(returnBlog)
        setBlogs(blogs.map((blog) => (blog.id !== id ? blog : returnBlog.data)))
      })
      .catch((error) => {
        setError('error')
        setErrorMessage(error.response.data.error)
      })
  }

  // const handleTitleChange = (e) => {
  //   setTitle(e.target.value)
  // }
  // const handleAuthorChange = (e) => {
  //   setTitle(e.target.value)
  // }
  // const handleUrlChange = (e) => {
  //   setUrl(e.target.value)
  // }
  const handleLogout = () => {
    setUser(null)
    setUsername('')
    setPassword('')
    localStorage.clear()
  }

  const addBlog = (e) => {
    e.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
      likes: 0,
    }

    blogService
      .create(blogObject)
      .then((returnedBlog) => {
        setBlogs(blogs.concat(returnedBlog))
        setTitle('')
        setAuthor('')
        setUrl('')
        setError('notification')
        setErrorMessage(
          `a new blog "${returnedBlog.title}" by ${returnedBlog.author}`
        )
      })
      .catch((error) => {
        setErrorMessage(error.response.data.error)
      })
  }

  return (
    <div>
      <h1>blogs</h1>
      <Notification message={errorMessage} className={error} />
      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          setUsername={setUsername}
          setPassword={setPassword}
          username={username}
          password={password}
        />
      ) : (
        <div>
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </p>
          <BlogForm
            setTitle={setTitle}
            setAuthor={setAuthor}
            setUrl={setUrl}
            addBlog={addBlog}
            title={title}
            author={author}
            url={url}
            blogs={blogs}
            addLikeTo={addLikeTo}
          />
        </div>
      )}
    </div>
  )
}

export default App
