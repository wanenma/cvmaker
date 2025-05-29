import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import html2pdf from 'html2pdf.js';

export default function CVList() {
  const [cvs, setCvs] = useState([]);
  const [selectedCV, setSelectedCV] = useState(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const previewRef = useRef();

  const fetchCVs = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3001/api/cvs', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setCvs(response.data);
    } catch (err) {
      console.error('Error fetching CVs:', err);
    }
  };

  useEffect(() => {
    fetchCVs();
  }, []);

  const handleDelete = async (cvId) => {
    if (!window.confirm('Are you sure you want to delete this CV?')) {
      return;
    }

    try {
      setIsDeleting(true);
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:3001/api/cv/${cvId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      // Refresh the CV list after successful deletion
      fetchCVs();
    } catch (err) {
      console.error('Error deleting CV:', err);
      alert('Failed to delete CV');
    } finally {
      setIsDeleting(false);
    }
  };

  const downloadCV = async (cv) => {
    try {
      setIsGeneratingPDF(true);
      setSelectedCV(cv);

      // Create a temporary div for PDF generation
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = `
        <div style="padding: 40px; font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; background: white;">
          <div style="text-align: center; margin-bottom: 40px;">
            <h1 style="margin: 0; color: #1e293b; font-size: 36px; text-transform: uppercase; letter-spacing: 2px; border-bottom: 3px solid #4f46e5; padding-bottom: 10px; display: inline-block;">${cv.name}</h1>
            <div style="margin-top: 15px; font-size: 16px; color: #64748b;">
              <p style="margin: 5px 0;">${cv.email}</p>
              <p style="margin: 5px 0;">${cv.phone}</p>
            </div>
          </div>

          <div style="margin: 25px 0;">
            <h2 style="color: #1e293b; border-bottom: 2px solid #4f46e5; padding-bottom: 8px; font-size: 24px;">Education</h2>
            <div style="font-size: 16px; line-height: 1.6; color: #334155; white-space: pre-line; margin-top: 15px;">
              ${cv.education}
            </div>
          </div>

          <div style="margin: 25px 0;">
            <h2 style="color: #1e293b; border-bottom: 2px solid #4f46e5; padding-bottom: 8px; font-size: 24px;">Professional Experience</h2>
            <div style="font-size: 16px; line-height: 1.6; color: #334155; white-space: pre-line; margin-top: 15px;">
              ${cv.experience}
            </div>
          </div>

          <div style="margin: 25px 0;">
            <h2 style="color: #1e293b; border-bottom: 2px solid #4f46e5; padding-bottom: 8px; font-size: 24px;">Skills</h2>
            <div style="font-size: 16px; line-height: 1.6; color: #334155; white-space: pre-line; margin-top: 15px;">
              ${cv.skills}
            </div>
          </div>
        </div>
      `;

      document.body.appendChild(tempDiv);

      const opt = {
        margin: 0.5,
        filename: `${cv.name.replace(/\s+/g, '_')}_CV.pdf`,
        image: { type: 'jpeg', quality: 1 },
        html2canvas: { 
          scale: 2,
          useCORS: true,
          backgroundColor: '#FFFFFF'
        },
        jsPDF: { 
          unit: 'in', 
          format: 'letter', 
          orientation: 'portrait'
        }
      };

      await html2pdf().from(tempDiv).set(opt).save();
      document.body.removeChild(tempDiv);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsGeneratingPDF(false);
      setSelectedCV(null);
    }
  };

  return (
    <div className="cv-list">
      <h2>Your CVs</h2>
      {cvs.length === 0 ? (
        <p>No CVs found. Create your first CV!</p>
      ) : (
        <div className="cv-grid">
          {cvs.map((cv) => (
            <div key={cv.id} className="cv-card">
              <div className="cv-card-header">
                <h3>{cv.name}</h3>
                <div className="cv-card-actions">
                  <button
                    onClick={() => downloadCV(cv)}
                    className="download-btn"
                    disabled={isGeneratingPDF}
                  >
                    {isGeneratingPDF ? 'Generating...' : 'Download PDF'}
                  </button>
                  <button
                    onClick={() => handleDelete(cv.id)}
                    className="delete-btn"
                    disabled={isDeleting}
                  >
                    {isDeleting ? 'Deleting...' : 'Delete'}
                  </button>
                </div>
              </div>
              <p><strong>Email:</strong> {cv.email}</p>
              <p><strong>Phone:</strong> {cv.phone}</p>
              <div className="cv-section">
                <h4>Education</h4>
                <p>{cv.education}</p>
              </div>
              <div className="cv-section">
                <h4>Experience</h4>
                <p>{cv.experience}</p>
              </div>
              <div className="cv-section">
                <h4>Skills</h4>
                <p>{cv.skills}</p>
              </div>
              <p className="cv-date">Created: {new Date(cv.created_at).toLocaleDateString()}</p>
            </div>
          ))}
        </div>
      )}

      {/* CV Preview for PDF generation */}
      <div className="cv-preview" ref={previewRef} style={{ display: selectedCV ? 'block' : 'none' }}>
        <div className="cv-preview-header">
          <h1>{selectedCV?.name || ''}</h1>
          <div className="cv-preview-contact">
            <p>{selectedCV?.email || ''}</p>
            <p>{selectedCV?.phone || ''}</p>
          </div>
        </div>

        <div className="cv-preview-section">
          <h2>Education</h2>
          <div className="cv-preview-content">
            {selectedCV?.education || ''}
          </div>
        </div>

        <div className="cv-preview-section">
          <h2>Professional Experience</h2>
          <div className="cv-preview-content">
            {selectedCV?.experience || ''}
          </div>
        </div>

        <div className="cv-preview-section">
          <h2>Skills</h2>
          <div className="cv-preview-content">
            {selectedCV?.skills || ''}
          </div>
        </div>
      </div>
    </div>
  );
} 