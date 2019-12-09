import styled from 'styled-components';

export const Container = styled.div`
  margin: 20px 10px;
`;

export const SwitchButton = styled.div`
  input[type=checkbox]{
	height: 0;
	width: 0;
	visibility: hidden;
}

label {
	cursor: pointer;
	text-indent: -9999px;
	width: 50px;
	height: 30px;
	background: grey;
	display: block;
	border-radius: 20px;
	position: relative;
}

label:after {
	content: '';
	position: absolute;
	top: 5px;
	left: 5px;
	width: 20px;
	height: 20px;
	background: ${({ theme }) => theme.color2};
	border-radius: 20px;
	transition: 0.3s;
}

input:checked + label {
	background: ${({ theme }) => theme.color4};
}

input:checked + label:after {
	left: calc(100% - 5px);
	transform: translateX(-100%);
}

label:active:after {
	width: 20px;
}
`;