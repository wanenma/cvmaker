import React, { useState, useRef } from "react";
import axios from "axios";
import { getToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";

export default function CVBuilder() {
	const [form, setForm] = useState({
		name: "",
		email: "",
		phone: "",
		education: "",
		experience: "",
		skills: "",
	});
	const navigate = useNavigate();
	const componentRef = useRef();

	const handleChange = (e) =>
		setForm({ ...form, [e.target.name]: e.target.value });

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post("http://localhost:3001/api/cv", form, {
				headers: { Authorization: "Bearer " + getToken() },
			});
			alert("CV saved");
			navigate("/dashboard");
		} catch (err) {
			alert("Error saving CV: " + err.response?.data);
		}
	};

	const handlePrint = useReactToPrint({ content: () => componentRef.current });

	return (
		<div className="p-4">
			<h2 className="text-xl font-bold mb-2">Build Your CV</h2>
			<form onSubmit={handleSubmit} className="space-y-2">
				<input
					name="name"
					placeholder="Name"
					onChange={handleChange}
					className="border p-2 w-full"
				/>
				<input
					name="email"
					placeholder="Email"
					onChange={handleChange}
					className="border p-2 w-full"
				/>
				<input
					name="phone"
					placeholder="Phone"
					onChange={handleChange}
					className="border p-2 w-full"
				/>
				<textarea
					name="education"
					placeholder="Education"
					onChange={handleChange}
					className="border p-2 w-full"
				/>
				<textarea
					name="experience"
					placeholder="Experience"
					onChange={handleChange}
					className="border p-2 w-full"
				/>
				<textarea
					name="skills"
					placeholder="Skills"
					onChange={handleChange}
					className="border p-2 w-full"
				/>
				<button type="submit" className="bg-blue-500 text-white p-2">
					Save CV
				</button>
			</form>

			<div className="mt-4">
				<h3 className="text-lg font-semibold">CV Preview</h3>
				<div ref={componentRef} className="border p-4 my-2">
					<h1 className="text-2xl font-bold">{form.name}</h1>
					<p>
						{form.email} | {form.phone}
					</p>
					<h2 className="font-semibold mt-2">Education</h2>
					<p>{form.education}</p>
					<h2 className="font-semibold mt-2">Experience</h2>
					<p>{form.experience}</p>
					<h2 className="font-semibold mt-2">Skills</h2>
					<p>{form.skills}</p>
				</div>
				<button onClick={handlePrint} className="bg-gray-500 text-white p-2">
					Download PDF
				</button>
			</div>
		</div>
	);
}
