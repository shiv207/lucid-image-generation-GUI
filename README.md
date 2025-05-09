# Lucid Image Generation App

![React](https://img.shields.io/badge/React-19-blue?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?logo=vite)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-10.0-blueviolet)
![HuggingFace](https://img.shields.io/badge/HuggingFace_API-Integrated-yellow?logo=huggingface)
![License](https://img.shields.io/badge/License-MIT-green)

<div align="center">

## Premium AI Image Generation with a Modern UI

*Transform your ideas into stunning visuals with AI-powered image generation*
</div>

## ✨ Features

- **🖼️ Multiple AI Model Support**: Choose between Flux-Schnell, Stable Diffusion XL, Stable Diffusion 3, and more
- **🎨 Premium UI Experience**: Modern interface with frosted glass effects and subtle gradient glows
- **📱 Mobile-Optimized**: Fully responsive design that works beautifully on all devices
- **🔄 Real-Time Feedback**: Elegant loading states and real-time visualization of generation progress
- **⚙️ Advanced Controls**: Fine-tune your generations with guidance scale, steps, and negative prompts
- **🔧 Customizable API Key**: Change your HuggingFace API key directly from the in-app settings panel
- **💾 Image Save & Download**: Download your creations with just one click
- **🖥️ Progressive Web App (PWA)**: Can be installed and used like a native application

## 🚀 Technologies

- **Front-end**: React 19 with Vite and Framer Motion animations
- **Styling**: Custom CSS with glassmorphism, noise textures, and premium animation effects
- **API Integration**: HuggingFace API for AI image generation
- **Performance**: Optimized rendering and hardware-accelerated animations

## 🔧 Getting Started

### Prerequisites

- Node.js v18 or higher
- A [HuggingFace API key](https://huggingface.co/settings/tokens) with appropriate permissions

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/shiv207/lucid-image-generation-GUI.git
   cd lucid-image-generation-GUI
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create a `.env` file in the project root and add your HuggingFace API key:

   ```
   VITE_HUGGINGFACE_API_KEY=your_api_key_here
   ```

   Alternatively, you can add your API key directly through the app's settings panel.

4. **Start the development server**

   ```bash
   npm run dev
   ```

5. **Build for production**

   ```bash
   npm run build
   ```

## 🎮 Usage

1. **Enter your prompt** in the text area
2. **Select your desired model** using the model selector
3. **Choose an aspect ratio** for your image (1:1, 16:9, or 9:16)
4. **Adjust advanced parameters** if needed (steps, guidance scale, negative prompts)
5. **Click the Generate button** to create your image
6. **Download your image** using the save button that appears on hover

## 🏗️ Project Structure

```
src/
├── api/           # API integration with HuggingFace
├── components/    # UI components including Workspace, SettingsPanel
├── context/       # Application state with React Context API
├── styles/        # Premium CSS styling with modern aesthetic
└── assets/        # Images and SVG icons
```

## 🎨 Design Principles

Lucid follows modern design principles with an emphasis on:

- **Modern aesthetics**: Clean, contemporary interface elements
- **Subtle textures**: Elegant texture elements for depth and premium feel
- **Glassmorphism effects**: Frosted glass and blur effects throughout the UI
- **Responsive design**: Seamless experience across all device sizes
- **Premium micro-interactions**: Subtle animations and feedback for user actions

## 🔑 API Key Management

Your HuggingFace API key can be managed in two ways:

1. **Environment variable**: Set it in the `.env` file during development
2. **In-app settings**: Click the settings gear icon and enter your key through the UI

Your API key is stored securely in the browser's local storage for persistence.

## 📱 Mobile Features

- **Single-column layout**: Optimized for smaller screens
- **Touch-friendly controls**: Larger tap targets for mobile interaction
- **PWA support**: Can be installed on your home screen
- **Responsive image grid**: Automatically adjusts based on screen size

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [HuggingFace](https://huggingface.co/) for providing the AI model APIs
- [React](https://reactjs.org/) and [Vite](https://vitejs.dev/) for the development framework
- [Framer Motion](https://www.framer.com/motion/) for smooth animations

