// import React from 'react';
import { connect } from 'dva';

const defaultMapStateToPropsRule = (state) => state;

function InjectStoreHoc(OriginComponent, mapStateToProps = defaultMapStateToPropsRule, mapDispatchToProps) {
    return connect(mapStateToProps, mapDispatchToProps)(OriginComponent);
}

export default InjectStoreHoc;