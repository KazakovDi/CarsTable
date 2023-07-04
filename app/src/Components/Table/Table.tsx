import React, { useState } from "react";
import { styled } from "styled-components";
import { RootState, useAppDispatch } from "../../Redux/store";
import { CarProps } from "../../interfaces/car";
import { useSelector } from "react-redux";
import { FetchStatus, setModal } from "../../Redux/CarsSlice";
import { WarningModalStateProps } from "../../interfaces/modal";
import WarningModal from "../WarningModal/WarningModal";
import Action from "../Actions/Action";
import Placeholder from "../Placeholder/Placeholder";
const Table = () => {
  const dispatch = useAppDispatch();
  const { data: cars, dataStatus: status } = useSelector(
    (state: RootState) => state.cars
  );
  const [isActive, setIsActive] = useState<WarningModalStateProps>({
    isActive: false,
    id: null,
  });
  const activateEditModal = (car: CarProps) => {
    dispatch(setModal({ ...car, mode: "edditing" }));
  };

  const onDelete = (id: number | null) => {
    if (id) setIsActive({ isActive: true, id });
  };
  return (
    <>
      {status === FetchStatus.PENDING ? (
        <Placeholder message="Loading..." />
      ) : status === FetchStatus.REJECTED ? (
        <Placeholder isError message="Service is currently unavailable" />
      ) : (
        <>
          <TableBody cellPadding={"5px"}>
            <thead>
              <tr>
                <TableHeading>Company</TableHeading>
                <TableHeading>Model</TableHeading>
                <TableHeading>VIN</TableHeading>
                <TableHeading>Color</TableHeading>
                <TableHeading>Year</TableHeading>
                <TableHeading>Price</TableHeading>
                <TableHeading>Availability</TableHeading>
                <TableHeading>Actions</TableHeading>
              </tr>
            </thead>
            <tbody>
              {cars.map((item: CarProps) => {
                return (
                  <tr key={item.id}>
                    <TableItem>{item.car}</TableItem>
                    <TableItem>{item.car_model}</TableItem>
                    <TableItem>{item.car_vin}</TableItem>
                    <TableItem>{item.car_color}</TableItem>
                    <TableItem>{item.car_model_year}</TableItem>
                    <TableItem>{item.price}</TableItem>
                    <TableItem>
                      {item.availability ? "available" : "not available"}
                    </TableItem>
                    <TableItem>
                      <Action
                        onEdit={() => activateEditModal(item)}
                        onDelete={() => onDelete(item.id)}
                      />
                    </TableItem>
                  </tr>
                );
              })}
            </tbody>
          </TableBody>
          <WarningModal
            setIsActive={setIsActive}
            isActive={isActive}
            message="Are you sure ?"
          />
        </>
      )}
    </>
  );
};
const TableBody = styled.table`
  width: 100%;
  border: 1px solid black;
  border-collapse: collapse;
`;
const TableItem = styled.td`
  border: 1px solid black;
  border-collapse: collapse;
`;
const TableHeading = styled.th`
  text-align: left;
  border: 1px solid black;
  border-collapse: collapse;
`;
export default Table;
