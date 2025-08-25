import React, { memo } from 'react';
import { SkeletonContainer, SkeletonItem, SkeletonWrapper } from './style';

const Skeleton = memo(({ 
  type = 'text', 
  width, 
  height, 
  lines = 1, 
  className, 
  style,
  animated = true,
  rounded = false,
  variant = 'default'
}) => {
  if (type === 'text') {
    return (
      <SkeletonContainer className={className}>
        {Array.from({ length: lines }).map((_, index) => (
          <SkeletonItem
            key={index}
            type={type}
            variant={variant}
            animated={animated}
            rounded={rounded}
            style={{
              width: index === lines - 1 ? width || '80%' : '100%',
              height: height || '16px',
              marginBottom: index < lines - 1 ? '8px' : '0'
            }}
          />
        ))}
      </SkeletonContainer>
    );
  }

  if (type === 'circle') {
    return (
      <SkeletonItem
        type="circle"
        variant={variant}
        animated={animated}
        rounded={rounded}
        style={{
          width: width || '40px',
          height: height || '40px',
          borderRadius: '50%'
        }}
        className={className}
      />
    );
  }

  if (type === 'card') {
    return (
      <SkeletonContainer className={className}>
        <SkeletonItem
          type="card"
          variant={variant}
          animated={animated}
          rounded={rounded}
          style={{
            width: width || '100%',
            height: height || '120px',
            borderRadius: rounded ? '12px' : '8px'
          }}
        />
      </SkeletonContainer>
    );
  }

  if (type === 'avatar') {
    return (
      <SkeletonItem
        type="avatar"
        variant={variant}
        animated={animated}
        rounded={rounded}
        style={{
          width: width || '48px',
          height: height || '48px',
          borderRadius: rounded ? '50%' : '8px'
        }}
        className={className}
      />
    );
  }

  if (type === 'button') {
    return (
      <SkeletonItem
        type="button"
        variant={variant}
        animated={animated}
        rounded={rounded}
        style={{
          width: width || '120px',
          height: height || '40px',
          borderRadius: rounded ? '20px' : '8px'
        }}
        className={className}
      />
    );
  }

  if (type === 'input') {
    return (
      <SkeletonItem
        type="input"
        variant={variant}
        animated={animated}
        rounded={rounded}
        style={{
          width: width || '100%',
          height: height || '40px',
          borderRadius: rounded ? '20px' : '8px'
        }}
        className={className}
      />
    );
  }

  return (
    <SkeletonItem
      type={type}
      variant={variant}
      animated={animated}
      rounded={rounded}
      style={{
        width: width || '100%',
        height: height || '16px',
        borderRadius: rounded ? '8px' : '4px',
        ...style
      }}
      className={className}
    />
  );
});


export const CardSkeleton = memo(({ 
  showHeader = true,
  showContent = true,
  showFooter = true,
  variant = 'default',
  animated = true,
  rounded = false
}) => (
  <SkeletonWrapper 
    className="card-skeleton"
    style={{ 
      padding: '16px', 
      border: '1px solid #e5e7eb', 
      borderRadius: rounded ? '16px' : '8px',
      background: 'white'
    }}
  >
    {showHeader && (
      <div style={{ marginBottom: '16px' }}>
        <Skeleton 
          type="text" 
          width="60%" 
          height="20px" 
          lines={1}
          variant={variant}
          animated={animated}
          rounded={rounded}
        />
      </div>
    )}
    
    {showContent && (
      <div style={{ marginBottom: '16px' }}>
        <Skeleton 
          type="text" 
          width="100%" 
          height="16px" 
          lines={2}
          variant={variant}
          animated={animated}
          rounded={rounded}
        />
      </div>
    )}
    
    {showFooter && (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Skeleton 
          type="text" 
          width="40%" 
          height="16px" 
          lines={1}
          variant={variant}
          animated={animated}
          rounded={rounded}
        />
        <Skeleton 
          type="button" 
          width="80px" 
          height="32px"
          variant={variant}
          animated={animated}
          rounded={rounded}
        />
      </div>
    )}
  </SkeletonWrapper>
));

