import styled from 'styled-components';

export const Container = styled.header`

  nav {
    height: 100%;
    background-color: ${props => props.color};
    width: 15%;
    min-width: 200px;
    display: flex;
    flex-flow: column;
    flex: 1;
    z-index: 90;

    @media(max-width: 499px) {
      display: none;
    }
  }

`;