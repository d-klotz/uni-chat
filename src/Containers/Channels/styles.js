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
    background-color: #3a4750;
  }
`;