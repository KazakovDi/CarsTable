import React, { ButtonHTMLAttributes } from "react";
import { styled } from "styled-components";
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: "default" | "warning";
  fullWidth?: boolean;
}
const Button = (props: ButtonProps) => {
  return <Btn {...props}>{props.children}</Btn>;
};
const Btn = styled.button<ButtonProps>`
  outline: none;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 24px;
  color: #fff;
  background-color: ${(props) =>
    props.color === "warning" ? "rgb(250, 82, 82)" : "rgb(4, 139, 230)"};
  width: ${(props) => props.fullWidth && "100%"};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 5px;
  box-sizing: border-box;
`;
export default Button;
