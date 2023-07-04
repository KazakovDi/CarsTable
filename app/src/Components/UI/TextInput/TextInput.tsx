import React, { HTMLInputTypeAttribute, InputHTMLAttributes } from "react";
import { styled } from "styled-components";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  fullWidth?: boolean;
  error?: boolean;
}

const TextInput = (props: InputProps) => {
  return <Input {...props} />;
};

const Input = styled.input<InputProps>`
  outline: none;
  border-radius: 4px;
  border-color: ${(props) => (props.error ? "red" : "#000")};
  box-sizing: border-box;
  width: ${(props) => props.fullWidth && "100%"};
  font-size: 30px;
  padding: 5px;
`;
export default TextInput;
