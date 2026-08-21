import { useState } from "react";
import AdminProjectUpload from "../components/AdminProjectUpload";

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (data.success && (data.role === "admin" || data.role === "manager")) {
      setIsAuthenticated(true);
    } else {
      alert("Login failed");
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'var(--bgColor)', color: 'var(--textColor)' }}>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', padding: '3rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', width: '100%', maxWidth: '400px' }}>
          <h2 style={{ margin: 0, fontSize: '2rem', textAlign: 'center' }}>Admin Login</h2>
          <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            style={{ padding: '1rem', borderRadius: '8px', border: 'none', background: 'rgba(0,0,0,0.3)', color: 'white', fontSize: '1rem' }}
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            style={{ padding: '1rem', borderRadius: '8px', border: 'none', background: 'rgba(0,0,0,0.3)', color: 'white', fontSize: '1rem' }}
          />
          <button type="submit" style={{ padding: '1rem', borderRadius: '8px', border: 'none', background: 'var(--accentColor)', color: 'var(--bgColor)', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', marginTop: '1rem', transition: 'opacity 0.3s' }} onMouseOver={(e)=>e.currentTarget.style.opacity='0.8'} onMouseOut={(e)=>e.currentTarget.style.opacity='1'}>Login to Dashboard</button>
        </form>
      </div>
    );
  }

const AdminContentEditor = () => {
  const [contentMap, setContentMap] = useState<Record<string, string>>({});
  
  const fetchContent = async () => {
    const res = await fetch("/api/content");
    const data = await res.json();
    if (data.success) {
      setContentMap(data.content);
    }
  };

  useState(() => { fetchContent(); });

  const handleSave = async (key: string) => {
    const value = contentMap[key];
    await fetch("/api/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ key, value })
    });
    alert(`Saved ${key}!`);
  };

  return (
    <div style={{ marginTop: '3rem' }}>
      <h2 style={{ marginBottom: '1rem' }}>Content Management</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h4>About Text</h4>
          <textarea 
            value={contentMap['about_text'] || ''} 
            onChange={(e) => setContentMap({ ...contentMap, 'about_text': e.target.value })}
            style={{ width: '100%', height: '100px', padding: '1rem', background: 'rgba(0,0,0,0.3)', color: 'white', border: 'none', borderRadius: '8px' }}
          />
          <button onClick={() => handleSave('about_text')} style={{ marginTop: '1rem', padding: '0.8rem 1.5rem', background: 'var(--accentColor)', color: 'var(--bgColor)', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Save About Text</button>
        </div>
        
        <div>
          <h4>Career Timeline (JSON)</h4>
          <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>{'Format: [{"date": "JAN 2024 - PRESENT", "title": "Developer", "status": "NOW", "desc": "Description..."}]'}</p>
          <textarea 
            value={contentMap['career_timeline'] || ''} 
            onChange={(e) => setContentMap({ ...contentMap, 'career_timeline': e.target.value })}
            style={{ width: '100%', height: '150px', padding: '1rem', background: 'rgba(0,0,0,0.3)', color: 'white', border: 'none', borderRadius: '8px', fontFamily: 'monospace' }}
          />
          <button onClick={() => handleSave('career_timeline')} style={{ marginTop: '1rem', padding: '0.8rem 1.5rem', background: 'var(--accentColor)', color: 'var(--bgColor)', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Save Career Timeline</button>
        </div>
      </div>
    </div>
  );
};

  return (
    <div style={{ padding: '4rem 2rem', backgroundColor: 'var(--bgColor)', minHeight: '100vh', color: 'var(--textColor)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem' }}>
          <h1 style={{ margin: 0, fontSize: '3rem' }}>Admin <span style={{ color: 'var(--accentColor)' }}>Dashboard</span></h1>
          <a href="/" style={{ padding: '0.8rem 1.5rem', borderRadius: '30px', border: '1px solid var(--accentColor)', color: 'var(--textColor)', textDecoration: 'none' }}>&larr; Back to Site</a>
        </div>
        
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <h2 style={{ marginBottom: '2rem' }}>Portfolio Management</h2>
          <AdminProjectUpload onProjectAdded={() => window.location.reload()} />
        </div>

        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', marginTop: '2rem' }}>
          <AdminContentEditor />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
