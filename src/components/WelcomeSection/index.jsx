import {
  WelcomeSectionContainer,
  WelcomeTitle,
  WelcomeSubtitle,
} from "./style";

export default function WelcomeSection() {
  return (
    <WelcomeSectionContainer>
      <WelcomeTitle>Bem-vindo de volta!</WelcomeTitle>
      <WelcomeSubtitle>
        Gerencie suas salas e conecte-se com sua equipe
      </WelcomeSubtitle>
    </WelcomeSectionContainer>
  );
}

