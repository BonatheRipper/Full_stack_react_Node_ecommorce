import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const StateContext = createContext();
const intialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
};

export const ContextProvider = ({ children }) => {
  const [Cart, setCart] = useState(intialState);
  const [CartStock, setCartStock] = useState(0);

  return (
    <StateContext.Provider value={{ Cart, CartStock, setCartStock, setCart }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
