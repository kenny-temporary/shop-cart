import React from 'react';
import { connect } from "dva";
import Product from './Product';

function ProductList({ products = [] }){
    return products?.map((product, index) => {
            return <Product key={product?.id || index} item={product} />
        });
}

export default connect(state => ({ products: state.product?.products }))(ProductList);