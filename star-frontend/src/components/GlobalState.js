import React, { createContext, useState } from "react";
import ProductsAPI from "./../api/productApi";

export const GlobalState = createContext();

const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);

  const state = {
    token: [token, setToken],
    productsAPI: ProductsAPI(),
  };

  // ProductsAPI();
  console.log("this is state", state);

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};

export default DataProvider;
