import React, { useState } from "react";
import { useCookies } from "react-cookie"

function Auth() {
    const serverUrl = process.env.REACT_APP_TODO_SERVER_URL || "http://localhost:8000"
    const [cookies, setCookie, removeCookies] = useCookies(null)
    const [isLogin, setIsLogin] = useState(true)
    const [email, setEmail] = useState(null)
    const [password, setPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [error, setError] = useState(null)

    console.log(cookies)

    const viewLogin = (status) => {
        setError(null)
        setIsLogin(status)
    }

    const handleSubmit = async (e, endpoint) => {
        e.preventDefault()
        if (!isLogin && password !== confirmPassword) {
            setError("Make sure passwords match!")
            return
        }

        const response = await fetch(`${serverUrl}/${endpoint}`, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        })

        if (!response.ok) {
            const errorData = await response.json();
            setError(errorData.detail || "An error occurred. Please try again.");
            return;
        }

        const data = await response.json()

        if (data.detail) {
            setError(data.detail)
        }
        else {
            setCookie('Email', data.email)
            setCookie('AuthToken', data.token)

            window.location.reload()
        }
    }

    return (
        <div className="auth-conatiner">
            <div className="auth-conatiner-box">
                <form>
                    <h2>
                        {isLogin ?
                            "Please Log In!" : "Please Sign Up!"}</h2>
                    <input
                        type="email"
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    {!isLogin && <input
                        type="password"
                        placeholder="Confirm Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                    />}
                    <input type="submit" className="create" onClick={(e) => handleSubmit(e, isLogin ? 'login' : 'signup')} />
                    {error && <p>{error}</p>}
                </form>
                <div className="auth-option">
                    <button
                        onClick={() => viewLogin(false)}
                        style={{ backgroundColor: !isLogin ? 'whitesmoke' : 'darkgrey' }}
                    >Sign Up</button>
                    <button
                        onClick={() => viewLogin(true)}
                        style={{ backgroundColor: isLogin ? 'whitesmoke' : 'darkgrey' }}
                    >Log In</button>
                </div>
            </div>
        </div>
    );
}

export default Auth;
