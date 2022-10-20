import React, { useReducer } from "react";
const initialState = {
  value: "",
  isTouched: false,
};
const reducerFunc = (state, action) => {
  switch (action.type) {
    case "INPUT":
      return { value: action.value, isTouched: state.isTouched };
    case "BLUR":
      return { isTouched: true, value: state.value };
    case "RESET":
      return initialState;
    default:
      return initialState;
  }
};

const useValid = (validateFunc) => {
  const [state, dispatch] = useReducer(reducerFunc, initialState);

  const isValid = validateFunc(state.value); //pasing the value to the callback func

  const isError = !isValid && state.isTouched; //checking for err

  const valueChangeHandler = (event) =>
    dispatch({ type: "INPUT", value: event.target.value });

  const blurHandler = (e) => dispatch({ type: "BLUR" });

  const reset = () => dispatch({ type: "RESET" });
  return {
    value: state.value,
    isValid,
    isError,
    valueChangeHandler,
    blurHandler,
    reset,
  };
};

export default useValid;
