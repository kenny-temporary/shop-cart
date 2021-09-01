import React from "react";
import classnames from "classnames";
import styles from "./purchase.less";

export default function Purchase({ data, onRemove, onAdd, onMinus }) {
  const addOnClickToDecrement =
    data?.number <= 1
      ? {}
      : {
          onClick: () => onMinus && onMinus(data?.product?.sku, data?.product),
        };

  return (
    <div className={classnames("mb-4 pb-4", styles.purchaseContainer)}>
      <div className={styles.purchaseDescription}>
        <div className={styles.productMiniImage}>
          <img
            src={require(`../assets/products/${data?.product?.sku}_2.jpg`)}
            alt="productMiniImage"
          />
        </div>
        <ul>
          <li>{data?.product?.title}</li>
          <li>
            {" "}
            {/* TODO: 完成规格增加 */}
            {/* {JSON.stringify(data?.product?.availableSizes)} |{" "} */}
            {data?.product?.style}
          </li>
          <li>Quantity: {data?.number}</li>
        </ul>
      </div>

      <ul className={styles.productActionContainer}>
        <li
          className={styles.fakeCloseBtn}
          onClick={() =>
            onRemove && onRemove(data?.product?.sku, data?.product)
          }
        >
          X
        </li>
        <li className={styles.price}>
          <span>
            {data?.product?.currencyFormat} {data?.product?.price.toFixed(2)}
          </span>
        </li>

        <li className={styles.actionBtnGroup}>
          <span
            {...addOnClickToDecrement}
            className={classnames({
              [styles.disable]: data?.number <= 1,
              [styles.active]: data?.number > 1,
            })}
          >
            -
          </span>
          <span onClick={() => onAdd && onAdd(data?.product?.sku, data)}>
            +
          </span>
        </li>
      </ul>
    </div>
  );
}
