import React, { useContext } from "react";
import { GlobalState } from "./../GlobalState";
import Menu from "./icons/menu.svg";
import Close from "./icons/close.svg";
import Cart from "./icons/cart.svg";
import { Link } from "react-router-dom";

const Header = () => {
  const value = useContext(GlobalState);
  return (
    <header>
      <div className="menu">
        <img src={Menu} width="30" alt="" />
      </div>

      <div className="logo">
        <h1>
          <Link to="/">Star Shop</Link>
        </h1>
      </div>

      <ul>
        <li>
          <Link to="/">Products</Link>
        </li>
        <li>
          <Link to="/login">Login * Register </Link>
        </li>
        <li>
          <img src={Close} width="30" className="menu" alt="" />
        </li>
      </ul>

      <div className="cart-icon">
        <span>0</span>
        <Link to="/cart">
          <img src={Cart} width="30" alt="" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
