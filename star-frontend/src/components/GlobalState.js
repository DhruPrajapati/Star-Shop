import React, { createContext, useEffect, useState } from "react";
import ProductsAPI from "./../api/productApi";
import axios from "axios";

export const GlobalState = createContext();

const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);

  const refreshToken = async () => {
    const res = await axios.get("http://localhost:5000/user/refresh_token");

    // console.log(res)
    setToken(res.data.accesstoken);
  };
  useEffect(() => {
    const firstLogin = localStorage.getItem("firstLogin");
    if (firstLogin) refreshToken();
  }, [token]);

  const state = {
    token: [token, setToken],
    productsAPI: ProductsAPI(),
  };

  // ProductsAPI();
  // console.log("this is state", state);

  return <GlobalState.Provider value={state}>{children}</GlobalState.Provider>;
};

export default DataProvider;
