import React, { useEffect } from "react";
import ProductList from "@/components/ProductList";
import InjectStoreHoc from "@/utils/InjectStoreHoc";
import PurchasePanel from "@/components/PurchasePanel";
import SpecificationPicker from "@/components/SpecificationPicker";
import SortPicker from "@/components/SortPicker";
import { GetProductActionEffect } from "@/actions/product";
import { ClosePurchasePanelPure } from "@/actions/purchase";
import classnames from "classnames";
import styles from "./shopcard.less";

// 注入读取的数据
const ProductListWthState = InjectStoreHoc(ProductList, ({ product, purchase }) => ({
  products: product?.products,
  spinStatus: product?.spinStatus,
  selected: product?.selected,
}));
const PurchasePanelWthState = InjectStoreHoc(PurchasePanel, ({ purchase }) => ({
  purchase: purchase,
}));
const SpecificationPickerWthState = InjectStoreHoc(
  SpecificationPicker,
  ({ product }) => ({
    specifications: product?.specifications,
    selected: product?.selected,
  })
);

function ShopCard({ dispatch, products }) {
  useEffect(() => {
    dispatch(new GetProductActionEffect());
  }, []);

  return (
    <div className="container mt-5 position-relative">
      <main className="row">
        <nav className="col col-lg-2 col-12">
          <SpecificationPickerWthState />
        </nav>

        <section className="col col-lg-10 col-12">
          <div className="d-flex flex-lg-row flex-column justify-content-lg-between align-items-lg-start align-items-center  mb-4">
            <div>{products?.length} Product(s) found</div>
            <SortPicker />
          </div>
          <ProductListWthState />
        </section>
      </main>

      <div
        className={classnames(styles.fakeCardBtn)}
        onClick={() => {
          dispatch({ ...new ClosePurchasePanelPure() });
        }}
      >
        Card
      </div>
      <PurchasePanelWthState />
    </div>
  );
}

export default InjectStoreHoc(ShopCard, (state) => ({
  products: state?.product?.products,
}));
