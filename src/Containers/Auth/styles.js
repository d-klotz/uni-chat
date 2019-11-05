import styled from 'styled-components';

export const Container = styled.div`

  h1 {
    margin: 20px auto;
    width: 80%;
    text-align: center;
  }

  h2 {
    margin: 20px auto;
    width: 80%;
    text-align: center;
  }
`;

export const Box = styled.div`
    margin: 20px auto;
    width: 80%;
    box-shadow: 0 2px 3px #ccc;
    border: 1px solid #eee;
    background: #FFF;
    opacity: 0.9;
    padding: 10px;

  @media (min-width: 700px) {
    width: 600px;
  }
`;
