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
          width: '80px',
          height: '80px',
          borderRadius: '50%',
          backgroundColor: '#3b82f6',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '24px',
          fontWeight: 'bold',
          color: 'white',
          margin: '0 auto 1rem auto',
          border: '3px solid #e2e8f0',
          display: 'flex',
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
        width: '80px',
        height: '80px',
        borderRadius: '50%',
        objectFit: 'cover',
        margin: '0 auto 1rem auto',
        border: '3px solid #e2e8f0',
        opacity: imageLoaded ? 1 : 0,
        transition: 'opacity 0.3s ease',
        ...style
      }}
      onLoad={handleImageLoad}
      onError={handleImageError}
    />
  );
};

export default ImageWithFallback;
