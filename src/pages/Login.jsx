import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post("http://localhost:3001/api/login", {
				username,
				password
			});
			localStorage.setItem("token", response.data.token);
			navigate("/dashboard");
		} catch (err) {
			setError(err.response?.data || "Login failed");
		}
	};

	return (
		<div className="auth-container">
			<h2>Login</h2>
			{error && <div className="error">{error}</div>}
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label>Username:</label>
					<input
						type="text"
						value={username}
						onChange={(e) => setUsername(e.target.value)}
						required
					/>
				</div>
				<div className="form-group">
					<label>Password:</label>
					<input
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
					/>
				</div>
				<button type="submit">Login</button>
			</form>
			<p>
				Don't have an account? <Link to="/register">Register</Link>
			</p>
		</div>
	);
}
