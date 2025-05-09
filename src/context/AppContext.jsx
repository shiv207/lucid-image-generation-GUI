import { createContext, useContext, useState } from 'react';
import axios from 'axios';

// Define models
export const MODELS = {
  FLUX_SCHNELL: 'flux-schnell-1',
  FLUX_DEV: 'flux-dev',
  STABLE_DIFFUSION_XL: 'stable-diffusion-xl-base-1.0',
  STABLE_DIFFUSION_3: 'stabilityai/stable-diffusion-3-medium'
};

// Define themes inspired by Arc and Nike
const THEMES = {
  INDIGO: {
    name: 'Indigo',
    primary: 'bg-indigo-500',
    secondary: 'bg-violet-300',
    accent: 'bg-fuchsia-400',
    text: 'text-white',
    gradient: 'from-indigo-600 via-violet-500 to-fuchsia-500',
  },
  EMERALD: {
    name: 'Emerald',
    primary: 'bg-emerald-500',
    secondary: 'bg-teal-300',
    accent: 'bg-cyan-400',
    text: 'text-white',
    gradient: 'from-emerald-600 via-teal-500 to-cyan-500',
  },
  AMBER: {
    name: 'Amber',
    primary: 'bg-amber-500',
    secondary: 'bg-orange-300',
    accent: 'bg-rose-400',
    text: 'text-white',
    gradient: 'from-amber-500 via-orange-400 to-rose-500',
  },
  SLATE: {
    name: 'Slate',
    primary: 'bg-slate-700',
    secondary: 'bg-slate-500',
    accent: 'bg-sky-400',
    text: 'text-white',
    gradient: 'from-slate-800 via-slate-600 to-sky-500',
  },
  NIKE: {
    name: 'Nike Dark',
    primary: 'bg-black',
    secondary: 'bg-zinc-800',
    accent: 'bg-white',
    text: 'text-white',
    gradient: 'from-black via-zinc-900 to-zinc-800',
    buttonGradient: 'bg-gradient-to-r from-zinc-900 to-black hover:from-black hover:to-zinc-900',
    noiseTexture: 'bg-noise opacity-[0.07]',
  },
};

// Create context
const AppContext = createContext();

// Helper function for image generation API
async function generateImage({
  prompt,
  model = MODELS.FLUX_SCHNELL,
  width = 1024,
  height = 1024,
  numImages = 1,
  steps = 30,
  guidanceScale = 7.5,
  negativePrompt = '',
}) {
  // Validate API key
  const storedApiKey = localStorage.getItem('huggingface_api_key');
  const API_KEY = storedApiKey || import.meta.env.VITE_HUGGINGFACE_API_KEY;
  
  if (!API_KEY || API_KEY.trim() === '') {
    throw new Error('API key is missing. Please add your HuggingFace API key in settings.');
  }
  
  console.log('Using prompt:', prompt);
  console.log('Using model:', model);
  
  // Map our model constants to the actual model names
  let modelName;
  if (model === MODELS.FLUX_SCHNELL) {
    modelName = 'stabilityai/stable-diffusion-xl-base-1.0'; // We'll use SDXL as Flux can be restricted
  } else if (model === MODELS.FLUX_DEV) {
    modelName = 'black-forest-labs/FLUX.1-dev';
  } else if (model === MODELS.STABLE_DIFFUSION_XL) {
    modelName = 'stabilityai/stable-diffusion-xl-base-1.0';
  } else if (model === MODELS.STABLE_DIFFUSION_3) {
    modelName = 'stabilityai/stable-diffusion-xl-base-1.0'; // Fallback to SDXL if SD3 is restricted
  }
  
  try {
    // First try the HuggingFace Inference API
    console.log('Trying HuggingFace Inference API with model:', modelName);
    
    const inferenceEndpoint = `https://api-inference.huggingface.co/models/${modelName}`;
    
    try {
      const response = await fetch(
        inferenceEndpoint,
        {
          headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
            inputs: prompt,
            parameters: {
              negative_prompt: negativePrompt,
              width: width,
              height: height,
              num_inference_steps: steps,
              guidance_scale: guidanceScale,
              num_images_per_prompt: numImages,
            }
          })
        }
      );
      
      if (response.ok) {
        console.log('HuggingFace Inference API request successful');
        const blob = await response.blob();
        if (!blob || blob.size === 0) {
          throw new Error('Received empty response from API');
        }
        return blob;
      } else {
        // Handle specific error codes
        if (response.status === 401) {
          throw new Error('Invalid API key. Please check your HuggingFace API key in settings.');
        } else if (response.status === 503) {
          throw new Error('Model is currently loading or busy. Please try again in a few moments.');
        } else {
          console.warn('HuggingFace Inference API request failed:', response.status);
          throw new Error(`API returned status ${response.status}`);
        }
      }
    } catch (inferenceError) {
      console.warn('Inference API attempt failed:', inferenceError);
      
      // Try backup method - HuggingFace Together API
      console.log('Trying HuggingFace Together API as fallback');
      
      // Choose appropriate model for Together API
      let togetherModel = 'stabilityai/stable-diffusion-xl-base-1.0';
      if (model === MODELS.FLUX_DEV) {
        togetherModel = 'black-forest-labs/FLUX.1-dev';
      }
      
      try {
        const togetherResponse = await fetch(
          'https://router.huggingface.co/together/v1/images/generations',
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${API_KEY}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              model: togetherModel,
              prompt: prompt,
              negative_prompt: negativePrompt,
              width: width,
              height: height,
              n: numImages,
              steps: steps,
              guidance_scale: guidanceScale,
            })
          }
        );
        
        if (!togetherResponse.ok) {
          if (togetherResponse.status === 401) {
            throw new Error('Invalid API key. Please check your HuggingFace API key in settings.');
          } else {
            throw new Error(`Secondary API failed with status ${togetherResponse.status}`);
          }
        }
        
        const blob = await togetherResponse.blob();
        if (!blob || blob.size === 0) {
          throw new Error('Received empty response from API');
        }
        return blob;
      } catch (togetherError) {
        console.error('Together API attempt failed:', togetherError);
        throw new Error(togetherError.message || 'Failed to generate image with backup API');
      }
    }
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
}

