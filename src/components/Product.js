import React from "react";
import { connect } from "dva";
import classnames from "classnames";
import {
  AddPurchaseActionEffect,
  DelPurchaseActionEffect,
  ClearPurchaseActionEffect,
} from "@/actions/purchase";
import styles from "./product.less";

function Product({ data, dispatch }) {
  const addProductToPurchases = (data) => {
    dispatch(new AddPurchaseActionEffect(data?.sku, data));
  };

  return (
    <div
      className={classnames(
        "col py-2 col-lg-3 col-md-6 col-6 position-relative mb-4",
        styles.productItem
      )}
      onClick={() => addProductToPurchases(data)}
    >
      {data?.isFreeShipping && (
        <span
          className={classnames(
            "position-absolute end-0 mx-2 bg-dark text-light",
            styles.freeShipping
          )}
        >
          Free shipping
        </span>
      )}

      <div className={styles.productImageContainer}>
        <img src={require(`../assets/products/${data.sku}_1.jpg`)} />
      </div>

      <div className={styles.productItemTitle}>{data?.title}</div>
      <div className="text-center d-flex justify-content-center">
        <span
          className="d-block"
          style={{ height: "2px", width: "20px", backgroundColor: "#eabf00" }}
        ></span>
      </div>

      <div className="text-center mb-3">
        <small>{data?.currencyFormat} </small>
        <span style={{ fontSize: "1.5rem " }}>{data?.price}</span>
      </div>

      <div className={classnames(styles.addPurchaseBtn)}>Add to cart</div>
    </div>
  );
}

export default connect()(Product);
