import React, { useState, useEffect } from 'react';

const ImageWithFallback = ({ 
  src, 
  alt, 
  fallbackText, 
  className = '', 
  style = {},
  onLoad,
  onError 
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    if (src) {
      setImageError(false);
      setImageLoaded(false);
    }
  }, [src]);

  const handleImageLoad = (e) => {
    setImageLoaded(true);
    setImageError(false);
    if (onLoad) onLoad(e);
  };

  const handleImageError = (e) => {
    setImageError(true);
    setImageLoaded(false);
    if (onError) onError(e);
  };

  if (!src || imageError) {
    return (
      <div 
        className={`image-fallback ${className}`}
        style={{
          width: '100px',
          height: '100px',
          borderRadius: '50%',
          backgroundColor: '#3b82f6',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '32px',
          fontWeight: 'bold',
          color: 'white',
          border: '4px solid rgba(255, 255, 255, 0.8)',
          display: 'flex',
          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
          transition: 'all 0.3s ease',
          ...style
        }}
      >
        {fallbackText || 'U'}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={{
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        objectFit: 'cover',
        border: '4px solid rgba(255, 255, 255, 0.8)',
        opacity: imageLoaded ? 1 : 0,
        transition: 'opacity 0.3s ease',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
        ...style
      }}
      onLoad={handleImageLoad}
      onError={handleImageError}
    />
  );
};

export default ImageWithFallback;
