# Lucid Image Generation App

![Lucid App](https://via.placeholder.com/800x400?text=Lucid+Image+Generation)

A premium image generation web application with a sleek Nike-inspired interface. Create stunning images with cutting-edge AI models through an intuitive, responsive UI optimized for both desktop and mobile devices.

## Features

- **AI-Powered Image Generation**: Create beautiful images with state-of-the-art AI models
- **Nike-Inspired Design**: Premium interface with clean aesthetics and modern UI elements
- **Mobile-First Responsive Design**: Optimized experience on all device sizes
- **Multiple Model Support**: Choose from various models including Flux-Schnell and Stable Diffusion
- **Advanced Controls**: Fine-tune parameters like steps and guidance scale
- **API Key Management**: Securely manage your HuggingFace API key in the application
- **Intelligent Error Handling**: Clear feedback with direct action buttons for quick resolution

## Table of Contents

- [Features](#features)
- [Local Development](#local-development)
- [Environment Variables](#environment-variables)
- [Vercel Deployment](#vercel-deployment)
- [API Integration](#api-integration)
- [Troubleshooting](#troubleshooting)

## Local Development

### Prerequisites

- Node.js v18 or higher
- npm or yarn
- HuggingFace API key ([Get one here](https://huggingface.co/settings/tokens))

### Setup

1. Clone the repository
   ```bash
   git clone https://github.com/shiv207/Lucid-vercel.git
   cd Lucid-vercel
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Create a `.env` file in the root directory with your HuggingFace API key
   ```
   VITE_HUGGINGFACE_API_KEY=your_huggingface_api_key_here
   ```

4. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Environment Variables

### Required Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_HUGGINGFACE_API_KEY` | Your HuggingFace API key for image generation | Yes |

### Setting Up Environment Variables

#### Local Development

For local development, create a `.env` file in the project root with the following content:

```
# HuggingFace API configuration
VITE_HUGGINGFACE_API_KEY=your_huggingface_api_key_here
```

#### Development vs Production

You can create different environment files for different environments:

- `.env.development` - Used during development
- `.env.production` - Used for production builds

Example `.env.production` file:
```
VITE_HUGGINGFACE_API_KEY=your_production_api_key_here
```

### Environment Variable Security

- Environment variables prefixed with `VITE_` are exposed to the client-side code
- The application is designed to securely manage API keys:
  - User-provided API keys are stored in localStorage and take precedence
  - Environment variable API key is used as fallback
  - API keys are masked in the UI for security
- For enhanced security in production, consider implementing a server-side proxy for API calls

## Vercel Deployment

### Deploying to Vercel

1. Create a Vercel account at [vercel.com](https://vercel.com) if you don't have one
2. Install the Vercel CLI (optional, for advanced deployments)
   ```bash
   npm install -g vercel
   # or
   yarn global add vercel
   ```

3. Push your code to GitHub (or GitLab/BitBucket)
   ```bash
   git push vercel main
   ```

4. Import your repository in the Vercel dashboard:
   - Go to https://vercel.com/new
   - Select your repository
   - Vercel will automatically detect the project as a Vite application

### Setting Environment Variables on Vercel

1. After creating your project on Vercel, go to your project dashboard
2. Navigate to **Settings > Environment Variables**
3. Add your environment variables:
   - Set the name to `VITE_HUGGINGFACE_API_KEY`
   - Set the value to your HuggingFace API key
   - Select which environments it should apply to (Production, Preview, Development)
4. Click **Save**

### Vercel-specific Configuration

This project includes a `vercel.json` file with optimal settings for a Vite React application:

```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ],
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install"
}
```

### Custom Domains

To set up a custom domain for your deployed application:

1. Go to your project on the Vercel dashboard
2. Navigate to **Settings > Domains**
3. Add your domain and follow the verification steps

### Deployment Hooks

You can set up webhooks to automatically deploy your application when changes are pushed to your repository:

1. Go to your project on the Vercel dashboard
2. Navigate to **Settings > Git**
3. Under **Deploy Hooks**, create a new hook with a name and branch

## API Integration

### HuggingFace API

The application uses the HuggingFace API for image generation. Key details:

- **Base URL**: `https://api-inference.huggingface.co/models/`
- **Authentication**: Bearer token authentication with your API key
- **Rate Limits**: Depends on your HuggingFace subscription tier

### Supported Models

The application supports these image generation models:

| Model | Description | Best For |
|-------|-------------|----------|
| Flux Schnell 1 | Fast text-to-image model | Quick generations |
| Flux Dev | Advanced experimental model | Detailed images |
| Stable Diffusion XL | High-quality images | Professional-quality output |
| Stable Diffusion 3 | Latest SD version | Superior composition |

### API Response Handling

The application handles various API response scenarios:

- **Success**: Displays the generated image in the workspace
- **API Key Error**: Prompts the user to update their API key with a direct link to the settings
- **Model Error**: Provides clear error messages with suggested fixes
- **Network Error**: Alerts the user to check their connection

## Troubleshooting

### Common Issues

#### API Key Problems

**Issue**: "No API key found" or "Invalid API key"

**Solution**:
1. Click the settings button in the top-right corner
2. Enter a valid HuggingFace API key
3. Click "Save"
4. Ensure the API key has the necessary permissions in your HuggingFace account

#### Deployment Failures

**Issue**: Build fails on Vercel

**Solution**:
1. Check the build logs in the Vercel dashboard
2. Ensure all environment variables are properly set
3. Verify the compatibility of dependencies in package.json

#### Local Development Issues

**Issue**: Application doesn't run locally

**Solution**:
1. Ensure Node.js v18+ is installed
2. Verify the .env file is properly configured
3. Try clearing node_modules and reinstalling:
   ```bash
   rm -rf node_modules
   npm install
   ```

### Getting Help

If you encounter issues not covered here:

1. Check the [GitHub Issues](https://github.com/shiv207/Lucid-vercel/issues) for similar problems
2. Create a new issue with detailed information about your problem

## License

MIT
