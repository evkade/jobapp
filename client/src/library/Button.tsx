import styled from "styled-components";

const StyledButton = styled.div`
    background-color: blue;
    border-radius: 20px; // rounded corners
    height: 50px;
    width: 50px;
`

function Button(props: {
    callback: () => void 
}) {
    return <StyledButton onClick={() => props.callback}></StyledButton>
}

export default Button; 