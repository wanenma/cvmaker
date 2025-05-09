import React from "react";
import { useState } from "react";

const Buttons = ({ setActiveComponent }) => {
	const [activeButton, setActiveButton] = useState("generalInfo");

	const HandleButton = (componentName) => {
		setActiveButton(componentName);
		setActiveComponent(componentName);
	};

	return (
		<div>
			<button
				type="button"
				name="generalInfo"
				className={`nav-button ${activeButton === "generalInfo" ? "active" : ""}`}
				onClick={() => HandleButton("generalInfo")}
			>
				General Info
			</button>
			<button
				type="button"
				name="education"
				className={`nav-button ${activeButton === "education" ? "active" : ""}`}
				onClick={() => HandleButton("education")}
			>
				Education
			</button>
			<button
				type="button"
				name="workExperience"
				className={`nav-button ${activeButton === "workExperience" ? "active" : ""}`}
				onClick={() => HandleButton("workExperience")}
			>
				Work Experience
			</button>
			<button
				type="button"
				name="skills"
				className={`nav-button ${activeButton === "skills" ? "active" : ""}`}
				onClick={() => HandleButton("skills")}
			>
				Skills
			</button>
		</div>
	);
};

export default Buttons;
