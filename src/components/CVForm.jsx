import { useState } from 'react';
import axios from 'axios';

export default function CVForm({ onSave }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    education: '',
    experience: '',
    skills: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      await axios.post('http://localhost:3001/api/cv', formData, {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (onSave) onSave();
      setFormData({
        name: '',
        email: '',
        phone: '',
        education: '',
        experience: '',
        skills: ''
      });
    } catch (err) {
      console.error('Error saving CV:', err);
      alert('Failed to save CV');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="cv-form">
      <div className="form-group">
        <label>Full Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Phone:</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
      </div>

      <div className="form-group">
        <label>Education:</label>
        <textarea
          name="education"
          value={formData.education}
          onChange={handleChange}
          placeholder="List your educational background"
          required
        />
      </div>

      <div className="form-group">
        <label>Experience:</label>
        <textarea
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          placeholder="List your work experience"
          required
        />
      </div>

      <div className="form-group">
        <label>Skills:</label>
        <textarea
          name="skills"
          value={formData.skills}
          onChange={handleChange}
          placeholder="List your skills"
          required
        />
      </div>

      <button type="submit">Save CV</button>
    </form>
  );
} 