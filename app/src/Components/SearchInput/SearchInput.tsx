import React, { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch } from "../../Redux/store";
import { search } from "../../Redux/CarsSlice";
import { styled } from "styled-components";
const SearchInput = () => {
  const dispatch = useAppDispatch();
  const [searchState, setSearchState] = useState<string>("");

  useEffect(() => {
    const id = setTimeout(() => {
      if (searchState) dispatch(search(searchState));
    }, 1000);
    return () => {
      clearInterval(id);
    };
  }, [searchState]);

  return (
    <Input
      placeholder="Search"
      onChange={(e: ChangeEvent<HTMLInputElement>) =>
        setSearchState(e.target.value)
      }
    />
  );
};

const Input = styled.input`
  box-sizing: border-box;
  font-size: 30px;
  border-radius: 5px;
  width: 100%;
`;
export default SearchInput;
