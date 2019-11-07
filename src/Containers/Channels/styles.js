import styled from 'styled-components';

export const Container = styled.div`
  margin: 20px 0;
  color: #00adb5;

  p {
    margin: 10px;
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;
  }

  p:hover {
    color: #eeeeee;
  }
  
  ul {
    margin: 10px 0;
    list-style-type: none;
  }

  li {
    padding: 10px;
    font-size: 16px;
    cursor: pointer;
  }

  li:hover {
    color: #eeeeee;
  }
`;

export const List = styled.li`
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  background-color: ${props => props.selectedChannel ? '#00adb5' : '#222831'};
  color: ${props => props.selectedChannel ? '#eeeeee' : '#00adb5'};

  :hover {
    background-color: ${props => props.selectedChannel ? '#00adb5' : '#3a4750'};
  }
`