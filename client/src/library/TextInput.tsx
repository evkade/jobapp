import styled from "styled-components";

const TextInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const StyledLabel = styled.p`
  font-weight: bold;
`;

const StyledInput = styled.input`
  border-radius: 12px; // rounded corners
  height: 30px;
  width: 100px;
`;

function TextInput(props: {
  label: string;
  value: string;
  setValue: (value: string) => void;
}) {
  const { label, value, setValue } = props;

  return (
    <TextInputContainer>
      <StyledLabel> {label} </StyledLabel>
      <StyledInput value={value} onChange={(e) => setValue(e.target.value)} />
    </TextInputContainer>
  );
}

export default TextInput;
