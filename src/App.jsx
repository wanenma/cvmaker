import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import './App.css';

export default function App() {
	return (
		<Router>
			<div className="app">
				<Routes>
					<Route path="/login" element={<Login />} />
					<Route path="/register" element={<Register />} />
					<Route path="/dashboard" element={<Dashboard />} />
					<Route path="/" element={<Navigate to="/login" />} />
				</Routes>
			</div>
		</Router>
	);
}
