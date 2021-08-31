import React from 'react';
import classnames from 'classnames';
import styles from './product.less';

export default function Product({ data }){
    return <div className={classnames('col col-lg-3 col-md-6 col-6', styles.productItem)}>Product: {data?.name}
        <div><span>右上角文字</span></div>
        <h3>标识符： {JSON.stringify(data?.availableSizes)}</h3>
        <div>中间图片</div>
        <div>
            商品名称
        </div>
        <div>价格: {data?.currencyFormat} {data?.price}</div>
        <div className="fake-btn add-product-purchasePanel hover">Add to cart</div>
    </div>
}