import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../context/AppContext';
import LucidIcons from './LucidIcons';

export default function SettingsPanel() {
  const { 
    showSettings, 
    setShowSettings, 
    apiKey, 
    updateApiKey, 
    verifyApiKey 
  } = useApp();
  
  const [inputApiKey, setInputApiKey] = useState(apiKey);
  const [verificationStatus, setVerificationStatus] = useState({ checked: false, valid: false, message: '' });
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState('');
  
  // Reset input when panel opens
  useEffect(() => {
    if (showSettings) {
      setInputApiKey(apiKey);
      setVerificationStatus({ checked: false, valid: false, message: '' });
      setSaveMessage('');
    }
  }, [showSettings, apiKey]);
  
  const handleVerify = async () => {
    if (!inputApiKey.trim()) {
      setVerificationStatus({ checked: true, valid: false, message: 'Please enter an API key' });
      return;
    }
    
    setVerificationStatus({ checked: false, valid: false, message: 'Verifying...' });
    const result = await verifyApiKey(inputApiKey);
    setVerificationStatus({ checked: true, valid: result.valid, message: result.message });
  };
  
  const handleSave = () => {
    // If key not verified yet, verify it first
    if (inputApiKey.trim() && !verificationStatus.checked) {
      handleVerify();
      return;
    }
    
    setIsSaving(true);
    setSaveMessage('Saving API key...');
    
    // Save API key with a brief delay for UX
    setTimeout(() => {
      updateApiKey(inputApiKey);
      setSaveMessage('API key saved successfully!');
      
      // Clear message after a delay
      setTimeout(() => {
        setSaveMessage('');
        setIsSaving(false);
        setShowSettings(false);
      }, 1500);
    }, 500);
  };

  return (
    <AnimatePresence>
      {showSettings && (
        <motion.div 
          className="settings-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.div 
            className="settings-panel"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 50, opacity: 0 }}
            transition={{ type: 'spring', damping: 25 }}
          >
            <div className="settings-header">
              <h2>Settings</h2>
              <button 
                className="settings-close-button"
                onClick={() => setShowSettings(false)}
                aria-label="Close settings"
              >
                <LucidIcons.Close />
              </button>
            </div>
            
            <div className="settings-content">
              <div className="settings-section">
                <h3>HuggingFace API Key</h3>
                <p className="settings-description">
                  Your API key is used to generate images using the HuggingFace API. 
                  You can get your API key from your <a href="https://huggingface.co/settings/tokens" target="_blank" rel="noopener noreferrer" className="settings-link">HuggingFace account</a>.
                </p>
                
                <div className="api-key-input-container">
                  <input 
                    type="text"
                    className="api-key-input"
                    value={inputApiKey}
                    onChange={(e) => setInputApiKey(e.target.value)}
                    placeholder="Enter your HuggingFace API key"
                  />
                  <button 
                    className="api-key-verify-button"
                    onClick={handleVerify}
                    disabled={!inputApiKey.trim()}
                  >
                    Verify
                  </button>
                </div>
                
                {verificationStatus.message && (
                  <div className={`verification-status ${verificationStatus.checked ? (verificationStatus.valid ? 'valid' : 'invalid') : ''}`}>
                    {verificationStatus.message}
                  </div>
                )}
              </div>
            </div>
            
            <div className="settings-footer">
              <button 
                className="settings-cancel-button"
                onClick={() => setShowSettings(false)}
              >
                Cancel
              </button>
              <button 
                className="settings-save-button"
                onClick={handleSave}
                disabled={isSaving || (!inputApiKey.trim())}
              >
                {isSaving ? 'Saving...' : 'Save'}
              </button>
            </div>
            
            {saveMessage && (
              <div className="save-message">
                {saveMessage}
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
