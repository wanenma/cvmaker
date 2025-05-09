import { useState } from "react";
import Input from "./components/input";
import Buttons from "./components/buttons";

import "./App.css";

function App() {
	const [activeComponent, setActiveComponent] = useState("generalInfo");
	const [generalInfo, setGeneralInfo] = useState({
		firstname: "",
		lastname: "",
		phone: "",
		email: "",
		location: "",
		languages: "",
		linkedin: "",
		summary: "",
	});
	const HandleGeneralInfoChange = (field, value) => {
		setGeneralInfo((previnfo) => ({ ...previnfo, [field]: value }));
	};
	const [education, setEducation] = useState([]);
	const [workExperience, setWorkExperience] = useState([]);
	const [skills, setSkills] = useState([]);

	return (
		<>
			<Buttons setActiveComponent={setActiveComponent} />

			<Input
				activeComponent={activeComponent}
				GeneralInfo={generalInfo}
				OnGeneralInfoChange={HandleGeneralInfoChange}
			/>
		</>
	);
}

export default App;
