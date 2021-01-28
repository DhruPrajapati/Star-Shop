import React, { useContext, useState, useEffect, Fragment } from "react";
import { useParams, Link } from "react-router-dom";
import ProductItem from "../utils/productItems/productItem";
import { GlobalState } from "./../../GlobalState";

const DetailProduct = () => {
  const params = useParams();
  const state = useContext(GlobalState);
  const [products] = state.productsAPI.products;
  const [detailProduct, setdetailProduct] = useState([]);
  useEffect(() => {
    if (params.id) {
      products.forEach((product) => {
        if (product._id === params.id) setdetailProduct(product);
      });
    }
  }, [params.id, products]);

  if (detailProduct.length === 0) return null;

  return (
    <Fragment>
      <div className="detail">
        <img src={detailProduct.images.url} alt="" />
        <div className="box-detail">
          <div className="row">
            <h2>{detailProduct.title}</h2>
            <h6>#id: {detailProduct.product_id}</h6>
          </div>
          <span>$ {detailProduct.price}</span>
          <p> {detailProduct.description}</p>
          <p> {detailProduct.content}</p>
          <p>Sold: {detailProduct.sold}</p>
          <Link to="/cart" className="cart">
            Buy Now
          </Link>
        </div>
      </div>

      <div>
        <h2>Related products</h2>
        <div className="products">
          {products.map((product) => {
            return product.category === detailProduct.category ? (
              <ProductItem key={product._id} product={product} />
            ) : null;
          })}
        </div>
      </div>
    </Fragment>
  );
};

export default DetailProduct;
