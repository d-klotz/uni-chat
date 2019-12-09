import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-flow: column;
  margin-bottom: 10px;
`;

export const ListItem = styled.span`
  color: ${({ theme }) => theme.color4};
  margin: 0 10px;
  align-self: flex-start; 
`;

export const MessageContent = styled.div`
  background-color: ${props => props.myMessage ? props.theme.color3 : props.theme.color2};
  font-size: 16px;
  border-radius: 20px;
  margin-top: 10px;
  padding: 5px 10px;
  min-height: 30px;  
  position: relative;
  overflow:auto;
`;

export const MessageTitle = styled.div`
  margin: 10px 0;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.color5};
  align-self: ${props => props.myMessage ? 'flex-end' : 'flex-start'};
`;

export const UsernameLayout = styled.span`
  cursor: pointer;
  margin-right: 5px;

  :hover {
    text-decoration: underline;
  }
`;

export const TimeLayout = styled.span`
  font-size: 10px;
  font-weight: normal;
`;