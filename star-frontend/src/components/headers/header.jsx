import React, { useContext } from "react";
import { GlobalState } from "./../GlobalState";
import Menu from "./icons/menu.svg";
import Close from "./icons/close.svg";
import Cart from "./icons/cart.svg";
import { Link } from "react-router-dom";
import axios from "axios";

const Header = () => {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [cart] = state.userAPI.cart;

  const logoutUser = async () => {
    await axios.get("/user/logout");

    localStorage.removeItem("firstLogin");

    window.location.href = "/";
  };

  const adminRouter = () => {
    return (
      <>
        <li>
          <Link to="/crete_product">Create Product</Link>
        </li>
        <li>
          <Link to="/category">Categories</Link>
        </li>
      </>
    );
  };

  const LoggedRouter = () => {
    return (
      <>
        <li>
          <Link to="/history">History</Link>
        </li>
        <li>
          <Link to="/" onClick={logoutUser}>
            Logout
          </Link>
        </li>
      </>
    );
  };

  return (
    <header>
      <div className="menu">
        <img src={Menu} width="30" alt="" />
      </div>

      <div className="logo">
        <h1>
          <Link to="/">{isAdmin ? "Admin" : "Star Shop"}</Link>
        </h1>
      </div>

      <ul>
        <li>
          <Link to="/">{isAdmin ? "Products" : "Shop"}</Link>
        </li>

        {isAdmin && adminRouter()}

        {isLogged ? (
          LoggedRouter()
        ) : (
          <li>
            <Link to="/login">Login * Register </Link>
          </li>
        )}

        <li>
          <img src={Close} width="30" className="menu" alt="" />
        </li>
      </ul>

      {isAdmin ? (
        ""
      ) : (
        <div className="cart-icon">
          <span>{cart.length}</span>
          <Link to="/cart">
            <img src={Cart} width="30" alt="" />
          </Link>
        </div>
      )}
    </header>
  );
};

export default Header;
