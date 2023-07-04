import React from "react";
import { styled } from "styled-components";
import { useAppDispatch } from "../../Redux/store";
import { deleteItem } from "../../Redux/CarsSlice";
import Button from "../UI/Button/Button";
import Flex from "../UI/Flex/Flex";
import { WarningModalProps } from "../../interfaces/modal";
const WarningModal = ({
  setIsActive,
  isActive,
  message,
}: WarningModalProps) => {
  const dispatch = useAppDispatch();

  const deleteItemHandler = () => {
    dispatch(deleteItem(isActive.id as number));
    setIsActive({ isActive: false, id: null });
  };

  if (!isActive.isActive) return null;
  return (
    <Wrapper>
      <ModalBody>
        <ModalHeading>Warning</ModalHeading>
        <p>{message}</p>
        <Flex align="center" justify="between">
          <Button
            color="default"
            onClick={() => setIsActive({ isActive: false, id: null })}
          >
            Cancel
          </Button>
          <Button onClick={deleteItemHandler} color="warning">
            Delete
          </Button>
        </Flex>
      </ModalBody>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const ModalBody = styled.div`
  background-color: #fff;
  border-radius: 8px;
  width: 400px;
  padding: 10px 20px;
`;
const ModalHeading = styled.h3`
  margin: 0;
`;
export default WarningModal;
