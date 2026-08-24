import { apiFetch } from "../api";
import { useState, useEffect } from "react";
import AdminProjectUpload from "../components/AdminProjectUpload";

interface LeadItem {
  _id: string;
  name: string;
  email: string;
  company?: string;
  projectType?: string;
  budget?: string;
  timeline?: string;
  notes?: string;
  score?: number;
  status?: string;
  date?: string;
}

const AdminDashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await apiFetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    if (data.success && (data.role === "admin" || data.role === "manager")) {
      setIsAuthenticated(true);
    } else {
      alert("Login failed. Default credentials: admin / password");
    }
  };

  const handleLogout = async () => {
    await apiFetch("/api/logout", { method: "POST" });
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: 'var(--backgroundColor)', color: 'var(--textColor)' }}>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', background: 'rgba(255,255,255,0.05)', backdropFilter: 'blur(10px)', padding: '3rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', width: '100%', maxWidth: '400px' }}>
          <h2 style={{ margin: 0, fontSize: '2rem', textAlign: 'center' }}>Admin Login</h2>
          <input 
            type="text" 
            placeholder="Username" 
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
            style={{ padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.3)', color: 'white', fontSize: '1rem' }}
          />
          <input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            style={{ padding: '1rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.2)', background: 'rgba(0,0,0,0.3)', color: 'white', fontSize: '1rem' }}
          />
          <button type="submit" style={{ padding: '1rem', borderRadius: '8px', border: 'none', background: 'var(--accentColor)', color: '#050810', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem', marginTop: '1rem', transition: 'opacity 0.3s' }} onMouseOver={(e)=>e.currentTarget.style.opacity='0.8'} onMouseOut={(e)=>e.currentTarget.style.opacity='1'}>Login to Dashboard</button>
        </form>
      </div>
    );
  }

  const AdminLeadsManager = () => {
    const [leads, setLeads] = useState<LeadItem[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchLeads = async () => {
      setLoading(true);
      try {
        const res = await apiFetch("/api/leads");
        const data = await res.json();
        if (data.success && Array.isArray(data.leads)) {
          setLeads(data.leads);
        }
      } catch (e) {
        console.error("Failed to fetch leads", e);
      } finally {
        setLoading(false);
      }
    };

    useEffect(() => {
      fetchLeads();
    }, []);

    const downloadLeadsCsv = () => {
      window.open("/api/leads/export-csv", "_blank");
    };

    const downloadProjectsCsv = () => {
      window.open("/api/projects/export-csv", "_blank");
    };

    return (
      <div style={{ marginTop: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <h2 style={{ margin: 0, fontSize: '1.6rem' }}>Customer Quote Requests & Inquiries</h2>
            <p style={{ margin: '4px 0 0 0', opacity: 0.7, fontSize: '0.9rem' }}>
              All submitted quotes and contact form messages are automatically saved to CSV.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            <button
              onClick={downloadLeadsCsv}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0.8rem 1.4rem',
                borderRadius: '10px',
                border: 'none',
                background: 'var(--accentColor)',
                color: '#050810',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '0.95rem'
              }}
            >
              📥 Download Quotes CSV
            </button>
            <button
              onClick={downloadProjectsCsv}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '0.8rem 1.4rem',
                borderRadius: '10px',
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'rgba(255,255,255,0.05)',
                color: 'white',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '0.95rem'
              }}
            >
              📁 Download Photos Catalog CSV
            </button>
            <button
              onClick={fetchLeads}
              style={{
                padding: '0.8rem 1.2rem',
                borderRadius: '10px',
                border: '1px solid rgba(255,255,255,0.2)',
                background: 'transparent',
                color: 'white',
                cursor: 'pointer'
              }}
            >
              🔄 Refresh
            </button>
          </div>
        </div>

        {loading ? (
          <p style={{ color: 'var(--accentColor)' }}>Loading quotes...</p>
        ) : leads.length === 0 ? (
          <div style={{ padding: '2rem', textAlign: 'center', background: 'rgba(0,0,0,0.2)', borderRadius: '10px', border: '1px dashed rgba(255,255,255,0.1)' }}>
            <p style={{ margin: 0, opacity: 0.7 }}>No customer quote requests recorded yet. When a customer sends a quote or message, it will appear here and in the CSV automatically.</p>
          </div>
        ) : (
          <div style={{ overflowX: 'auto', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.25)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.92rem' }}>
              <thead>
                <tr style={{ background: 'rgba(255,255,255,0.06)', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                  <th style={{ padding: '12px 16px' }}>Date</th>
                  <th style={{ padding: '12px 16px' }}>Customer</th>
                  <th style={{ padding: '12px 16px' }}>Email</th>
                  <th style={{ padding: '12px 16px' }}>Project / Plan</th>
                  <th style={{ padding: '12px 16px' }}>Budget</th>
                  <th style={{ padding: '12px 16px' }}>Message / Notes</th>
                  <th style={{ padding: '12px 16px' }}>Status</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead, idx) => (
                  <tr key={lead._id || idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '12px 16px', whiteSpace: 'nowrap', opacity: 0.7 }}>
                      {lead.date ? new Date(lead.date).toLocaleDateString() : 'Recent'}
                    </td>
                    <td style={{ padding: '12px 16px', fontWeight: 600 }}>{lead.name}</td>
                    <td style={{ padding: '12px 16px' }}>
                      <a href={`mailto:${lead.email}`} style={{ color: 'var(--accentColor)', textDecoration: 'none' }}>
                        {lead.email}
                      </a>
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ background: 'rgba(94,234,212,0.1)', color: 'var(--accentColor)', padding: '3px 8px', borderRadius: '6px', fontSize: '0.85rem' }}>
                        {lead.projectType || 'General'}
                      </span>
                    </td>
                    <td style={{ padding: '12px 16px', fontWeight: 600 }}>{lead.budget || 'N/A'}</td>
                    <td style={{ padding: '12px 16px', maxWidth: '300px', whiteSpace: 'pre-wrap', opacity: 0.85 }}>
                      {lead.notes}
                    </td>
                    <td style={{ padding: '12px 16px' }}>
                      <span style={{ background: 'rgba(255,255,255,0.1)', padding: '3px 10px', borderRadius: '20px', fontSize: '0.8rem' }}>
                        {lead.status || 'New'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  const AdminContentEditor = () => {
    const [contentMap, setContentMap] = useState<Record<string, string>>({});
    
    const fetchContent = async () => {
      const res = await apiFetch("/api/content");
      const data = await res.json();
      if (data.success) {
        setContentMap(data.content);
      }
    };

    useEffect(() => {
      fetchContent();
    }, []);

    const handleSave = async (key: string) => {
      const value = contentMap[key];
      await apiFetch("/api/content", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key, value })
      });
      alert(`Saved ${key}!`);
    };

    return (
      <div style={{ marginTop: '1rem' }}>
        <h2 style={{ marginBottom: '1rem', fontSize: '1.6rem' }}>Content Management</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <h4>About Text</h4>
            <textarea 
              value={contentMap['about_text'] || ''} 
              onChange={(e) => setContentMap({ ...contentMap, 'about_text': e.target.value })}
              style={{ width: '100%', height: '100px', padding: '1rem', background: 'rgba(0,0,0,0.3)', color: 'white', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', boxSizing: 'border-box' }}
            />
            <button onClick={() => handleSave('about_text')} style={{ marginTop: '1rem', padding: '0.8rem 1.5rem', background: 'var(--accentColor)', color: '#050810', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Save About Text</button>
          </div>
          
          <div>
            <h4>Career Timeline (JSON)</h4>
            <p style={{ fontSize: '0.8rem', opacity: 0.7 }}>{'Format: [{"date": "JAN 2024 - PRESENT", "title": "Developer", "status": "NOW", "desc": "Description..."}]'}</p>
            <textarea 
              value={contentMap['career_timeline'] || ''} 
              onChange={(e) => setContentMap({ ...contentMap, 'career_timeline': e.target.value })}
              style={{ width: '100%', height: '150px', padding: '1rem', background: 'rgba(0,0,0,0.3)', color: 'white', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', fontFamily: 'monospace', boxSizing: 'border-box' }}
            />
            <button onClick={() => handleSave('career_timeline')} style={{ marginTop: '1rem', padding: '0.8rem 1.5rem', background: 'var(--accentColor)', color: '#050810', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Save Career Timeline</button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div style={{ padding: '4rem 2rem', backgroundColor: 'var(--backgroundColor)', minHeight: '100vh', color: 'var(--textColor)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '3rem' }}>
          <h1 style={{ margin: 0, fontSize: '2.5rem' }}>Admin <span style={{ color: 'var(--accentColor)' }}>Dashboard</span></h1>
          <div style={{ display: 'flex', gap: '12px' }}>
            <a href="/" style={{ padding: '0.8rem 1.5rem', borderRadius: '30px', border: '1px solid var(--accentColor)', color: 'var(--textColor)', textDecoration: 'none' }}>&larr; Back to Site</a>
            <button onClick={handleLogout} style={{ padding: '0.8rem 1.5rem', borderRadius: '30px', border: '1px solid rgba(255,255,255,0.2)', background: 'transparent', color: 'white', cursor: 'pointer' }}>Logout</button>
          </div>
        </div>
        
        {/* Customer Quotes & Leads Manager */}
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '2rem' }}>
          <AdminLeadsManager />
        </div>

        {/* Portfolio & Photos Management */}
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)', marginBottom: '2rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ margin: 0, fontSize: '1.6rem' }}>Portfolio & Photos Management</h2>
              <p style={{ margin: '4px 0 0 0', opacity: 0.7, fontSize: '0.9rem' }}>Upload project assets, graphics, and track photo URLs in CSV.</p>
            </div>
            <div style={{ display: 'flex', gap: '10px' }}>
              <AdminProjectUpload onProjectAdded={() => window.location.reload()} />
              <button
                onClick={() => window.open("/api/projects/export-csv", "_blank")}
                style={{
                  padding: '0.8rem 1.2rem',
                  borderRadius: '8px',
                  border: '1px solid rgba(255,255,255,0.2)',
                  background: 'rgba(255,255,255,0.05)',
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}
              >
                📥 Export Photos CSV
              </button>
            </div>
          </div>
        </div>

        {/* Content Editor */}
        <div style={{ background: 'rgba(255,255,255,0.03)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
          <AdminContentEditor />
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
