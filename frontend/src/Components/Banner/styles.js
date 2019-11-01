import styled from 'styled-components';

export const Container = styled.div`
  height: 30px;
  width: 100%;
  background-color: ${props => props.color};
  color: white;
  font-weight: 400;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;
