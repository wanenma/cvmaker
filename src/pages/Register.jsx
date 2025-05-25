import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
	const [form, setForm] = useState({ username: "", password: "" });
	const navigate = useNavigate();

	const handleChange = (e) =>
		setForm({ ...form, [e.target.name]: e.target.value });

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post("http://localhost:3001/api/register", form);
			alert("Registered successfully!");
			navigate("/login");
		} catch (err) {
			alert("Registration failed: " + err.response?.data);
		}
	};

	return (
		<div className="p-4">
			<h2 className="text-xl font-bold mb-2">Register</h2>
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
					Register
				</button>
			</form>
		</div>
	);
}
