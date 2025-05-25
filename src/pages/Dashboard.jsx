import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function Dashboard() {
	const [cvs, setCvs] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) return navigate("/login");

		axios
			.get("http://localhost:3001/api/cvs", {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((res) => setCvs(res.data))
			.catch(() => navigate("/login"));
	}, []);

	return (
		<div>
			<h2>Your Saved CVs</h2>
			<Link to="/builder">
				<button>Create New CV</button>
			</Link>
			<ul>
				{cvs.map((cv) => (
					<li key={cv.id}>
						{cv.name} - {cv.email}
					</li>
				))}
			</ul>
		</div>
	);
}

export default Dashboard;
