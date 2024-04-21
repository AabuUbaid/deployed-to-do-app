import React, { useState } from 'react'
import {useCookies} from 'react-cookie';

function Auth() {
  const [cookies, setCookie] = useCookies(null)
  const [isLogin, SetLogin] = useState(true)
  const [email, setEmail] = useState(null)
  const [pass, setPass] = useState(null)
  const [cpass, setCpass] = useState(null)
  const [error, setError] = useState(null)

console.log(cookies)

  const viewLogin = (status) => {
    setError(null)
    SetLogin(status)
  }

  const handleSubmit = async(e,endpoint) => {
    e.preventDefault()
    if (!isLogin && pass !== cpass) {
      setError('Passwords do not match!')
      return
    }

   const response = await fetch(`${process.env.REACT_APP_SERVERURL}/${endpoint}`, {
      method:"POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, pass})
    })

    const data = await response.json()

    if (response.ok) {
      setCookie('Email', data.email);
      setCookie('AuthToken', data.token);
      window.location.reload();
    } else {
      setError(data.detail || 'An error occurred');
    }
  }

  return (
    <div className='auth-contain'>
    <div className="auth-contain-box">
      <form>
      <h2>{isLogin? 'Please log in' : 'Please sign up!'}</h2>
        <input 
        type="email" 
        placeholder='Email'
        onChange={(e) => setEmail(e.target.value)}
        />
        <input 
        type="password" 
        placeholder='Password'
        onChange={(e) => setPass(e.target.value)}
        />
        {!isLogin && <input 
        type="password" 
        placeholder='Confirm password'
        onChange={(e) => setCpass(e.target.value)}
        />}
        <input 
        type="submit" 
        className='create' 
        onClick={(e) => handleSubmit(e, isLogin ? 'login' : 'signup')}/>
        {error && <p>{error}</p>}
      </form>
      <div className="auth-option">
        <button 
        onClick={() => viewLogin(false)}
        style={{backgroundColor: !isLogin ? 'rgb(255,255,255)' : 'rgb(188,188,188)'}}
        >Sign Up</button>
        <button 
        onClick={() => viewLogin(true)}
        style={{backgroundColor: isLogin ? 'rgb(255,255,255)' : 'rgb(188,188,188)'}}
        >Login</button>
      </div>
    </div>
    </div>
  )
}

export default Auth