import React from "react";
import { connect } from "dva";
import ProductList from "@/components/ProductList";
import InjectStoreHoc from "@/utils/InjectStoreHoc";
import PurchasePanel from "@/components/PurchasePanel";
import SpecificationPicker from "@/components/SpecificationPicker";
import { GetProductActionEffect } from "@/actions/product";

// 注入读取的数据
const ProductListWthState = InjectStoreHoc(
  ProductList,
  ({ product }) => ({ products: product?.products })
);
const SpecificationPickerWthState = InjectStoreHoc(
  SpecificationPicker,
  ({ product }) => ({
    specifications: product?.specifications,
    selected: product?.selected,
  })
);

function ShopCard({ dispatch }) {
  React.useEffect(() => {
    dispatch(new GetProductActionEffect());
  }, []);

  return (
    <div className="container">
      <SpecificationPickerWthState />
      <ProductListWthState />
      <PurchasePanel />
    </div>
  );
}

export default connect()(ShopCard);
