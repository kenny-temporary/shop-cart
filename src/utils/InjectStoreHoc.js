// import React from 'react';
import { connect } from 'dva';

function InjectStoreHoc(OriginComponent, mapStateToProps, mapDispatchToProps) {
    return connect(mapStateToProps, mapDispatchToProps)(OriginComponent);
}

export default InjectStoreHoc;