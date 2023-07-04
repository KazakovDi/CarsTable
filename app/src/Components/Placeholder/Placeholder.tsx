import React from "react";
import { styled } from "styled-components";

interface PlaceholderProps {
  message: string;
  isError?: boolean;
}

const Placeholder = (props: PlaceholderProps) => {
  return <Box {...props}>{props.message}</Box>;
};

const Box = styled.div<PlaceholderProps>`
  font-size: 30px;
  font-weight: 700;
  color: ${(props) => (props.isError ? "red" : "#000")};
  text-align: center;
`;

export default Placeholder;
