import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const StateContext = createContext();
const intialStateCart = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
};
const intialStateUser = {
  set: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
};
export const ContextProvider = ({ children }) => {
  const [Cart, setCart] = useState(intialStateCart);
  const [CartStock, setCartStock] = useState(0);
  const [user, setUser] = useState(intialStateUser.set);

  return (
    <StateContext.Provider
      value={{ Cart, CartStock, user, setUser, setCartStock, setCart }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
