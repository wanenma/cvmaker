import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Register() {
	const [form, setForm] = useState({ username: "", password: "" });
	const navigate = useNavigate();

	const handleChange = (e) =>
		setForm({ ...form, [e.target.name]: e.target.value });

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post("http://localhost:3001/api/register", form);
			navigate("/login");
		} catch (err) {
			alert("Username already exists");
		}
	};

	return (
		<div>
			<h2>Register</h2>
			<form onSubmit={handleSubmit}>
				<input name="username" onChange={handleChange} placeholder="Username" />
				<input
					type="password"
					name="password"
					onChange={handleChange}
					placeholder="Password"
				/>
				<button type="submit">Register</button>
			</form>
			<p>
				Already have an account? <Link to="/login">Login</Link>
			</p>
		</div>
	);
}

export default Register;
