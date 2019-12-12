import styled from 'styled-components';

export const Container = styled.div`
  background: ${({ theme }) => theme.color4};
  height: 45px;
  width: 100%;
  margin: 5px;
  padding: 5px;
  border-radius: 20px;
  display: flex;
  flex-flow: row;
  justify-content: space-between;

  span {
    position: relative;
    cursor: pointer;
  }

  span div {
    padding: 5px;
  }
`;

export const Input = styled.input.attrs(props => ({
  type: "text",
  placeholder: props.placeholder
}))`
  background: ${({ theme }) => theme.color4};
  color: ${({ theme }) => theme.colorMessageInput};
  border: none;
  border-radius: 20px;
  font-size: 16px;
  width: 90%;
  height: 100%;
  padding: 5px;
`;