export const ListItemSkeleton = memo(({ 
  showAvatar = true,
  showTitle = true,
  showSubtitle = true,
  showAction = true,
  variant = 'default',
  animated = true,
  rounded = false
}) => (
  <div style={{ 
    display: 'flex', 
    alignItems: 'center', 
    padding: '12px 0', 
    borderBottom: '1px solid #f3f4f6' 
  }}>
    {showAvatar && (
      <Skeleton 
        type="avatar" 
        width="48px" 
        height="48px"
        variant={variant}
        animated={animated}
        rounded={rounded}
      />
    )}
    
    <div style={{ marginLeft: '16px', flex: 1 }}>
      {showTitle && (
        <Skeleton 
          type="text" 
          width="60%" 
          height="18px" 
          lines={1}
          variant={variant}
          animated={animated}
          rounded={rounded}
        />
      )}
      
      {showSubtitle && (
        <Skeleton 
          type="text" 
          width="40%" 
          height="14px" 
          lines={1}
          variant={variant}
          animated={animated}
          rounded={rounded}
          style={{ marginTop: '4px' }}
        />
      )}
    </div>
    
    {showAction && (
      <Skeleton 
        type="text" 
        width="80px" 
        height="16px" 
        lines={1}
        variant={variant}
        animated={animated}
        rounded={rounded}
      />
    )}
  </div>
));

export const TableSkeleton = memo(({ 
  rows = 5, 
  columns = 4, 
  showHeader = true,
  variant = 'default',
  animated = true,
  rounded = false
}) => (
  <div>
    {showHeader && (
      <div style={{ 
        display: 'flex', 
        borderBottom: '2px solid #e5e7eb', 
        padding: '12px 0' 
      }}>
        {Array.from({ length: columns }).map((_, index) => (
          <Skeleton
            key={index}
            type="text"
            width="100px"
            height="16px"
            lines={1}
            variant={variant}
            animated={animated}
            rounded={rounded}
            style={{ marginRight: index < columns - 1 ? '16px' : '0' }}
          />
        ))}
      </div>
    )}
    
    {Array.from({ length: rows }).map((_, rowIndex) => (
      <div key={rowIndex} style={{ 
        display: 'flex', 
        padding: '12px 0', 
        borderBottom: '1px solid #f3f4f6' 
      }}>
        {Array.from({ length: columns }).map((_, colIndex) => (
          <Skeleton
            key={colIndex}
            type="text"
            width="100px"
            height="16px"
            lines={1}
            variant={variant}
            animated={animated}
            rounded={rounded}
            style={{ marginRight: colIndex < columns - 1 ? '16px' : '0' }}
          />
        ))}
      </div>
    ))}
  </div>
));

export const AvatarSkeleton = memo(({ 
  size = 'medium',
  variant = 'default',
  animated = true,
  rounded = false
}) => {
  const sizes = {
    small: '32px',
    medium: '48px',
    large: '64px',
    xlarge: '96px'
  };
  
  return (
    <Skeleton 
      type="avatar" 
      width={sizes[size] || sizes.medium} 
      height={sizes[size] || sizes.medium}
      variant={variant}
      animated={animated}
      rounded={rounded}
    />
  );
});

export const ButtonSkeleton = memo(({ 
  width = '120px', 
  height = '40px',
  variant = 'default',
  animated = true,
  rounded = false
}) => (
  <Skeleton 
    type="button" 
    width={width} 
    height={height}
    variant={variant}
    animated={animated}
    rounded={rounded}
  />
));

export const InputSkeleton = memo(({ 
  width = '100%', 
  height = '40px',
  variant = 'default',
  animated = true,
  rounded = false
}) => (
  <Skeleton 
    type="input" 
    width={width} 
    height={height}
    variant={variant}
    animated={animated}
    rounded={rounded}
  />
));

export const FormSkeleton = memo(({ 
  fields = 3,
  showSubmit = true,
  variant = 'default',
  animated = true,
  rounded = false
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    {Array.from({ length: fields }).map((_, index) => (
      <div key={index}>
        <Skeleton 
          type="text" 
          width="30%" 
          height="16px" 
          lines={1}
          variant={variant}
          animated={animated}
          rounded={rounded}
          style={{ marginBottom: '8px' }}
        />
        <Skeleton 
          type="input" 
          width="100%" 
          height="40px"
          variant={variant}
          animated={animated}
          rounded={rounded}
        />
      </div>
    ))}
    
    {showSubmit && (
      <div style={{ marginTop: '8px' }}>
        <Skeleton 
          type="button" 
          width="120px" 
          height="40px"
          variant={variant}
          animated={animated}
          rounded={rounded}
        />
      </div>
    )}
  </div>
));

export const DashboardSkeleton = memo(({ 
  variant = 'default',
  animated = true,
  rounded = false
}) => (
  <div style={{ padding: '20px' }}>
    {/* Header */}
    <div style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      alignItems: 'center', 
      marginBottom: '30px' 
    }}>
      <Skeleton 
        type="text" 
        width="200px" 
        height="28px" 
        lines={1}
        variant={variant}
        animated={animated}
        rounded={rounded}
      />
      <div style={{ display: 'flex', gap: '12px' }}>
        <Skeleton 
          type="button" 
          width="100px" 
          height="40px"
          variant={variant}
          animated={animated}
          rounded={rounded}
        />
        <Skeleton 
          type="avatar" 
          width="40px" 
          height="40px"
          variant={variant}
          animated={animated}
          rounded={rounded}
        />
      </div>
    </div>

    {/* Stats Cards */}
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
      gap: '20px',
      marginBottom: '30px'
    }}>
      {Array.from({ length: 4 }).map((_, index) => (
        <CardSkeleton 
          key={index}
          height="120px"
          variant={variant}
          animated={animated}
          rounded={rounded}
        />
      ))}
    </div>

    {/* Recent Activity */}
    <div style={{ marginBottom: '30px' }}>
      <Skeleton 
        type="text" 
        width="150px" 
        height="20px" 
        lines={1}
        variant={variant}
        animated={animated}
        rounded={rounded}
        style={{ marginBottom: '16px' }}
      />
      {Array.from({ length: 5 }).map((_, index) => (
        <ListItemSkeleton 
          key={index}
          variant={variant}
          animated={animated}
          rounded={rounded}
        />
      ))}
    </div>
  </div>
));


