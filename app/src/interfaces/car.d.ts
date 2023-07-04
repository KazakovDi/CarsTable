import { TypeFlags } from "typescript";

export type CarProps = {
  id: number | null;
  car: string;
  car_model: string;
  car_color: string;
  car_model_year: number | "";
  car_vin: string;
  price: string;
  availability: boolean | string;
};
export type ModalProps = CarProps & {
  mode: "edditing" | "adding" | "";
};
