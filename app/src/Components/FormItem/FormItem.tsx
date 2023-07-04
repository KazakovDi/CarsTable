import React from "react";
import { styled } from "styled-components";
import { Control, Controller, FieldErrors } from "react-hook-form";
import TextInput from "../UI/TextInput/TextInput";
import { useSelector } from "react-redux";
import { RootState } from "../../Redux/store";
import { ModalProps } from "../../interfaces/car";
interface FormItemProps {
  label: string;
  message: string;
  type: "text" | "number";
  placeholder: string;
  formField:
    | "car"
    | "car_model"
    | "car_model_year"
    | "car_color"
    | "price"
    | "car_vin";
  errors: FieldErrors<ModalProps>;
  control: Control<ModalProps, any>;
}
const FormItem = ({
  label,
  control,
  errors,
  formField,
  message,
  placeholder,
  type,
}: FormItemProps) => {
  const { mode } = useSelector((state: RootState) => state.cars.currentCar);

  return (
    <Item>
      <label>{label}</label>
      <Controller
        name={`${formField}`}
        control={control}
        rules={{ required: { value: true, message } }}
        render={({ field }) => (
          <TextInput
            {...field}
            error={!!errors[`${formField}`]?.message}
            readOnly={mode === "edditing"}
            fullWidth
            placeholder={placeholder}
            type={type}
            min={0}
          />
        )}
      />
      <ErrorMessage>{errors[`${formField}`]?.message}</ErrorMessage>
    </Item>
  );
};
const Item = styled.div`
  margin: 10px 0;
`;
const ErrorMessage = styled.p`
  margin: 5px;
  color: red;
  font-size: 18px !important;
`;
export default FormItem;
