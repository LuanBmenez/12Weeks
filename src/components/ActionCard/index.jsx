import { useState } from "react";
import { ChevronRight } from "lucide-react";
import {
  ActionCardContainer,
  ActionHeader,
  ActionIcon,
  ChevronIcon,
  ActionTitle,
  ActionDesc,
  ActionButton,
  Spinner,
} from "./style";

export default function ActionCard({ 
  icon: Icon, 
  iconColor, 
  title, 
  description, 
  actionText, 
  onClick 
}) {
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = async () => {
    setIsLoading(true);
    try {
      await onClick();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ActionCardContainer>
      <ActionHeader>
        <ActionIcon style={{ backgroundColor: `${iconColor}20` }}>
          <Icon size={24} style={{ color: iconColor }} />
        </ActionIcon>
        <ChevronIcon>
          <ChevronRight size={20} />
        </ChevronIcon>
      </ActionHeader>
      
      <ActionTitle>{title}</ActionTitle>
      <ActionDesc>{description}</ActionDesc>
      
      <ActionButton onClick={handleClick} disabled={isLoading}>
        {isLoading ? (
          <Spinner />
        ) : (
          <>
            <Icon size={20} />
            {actionText}
          </>
        )}
      </ActionButton>
    </ActionCardContainer>
  );
}

