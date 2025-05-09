import { useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../context/AppContext';

export default function ImageCard({ image }) {
  const { theme, saveImage } = useApp();
  const [showDetails, setShowDetails] = useState(false);

  const handleDownload = (e) => {
    e.stopPropagation();
    const filename = `lucid-${new Date().toISOString().slice(0, 10)}-${Math.floor(Math.random() * 1000)}.png`;
    saveImage(image.data, filename);
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      layout
    >
      <div 
        className="glass-card noise rounded-2xl overflow-hidden cursor-pointer group"
        onClick={() => setShowDetails(!showDetails)}
      >
        {/* Image */}
        <div className="relative aspect-auto overflow-hidden">
          <img 
            src={image.data} 
            alt={image.prompt} 
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
          
          {/* Hover overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-0 left-0 w-full p-4 text-white">
              <p className="text-sm truncate max-w-full">{image.prompt}</p>
            </div>
          </div>
        </div>

        {/* Bottom toolbar */}
        <div className="p-3 flex justify-between items-center">
          <div className="flex items-center text-xs opacity-70">
            <span className={`inline-block w-2 h-2 rounded-full ${theme.primary} mr-2`}></span>
            <span>{image.model.split('/').pop()}</span>
          </div>
          
          <div className="flex gap-2">
            <motion.button
              onClick={handleDownload}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
            </motion.button>
            
            <motion.button
              onClick={(e) => {
                e.stopPropagation();
                setShowDetails(!showDetails);
              }}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </motion.button>
          </div>
        </div>
      </div>

      {/* Details panel */}
      {showDetails && (
        <motion.div
          className="glass-dark noise mt-3 p-4 rounded-xl text-sm space-y-2 text-white/80"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div>
            <span className="font-medium opacity-70">Prompt:</span>
            <p className="mt-1">{image.prompt}</p>
          </div>
          
          <div className="flex justify-between">
            <div>
              <span className="font-medium opacity-70">Model:</span>
              <p className="mt-1">{image.model.split('/').pop()}</p>
            </div>
            
            <div>
              <span className="font-medium opacity-70">Created:</span>
              <p className="mt-1">{new Date(image.timestamp).toLocaleString()}</p>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
