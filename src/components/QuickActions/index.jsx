import { useState } from "react";
import { Plus, UserPlus, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";
import ActionCard from "../ActionCard";
import FriendInviteModal from "../FriendInviteModal";
import {
  QuickActionsGrid,
} from "./style";

export default function QuickActions({ onCreateRoom }) {
  const [isFriendModalOpen, setIsFriendModalOpen] = useState(false);
  const navigate = useNavigate();

  const actions = [
    {
      id: 1,
      icon: Plus,
      iconColor: "#2563eb",
      title: "Criar Nova Sala",
      description: "Inicie uma nova sala de reunião e convide participantes",
      actionText: "Criar Sala",
      onClick: () => {
        onCreateRoom();
      }
    },
    {
      id: 2,
      icon: Users,
      iconColor: "#7c3aed",
      title: "Minhas Salas",
      description: "Visualize e gerencie todas as suas salas criadas",
      actionText: "Ver Salas",
      onClick: () => {
        navigate('/my-rooms');
      }
    },
    {
      id: 3,
      icon: UserPlus,
      iconColor: "#16a34a",
      title: "Convidar Amigo",
      description: "Convide pessoas para se juntarem à plataforma",
      actionText: "Enviar Convite",
      onClick: () => {
        setIsFriendModalOpen(true);
      }
    }
  ];

  return (
    <>
      <QuickActionsGrid>
        {actions.map((action) => (
          <ActionCard
            key={action.id}
            icon={action.icon}
            iconColor={action.iconColor}
            title={action.title}
            description={action.description}
            actionText={action.actionText}
            onClick={action.onClick}
          />
        ))}
      </QuickActionsGrid>

      <FriendInviteModal 
        isOpen={isFriendModalOpen}
        onClose={() => setIsFriendModalOpen(false)}
      />
    </>
  );
}

