import React from 'react';
import { connect } from "dva";
import SizePicker from '@/components/SizePicker';
import ProductList from "@/components/ProductList";
import PurchasePanel from "@/components/PurchasePanel";
import { GetProductActionEffect } from '@/models/product';

function ShopCard({ dispatch }) {
    React.useEffect(() => {
        dispatch(new GetProductActionEffect())
    }, []);

    return <div>
        <SizePicker />
        <ProductList />
        <PurchasePanel />
    </div>
}

export default connect()(ShopCard);