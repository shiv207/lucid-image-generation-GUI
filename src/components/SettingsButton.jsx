import React, { useState, useEffect } from 'react';
import '../styles/settings.css';

const SettingsButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [maskedApiKey, setMaskedApiKey] = useState('');
  const [showApiKey, setShowApiKey] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    // Get the API key from localStorage or use the environment variable
    const storedApiKey = localStorage.getItem('HUGGINGFACE_API_KEY') || import.meta.env.VITE_HUGGINGFACE_API_KEY || '';
    setApiKey(storedApiKey);
    
    // Create masked version (show only last 4 characters)
    if (storedApiKey) {
      const masked = storedApiKey.length > 4
        ? '•'.repeat(storedApiKey.length - 4) + storedApiKey.slice(-4)
        : storedApiKey;
      setMaskedApiKey(masked);
    }
  }, []);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    // Reset states when closing the modal
    if (isModalOpen) {
      setShowApiKey(false);
      setIsCopied(false);
      setStatus({ type: '', message: '' });
      setIsEditing(false);
    }
  };

  const handleApiKeyChange = (e) => {
    setApiKey(e.target.value);
    setStatus({ type: '', message: '' });
  };

  const toggleShowApiKey = () => {
    setShowApiKey(!showApiKey);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(apiKey).then(() => {
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    });
  };

  const startEditing = () => {
    setIsEditing(true);
    setShowApiKey(true);
  };

  const cancelEditing = () => {
    // Revert to the stored key
    const storedApiKey = localStorage.getItem('HUGGINGFACE_API_KEY') || import.meta.env.VITE_HUGGINGFACE_API_KEY || '';
    setApiKey(storedApiKey);
    setIsEditing(false);
    setShowApiKey(false);
    setStatus({ type: '', message: '' });
  };

  const validateApiKey = (key) => {
    // Basic validation for HuggingFace API key format (typically starts with 'hf_')
    const isValidFormat = key.startsWith('hf_') && key.length >= 20;
    return isValidFormat;
  };

  const saveApiKey = () => {
    if (!apiKey.trim()) {
      setStatus({ type: 'error', message: 'API key cannot be empty' });
      return;
    }

    if (!validateApiKey(apiKey)) {
      setStatus({ 
        type: 'error', 
        message: 'Invalid API key format. HuggingFace API keys typically start with "hf_" and are at least 20 characters long.'
      });
      return;
    }

    try {
      // Store in localStorage
      localStorage.setItem('HUGGINGFACE_API_KEY', apiKey);
      
      // Update masked version
      const masked = apiKey.length > 4
        ? '•'.repeat(apiKey.length - 4) + apiKey.slice(-4)
        : apiKey;
      setMaskedApiKey(masked);
      
      setStatus({ type: 'success', message: 'API key saved successfully' });
      setIsEditing(false);
      setShowApiKey(false);
      
      // Inform the user they may need to refresh the app
      setTimeout(() => {
        setStatus({ type: 'info', message: 'Please refresh the app to apply your new API key' });
      }, 2000);
    } catch (error) {
      setStatus({ type: 'error', message: 'Failed to save API key: ' + error.message });
    }
  };

  return (
    <>
      <button 
        className="settings-button" 
        onClick={toggleModal}
        aria-label="Settings"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="3"></circle>
          <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
        </svg>
        <span>Settings</span>
      </button>

      {isModalOpen && (
        <div className="settings-modal-overlay">
          <div className="settings-modal">
            <div className="settings-modal-header">
              <h2>Settings</h2>
              <button className="close-button" onClick={toggleModal} aria-label="Close">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <div className="settings-modal-content">
              <div className="settings-section">
                <h3>API Key Management</h3>
                <p className="settings-description">
                  Manage your HuggingFace API key for image generation. Your API key is used to interact with the image generation models.
                </p>
                
                <div className="api-key-container">
                  <div className="api-key-input-group">
                    <label htmlFor="api-key">HuggingFace API Key</label>
                    {isEditing ? (
                      <input
                        id="api-key"
                        type={showApiKey ? "text" : "password"}
                        value={apiKey}
                        onChange={handleApiKeyChange}
                        placeholder="Enter your HuggingFace API key"
                        className="api-key-input"
                      />
                    ) : (
                      <div className="api-key-display">
                        <span className={`api-key-text ${!apiKey ? 'no-key' : ''}`}>
                          {apiKey ? (showApiKey ? apiKey : maskedApiKey) : 'No API key set'}
                        </span>
                        {apiKey && (
                          <div className="key-actions">
                            <button
                              className="action-button"
                              onClick={toggleShowApiKey}
                              aria-label={showApiKey ? "Hide API Key" : "Show API Key"}
                            >
                              {showApiKey ? "Hide" : "Show"}
                            </button>
                            <button
                              className={`action-button ${isCopied ? 'copied' : ''}`}
                              onClick={copyToClipboard}
                              aria-label="Copy API Key"
                            >
                              {isCopied ? "Copied!" : "Copy"}
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <div className="api-key-actions">
                    {isEditing ? (
                      <>
                        <button className="save-button" onClick={saveApiKey}>
                          Save Key
                        </button>
                        <button className="cancel-button" onClick={cancelEditing}>
                          Cancel
                        </button>
                      </>
                    ) : (
                      <button className="edit-button" onClick={startEditing}>
                        {apiKey ? "Update Key" : "Add Key"}
                      </button>
                    )}
                  </div>
                  
                  {status.message && (
                    <div className={`status-message ${status.type}`}>
                      {status.message}
                    </div>
                  )}
                  
                  <div className="api-key-help">
                    <h4>How to get a HuggingFace API Key:</h4>
                    <ol>
                      <li>Visit <a href="https://huggingface.co/" target="_blank" rel="noopener noreferrer">HuggingFace.co</a> and sign in or create an account</li>
                      <li>Go to your profile settings and select "Access Tokens"</li>
                      <li>Create a new token with read access</li>
                      <li>Copy the token and paste it here</li>
                    </ol>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default SettingsButton;
