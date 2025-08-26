import React, { useState, useEffect } from 'react';
import Skeleton, { 
  CardSkeleton, 
  ListItemSkeleton, 
  TableSkeleton,
  AvatarSkeleton,
  ButtonSkeleton,
  InputSkeleton,
  FormSkeleton,
  DashboardSkeleton,
  GoalsSkeleton,
  ParticipantsSkeleton,
  ProgressSkeleton,
  SkeletonGrid,
  SkeletonRow,
  SkeletonColumn
} from './index';


export const SkeletonExample = () => {
  const [loading, setLoading] = useState(true);
  const [variant, setVariant] = useState('default');
  const [animated, setAnimated] = useState(true);
  const [rounded, setRounded] = useState(false);

  useEffect(() => {
   
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleReset = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 5000);
  };

  if (loading) {
    return (
      <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2>Carregando com Skeleton Melhorado...</h2>
        
        {/* Controles */}
        <div style={{ 
          display: 'flex', 
          gap: '16px', 
          marginBottom: '30px',
          flexWrap: 'wrap',
          alignItems: 'center'
        }}>
          <label>
            <input 
              type="checkbox" 
              checked={animated} 
              onChange={(e) => setAnimated(e.target.checked)}
            />
            Animado
          </label>
          
          <label>
            <input 
              type="checkbox" 
              checked={rounded} 
              onChange={(e) => setRounded(e.target.checked)}
            />
            Arredondado
          </label>
          
          <select 
            value={variant} 
            onChange={(e) => setVariant(e.target.value)}
            style={{ padding: '8px', borderRadius: '4px' }}
          >
            <option value="default">Padrão</option>
            <option value="dark">Escuro</option>
            <option value="light">Claro</option>
            <option value="blue">Azul</option>
            <option value="green">Verde</option>
            <option value="purple">Roxo</option>
            <option value="orange">Laranja</option>
          </select>
        </div>

        {/* Header com avatar e título */}
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '30px' }}>
          <AvatarSkeleton size="large" variant={variant} animated={animated} rounded={rounded} />
          <div style={{ marginLeft: '16px', flex: 1 }}>
            <Skeleton type="text" width="60%" height="24px" lines={1} variant={variant} animated={animated} rounded={rounded} />
            <Skeleton type="text" width="40%" height="16px" lines={1} style={{ marginTop: '8px' }} variant={variant} animated={animated} rounded={rounded} />
          </div>
        </div>

        {/* Cards em grid */}
        <SkeletonGrid minWidth="280px" gap="20px" style={{ marginBottom: '30px' }}>
          <CardSkeleton 
            variant={variant} 
            animated={animated} 
            rounded={rounded}
            showHeader={true}
            showContent={true}
            showFooter={true}
          />
          <CardSkeleton 
            variant={variant} 
            animated={animated} 
            rounded={rounded}
            showHeader={true}
            showContent={true}
            showFooter={false}
          />
          <CardSkeleton 
            variant={variant} 
            animated={animated} 
            rounded={rounded}
            showHeader={false}
            showContent={true}
            showFooter={true}
          />
        </SkeletonGrid>

        {/* Lista de itens */}
        <div style={{ marginBottom: '30px' }}>
          <Skeleton type="text" width="40%" height="20px" lines={1} style={{ marginBottom: '16px' }} variant={variant} animated={animated} rounded={rounded} />
          {Array.from({ length: 4 }).map((_, index) => (
            <ListItemSkeleton 
              key={index} 
              variant={variant} 
              animated={animated} 
              rounded={rounded}
              showAvatar={true}
              showTitle={true}
              showSubtitle={true}
              showAction={true}
            />
          ))}
        </div>

        {/* Tabela */}
        <div style={{ marginBottom: '30px' }}>
          <Skeleton type="text" width="30%" height="20px" lines={1} style={{ marginBottom: '16px' }} variant={variant} animated={animated} rounded={rounded} />
          <TableSkeleton rows={4} columns={3} variant={variant} animated={animated} rounded={rounded} />
        </div>

        {/* Formulário */}
        <div style={{ marginBottom: '30px' }}>
          <Skeleton type="text" width="25%" height="20px" lines={1} style={{ marginBottom: '16px' }} variant={variant} animated={animated} rounded={rounded} />
          <FormSkeleton 
            fields={3} 
            showSubmit={true} 
            variant={variant} 
            animated={animated} 
            rounded={rounded}
          />
        </div>

        {/* Layouts específicos */}
        <div style={{ marginBottom: '30px' }}>
          <Skeleton type="text" width="35%" height="20px" lines={1} style={{ marginBottom: '16px' }} variant={variant} animated={animated} rounded={rounded} />
          
          <SkeletonRow gap="16px" style={{ marginBottom: '20px' }}>
            <Skeleton type="text" width="200px" height="16px" variant={variant} animated={animated} rounded={rounded} />
            <Skeleton type="text" width="150px" height="16px" variant={variant} animated={animated} rounded={rounded} />
            <Skeleton type="text" width="100px" height="16px" variant={variant} animated={animated} rounded={rounded} />
          </SkeletonRow>
          
          <SkeletonColumn gap="12px">
            <Skeleton type="text" width="100%" height="16px" variant={variant} animated={animated} rounded={rounded} />
            <Skeleton type="text" width="80%" height="16px" variant={variant} animated={animated} rounded={rounded} />
            <Skeleton type="text" width="60%" height="16px" variant={variant} animated={animated} rounded={rounded} />
          </SkeletonColumn>
        </div>

        {/* Componentes específicos da aplicação */}
        <div style={{ marginBottom: '30px' }}>
          <Skeleton type="text" width="45%" height="20px" lines={1} style={{ marginBottom: '16px' }} variant={variant} animated={animated} rounded={rounded} />
          
          <SkeletonGrid minWidth="300px" gap="20px">
            <GoalsSkeleton variant={variant} animated={animated} rounded={rounded} />
            <ParticipantsSkeleton variant={variant} animated={animated} rounded={rounded} />
            <ProgressSkeleton variant={variant} animated={animated} rounded={rounded} />
          </SkeletonGrid>
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2>Conteúdo Carregado com Sucesso! 🎉</h2>
      <p>Este é o conteúdo real que substitui os skeletons após o carregamento.</p>
      
      <div style={{ 
        backgroundColor: '#f0f9ff', 
        padding: '20px', 
        borderRadius: '12px',
        border: '1px solid #0ea5e9',
        marginBottom: '20px'
      }}>
        <h3>✨ Funcionalidades do Skeleton Melhorado:</h3>
        <ul style={{ lineHeight: '1.6' }}>
          <li><strong>Múltiplas Variantes:</strong> default, dark, light, blue, green, purple, orange</li>
          <li><strong>Animações:</strong> shimmer (padrão), pulse, wave, bounce</li>
          <li><strong>Opções de Formato:</strong> rounded para bordas mais suaves</li>
          <li><strong>Componentes Específicos:</strong> CardSkeleton, ListItemSkeleton, TableSkeleton, etc.</li>
          <li><strong>Layouts Utilitários:</strong> SkeletonGrid, SkeletonRow, SkeletonColumn</li>
          <li><strong>Acessibilidade:</strong> Suporte a preferências de movimento reduzido</li>
          <li><strong>Modo Escuro:</strong> Adaptação automática ao tema do sistema</li>
          <li><strong>Performance:</strong> Componentes memoizados para melhor performance</li>
        </ul>
      </div>
      
      { Botão para testar novamente */}
      <button 
        onClick={handleReset}
        style={{ 
          padding: '12px 24px', 
          backgroundColor: '#3b82f6', 
          color: 'white', 
          border: 'none', 
          borderRadius: '8px',
          cursor: 'pointer',
          fontSize: '16px',
          fontWeight: '600',
          transition: 'all 0.2s'
        }}
        onMouseEnter={(e) => e.target.style.backgroundColor = '#2563eb'}
        onMouseLeave={(e) => e.target.style.backgroundColor = '#3b82f6'}
      >
        🔄 Testar Skeleton Novamente
      </button>
    </div>
  );
};

export default SkeletonExample;
