import dva from 'dva';
import "./common/clear.less";

// 1. Initialize
const app = dva({
    onReducer: function (reducer) {
        return (state, action) => {
            // console.log('--->>', action, reducer(state, action));
            return reducer(state, action);
        }
    }
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/product').default);
app.model(require('./models/purchase').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
