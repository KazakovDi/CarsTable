import React, { useState } from "react";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../Redux/store";
import {
  changePaginationEndPoints,
  getDataFromStorage,
  fetchCars,
} from "../../Redux/CarsSlice";
import { styled } from "styled-components";
import ControlButton from "../UI/ControlButton/ControlButton";

const Pagination = () => {
  const dispatch = useAppDispatch();
  const pagination = useSelector((state: RootState) => state.cars.pagination);

  let startPage = pagination.currentPage - 3;
  if (startPage < 1) startPage = 1;
  let endPage = pagination.currentPage + 3;
  if (endPage > pagination.pages) endPage = pagination.pages;
  let pages: number[] = [];
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  const changePage = async (page: number) => {
    dispatch(changePaginationEndPoints(page - 1));
    const cars = window.localStorage.getItem("cars");
    if (!cars) {
      const { payload } = await dispatch(fetchCars());
      window.localStorage.setItem("cars", JSON.stringify(payload));
    } else dispatch(getDataFromStorage(JSON.parse(cars)));
  };

  return (
    <Wrapper>
      {startPage > 1 ? (
        <ControlButton onClick={() => changePage(1)}>First</ControlButton>
      ) : null}
      {pages.map((item) => {
        return (
          <ControlButton
            isChoosed={item === pagination.currentPage}
            key={item}
            onClick={() => changePage(item)}
          >
            {item}
          </ControlButton>
        );
      })}
      {pagination.currentPage < pagination.pages - 3 ? (
        <ControlButton onClick={() => changePage(pagination.pages)}>
          Last
        </ControlButton>
      ) : null}
    </Wrapper>
  );
};
const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  * {
    margin: 2px 5px;
    padding: 1px 10px;
  }
`;
export default Pagination;
