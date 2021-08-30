import dva from 'dva';

// 1. Initialize
const app = dva({
    onStateChange(){
        console.log('Initializing')
    }
});

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/product').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
