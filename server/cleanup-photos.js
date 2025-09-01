#!/usr/bin/env node

/**
 * Script para limpar fotos órfãs do sistema
 * Este script pode ser executado manualmente ou via cron job
 * 
 * Uso: node cleanup-photos.js
 */

import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import User from './models/User.js';

// Função para extrair o nome do arquivo da URL
const extractFilenameFromUrl = (url) => {
  if (!url) return null;
  const parts = url.split('/');
  return parts[parts.length - 1];
};

// Função principal de limpeza
const cleanupOrphanedPhotos = async () => {
  try {
    console.log('🧹 Iniciando limpeza de fotos órfãs...');
    
    // Conecta ao MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/12weeks');
    console.log('✅ Conectado ao MongoDB');

    const uploadsDir = path.join(process.cwd(), 'uploads', 'profile-pictures');
    
    if (!fs.existsSync(uploadsDir)) {
      console.log('❌ Diretório de uploads não encontrado');
      return;
    }

    // Busca todas as fotos de perfil atualmente em uso
    const users = await User.find({ profilePicture: { $exists: true, $ne: null } })
      .select('profilePicture');
    
    const usedFilenames = new Set();
    users.forEach(user => {
      const filename = extractFilenameFromUrl(user.profilePicture);
      if (filename) {
        usedFilenames.add(filename);
      }
    });

    console.log(`📊 Fotos em uso: ${usedFilenames.size}`);

    // Lista todos os arquivos no diretório
    const files = fs.readdirSync(uploadsDir);
    console.log(`📁 Total de arquivos no diretório: ${files.length}`);

    let deletedCount = 0;
    const orphanedFiles = [];

    // Identifica arquivos órfãos
    files.forEach(filename => {
      if (!usedFilenames.has(filename)) {
        orphanedFiles.push(filename);
      }
    });

    console.log(`🗑️  Arquivos órfãos encontrados: ${orphanedFiles.length}`);

    // Remove arquivos órfãos
    orphanedFiles.forEach(filename => {
      try {
        const filePath = path.join(uploadsDir, filename);
        const stats = fs.statSync(filePath);
        const fileSizeKB = Math.round(stats.size / 1024);
        
        fs.unlinkSync(filePath);
        deletedCount++;
        console.log(`✅ Removido: ${filename} (${fileSizeKB}KB)`);
      } catch (error) {
        console.error(`❌ Erro ao remover ${filename}:`, error.message);
      }
    });

    const spaceSavedKB = orphanedFiles.reduce((total, filename) => {
      try {
        const filePath = path.join(uploadsDir, filename);
        const stats = fs.statSync(filePath);
        return total + stats.size;
      } catch {
        return total;
      }
    }, 0);

    console.log('\n📈 Resumo da limpeza:');
    console.log(`   • Arquivos removidos: ${deletedCount}`);
    console.log(`   • Espaço liberado: ${Math.round(spaceSavedKB / 1024)}KB`);
    console.log(`   • Fotos ainda em uso: ${usedFilenames.size}`);
    console.log(`   • Arquivos restantes: ${files.length - deletedCount}`);

  } catch (error) {
    console.error('❌ Erro durante a limpeza:', error);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 Desconectado do MongoDB');
  }
};

// Executa a limpeza se o script for chamado diretamente
if (import.meta.url === `file://${process.argv[1]}`) {
  cleanupOrphanedPhotos();
}

export default cleanupOrphanedPhotos;

