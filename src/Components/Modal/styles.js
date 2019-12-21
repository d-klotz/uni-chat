import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  z-index: 500;
  left: 35%;
  top: 20%;
  background-color: ${({ theme }) => theme.color2};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  border: 1px solid ${({ theme }) => theme.color2};
  box-sizing: border-box;
  transition: all 0.3s ease-out;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  overflow: hidden;
`;

export const Title = styled.p`
  margin: 10px;
  font-size:16px;
  font-weight: 600;
  color: ${({ theme }) => theme.color3}
`;

export const Footer = styled.div`
  margin: 10px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

