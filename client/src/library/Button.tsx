import styled from "styled-components";

const StyledButton = styled.button`
    background-color: #bbf0ec;
    border-radius: 12px; // rounded corners
    height: 30px;
    width: 70px;
    padding: 1px;
    border: 0px;
    cursor: pointer;

    &:hover {
    background-color: #a3e2dd; // 👈 Slightly darker/lighter shade on hover
  }
`

function Button(props: {
    callback: () => void;
    label: string;
}) {
    return <StyledButton onClick={props.callback}>{props.label}</StyledButton>
}

export default Button; 