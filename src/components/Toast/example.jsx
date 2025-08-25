import React from 'react';
import { useToast } from './index';

// Exemplo de componente que usa o Toast
export const ToastExample = () => {
  const { 
    showSuccess, 
    showError, 
    showWarning, 
    showInfo, 
    showCustom,
    clearAllToasts 
  } = useToast();

  const handleMultipleToasts = () => {
    showSuccess('Primeiro toast de sucesso!');
    setTimeout(() => showInfo('Segundo toast informativo!'), 500);
    setTimeout(() => showWarning('Terceiro toast de aviso!'), 1000);
    setTimeout(() => showError('Quarto toast de erro!'), 1500);
    setTimeout(() => showCustom('Quinto toast personalizado!', 'purple', 8000), 2000);
  };

  const handleCustomTypes = () => {
    showCustom('Toast com tipo personalizado!', 'custom', 5000);
    showCustom('Toast com duração longa!', 'info', 10000);
  };

  return (
    <div style={{ 
      padding: '40px', 
      maxWidth: '800px', 
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ textAlign: 'center', color: '#1f2937', marginBottom: '40px' }}>
        🍞 Exemplo do Sistema Toast Melhorado
      </h1>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '16px',
        marginBottom: '40px'
      }}>
        <button 
          onClick={() => showSuccess('Operação realizada com sucesso! 🎉')}
          style={{ 
            padding: '16px 20px', 
            backgroundColor: '#10b981', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
        >
          ✅ Sucesso
        </button>
        
        <button 
          onClick={() => showError('Algo deu errado! Tente novamente. 😞')}
          style={{ 
            padding: '16px 20px', 
            backgroundColor: '#ef4444', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
        >
          ❌ Erro
        </button>
        
        <button 
          onClick={() => showWarning('Atenção! Esta ação não pode ser desfeita. ⚠️')}
          style={{ 
            padding: '16px 20px', 
            backgroundColor: '#f59e0b', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
        >
          ⚠️ Aviso
        </button>
        
        <button 
          onClick={() => showInfo('Informação importante para você! ℹ️')}
          style={{ 
            padding: '16px 20px', 
            backgroundColor: '#3b82f6', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
        >
          ℹ️ Info
        </button>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '16px',
        marginBottom: '40px'
      }}>
        <button 
          onClick={handleMultipleToasts}
          style={{ 
            padding: '16px 20px', 
            backgroundColor: '#8b5cf6', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
        >
          🚀 Múltiplos Toasts
        </button>
        
        <button 
          onClick={handleCustomTypes}
          style={{ 
            padding: '16px 20px', 
            backgroundColor: '#ec4899', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
        >
          🎨 Tipos Personalizados
        </button>
        
        <button 
          onClick={clearAllToasts}
          style={{ 
            padding: '16px 20px', 
            backgroundColor: '#6b7280', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600',
            transition: 'all 0.2s'
          }}
          onMouseEnter={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.target.style.transform = 'translateY(0)'}
        >
          🗑️ Limpar Todos
        </button>
      </div>

      <div style={{ 
        backgroundColor: '#f8fafc', 
        padding: '24px', 
        borderRadius: '12px',
        border: '1px solid #e2e8f0'
      }}>
        <h3 style={{ color: '#1f2937', marginBottom: '16px' }}>🚀 Novas Funcionalidades</h3>
        <div style={{ color: '#64748b', lineHeight: '1.6' }}>
          <p><strong>✨ Progress Bar:</strong> Barra de progresso visual para cada toast</p>
          <p><strong>🎯 Posicionamento:</strong> 6 posições diferentes (top-left, top-center, top-right, bottom-left, bottom-center, bottom-right)</p>
          <p><strong>🎨 Variantes:</strong> Múltiplos tipos de toast com estilos únicos</p>
          <p><strong>⏸️ Controles:</strong> Botões para pausar e fechar toasts</p>
          <p><strong>📱 Responsivo:</strong> Adaptação automática para dispositivos móveis</p>
          <p><strong>♿ Acessibilidade:</strong> Suporte a preferências de movimento reduzido</p>
          <p><strong>🌙 Modo Escuro:</strong> Adaptação automática ao tema do sistema</p>
        </div>
      </div>

      <div style={{ 
        backgroundColor: '#fef3c7', 
        padding: '16px', 
        borderRadius: '8px',
        border: '1px solid #fbbf24',
        marginTop: '24px'
      }}>
        <p style={{ color: '#92400e', margin: 0, textAlign: 'center' }}>
          💡 <strong>Dica:</strong> Os toasts agora têm barra de progresso e podem ser posicionados em diferentes locais da tela!
        </p>
      </div>
    </div>
  );
};

export default ToastExample;
