# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

A beautiful, Arc-inspired image generation web application using React and HuggingFace AI. Create stunning images with multiple AI models through an aesthetic, glassmorphic UI.

## Features

- **Multi-Model Support**: Generate images using various AI models including Flux-Schnell and Stable Diffusion
- **Arc-Inspired Design**: Beautiful, modern interface with frosted glass elements and vibrant gradients
- **Theme Switching**: Multiple color themes to customize your experience
- **Advanced Controls**: Fine-tune your generations with parameters like guidance scale and steps
- **Responsive**: Works beautifully on any device

## Technologies

- React 19
- Tailwind CSS
- Framer Motion for animations
- HuggingFace API for image generation

## Getting Started

### Prerequisites

- Node.js v18 or higher
- A HuggingFace API key with appropriate permissions

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/lucid.git
   cd lucid
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Create a `.env` file in the project root and add your HuggingFace API key
   ```
   VITE_HUGGINGFACE_API_KEY=your_api_key_here
   ```

4. Start the development server
   ```bash
   npm run dev
   ```

## Usage

1. Enter your prompt in the sidebar
2. Select your desired model and aspect ratio
3. Adjust advanced parameters if needed
4. Click the Generate button
5. View, download, and share your creations

## Project Structure

```
src/
├── api/           # API integration with HuggingFace
├── components/    # UI components
├── context/       # Application state management
├── styles/        # CSS and styling utilities
└── assets/        # Images and other static assets
```

## License

MIT

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
