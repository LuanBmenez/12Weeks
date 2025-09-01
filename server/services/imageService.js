import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

class ImageService {
  constructor() {
    this.supportedFormats = ['jpeg', 'jpg', 'png', 'webp', 'avif'];
    this.maxWidth = 800;
    this.maxHeight = 800;
    this.quality = 85;
  }

  /**
   * Comprime uma imagem automaticamente
   * @param {string} inputPath - Caminho da imagem original
   * @param {string} outputPath - Caminho onde salvar a imagem comprimida
   * @param {Object} options - Opções de compressão
   */
  async compressImage(inputPath, outputPath, options = {}) {
    try {
      const {
        maxWidth = this.maxWidth,
        maxHeight = this.maxHeight,
        quality = this.quality,
        format = 'jpeg'
      } = options;

      // Verifica se o arquivo existe
      if (!fs.existsSync(inputPath)) {
        throw new Error(`Arquivo não encontrado: ${inputPath}`);
      }

      // Obtém informações da imagem original
      const originalStats = fs.statSync(inputPath);
      const originalSizeKB = Math.round(originalStats.size / 1024);

      console.log(`🖼️ Comprimindo imagem: ${path.basename(inputPath)} (${originalSizeKB}KB)`);

      // Cria o diretório de saída se não existir
      const outputDir = path.dirname(outputPath);
      if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
      }

      // Processa a imagem com Sharp
      let sharpInstance = sharp(inputPath);

      // Redimensiona se necessário
      const metadata = await sharpInstance.metadata();
      if (metadata.width > maxWidth || metadata.height > maxHeight) {
        sharpInstance = sharpInstance.resize(maxWidth, maxHeight, {
          fit: 'inside',
          withoutEnlargement: true
        });
        console.log(`📏 Redimensionando de ${metadata.width}x${metadata.height} para máximo ${maxWidth}x${maxHeight}`);
      }

      // Aplica compressão baseada no formato
      switch (format.toLowerCase()) {
        case 'webp':
          sharpInstance = sharpInstance.webp({ quality });
          break;
        case 'avif':
          sharpInstance = sharpInstance.avif({ quality });
          break;
        case 'png':
          sharpInstance = sharpInstance.png({ 
            quality,
            compressionLevel: 9
          });
          break;
        case 'jpeg':
        case 'jpg':
        default:
          sharpInstance = sharpInstance.jpeg({ 
            quality,
            progressive: true,
            mozjpeg: true
          });
          break;
      }

      // Salva a imagem comprimida
      await sharpInstance.toFile(outputPath);

      // Obtém estatísticas da imagem comprimida
      const compressedStats = fs.statSync(outputPath);
      const compressedSizeKB = Math.round(compressedStats.size / 1024);
      const compressionRatio = Math.round(((originalSizeKB - compressedSizeKB) / originalSizeKB) * 100);

      console.log(`✅ Imagem comprimida: ${path.basename(outputPath)} (${compressedSizeKB}KB) - ${compressionRatio}% de redução`);

      return {
        success: true,
        originalSize: originalSizeKB,
        compressedSize: compressedSizeKB,
        compressionRatio,
        outputPath
      };

    } catch (error) {
      console.error('Erro ao comprimir imagem:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Comprime imagem de perfil com configurações otimizadas
   * @param {string} inputPath - Caminho da imagem original
   * @param {string} outputPath - Caminho onde salvar a imagem comprimida
   */
  async compressProfilePicture(inputPath, outputPath) {
    return await this.compressImage(inputPath, outputPath, {
      maxWidth: 400,
      maxHeight: 400,
      quality: 90,
      format: 'jpeg'
    });
  }

  /**
   * Gera múltiplos tamanhos de uma imagem
   * @param {string} inputPath - Caminho da imagem original
   * @param {string} baseOutputPath - Caminho base para as saídas
   */
  async generateMultipleSizes(inputPath, baseOutputPath) {
    const results = {};
    const sizes = [
      { name: 'thumbnail', width: 150, height: 150 },
      { name: 'medium', width: 400, height: 400 },
      { name: 'large', width: 800, height: 800 }
    ];

    for (const size of sizes) {
      const ext = path.extname(baseOutputPath);
      const name = path.basename(baseOutputPath, ext);
      const dir = path.dirname(baseOutputPath);
      const outputPath = path.join(dir, `${name}_${size.name}${ext}`);

      const result = await this.compressImage(inputPath, outputPath, {
        maxWidth: size.width,
        maxHeight: size.height,
        quality: 85,
        format: 'jpeg'
      });

      results[size.name] = result;
    }

    return results;
  }

  /**
   * Converte imagem para WebP (formato mais eficiente)
   * @param {string} inputPath - Caminho da imagem original
   * @param {string} outputPath - Caminho onde salvar a imagem WebP
   */
  async convertToWebP(inputPath, outputPath) {
    return await this.compressImage(inputPath, outputPath, {
      maxWidth: this.maxWidth,
      maxHeight: this.maxHeight,
      quality: 85,
      format: 'webp'
    });
  }

  /**
   * Converte imagem para AVIF (formato mais moderno e eficiente)
   * @param {string} inputPath - Caminho da imagem original
   * @param {string} outputPath - Caminho onde salvar a imagem AVIF
   */
  async convertToAVIF(inputPath, outputPath) {
    return await this.compressImage(inputPath, outputPath, {
      maxWidth: this.maxWidth,
      maxHeight: this.maxHeight,
      quality: 80,
      format: 'avif'
    });
  }

  /**
   * Verifica se o arquivo é uma imagem válida
   * @param {string} filePath - Caminho do arquivo
   */
  async isValidImage(filePath) {
    try {
      const metadata = await sharp(filePath).metadata();
      return metadata.width > 0 && metadata.height > 0;
    } catch (error) {
      return false;
    }
  }

  /**
   * Obtém metadados da imagem
   * @param {string} filePath - Caminho do arquivo
   */
  async getImageMetadata(filePath) {
    try {
      const metadata = await sharp(filePath).metadata();
      const stats = fs.statSync(filePath);
      
      return {
        width: metadata.width,
        height: metadata.height,
        format: metadata.format,
        size: stats.size,
        sizeKB: Math.round(stats.size / 1024)
      };
    } catch (error) {
      console.error('Erro ao obter metadados da imagem:', error);
      return null;
    }
  }

  /**
   * Otimiza imagem automaticamente baseada no tamanho original
   * @param {string} inputPath - Caminho da imagem original
   * @param {string} outputPath - Caminho onde salvar a imagem otimizada
   */
  async autoOptimize(inputPath, outputPath) {
    try {
      const metadata = await this.getImageMetadata(inputPath);
      if (!metadata) {
        throw new Error('Não foi possível obter metadados da imagem');
      }

      // Determina configurações baseadas no tamanho original
      let maxWidth, maxHeight, quality, format;

      if (metadata.sizeKB > 1000) { // > 1MB
        maxWidth = 600;
        maxHeight = 600;
        quality = 75;
        format = 'webp';
      } else if (metadata.sizeKB > 500) { // > 500KB
        maxWidth = 800;
        maxHeight = 800;
        quality = 80;
        format = 'jpeg';
      } else { // < 500KB
        maxWidth = 1000;
        maxHeight = 1000;
        quality = 85;
        format = 'jpeg';
      }

      return await this.compressImage(inputPath, outputPath, {
        maxWidth,
        maxHeight,
        quality,
        format
      });

    } catch (error) {
      console.error('Erro na otimização automática:', error);
      return {
        success: false,
        error: error.message
      };
    }
  }

  /**
   * Limpa arquivos temporários
   * @param {string} tempPath - Caminho do arquivo temporário
   */
  async cleanupTempFile(tempPath) {
    try {
      if (fs.existsSync(tempPath)) {
        fs.unlinkSync(tempPath);
        console.log(`🗑️ Arquivo temporário removido: ${path.basename(tempPath)}`);
      }
    } catch (error) {
      console.error('Erro ao remover arquivo temporário:', error);
    }
  }
}

// Singleton instance
const imageService = new ImageService();

export default imageService;
