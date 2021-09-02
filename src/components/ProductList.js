import React from "react";
import { Spin } from "antd";
import Product from "./Product";

function ProductList({ products = [], spinStatus }) {
  return (
    <Spin spinning={spinStatus}>
      <div className="row">
        {products?.map((product) => {
          return <Product key={product?.id} data={product} />;
        })}
      </div>
    </Spin>
  );
}

export default ProductList;