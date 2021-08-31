import React from "react";
import classnames from "classnames";
import styles from "./product.less";

export default function Product({ data }) {
  console.log(data);
  const random = Math.random();
  return (
    <div
      className={classnames(
        "col py-2 col-lg-3 col-md-6 col-6 position-relative mb-4",
        styles.productItem
      )}
    >
      {data?.isFreeShipping && (
        <span className="position-absolute end-0 mx-3 bg-dark text-light px-2 py-1 small">
          Free shipping
        </span>
      )}
      <div
        style={{
          aspectRatio: "3 / 4",
          backgroundColor: `rgba(255, 25, 25, ${random})`,
        }}
      >
        <img />
      </div>

      <div className="text-center mt-3 mb-2 h6">{data?.title}</div>

      <div className="text-center mt-4 mb-2 d-flex justify-content-center">
        <span
          className="d-block"
          style={{ height: "2px", width: "20px", backgroundColor: "#eabf00" }}
        ></span>
      </div>

      <div className="text-center mb-3">
        <span>{data?.currencyFormat} </span>
        <span style={{ fontSize: "1.5rem " }}>{data?.price}</span>
      </div>
      <div className={styles.addPurchaseBtn}>Add to cart</div>
    </div>
  );
}
