import React from "react";
import Product from "./Product";

function ProductList({ products = [] }) {
  return (
    <div className="row">
      {products?.map((product) => {
        return <Product key={product?.id} data={product} />;
      })}
    </div>
  );
}

export default ProductList;