import styled from 'styled-components';

export const Container = styled.div`
  background-color: ${props => props.color};
  width: 15%;
  min-width: 200px;
  display: flex;
  flex-flow: column;
  flex: 1;
`;