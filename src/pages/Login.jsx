import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { setToken } from "../utils/auth";

export default function Login() {
	const [form, setForm] = useState({ username: "", password: "" });
	const navigate = useNavigate();

	const handleChange = (e) =>
		setForm({ ...form, [e.target.name]: e.target.value });

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const res = await axios.post("http://localhost:3001/api/login", form);
			setToken(res.data.token);
			navigate("/dashboard");
		} catch (err) {
			alert("Login failed: " + err.response?.data);
		}
	};

	return (
		<div className="p-4">
			<h2 className="text-xl font-bold mb-2">Login</h2>
			<form onSubmit={handleSubmit} className="space-y-2">
				<input
					type="text"
					name="username"
					placeholder="Username"
					onChange={handleChange}
					required
					className="border p-2 w-full"
				/>
				<input
					type="password"
					name="password"
					placeholder="Password"
					onChange={handleChange}
					required
					className="border p-2 w-full"
				/>
				<button type="submit" className="bg-blue-500 text-white p-2">
					Login
				</button>
			</form>
		</div>
	);
}
