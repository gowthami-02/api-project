import React, { useState } from 'react';
import { scanTarget } from './services/api';
import { ShieldCheck, AlertCircle } from 'lucide-react';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [scanData, setScanData] = useState(null);
  const [error, setError] = useState(null);

  const handleScan = async (formData) => {
    setIsLoading(true);
    setScanData(null);
    setError(null);

    try {
      const data = await scanTarget(formData);
      setScanData(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <header style={{
        backgroundColor: 'var(--bg-card)',
        borderBottom: '1px solid var(--border-light)',
        padding: '24px 0',
        marginBottom: '40px'
      }}>
        <div className="container" style={{ padding: '0 20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', justifyContent: 'center' }}>
            <div style={{
              backgroundColor: 'var(--primary)',
              borderRadius: '8px',
              padding: '8px',
              color: 'white',
              display: 'flex'
            }}>
              <ShieldCheck size={28} />
            </div>
            <h1 style={{ fontSize: '1.5rem', color: 'var(--text-primary)' }}>API Logic & Behavior Analysis</h1>
          </div>
        </div>
      </header>

      <main className="container">
        {error && (
          <div style={{
            backgroundColor: 'var(--sev-critical-bg)',
            color: 'var(--sev-critical)',
            padding: '16px',
            borderRadius: 'var(--radius-md)',
            marginBottom: '32px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <AlertCircle size={24} />
            {error}
          </div>
        )}

        {/* Input Section - always visible, but maybe simpler state if results exist? 
            For now, keep it visible so they can rescan easily. */}
        
      </main>

      <footer style={{
        textAlign: 'center',
        padding: '32px',
        color: 'var(--text-tertiary)',
        fontSize: '0.85rem'
      }}>
        API Analysis System &copy; {new Date().getFullYear()}
      </footer>
    </div>
  );
}

export default App;
