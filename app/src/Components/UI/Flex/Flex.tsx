import React from "react";
import styled from "styled-components";

interface FlexParams {
  justify?: "start" | "end" | "center" | "between" | "around" | "evenly";
  align?: "stretch" | "baseline" | "center" | "start" | "end";
  direction?: "row" | "column";
  wrap?: "wrap" | "nowrap";
  gap?: "xl" | "lg" | "md" | "sm" | "xs";
  children?: React.ReactNode;
}
const Flex = (props: FlexParams) => {
  return <Box {...props}>{props.children}</Box>;
};

const Box = styled.div<FlexParams>`
  display: flex;
  justify-content: ${(props) =>
    props.justify === "center"
      ? "center"
      : props.justify === "start"
      ? "flex-start"
      : props.justify === "end"
      ? "flex-end"
      : props.justify === "between"
      ? "space-between"
      : props.justify === "around"
      ? "space-around"
      : props.justify === "evenly"
      ? "space-evenly"
      : "unset"};
  align-items: ${(props) =>
    props.align === "start"
      ? "flex-start"
      : props.align === "end"
      ? "flex-end"
      : props.align};
  flex-direction: ${(props) => props.direction};
  flex-wrap: ${(props) => props.wrap};
`;

export default Flex;
