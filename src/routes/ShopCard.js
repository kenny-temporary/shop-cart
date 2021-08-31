import React from "react";
import { connect } from "dva";
import ProductList from "@/components/ProductList";
import InjectStoreHoc from "@/utils/InjectStoreHoc";
import PurchasePanel from "@/components/PurchasePanel";
import SpecificationPicker from "@/components/SpecificationPicker";
import SortPicker from "@/components/SortPicker";
import { GetProductActionEffect } from "@/actions/product";

// 注入读取的数据
const ProductListWthState = InjectStoreHoc(ProductList, ({ product }) => ({
  products: product?.products,
}));
const SpecificationPickerWthState = InjectStoreHoc(
  SpecificationPicker,
  ({ product }) => ({
    specifications: product?.specifications,
    selected: product?.selected,
  })
);

function ShopCard({ dispatch, products }) {
  React.useEffect(() => {
    dispatch(new GetProductActionEffect());
  }, []);

  return (
    <div className="container mt-5">
      <main className="row">
        <nav className="col col-lg-2 col-12">
          <SpecificationPickerWthState />
        </nav>

        <section className="col col-lg-10 col-12">
          <div className="d-flex flex-lg-row flex-column justify-content-lg-between align-items-lg-start align-items-center">
            <div>{products?.length} Product(s) found</div>
            <SortPicker />
          </div>
          <ProductListWthState />
        </section>
      </main>

      <PurchasePanel />
    </div>
  );
}

export default InjectStoreHoc(ShopCard, state => ({
  products: state?.product?.products
}));
