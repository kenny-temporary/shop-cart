import React from 'react';
import { connect } from 'dva';

function SizePicker(props){
    console.log('SizePicker -->', props);
    return <div>Size: {JSON.stringify(props?.products)}</div>;
}

export default connect(state => state?.product)(SizePicker);