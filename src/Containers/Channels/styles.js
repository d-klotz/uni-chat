import styled from 'styled-components';

export const Container = styled.div`
  margin: 20px 0;
  color: ${({ theme }) => theme.color3};

  p {
    margin: 10px;
    font-size: 18px;
    font-weight: 500;
    cursor: pointer;
  }

  p:hover {
    color: ${({ theme }) => theme.color4};
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
    color: ${({ theme }) => theme.color4};
  }
`;

export const List = styled.li`
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  background-color: ${props => props.selectedChannel ? props.theme.color3 : props.theme.color2};
  color: ${props => props.selectedChannel ? props.theme.color4 : props.theme.color3};

  :hover {
    background-color: ${props => props.selectedChannel ? props.theme.color3 : props.theme.color1};
  }
`