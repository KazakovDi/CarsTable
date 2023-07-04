import React, { useEffect, useState, useRef, ReactNode } from "react";

import Button from "../UI/Button/Button";

import { IconCaretDown, IconPencil, IconTrash } from "@tabler/icons-react";

import { styled } from "styled-components";

import { ActionProps } from "../../interfaces/action";
const Action = ({ onEdit, onDelete }: ActionProps) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const actionRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!isActive) return;

    const clickAway = (e: MouseEvent) => {
      if (!!actionRef && actionRef?.current?.contains(e.target as Node)) {
      } else setIsActive(false);
    };

    if (isActive) window.addEventListener("click", clickAway);
    return () => {
      window.removeEventListener("click", clickAway);
    };
  }, [isActive]);
  return (
    <Box ref={actionRef} onClick={() => setIsActive((state) => !state)}>
      <Content>Choose an action</Content>
      <span>
        <IconCaretDown />
      </span>
      {isActive ? (
        <DropDown>
          <Button
            type="button"
            color="default"
            fullWidth
            onClick={() => onEdit()}
          >
            <IconPencil />
            <span>Edit</span>
          </Button>

          <Button
            onClick={() => onDelete()}
            color="warning"
            fullWidth
            type="button"
          >
            <IconTrash />
            <span>Delete</span>
          </Button>
        </DropDown>
      ) : null}
    </Box>
  );
};

const Box = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
`;
const Content = styled.span`
  font-weight: bold;
`;
const DropDown = styled.div`
  position: absolute;
  background-color: #c3c3c3;
  width: 100%;
  padding: 5px;
  bottom: -390%;
  left: -5px;
  z-index: 5;
  button {
    margin: 5px 0;
  }
`;
export default Action;
