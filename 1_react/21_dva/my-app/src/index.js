import dva from 'dva';
import './index.css';

// 1. Initialize
const app = dva({
  onError(e, dispatch) { //effect和subscriptions抛出的错误都会走onError hook
    console.log(e.message);
  }
});
console.log(app);
// 2. Plugins
// app.use({});  可以注册插件

// 3. Model
app.model(require('./models/example').default); //所有的应用逻辑都可以定义在它的上面

// 4. Router
app.router(require('./router').default);  //传递了history方法给路由组件

// 5. Start
app.start('#root');
