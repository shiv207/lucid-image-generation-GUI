function SimpleApp() {
  return (
    <div style={{ 
      height: '100vh', 
      width: '100vw', 
      display: 'flex', 
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #6366f1, #8b5cf6, #d946ef)',
      color: 'white',
      fontFamily: 'system-ui, sans-serif'
    }}>
      <div style={{
        padding: '2rem',
        borderRadius: '1rem',
        backdropFilter: 'blur(16px)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        border: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.2)'
      }}>
        <h1 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Lucid Image Generator</h1>
        <p>If you can see this, React is working correctly!</p>
        <p>The main app is not rendering due to errors in the components.</p>
        <button style={{
          marginTop: '1rem',
          padding: '0.5rem 1rem',
          borderRadius: '0.5rem',
          backgroundColor: '#6366f1',
          color: 'white',
          border: 'none',
          cursor: 'pointer'
        }}>Test Button</button>
      </div>
    </div>
  );
}

export default SimpleApp;
