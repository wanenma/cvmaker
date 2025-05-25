import React, { useEffect, useState } from "react";
import axios from "axios";
import { getToken, removeToken } from "../utils/auth";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
	const [cvs, setCvs] = useState([]);
	const navigate = useNavigate();

	useEffect(() => {
		axios
			.get("http://localhost:3001/api/cvs", {
				headers: { Authorization: "Bearer " + getToken() },
			})
			.then((res) => setCvs(res.data))
			.catch(() => alert("Please log in again"));
	}, []);

	const logout = () => {
		removeToken();
		navigate("/login");
	};

	return (
		<div className="p-4">
			<h2 className="text-xl font-bold mb-2">Dashboard</h2>
			<button
				onClick={() => navigate("/builder")}
				className="bg-green-500 text-white p-2"
			>
				Create New CV
			</button>
			<button onClick={logout} className="ml-2 bg-red-500 text-white p-2">
				Logout
			</button>
			<ul className="mt-4 space-y-2">
				{cvs.map((cv) => (
					<li key={cv.id} className="border p-2">
						<strong>{cv.name}</strong> – {cv.email} – {cv.phone}
					</li>
				))}
			</ul>
		</div>
	);
}
