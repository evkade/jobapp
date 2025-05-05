import styled from "styled-components";
import { buttonStyles } from "../styles/buttonStyles";

const StyledButton = styled.button<{
  bgColor?: string;
  hoverColor?: string;
  height?: string;
  width?: string;
  fontSize?: string;
}>`
  ${buttonStyles}
`;

export default StyledButton;
