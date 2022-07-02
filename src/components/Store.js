import React, {
  createContext,
  useReducer,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

// export const Store = createContext();
// const intialStates = {
//   cart: {
//     cartItems: [],
//   },
// };
// function reducer(state, action) {
//   switch (action.type) {
//     case "CART__ADD_ITEM":
//       return {
//         ...state,
//         cart: {
//           ...state.cart,
//           cartItems: [...state.cart.cartItems, action.payload],
//         },
//       };
//   }
// }
// export function StoreProvider(props) {
//   const [state, dispatch] = useReducer(reducer, intialState);
//   const value = { state, dispatch };
//   return <Store.Provider value={value}>{props.children}</Store.Provider>;
// }

const StateContext = createContext();
const intialState = {
  cart: {
    cartItems: [],
  },
};

export const ContextProvider = ({ children }) => {
  const [Cart, setCart] = useState(intialState);
  const [CartStock, setCartStock] = useState(1);

  return (
    <StateContext.Provider value={{ Cart, CartStock, setCartStock, setCart }}>
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
