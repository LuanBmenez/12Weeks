import React from 'react';
import RoomsList from '../../components/RoomsList';
import { Container, Main } from './style';

const MyRooms = () => {
  return (
    <Container>
      <Main>
        <RoomsList />
      </Main>
    </Container>
  );
};

export default MyRooms;
