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
  shippingDetails: localStorage.getItem("shippingAddress")
    ? JSON.parse(localStorage.getItem("shippingAddress"))
    : {},
  PaymentMethod: localStorage.getItem("paymentMethodLocal")
    ? localStorage.getItem("paymentMethodLocal")
    : "",
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
  const [fullName, setFullName] = useState(Cart.shippingDetails.fullName || "");
  const [address, setAddress] = useState(Cart.shippingDetails.address || "");
  const [city, setCity] = useState(Cart.shippingDetails.city || "");
  const [postalCode, setpostalCode] = useState(
    Cart.shippingDetails.postalCode || ""
  );
  const [country, setCountry] = useState(Cart.shippingDetails.country || "");
  return (
    <StateContext.Provider
      value={{
        Cart,
        CartStock,
        fullName,
        setFullName,
        country,
        setCountry,
        city,
        postalCode,
        setpostalCode,
        setCity,
        address,
        setAddress,
        user,
        setUser,
        setCartStock,
        setCart,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
