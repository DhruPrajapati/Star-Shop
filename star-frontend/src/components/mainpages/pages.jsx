import React, { useContext } from "react";
import { Route, Switch } from "react-router-dom";
import Products from "./products/products";
import Login from "./auth/login";
import Register from "./auth/register";
import Cart from "./cart/carts";
import NotFound from "./utils/NotFound/notFound";
import DetailProduct from "./detailProduct/detailProduct";
import { GlobalState } from "./../GlobalState";

const MainPages = () => {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;

  return (
    <Switch>
      <Route path="/" exact component={Products} />
      <Route path="/" exact component={Products} />
      <Route path="/detail/:id" exact component={DetailProduct} />
      <Route path="/login" exact component={isLogged ? NotFound : Login} />
      <Route
        path="/register"
        exact
        component={isLogged ? NotFound : Register}
      />
      <Route path="/cart" exact component={Cart} />

      <Route path="*" exact component={NotFound} />
    </Switch>
  );
};

export default MainPages;
