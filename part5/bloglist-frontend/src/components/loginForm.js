import React from 'react'
// const [username, setUsername] = useState('')
// const [password, setPassword] = useState('')

const LoginForm = ({
  setPassword,
  setUsername,
  handleLogin,
  username,
  password,
}) => {
  return (
    <>
      <h2>Login</h2>
      <form onSubmit={() => handleLogin}>
        <div>
          username:{' '}
          <input
            type='text'
            value={username}
            name='Username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password:{' '}
          <input
            type='text'
            value={password}
            name='Password'
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
      </form>
    </>
  )
}

export default LoginForm