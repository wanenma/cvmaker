import React from "react";
import { Link } from "react-router-dom";

export default function App() {
	return (
		<div className="p-4">
			<h1 className="text-3xl font-bold">Welcome to CV Maker</h1>
			<p className="mt-2">Create and download your professional CV</p>
			<div className="mt-4 space-x-2">
				<Link to="/register" className="bg-blue-500 text-white p-2">
					Register
				</Link>
				<Link to="/login" className="bg-green-500 text-white p-2">
					Login
				</Link>
			</div>
		</div>
	);
}
