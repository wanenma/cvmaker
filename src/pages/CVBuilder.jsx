import React, { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ReactToPrint from "react-to-print";

function CVBuilder() {
	const [form, setForm] = useState({
		name: "",
		email: "",
		phone: "",
		education: "",
		experience: "",
		skills: "",
	});
	const componentRef = useRef();
	const navigate = useNavigate();

	const handleChange = (e) =>
		setForm({ ...form, [e.target.name]: e.target.value });

	const handleSave = () => {
		const token = localStorage.getItem("token");
		axios
			.post("http://localhost:3001/api/cv", form, {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then(() => navigate("/dashboard"))
			.catch(() => alert("Error saving CV"));
	};

	return (
		<div>
			<h2>Build Your CV</h2>
			<input name="name" placeholder="Name" onChange={handleChange} />
			<input name="email" placeholder="Email" onChange={handleChange} />
			<input name="phone" placeholder="Phone" onChange={handleChange} />
			<textarea
				name="education"
				placeholder="Education"
				onChange={handleChange}
			/>
			<textarea
				name="experience"
				placeholder="Experience"
				onChange={handleChange}
			/>
			<textarea name="skills" placeholder="Skills" onChange={handleChange} />
			<button onClick={handleSave}>Save</button>
			<ReactToPrint
				trigger={() => <button>Download as PDF</button>}
				content={() => componentRef.current}
			/>
			<div
				ref={componentRef}
				style={{ marginTop: 20, border: "1px solid #000", padding: 10 }}
			>
				<h3>{form.name}</h3>
				<p>Email: {form.email}</p>
				<p>Phone: {form.phone}</p>
				<p>
					<strong>Education</strong>
					<br />
					{form.education}
				</p>
				<p>
					<strong>Experience</strong>
					<br />
					{form.experience}
				</p>
				<p>
					<strong>Skills</strong>
					<br />
					{form.skills}
				</p>
			</div>
		</div>
	);
}

export default CVBuilder;
