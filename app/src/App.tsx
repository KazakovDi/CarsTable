import React, { useEffect } from "react";
import { useAppDispatch } from "./Redux/store";
import { fetchCars, getDataFromStorage, setModal } from "./Redux/CarsSlice";
import CarModal from "./Components/CarModal/CarModal";
import SearchInput from "./Components/SearchInput/SearchInput";
import Pagination from "./Components/Pagination/Pagination";
import Table from "./Components/Table/Table";
import AddTableItemButton from "./Components/AddCarButton/AddTableItemButton";
import { styled } from "styled-components";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const cars = window.localStorage.getItem("cars");
    if (!cars)
      dispatch(fetchCars()).then((res) =>
        window.localStorage.setItem("cars", JSON.stringify(res.payload))
      );
    else dispatch(getDataFromStorage(JSON.parse(cars)));
  }, []);

  return (
    <Wrapper>
      <>
        <Controls>
          <AddTableItemButton />
          <SearchInput />
        </Controls>
        <Table />
        <Pagination />
      </>

      <CarModal />
    </Wrapper>
  );
}
const Wrapper = styled.div`
  width: 90%;
  margin: 10px auto;
`;
const Controls = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 10px 0;
  button {
    font-size: 0;
    margin-right: 10px;
  }
`;
export default App;
