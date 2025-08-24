import { Plus, UserPlus } from "lucide-react";
import ActionCard from "../ActionCard";
import {
  QuickActionsGrid,
} from "./style";

export default function QuickActions() {
  const actions = [
    {
      id: 1,
      icon: Plus,
      iconColor: "#2563eb",
      title: "Criar Nova Sala",
      description: "Inicie uma nova sala de reunião e convide participantes",
      actionText: "Criar Sala",
      onClick: () => {
        // Lógica para criar sala
        alert("Sala criada com sucesso!");
      }
    },
    {
      id: 2,
      icon: UserPlus,
      iconColor: "#16a34a",
      title: "Convidar Amigo",
      description: "Convide pessoas para se juntarem à plataforma",
      actionText: "Enviar Convite",
      onClick: () => {

        alert("Convite enviado!");
      }
    }
  ];

  return (
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
  );
}