export const GoalsSkeleton = memo(({ 
  variant = 'default',
  animated = true,
  rounded = false
}) => (
  <div style={{ padding: '20px' }}>
    <Skeleton 
      type="text" 
      width="60%" 
      height="24px" 
      lines={1}
      variant={variant}
      animated={animated}
      rounded={rounded}
    />
    <div style={{ marginTop: '20px' }}>
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton
          key={index}
          type="text"
          width="100%"
          height="20px"
          lines={1}
          variant={variant}
          animated={animated}
          rounded={rounded}
          style={{ marginBottom: '12px' }}
        />
      ))}
    </div>
  </div>
));

export const ParticipantsSkeleton = memo(({ 
  variant = 'default',
  animated = true,
  rounded = false
}) => (
  <div style={{ padding: '20px' }}>
    <Skeleton 
      type="text" 
      width="50%" 
      height="24px" 
      lines={1}
      variant={variant}
      animated={animated}
      rounded={rounded}
    />
    <div style={{ marginTop: '20px' }}>
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} style={{ 
          display: 'flex', 
          alignItems: 'center', 
          marginBottom: '16px' 
        }}>
          <Skeleton 
            type="avatar" 
            width="48px" 
            height="48px"
            variant={variant}
            animated={animated}
            rounded={rounded}
          />
          <div style={{ marginLeft: '12px', flex: 1 }}>
            <Skeleton 
              type="text" 
              width="40%" 
              height="16px" 
              lines={1}
              variant={variant}
              animated={animated}
              rounded={rounded}
            />
            <Skeleton 
              type="text" 
              width="60%" 
              height="14px" 
              lines={1}
              variant={variant}
              animated={animated}
              rounded={rounded}
              style={{ marginTop: '4px' }}
            />
          </div>
          <Skeleton 
            type="text" 
            width="60px" 
            height="16px" 
            lines={1}
            variant={variant}
            animated={animated}
            rounded={rounded}
          />
        </div>
      ))}
    </div>
  </div>
));

export const ProgressSkeleton = memo(({ 
  variant = 'default',
  animated = true,
  rounded = false
}) => (
  <div style={{ padding: '20px' }}>
    <Skeleton 
      type="text" 
      width="70%" 
      height="20px" 
      lines={1}
      variant={variant}
      animated={animated}
      rounded={rounded}
    />
    <div style={{ marginTop: '20px', textAlign: 'center' }}>
      <Skeleton 
        type="circle" 
        width="80px" 
        height="80px"
        variant={variant}
        animated={animated}
        rounded={rounded}
      />
      <Skeleton 
        type="text" 
        width="60px" 
        height="16px" 
        lines={1}
        variant={variant}
        animated={animated}
        rounded={rounded}
        style={{ marginTop: '8px' }}
      />
    </div>
  </div>
));

Skeleton.displayName = 'Skeleton';
CardSkeleton.displayName = 'CardSkeleton';
ListItemSkeleton.displayName = 'ListItemSkeleton';
TableSkeleton.displayName = 'TableSkeleton';
AvatarSkeleton.displayName = 'AvatarSkeleton';
ButtonSkeleton.displayName = 'ButtonSkeleton';
InputSkeleton.displayName = 'InputSkeleton';
FormSkeleton.displayName = 'FormSkeleton';
DashboardSkeleton.displayName = 'DashboardSkeleton';
GoalsSkeleton.displayName = 'GoalsSkeleton';
ParticipantsSkeleton.displayName = 'ParticipantsSkeleton';
ProgressSkeleton.displayName = 'ProgressSkeleton';

export default Skeleton;
