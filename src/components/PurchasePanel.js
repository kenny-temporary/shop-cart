import React from "react";
import { Drawer, Modal } from "antd";
import classnames from "classnames";
import Purchase from "./Purchase";
import {
  RemovePurchaseActionEffect,
  ClearPurchaseActionEffect,
  AddPurchaseActionEffect,
  MinusPurchaseActionEffect,
  ClosePurchasePanelPure,
} from "@/actions/purchase";
import styles from "./purchasePanel.less";

const drawerBg = "#1b1a20";
const drawerBorder = "rgba(0,0,0,0.9)";

function PurchasePanel({ purchase, dispatch }) {
  const panelRef = React.useRef();

  React.useEffect(() => {
    // TODO: 修复不自动滚动到底部操作

    // NOTE: eslint 错误原因：期待一个附值而是一个表达式，But这里我们不需要附值
    // eslint-disable-next-line
    panelRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "end",
    });
    return () => (panelRef.current = "");
  }, [purchase?.purchases]);

  const purchases = purchase?.purchases;
  const handleRemovePurchase = (sku) =>
    dispatch({ ...new RemovePurchaseActionEffect(sku) });

  const handleMinusPurchase = (sku) =>
    dispatch({ ...new MinusPurchaseActionEffect(sku) });

  const handleAddPurchase = (sku, item) =>
    dispatch({ ...new AddPurchaseActionEffect(sku, item) });

  // XXX: 提交部分逻辑抽离
  const handleSumitPurchase = () => {
    Modal.confirm({
      content: `Checkout - Subtotal: $: ${purchase?.totailPrice}`,
      onCancel: () => {
        dispatch(new ClearPurchaseActionEffect());
        Modal.destroyAll();
      },
      onOk: () => {
        dispatch(new ClearPurchaseActionEffect());
        Modal.destroyAll();
      },
    });
  };

  const renderDrawerTitle = () => {
    return (
      <div className="h3 text-light d-flex justify-content-between">
        <span>Card</span>
        <span
          onClick={() => {
            dispatch({ ...new ClosePurchasePanelPure() });
          }}
        >
          X
        </span>
      </div>
    );
  };

  return (
    <Drawer
      visible={purchase?.openPannel}
      mask={false}
      title={renderDrawerTitle()}
      closable={false}
      className={purchase?.openPannel ? styles.drawerWarrper : ""}
      headerStyle={{
        backgroundColor: drawerBg,
        border: `1px solid ${drawerBorder}`,
      }}
      drawerStyle={{ backgroundColor: drawerBg }}
    >
      <div className={styles.panelContent}>
        <div className={styles.purchaseContent} ref={panelRef}>
          {Object.keys(purchases)?.map((item) => (
            <Purchase
              key={purchases?.[item]?.product?.sku}
              data={purchases?.[item]}
              onRemove={handleRemovePurchase}
              onAdd={handleAddPurchase}
              onMinus={handleMinusPurchase}
            />
          ))}
        </div>
        <div
          className={classnames(
            "text-light position-fiexd",
            styles.panelTotalPanel
          )}
        >
          <ul>
            <li>SUBTOTAL</li>
            <li>
              <span className={styles.totalPanelText}>
                $ {purchase?.totailPrice.toFixed(2)}
              </span>
              {!!purchase?.totailPrice && (
                <div>
                  OR UP TO 9 x $ {(purchase?.totailPrice / 9).toFixed(2)}
                </div>
              )}
            </li>
          </ul>
          <div
            className={styles.fakeSumitPurchaseBtn}
            onClick={handleSumitPurchase}
          >
            CHECKOUT
          </div>
        </div>
      </div>
    </Drawer>
  );
}

export default PurchasePanel;
