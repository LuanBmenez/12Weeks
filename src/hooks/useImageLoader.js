import { useState, useEffect, useCallback } from 'react';

/**
 * Hook personalizado para carregar imagens com retry automático e cache busting
 * @param {string} src - URL da imagem
 * @param {Object} options - Opções de configuração
 * @returns {Object} - Estado do carregamento da imagem
 */
export const useImageLoader = (src, options = {}) => {
  const {
    maxRetries = 3,
    retryDelay = 1000,
    enableCacheBusting = true,
    onLoad,
    onError
  } = options;

  const [imageState, setImageState] = useState({
    src: null,
    loaded: false,
    error: false,
    retryCount: 0,
    loading: false
  });

  // Função para adicionar cache busting à URL
  const addCacheBusting = useCallback((url) => {
    if (!url || !enableCacheBusting) return url;
    
    // Se já tem parâmetros de query, adiciona o cache busting
    if (url.includes('?')) {
      return `${url}&cb=${Date.now()}`;
    } else {
      return `${url}?cb=${Date.now()}`;
    }
  }, [enableCacheBusting]);

  // Função para tentar carregar a imagem
  const loadImage = useCallback((imageSrc, retryCount = 0) => {
    if (!imageSrc) return;

    setImageState(prev => ({
      ...prev,
      loading: true,
      error: false,
      retryCount
    }));

    const img = new Image();
    
    img.onload = () => {
      setImageState(prev => ({
        ...prev,
        loaded: true,
        error: false,
        loading: false,
        retryCount: 0
      }));
      
      if (onLoad) onLoad(img);
    };

    img.onerror = () => {
      console.log(`🖼️ Erro ao carregar imagem: ${imageSrc}, tentativa ${retryCount + 1}/${maxRetries + 1}`);
      
      if (retryCount < maxRetries) {
        // Tenta novamente com cache busting
        setTimeout(() => {
          const newSrc = addCacheBusting(src);
          loadImage(newSrc, retryCount + 1);
        }, retryDelay * (retryCount + 1)); // Delay progressivo
      } else {
        // Todas as tentativas falharam
        setImageState(prev => ({
          ...prev,
          error: true,
          loading: false
        }));
        
        if (onError) onError(new Error(`Falha ao carregar imagem após ${maxRetries + 1} tentativas`));
      }
    };

    // Adiciona cache busting na primeira tentativa se for uma URL de produção
    const finalSrc = (retryCount === 0 && imageSrc.includes('/api/image/')) 
      ? addCacheBusting(imageSrc) 
      : imageSrc;
    
    img.src = finalSrc;
    setImageState(prev => ({ ...prev, src: finalSrc }));
  }, [src, maxRetries, retryDelay, addCacheBusting, onLoad, onError]);

  // Efeito para carregar a imagem quando src muda
  useEffect(() => {
    if (src) {
      setImageState(prev => ({
        ...prev,
        loaded: false,
        error: false,
        retryCount: 0
      }));
      
      loadImage(src, 0);
    }
  }, [src, loadImage]);

  // Função para forçar reload da imagem
  const reload = useCallback(() => {
    if (src) {
      loadImage(src, 0);
    }
  }, [src, loadImage]);

  return {
    ...imageState,
    reload
  };
};

export default useImageLoader;
