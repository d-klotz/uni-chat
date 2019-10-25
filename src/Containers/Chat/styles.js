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

export const MessagesContainer = styled.div`
  height: 90%;
  overflow: scroll;
  overflow-x: hidden; 
  display: flex;
  flex-direction: column-reverse;

  ::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: #393e46; 
  }
  
  ::-webkit-scrollbar-thumb {
    background: #393e46; 
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #393e46; 
  }

`;