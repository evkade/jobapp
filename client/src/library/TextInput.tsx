import styled from "styled-components";

const TextInputContainer = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center; 
    gap: 10px
`

const StyledLabel = styled.p`
    font-weight: bold;
`

const StyledInput = styled.input`
    border-radius: 12px; // rounded corners
    height: 30px;
    width: 100px;
`

function TextInput(props: {
    label: string;
    value: string;
}) {
    return (
        <TextInputContainer>
            <StyledLabel> {props.label} </StyledLabel> 
            <StyledInput/>
        </TextInputContainer>
    )
}

export default TextInput; 