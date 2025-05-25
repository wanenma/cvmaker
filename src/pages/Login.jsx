import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Login() {
	const [form, setForm] = useState({ username: "", password: "" });
	const navigate = useNavigate();

	const handleChange = (e) =>
		setForm({ ...form, [e.target.name]: e.target.value });

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post("http://localhost:3001/api/login", form);
			localStorage.setItem("token", res.data.token);
			navigate("/dashboard");
		} catch (err) {
			alert("Invalid credentials");
		}
	};

	return (
		<div>
			<h2>Login</h2>
			<form onSubmit={handleSubmit}>
				<input name="username" onChange={handleChange} placeholder="Username" />
				<input
					type="password"
					name="password"
					onChange={handleChange}
					placeholder="Password"
				/>
				<button type="submit">Login</button>
			</form>
			<p>
				Don't have an account? <Link to="/register">Register</Link>
			</p>
		</div>
	);
}

export default Login;
