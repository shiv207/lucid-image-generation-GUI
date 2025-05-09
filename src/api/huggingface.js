import axios from 'axios';

// Configure API base URL and headers
const baseURL = 'https://router.huggingface.co/together/v1';
const API_KEY = process.env.VITE_HUGGINGFACE_API_KEY; // Use environment variable for API key

// Create a reusable axios instance
const api = axios.create({
  baseURL,
  headers: {
    'Authorization': `Bearer ${API_KEY}`,
    'Content-Type': 'application/json',
  },
});

// Available models
export const MODELS = {
  FLUX_SCHNELL: 'flux-schnell-1',
  STABLE_DIFFUSION_XL: 'stable-diffusion-xl-base-1.0',
  STABLE_DIFFUSION_3: 'stabilityai/stable-diffusion-3-medium'
};

/**
 * Generate image from text prompt using HuggingFace API
 * @param {Object} params - Generation parameters
 * @param {string} params.prompt - Text prompt for image generation
 * @param {string} params.model - Model to use for generation
 * @param {number} params.width - Width of the generated image
 * @param {number} params.height - Height of the generated image
 * @param {number} params.numImages - Number of images to generate
 * @param {number} params.steps - Number of denoising steps
 * @param {number} params.guidanceScale - How strictly to follow the prompt
 * @param {string} params.negativePrompt - What not to include in the image
 * @returns {Promise<Blob>} - Generated image as a Blob
 */
export const generateImage = async ({
  prompt,
  model = MODELS.FLUX_SCHNELL,
  width = 1024,
  height = 1024,
  numImages = 1,
  steps = 30,
  guidanceScale = 7.5,
  negativePrompt = '',
}) => {
  try {
    const data = {
      model: model,
      prompt: prompt,
      negative_prompt: negativePrompt,
      width: width,
      height: height,
      n: numImages,
      steps: steps,
      guidance_scale: guidanceScale,
    };

    const response = await api.post('/images/generations', data, {
      responseType: 'blob'
    });
    
    return response.data;
  } catch (error) {
    console.error('Error generating image:', error);
    throw error;
  }
};

/**
 * Convert a blob to a data URL
 * @param {Blob} blob - Image blob
 * @returns {Promise<string>} - Data URL representation of the image
 */
export const blobToDataURL = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};
