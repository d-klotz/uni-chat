import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  margin: 15px;

  @media(min-width: 499px) {
      display: none;
    }
`;

export const DrawerContainer = styled.div`
  height: 100%;
  width: 80%;
  display: flex;
  flex-flow: column;
  flex: 1;
`;
