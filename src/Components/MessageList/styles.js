import styled from 'styled-components';

export const Container = styled.div`
  /* max-width: 50%; */
  display: flex;
  flex-flow: column;
`;

export const ListItem = styled.span`
  margin: 10px;
  color: #eeeeee;
  align-self: flex-start; 
`;

export const MessageContent = styled.div`
  background-color: ${props => props.myMessage ? '#00adb5' : '#222831'};
  font-size: 16px;
  border-radius: 20px;
  margin-top: 10px;
  padding: 5px 10px;
  min-height: 30px;  
  position: relative;
  overflow:auto;
`;

export const TimeLayout = styled.span`
  font-size: 10px;
  color: #dddd;
  font-weight: normal;
`;

export const MessageTitle = styled.div`
  font-size: 14px;
  font-weight: 500;
  align-self: ${props => props.myMessage ? 'flex-end' : 'flex-start'};
`;