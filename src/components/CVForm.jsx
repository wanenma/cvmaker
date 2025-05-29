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

  const [errors, setErrors] = useState({
    email: '',
    phone: ''
  });

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^\d+$/;
    return phoneRegex.test(phone);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === 'phone') {
      // Only allow numbers
      if (value === '' || /^\d+$/.test(value)) {
        setFormData({
          ...formData,
          [name]: value
        });
        setErrors({
          ...errors,
          phone: value === '' ? 'Phone number is required' : ''
        });
      }
    } else if (name === 'email') {
      setFormData({
        ...formData,
        [name]: value
      });
      setErrors({
        ...errors,
        email: !validateEmail(value) ? 'Please enter a valid email address' : ''
      });
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate before submission
    const emailError = !validateEmail(formData.email) ? 'Please enter a valid email address' : '';
    const phoneError = !validatePhone(formData.phone) ? 'Please enter a valid phone number' : '';

    if (emailError || phoneError) {
      setErrors({
        email: emailError,
        phone: phoneError
      });
      return;
    }

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
      setErrors({
        email: '',
        phone: ''
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
          pattern="[^\s@]+@[^\s@]+\.[^\s@]+"
          title="Please enter a valid email address"
        />
        {errors.email && <div className="error-message">{errors.email}</div>}
      </div>

      <div className="form-group">
        <label>Phone:</label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          pattern="\d+"
          title="Please enter numbers only"
        />
        {errors.phone && <div className="error-message">{errors.phone}</div>}
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