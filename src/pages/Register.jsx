import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const navigate = useNavigate();

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post("http://localhost:3001/api/register", {
				username,
				password
			});
			navigate("/login");
		} catch (err) {
			setError(err.response?.data || "Registration failed");
		}
	};

	return (
		<div className="auth-container">
			<h2>Register</h2>
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
				<button type="submit">Register</button>
			</form>
			<p>
				Already have an account? <Link to="/login">Login</Link>
			</p>
		</div>
	);
}
