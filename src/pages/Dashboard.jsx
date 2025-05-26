import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CVForm from '../components/CVForm';
import CVList from '../components/CVList';

export default function Dashboard() {
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem('token');
		if (!token) {
			navigate('/login');
		}
	}, [navigate]);

	const handleLogout = () => {
		localStorage.removeItem('token');
		navigate('/login');
	};

	return (
		<div className="dashboard">
			<header className="dashboard-header">
				<h1>CV Maker Dashboard</h1>
				<button onClick={handleLogout} className="logout-btn">
					Logout
				</button>
			</header>

			<div className="dashboard-content">
				<section className="create-cv-section">
					<h2>Create New CV</h2>
					<CVForm onSave={() => window.location.reload()} />
				</section>

				<section className="cv-list-section">
					<CVList />
				</section>
			</div>
		</div>
	);
}
