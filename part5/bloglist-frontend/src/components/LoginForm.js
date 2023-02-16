import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
  userLogin
}) => {
  const [userInfo, setUserInfo] = useState({ username: '', password: '' })

  const handleLogIn = async (event) => {
    event.preventDefault()
    userLogin(userInfo)
    setUserInfo({ username: '', password: '' })
  }

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleLogIn}>
        {/* <form onSubmit={handleLogIn}> */}
        {/* good practice for web accessibility */}
        <label>
          username:
          <input
            type='text'
            value={userInfo.username}
            name='username'
            onChange={({ target }) => setUserInfo({ ...userInfo, username: target.value })}
          />
        </label>
        <br />
        <label>
          password:
          <input
            type='text'
            value={userInfo.password}
            onChange={({ target }) => setUserInfo({ ...userInfo, password: target.value })}
          ></input>
        </label>
        <button type='submit'>Log In</button>
      </form>
    </>
  )
}

LoginForm.propTypes = {
  userLogin: PropTypes.func.isRequired
}

export default LoginForm