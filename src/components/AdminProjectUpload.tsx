import { useState, useRef } from 'react';
import './styles/AdminProjectUpload.css';

const AdminProjectUpload = ({ onProjectAdded }: { onProjectAdded: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formRef.current) return;

    setLoading(true);
    const formData = new FormData(formRef.current);
    
    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();
      if (data.success) {
        setIsOpen(false);
        onProjectAdded();
        formRef.current.reset();
      } else {
        alert('Failed to upload project');
      }
    } catch (err) {
      console.error(err);
      alert('Error uploading project');
    }
    setLoading(false);
  };

  return (
    <>
      <button 
        className="admin-upload-btn" 
        onClick={() => setIsOpen(true)}
      >
        + Add Project
      </button>

      {isOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <h3>Upload New Project</h3>
            <button className="close-btn" onClick={() => setIsOpen(false)}>×</button>
            
            <form ref={formRef} onSubmit={handleSubmit}>
              <div className="form-group">
                <label>Title</label>
                <input type="text" name="title" required />
              </div>
              <div className="form-group">
                <label>Description (Text)</label>
                <textarea name="description" rows={4} required></textarea>
              </div>
              <div className="form-group">
                <label>Media Type</label>
                <select name="mediaType">
                  <option value="image">Image</option>
                  <option value="video">Video</option>
                </select>
              </div>
              <div className="form-group">
                <label>Upload File</label>
                <input type="file" name="media" accept="image/*,video/*" required />
              </div>
              <button type="submit" className="submit-btn" disabled={loading}>
                {loading ? 'Uploading...' : 'Save Project'}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminProjectUpload;
