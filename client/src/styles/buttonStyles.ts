import { css } from "styled-components";

export const buttonStyles = css<{
  bgColor?: string;
  hoverColor?: string;
  height?: string;
  width?: string;
  fontSize?: string;
}>`
  background-color: ${({ bgColor }) => bgColor || "#bbf0ec"};
  border-radius: 12px;
  height: ${({ height }) => height || "40px"};
  width: ${({ width }) => width || "80px"};
  padding: 1px;
  border: 0px;
  cursor: pointer;
  font-size: ${({ fontSize }) => fontSize || "18px"};

  &:hover {
    background-color: ${({ hoverColor }) => hoverColor || "#a3e2dd"};
  }
`;