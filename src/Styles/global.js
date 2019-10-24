import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,500&display=swap');
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }
  html body #root {
    height: 100%;
  }

  body {
    font: 14px 'Roboto', sans-serif;
    -webkit-font-smoothing: antialiased !important;    
    background-image: url("https://dklotz-projects.s3.eu-central-1.amazonaws.com/background3.svg");
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: bottom left;
  }

  body {
    background: ${props => props.showBackgroundImage ? 'white' : ''}
  }
`;