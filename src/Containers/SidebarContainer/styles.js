import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  flex: 1;
`;

export const ContainerItem = styled.div`
  margin: 20px 0;

  p {
    margin: 10px;
    color: #00adb5;
    cursor: pointer;
    flex-grow: 1;
  }
`;

export const GroupListContainer = styled.div`
  margin: 10px;
`