import React from "react";
import { Route, Switch } from "react-router-dom";
import Products from "./products/products";
import Login from "./auth/login";
import Register from "./auth/register";
import Cart from "./cart/carts";
import NotFound from "./utils/NotFound/notFound";

const MainPages = () => {
  return (
    <Switch>
      <Route path="/login" exact component={Login} />
      <Route path="/register" exact component={Register} />
      <Route path="/cart" exact component={Cart} />
      <Route path="/notFound" exact component={NotFound} />
      <Route path="/" exact component={Products} />
    </Switch>
  );
};

export default MainPages;
