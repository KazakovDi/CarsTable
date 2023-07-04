import React, { ButtonHTMLAttributes } from "react";
import { styled } from "styled-components";
interface BtnProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  isChoosed?: boolean;
}

const ControlButton = (props: BtnProps) => {
  return (
    <Button disabled={props.isChoosed} {...props}>
      {props.children}
    </Button>
  );
};
const Button = styled.button<BtnProps>`
  border: 2px solid #000;
  outline: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 20px;
  background-color: ${(props) => (props.isChoosed ? "#000" : "#fff")};
  color: ${(props) => (props.isChoosed ? "#fff" : "#000")};
  &:hover {
    background: #c3c3c3;
  }
`;
export default ControlButton;
