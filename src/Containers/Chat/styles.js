import styled from 'styled-components';

export const Container = styled.div`
  background-color: #393e46;
  display: flex;
  flex-flow: row;
  height: 100vh;
`;

export const Content = styled.div`
  flex-flow: column;
  width: 100%;
  height: 100%;
  justify-content: flex-end;
  margin-right: 15px;
  margin-left: 15px;
`;

export const MessageInput = styled.div`
  background: #eeeeee;
  height: 45px;
  width: 100%;
  border-radius: 20px;
`;

export const MessagesContainer = styled.div`
  height: 90%;
`;