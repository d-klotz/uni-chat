import styled from 'styled-components';

export const Container = styled.div`
  
  h3 {
    margin: 0 10px;
    padding-top: 20px;
    padding-bottom: 15px;
    color: #00adb5;
  }
`;

export const UserContainer = styled.div`
  display: flex;
  flex-direction: row;
  margin-top: 5px;
  
  p {
    font-size: 16px;
  }

  span {
    margin: 5px 2px;
  }
`;

export const AvatarPhoto = styled.div`
    background-image: url(${props => props.photo ? props.photo : 'black'});
    width: 35px;
    height: 35px;
    background-size: cover;
    background-position: center;
    border-radius: 10%;
`;
