import React from 'react';

const ImageRetryButton = ({ onRetry, loading = false }) => {
  return (
    <button
      onClick={onRetry}
      disabled={loading}
      style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        background: 'rgba(0, 0, 0, 0.7)',
        color: 'white',
        border: 'none',
        borderRadius: '50%',
        width: '32px',
        height: '32px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: loading ? 'not-allowed' : 'pointer',
        fontSize: '16px',
        opacity: loading ? 0.5 : 1,
        transition: 'all 0.3s ease',
        zIndex: 10
      }}
      title={loading ? 'Tentando novamente...' : 'Tentar carregar novamente'}
    >
      {loading ? '⟳' : '↻'}
    </button>
  );
};

export default ImageRetryButton;
