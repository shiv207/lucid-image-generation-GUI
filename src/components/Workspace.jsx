import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useApp, MODELS } from '../context/AppContext';
import LucidIcons from './LucidIcons';

export default function Workspace() {
  const {
    promptInput,
    setPromptInput,
    negativePrompt,
    setNegativePrompt,
    selectedModel,
    setSelectedModel,
    aspectRatio,
    setAspectRatio,
    steps,
    setSteps,
    guidanceScale,
    setGuidanceScale,
    loading,
    error,
    images,
    handleGenerate
  } = useApp();
  
  // State for save notification
  const [saveNotification, setSaveNotification] = useState(false);
  const [savedImageIndex, setSavedImageIndex] = useState(null);
  
  // Function to download the generated image
  const downloadImage = (imageData, prompt, index) => {
    // Create a sanitized filename from the prompt
    const sanitizedPrompt = prompt.slice(0, 30).replace(/[^a-z0-9]/gi, '_').toLowerCase();
    const filename = `lucid_${sanitizedPrompt}_${Date.now()}.png`;
    
    // Create an anchor element and set properties for download
    const link = document.createElement('a');
    link.href = imageData;
    link.download = filename;
    
    // Append to the document, click programmatically, and clean up
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Show save notification
    setSavedImageIndex(index);
    setSaveNotification(true);
    
    // Hide notification after 2 seconds
    setTimeout(() => {
      setSaveNotification(false);
    }, 2000);
  };
  
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [showModelPicker, setShowModelPicker] = useState(false);
  
  // Common aspect ratios
  const aspectRatios = [
    { name: '1:1', width: 1024, height: 1024 },
    { name: '16:9', width: 1280, height: 720 },
    { name: '9:16', width: 720, height: 1280 },
  ];

  return (
    <div className="nike-workspace">
      <div className="nike-workspace-content">
        {/* Prompt heading */}
        <div className="prompt-container">
          <h2 className="prompt-heading lucid-gradient-text">What will you create today?</h2>
          
          {/* Prompt input container */}
          <div className="prompt-input-container">
            <textarea
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              placeholder="CREATE YOUR VISION"
              className="nike-prompt-input"
              rows="3"
            />
            
            {showAdvanced && (
              <div className="advanced-prompt-container">
                <div className="advanced-prompt-header">
                  <span className="advanced-prompt-title">Negative Prompt</span>
                  <button 
                    className="advanced-prompt-close"
                    onClick={() => setShowAdvanced(false)}
                  >
                    <LucidIcons.Close />
                  </button>
                </div>
                <textarea
                  value={negativePrompt}
                  onChange={(e) => setNegativePrompt(e.target.value)}
                  placeholder="Elements to exclude from the image"
                  className="nike-input border-none text-lg p-4 mb-0 bg-transparent"
                  rows="2"
                />
                
                <div className="advanced-controls-section">
                  <div className="slider-control">
                    <div className="slider-header">
                      <span>Steps</span>
                      <span className="slider-value">{steps}</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="50"
                      value={steps}
                      onChange={(e) => setSteps(Number(e.target.value))}
                      className="nike-range"
                    />
                  </div>
                  
                  <div className="slider-control">
                    <div className="slider-header">
                      <span>Guidance Scale</span>
                      <span className="slider-value">{guidanceScale}</span>
                    </div>
                    <input
                      type="range"
                      min="1"
                      max="20"
                      step="0.5"
                      value={guidanceScale}
                      onChange={(e) => setGuidanceScale(Number(e.target.value))}
                      className="nike-range"
                    />
                  </div>
                </div>
              </div>
            )}
            
            {showModelPicker && (
              <div className="model-picker-container">
                <div className="model-picker-header">
                  <div className="model-picker-title">SELECT MODEL</div>
                  <button 
                    className="model-picker-close"
                    onClick={() => setShowModelPicker(false)}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
                
                <div className="model-options">
                  <div 
                    className={`model-option ${selectedModel === MODELS.FLUX_SCHNELL ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedModel(MODELS.FLUX_SCHNELL);
                      setShowModelPicker(false);
                    }}
                  >
                    <div className="model-option-radio">
                      {selectedModel === MODELS.FLUX_SCHNELL && <div className="model-option-radio-selected"></div>}
                    </div>
                    <div className="model-option-content">
                      <div className="model-option-name-container">
                        <div className="model-option-name">FLUX SCHNELL</div>
                        {selectedModel === MODELS.FLUX_SCHNELL && (
                          <div className="model-selected-badge">SELECTED</div>
                        )}
                      </div>
                      <div className="model-option-description">Fast generation with good quality</div>
                    </div>
                  </div>
                  
                  <div 
                    className={`model-option ${selectedModel === MODELS.FLUX_DEV ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedModel(MODELS.FLUX_DEV);
                      setShowModelPicker(false);
                    }}
                  >
                    <div className="model-option-radio">
                      {selectedModel === MODELS.FLUX_DEV && <div className="model-option-radio-selected"></div>}
                    </div>
                    <div className="model-option-content">
                      <div className="model-option-name-container">
                        <div className="model-option-name">FLUX DEV</div>
                        {selectedModel === MODELS.FLUX_DEV && (
                          <div className="model-selected-badge">SELECTED</div>
                        )}
                      </div>
                      <div className="model-option-description">Development version with improved quality</div>
                    </div>
                  </div>
                  
                  <div 
                    className={`model-option ${selectedModel === MODELS.STABLE_DIFFUSION_XL ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedModel(MODELS.STABLE_DIFFUSION_XL);
                      setShowModelPicker(false);
                    }}
                  >
                    <div className="model-option-radio">
                      {selectedModel === MODELS.STABLE_DIFFUSION_XL && <div className="model-option-radio-selected"></div>}
                    </div>
                    <div className="model-option-content">
                      <div className="model-option-name-container">
                        <div className="model-option-name">STABLE DIFFUSION XL</div>
                        {selectedModel === MODELS.STABLE_DIFFUSION_XL && (
                          <div className="model-selected-badge">SELECTED</div>
                        )}
                      </div>
                      <div className="model-option-description">High quality, detailed images</div>
                    </div>
                  </div>
                  
                  <div 
                    className={`model-option ${selectedModel === MODELS.STABLE_DIFFUSION_3 ? 'active' : ''}`}
                    onClick={() => {
                      setSelectedModel(MODELS.STABLE_DIFFUSION_3);
                      setShowModelPicker(false);
                    }}
                  >
                    <div className="model-option-radio">
                      {selectedModel === MODELS.STABLE_DIFFUSION_3 && <div className="model-option-radio-selected"></div>}
                    </div>
                    <div className="model-option-content">
                      <div className="model-option-name-container">
                        <div className="model-option-name">STABLE DIFFUSION 3</div>
                        {selectedModel === MODELS.STABLE_DIFFUSION_3 && (
                          <div className="model-selected-badge">SELECTED</div>
                        )}
                      </div>
                      <div className="model-option-description">Latest model with best quality</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div className="prompt-controls-container">
              <div className="prompt-controls-left">
                <button 
                  onClick={() => setShowModelPicker(!showModelPicker)}
                  className="lucid-button-glow nike-model-button"
                >
                  <div className="model-button-content">
                    <LucidIcons.ModelSelect />
                    <span>MODEL:</span>
                  </div>
                </button>
                
                <button 
                  type="button"
                  className={`aspect-ratio-button ${aspectRatio.width === 1024 && aspectRatio.height === 1024 ? 'active' : ''}`}
                  onClick={() => setAspectRatio({ name: '1:1', width: 1024, height: 1024 })}
                >1:1</button>
                <button 
                  type="button"
                  className={`aspect-ratio-button ${aspectRatio.width === 1280 && aspectRatio.height === 720 ? 'active' : ''}`}
                  onClick={() => setAspectRatio({ name: '16:9', width: 1280, height: 720 })}
                >16:9</button>
                <button 
                  type="button"
                  className={`aspect-ratio-button ${aspectRatio.width === 720 && aspectRatio.height === 1280 ? 'active' : ''}`}
                  onClick={() => setAspectRatio({ name: '9:16', width: 720, height: 1280 })}
                >9:16</button>
                
                <button 
                  className="prompt-control-button lucid-button-glow"
                  onClick={() => setShowAdvanced(!showAdvanced)}
                >
                  <LucidIcons.AdvancedControls />
                  Advanced
                </button>
              </div>
              
              <div className="prompt-controls-right">
                <button 
                  className="nike-generate-button lucid-button-glow"
                  onClick={handleGenerate}
                  disabled={!promptInput.trim() || loading}
                >
                  <LucidIcons.Generate />
                  {loading ? 'Generating...' : 'Generate'}
                </button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Error message area */}
        {error && (
          <div className="nike-error-container">
            <div className="nike-error-message">
              {error.message.includes('API key') ? (
                <>
                  <span className="error-icon">⚠️</span>
                  <span className="error-text">{error.message}</span>
                  <button 
                    className="error-action-button" 
                    onClick={() => {
                      // Find and click the settings button
                      const settingsBtn = document.querySelector('.settings-button');
                      if (settingsBtn) settingsBtn.click();
                    }}
                  >
                    Update API Key
                  </button>
                </>
              ) : (
                <>
                  <span className="error-icon">⚠️</span>
                  <span className="error-text">{error.message}</span>
                </>
              )}
            </div>
          </div>
        )}
        
        {/* Single tab for images */}
        <div className="image-tabs">
          <div className="image-tab">
            <LucidIcons.Images />
            <span>My Creations</span>
          </div>
        </div>
        {/* Error message */}
        {error && (
          <div className="nike-error">
            <h3 className="font-bold mb-2">Error</h3>
            <p>{error}</p>
          </div>
        )}
        
        {/* Empty state */}
        {images.length === 0 && !loading && (
          <div className="nike-empty-state lucid-empty-state">
            <div className="lucid-empty-icon">
              <LucidIcons.Images />
            </div>
            <h3 className="nike-empty-heading">CREATE YOUR FIRST<br/>MASTERPIECE</h3>
            <p className="nike-empty-text">Your generated images will appear here, ready to inspire and delight</p>
            <button 
              className="nike-empty-button"
              onClick={() => document.querySelector('textarea')?.focus()}
            >
              START CREATING
            </button>
          </div>
        )}
        
        {/* Generated images grid */}
        {images.length > 0 && (
          <div className="nike-grid">
            {images.map((image, index) => (
              <motion.div 
                key={image.id} 
                className={`relative group aspect-ratio-container ${aspectRatio.name}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <img 
                  src={image.data} 
                  alt={image.prompt} 
                  className={`w-full h-auto object-cover rounded-md ${aspectRatio.name === '1:1' ? 'aspect-square' : aspectRatio.name === '16:9' ? 'aspect-video' : 'aspect-[9/16]'}`}
                />
                {saveNotification && savedImageIndex === index && (
                  <div className="save-notification">
                    <span>Image Saved</span>
                  </div>
                )}
                <div className="absolute bottom-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    className="p-2 bg-black/70 backdrop-blur-sm rounded-full mr-1 save-button"
                    onClick={() => downloadImage(image.data, image.prompt, index)}
                    aria-label="Save image"
                    title="Save image"
                  >
                    <LucidIcons.SaveImage />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
        {/* Enhanced Nike-style loading animation */}
        {loading && (
          <div className="nike-loading">
            <div className="nike-loading-circle"></div>
            <div className="nike-spinner-container">
              <LucidIcons.Spinner className="nike-spinner" />
            </div>
            <p className="nike-loading-text">Creating your vision</p>
            <div className="nike-loading-progress"></div>
          </div>
        )}
      </div>
    </div>
  );
}
