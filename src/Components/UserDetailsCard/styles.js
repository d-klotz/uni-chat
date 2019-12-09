import styled from 'styled-components';

export const Container = styled.div`
  position: fixed;
  z-index: 500;
  background-color: ${({ theme }) => theme.color2};
  width: 280px;
  height: 400px;
  border: 1px solid ${({ theme }) => theme.color2};
  left: ${props => props.modalPositionAxeX ? `${props.modalPositionAxeX + 50 > 400 ? 400 : props.modalPositionAxeX + 50}px` : '20px'};
  top: ${props => props.modalPositionAxeY ? `${props.modalPositionAxeY - 50 > 286 ? 240 : props.modalPositionAxeY - 50}px` : '20px'};
  box-sizing: border-box;
  transition: all 0.3s ease-out;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  overflow: hidden;

  p,
  h3 {
    margin: 10px;
    color: ${({ theme }) => theme.color4};
  }
`;

export const AvatarPhoto = styled.div`
    background-image: url(${props => props.photo ? props.photo : 'black'});
    width: 280px;
    height: 280px;
    background-size: cover;
    background-position: center;
`;
