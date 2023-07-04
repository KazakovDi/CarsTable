import React from "react";
import ControlButton from "../UI/ControlButton/ControlButton";
import { setModal } from "../../Redux/CarsSlice";
import { useAppDispatch } from "../../Redux/store";
import { IconPlus } from "@tabler/icons-react";

const AddTableItemButton = () => {
  const dispatch = useAppDispatch();
  return (
    <ControlButton
      onClick={() =>
        dispatch(
          setModal({
            car_vin: "",
            car_model_year: "",
            car: "",
            car_model: "",
            price: "",
            car_color: "",
            availability: true,
            id: Math.random(),
            mode: "adding",
          })
        )
      }
    >
      <IconPlus />
    </ControlButton>
  );
};

export default AddTableItemButton;
