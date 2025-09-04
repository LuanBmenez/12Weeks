import React from 'react';
import { useImageLoader } from '../../hooks/useImageLoader';
import ImageRetryButton from './ImageRetryButton';

const ImageWithFallback = ({ 
  src, 
  alt, 
  fallbackText, 
  className = '', 
  style = {},
  onLoad,
  onError 
}) => {
  const { src: currentSrc, loaded, error, loading, reload } = useImageLoader(src, {
    maxRetries: 3,
    retryDelay: 1000,
    enableCacheBusting: true,
    onLoad,
    onError
  });

  if (!src || error) {
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
          position: 'relative',
          ...style
        }}
      >
        {fallbackText || 'U'}
        {error && <ImageRetryButton onRetry={reload} loading={loading} />}
      </div>
    );
  }

  return (
    <img
      src={currentSrc}
      alt={alt}
      className={className}
      style={{
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        objectFit: 'cover',
        border: '4px solid rgba(255, 255, 255, 0.8)',
        opacity: loaded ? 1 : 0.5,
        transition: 'opacity 0.3s ease',
        boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
        ...style
      }}
    />
  );
};

export default ImageWithFallback;
