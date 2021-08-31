import dva from 'dva';
import "./clear.css";

// 1. Initialize
const app = dva({
    onStateChange(){
        console.log('Initializing', app._store.getState()) 
    },
    onReducer: function (reducer) {
        return (state, action) => {
            console.log('--->>', action, reducer(state, action));
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
