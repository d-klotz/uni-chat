import styled from 'styled-components';

export const Container = styled.div`

  min-height: 200px;

  > span {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  ul {
    list-style-type: none;  
  }

  li {
    padding: 10px 5px;
    border-top: 1px solid #EEEEEE;
    border-bottom: 1px solid #EEEEEE;
  }

  li:hover {
    background-color: #FBF8F8;
    
    div span {
      cursor: pointer;
      visibility: visible;
    }
  }

  li div {
    font-weight: 600;
    font-size: 16px;
    display: flex;
    justify-content: space-between;
  }

  li div span {
    cursor: pointer;
    visibility: hidden;
  }

  li span {
    font-size: 13px;
    color: #3a4750;
  }
`;