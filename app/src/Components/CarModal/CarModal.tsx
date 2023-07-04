import React, { useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { CarProps, ModalProps } from "../../interfaces/car";
import { styled } from "styled-components";
import { useSelector } from "react-redux";
import { RootState, useAppDispatch } from "../../Redux/store";
import { colapseModal, addItem, editItem } from "../../Redux/CarsSlice";
import Button from "../UI/Button/Button";
import Flex from "../UI/Flex/Flex";
import FormItem from "../FormItem/FormItem";
const CarModal = () => {
  const dispatch = useAppDispatch();
  const currentCar = useSelector((state: RootState) => state.cars.currentCar);

  const formValues: CarProps = {
    ...currentCar,
    availability: currentCar.availability ? "true" : "false",
  };

  const {
    control,
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<ModalProps>({
    defaultValues: formValues,
  });

  useEffect(() => {
    reset(currentCar);
  }, [currentCar.id]);
  if (!currentCar.id) return null;

  const onSubmitHandler = (values: ModalProps) => {
    if (currentCar?.mode === "adding")
      dispatch(
        addItem({ ...values, price: "$" + values.price, id: currentCar.id })
      );
    else
      dispatch(
        editItem({ ...values, price: "$" + values.price, id: currentCar.id })
      );
    dispatch(colapseModal());
    reset();
  };

  return (
    <Wrapper>
      <ModalContainer>
        <Form onSubmit={handleSubmit(onSubmitHandler)}>
          <FormItem
            label={"Vincode"}
            placeholder={"Car's vincode"}
            control={control}
            errors={errors}
            formField={"car_vin"}
            message="Vin is required"
            type="text"
          />
          <FormItem
            label={"Car"}
            placeholder={"Car name"}
            control={control}
            errors={errors}
            formField={"car"}
            message="Car name is required"
            type="text"
          />
          <FormItem
            label={"Year"}
            placeholder={"Car's year"}
            control={control}
            errors={errors}
            formField={"car_model_year"}
            message="Car's year is required"
            type="text"
          />
          <FormItem
            label={"Model"}
            placeholder={"Car model"}
            control={control}
            errors={errors}
            formField={"car_model"}
            message="Car model is required"
            type="text"
          />
          <FormItem
            label={"Color"}
            placeholder={"Car color"}
            control={control}
            errors={errors}
            formField={"car_color"}
            type="text"
            message="Color is required"
          />
          <FormItem
            label={"Price"}
            placeholder={"Car price"}
            control={control}
            errors={errors}
            formField={"price"}
            type={"number"}
            message="Price is required"
          />
          <SelectItem>
            <label>Is car available ?</label>
            <Select {...register("availability")}>
              <option value="true">Available </option>
              <option value="false">Not available </option>
            </Select>
          </SelectItem>
          <Flex align="center" justify="between">
            <Button
              color="warning"
              onClick={() => {
                dispatch(colapseModal());
                reset();
              }}
            >
              Cancel
            </Button>
            <Button color="default">Submit</Button>
          </Flex>
        </Form>
      </ModalContainer>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  box-sizing: border-box;
  position: fixed;
  left: 0;
  top: 0;
  height: 100%;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModalContainer = styled.div`
  box-sizing: border-box;
  padding: 10px 15px;
  border-radius: 8px;
`;
const Form = styled.form`
  background: #fff;
  border-radius: 8px;
  max-width: 500px;
  padding: 10px 20px;
  * {
    font-size: 28px;
  }
`;
const Select = styled.select`
  width: 100%;
  display: block;
  outline: none;
  border-radius: 4px;
  box-sizing: border-box;
  font-size: 30px;
  padding: 5px;
`;
const SelectItem = styled.div`
  margin: 10px 0;
`;
export default CarModal;
