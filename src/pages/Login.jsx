import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Login.css";
import { FaUser, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { loginUser } from "../api";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = async (event) => {
        event.preventDefault();

    try {
        await loginUser(username, password);

        document.body.classList.add("fade-out");
        setTimeout(() => {
            navigate("/dashboard");
            document.body.classList.remove("fade-out");
        }, 500);
    } catch {
        setError("Invalid username or password");
    }
  };

  return (
    <div className="login-container">
        <div className="login-left">
            <div className="login-form">
            <h2>Log in to your Account</h2>
            <p>Welcome back!</p>

            {error && <p className="error-message">{error}</p>}

            <form onSubmit={handleLogin}>
                <div className="input-group">
                <FaUser className="icon" />
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                </div>

                <div className="input-group">
                <FaLock className="icon" />
                <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button
                    type="button"
                    className="toggle-password"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
                </div>

                <div className="options">
                <label>
                    <input type="checkbox" /> Remember me
                </label>
                <a href="/forgot-password">Forgot Password?</a>
                </div>

                <button type="submit" className="login-button">Log in</button>
            </form>
            </div>
        </div>

        <div className="login-right"></div>
        </div>
    );
}

export default Login;
