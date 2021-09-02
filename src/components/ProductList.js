import React from "react";
import { Spin } from "antd";
import Product from "./Product";

function ProductList({ products = [], spinStatus, selected }) {
  return (
    <Spin spinning={spinStatus}>
      <div className="row">
        {products?.map((product) => {
          return <Product key={product?.id} data={product} selected={selected} />;
        })}
      </div>
    </Spin>
  );
}

export default ProductList;