// Helper function to convert blob to data URL
function blobToDataURL(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

export const AppProvider = ({ children }) => {
  // Theme state
  const [theme, setTheme] = useState(THEMES.NIKE);
  
  // App state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [images, setImages] = useState([]);
  
  // Settings state
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState(localStorage.getItem('huggingface_api_key') || '');
  
  // Generation settings
  const [promptInput, setPromptInput] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [selectedModel, setSelectedModel] = useState(MODELS.FLUX_SCHNELL);
  const [aspectRatio, setAspectRatio] = useState({ width: 1024, height: 1024 });
  const [steps, setSteps] = useState(30);
  const [guidanceScale, setGuidanceScale] = useState(7.5);
  const [numImages, setNumImages] = useState(1);
  
  // API key management
  const updateApiKey = (newKey) => {
    setApiKey(newKey);
    if (newKey) {
      localStorage.setItem('huggingface_api_key', newKey);
    } else {
      localStorage.removeItem('huggingface_api_key');
    }
  };
  
  const verifyApiKey = async (keyToVerify) => {
    try {
      // Use the provided key or the current apiKey from state
      const keyToCheck = keyToVerify || apiKey;
      
      if (!keyToCheck || keyToCheck.trim() === '') {
        return { valid: false, message: 'API key is empty' };
      }
      
      setLoading(true);
      
      try {
        // Use a more reliable endpoint for verification
        const response = await fetch('https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0', {
          method: 'HEAD',
          headers: {
            'Authorization': `Bearer ${keyToCheck}`
          }
        });
        
        setLoading(false);
        
        if (response.ok || response.status === 400) {
          // 400 is actually okay - it means the API key is valid but we didn't send proper data
          return { valid: true, message: 'API key is valid' };
        } else if (response.status === 401) {
          return { valid: false, message: 'Invalid API key' };
        } else {
          return { valid: false, message: `Server error: ${response.status}` };
        }
      } catch (networkErr) {
        console.error('API key verification network error:', networkErr);
        setLoading(false);
        // This checks for specific network errors and provides a clearer message
        return { 
          valid: false, 
          message: 'Network connection error. Please check your internet connection.'
        };
      }
    } catch (err) {
      // This catches any other errors that might occur
      console.error('Unexpected error during API key verification:', err);
      setLoading(false);
      return { 
        valid: false, 
        message: 'An unexpected error occurred. Please try again.'
      };
    }
  };
  
  // Theme switching
  const changeTheme = (themeName) => {
    setTheme(THEMES[themeName]);
  };
  
  // Add a new generated image to the collection
  const addImage = (imageData, prompt) => {
    const newImage = {
      id: Date.now(),
      data: imageData,
      prompt,
      timestamp: new Date().toISOString(),
      model: selectedModel,
    };
    
    setImages((prev) => [newImage, ...prev]);
  };
  
  // Clear all generated images
  const clearImages = () => {
    setImages([]);
  };
  
  // Image generation function
  const handleGenerate = async () => {
    if (!promptInput.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const imageBlob = await generateImage({
        prompt: promptInput,
        model: selectedModel,
        width: aspectRatio.width,
        height: aspectRatio.height,
        numImages,
        steps,
        guidanceScale,
        negativePrompt,
      });
      
      const imageDataUrl = await blobToDataURL(imageBlob);
      addImage(imageDataUrl, promptInput);
    } catch (err) {
      console.error('Generation error:', err);
      setError('Failed to generate image. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  // Save image to device
  const saveImage = async (imageData, filename = 'lucid-generation.png') => {
    const a = document.createElement('a');
    a.href = imageData;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };
  
  return (
    <AppContext.Provider value={{
      // Theme
      theme,
      themes: THEMES,
      changeTheme,
      
      // Generation settings
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
      numImages,
      setNumImages,
      
      // Images
      images,
      addImage,
      clearImages,
      saveImage,
      
      // App state
      loading,
      setLoading,
      error,
      setError,
      
      // Settings
      showSettings,
      setShowSettings,
      apiKey,
      updateApiKey,
      verifyApiKey,
      
      // Actions
      handleGenerate,
    }}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook for using the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
