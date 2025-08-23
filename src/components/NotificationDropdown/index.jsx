import {
  NotificationDropdownContainer,
  NotificationHeader,
  NotificationTitle,
  NotificationList,
  NotificationItem,
  NotificationText,
  NotificationTime,
} from "./style";

export default function NotificationDropdown() {
  const notifications = [
    {
      id: 1,
      text: "Nova sala criada: 'Projeto X'",
      time: "5 min atrás"
    },
    {
      id: 2,
      text: "João se juntou à sala 'Brainstorm'",
      time: "15 min atrás"
    }
  ];

  return (
    <NotificationDropdownContainer>
      <NotificationHeader>
        <NotificationTitle>Notificações</NotificationTitle>
      </NotificationHeader>
      <NotificationList>
        {notifications.map((notification) => (
          <NotificationItem key={notification.id}>
            <NotificationText>{notification.text}</NotificationText>
            <NotificationTime>{notification.time}</NotificationTime>
          </NotificationItem>
        ))}
      </NotificationList>
    </NotificationDropdownContainer>
  );
}

