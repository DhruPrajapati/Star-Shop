import React, { Fragment, useContext } from "react";
import { GlobalState } from "./../../GlobalState";
import ProductItem from "./../utils/productItems/productItem";
import Loading from "./../utils/loading/loading";

const Products = () => {
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  return (
    <Fragment>
      <div className="products">
        {products?.map((product) => {
          return <ProductItem key={product._id} product={product} />;
        })}
      </div>
      {products.length === 0 && <Loading />}
    </Fragment>
  );
};

export default Products;
